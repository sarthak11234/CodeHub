import { Router, Request, Response, NextFunction } from 'express';
import { Problem } from '../models/Problem.js';

const router = Router();

// GET /api/problems - List all problems with optional filters
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { difficulty, category, search } = req.query;

        // Build filter object
        const filter: Record<string, unknown> = {};

        if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty as string)) {
            filter.difficulty = difficulty;
        }

        if (category && ['react', 'css', 'node', 'javascript'].includes(category as string)) {
            filter.category = category;
        }

        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        const problems = await Problem.find(filter)
            .select('title description difficulty category points solvedCount createdAt')
            .sort({ createdAt: -1 });

        res.json({
            count: problems.length,
            problems,
        });
    } catch (error) {
        next(error);
    }
});

// GET /api/problems/:id - Get single problem with starter code
router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const problem = await Problem.findById(id)
            .select('-solutionCode -testCases.expectedOutput'); // Hide solution and expected outputs

        if (!problem) {
            res.status(404).json({ error: 'Problem not found' });
            return;
        }

        res.json({ problem });
    } catch (error) {
        next(error);
    }
});

export default router;
