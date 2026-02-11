import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Submission } from '../models/Submission.js';
import { Problem } from '../models/Problem.js';
import { User } from '../models/User.js';
import { config } from '../config/index.js';
import { gradeSubmission } from '../services/grader.js';

const router = Router();

// Middleware to verify JWT token
async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, config.jwt.secret) as { id: string };
        (req as any).userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

// POST /api/submissions - Create and grade a new submission
router.post('/', authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = (req as any).userId;
        const { problemId, code } = req.body;

        if (!problemId || !code) {
            res.status(400).json({ error: 'problemId and code are required' });
            return;
        }

        // Verify problem exists
        const problem = await Problem.findById(problemId);
        if (!problem) {
            res.status(404).json({ error: 'Problem not found' });
            return;
        }

        // Grade the submission
        const gradeResult = await gradeSubmission(code, problem.category, problem.testCases);

        // Create submission with grading results
        const submission = await Submission.create({
            userId,
            problemId,
            code,
            result: gradeResult.result,
            executionTime: gradeResult.executionTime,
            testResults: gradeResult.testResults,
        });

        // If passed, check if this is user's first successful solve and award points
        if (gradeResult.result === 'pass') {
            // Check for previous successful submission
            const previousSuccess = await Submission.findOne({
                userId,
                problemId,
                result: 'pass',
                _id: { $ne: submission._id },
            });

            if (!previousSuccess) {
                // First successful solve - award points
                await User.findByIdAndUpdate(userId, {
                    $inc: { score: problem.points },
                    $push: { solvedProblems: problemId },
                });

                // Increment problem's solved count
                await Problem.findByIdAndUpdate(problemId, {
                    $inc: { solvedCount: 1 },
                });
            }
        }

        res.status(201).json({
            message: gradeResult.result === 'pass' ? 'All tests passed!' : 'Some tests failed',
            submission: {
                id: submission._id,
                problemId: submission.problemId,
                result: submission.result,
                executionTime: submission.executionTime,
                testResults: submission.testResults,
                createdAt: submission.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
});

// GET /api/submissions/user - Get current user's submissions
router.get('/user', authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = (req as any).userId;
        const { problemId, limit = 20 } = req.query;

        const filter: Record<string, unknown> = { userId };
        if (problemId) {
            filter.problemId = problemId;
        }

        const submissions = await Submission.find(filter)
            .populate('problemId', 'title difficulty category')
            .sort({ createdAt: -1 })
            .limit(Number(limit));

        res.json({
            count: submissions.length,
            submissions,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
