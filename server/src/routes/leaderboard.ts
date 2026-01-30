import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';

const router = Router();

// GET /api/leaderboard - Top users by score
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const limit = Math.min(Number(req.query.limit) || 50, 100);

        const users = await User.find()
            .select('username score rank badges solvedProblems createdAt')
            .sort({ score: -1, createdAt: 1 })
            .limit(limit)
            .lean();

        // Add position to each user
        const leaderboard = users.map((user, index) => ({
            position: index + 1,
            username: user.username,
            score: user.score,
            problemsSolved: user.solvedProblems?.length || 0,
            badges: user.badges || [],
            joinedAt: user.createdAt,
        }));

        res.json({
            count: leaderboard.length,
            leaderboard,
        });
    } catch (error) {
        next(error);
    }
});

// GET /api/leaderboard/user/:username - Public user profile
router.get('/user/:username', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username })
            .select('username score rank badges solvedProblems createdAt')
            .populate('solvedProblems', 'title difficulty category points')
            .lean();

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Calculate user's rank position
        const higherScoreCount = await User.countDocuments({ score: { $gt: user.score } });
        const position = higherScoreCount + 1;

        res.json({
            profile: {
                username: user.username,
                score: user.score,
                position,
                badges: user.badges || [],
                problemsSolved: user.solvedProblems?.length || 0,
                solvedProblems: user.solvedProblems || [],
                joinedAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
});

export default router;
