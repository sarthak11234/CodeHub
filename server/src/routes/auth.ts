import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config/index.js';

const router = Router();

// Generate JWT token
function generateToken(userId: string): string {
    return jwt.sign({ id: userId }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });
}

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password, username } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            res.status(400).json({ error: 'User with this email or username already exists' });
            return;
        }

        // Create user
        const user = await User.create({ email, password, username });
        const token = generateToken(user._id.toString());

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                rank: user.rank,
                score: user.score,
            },
        });
    } catch (error) {
        next(error);
    }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user with password
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        const token = generateToken(user._id.toString());

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                rank: user.rank,
                score: user.score,
                badges: user.badges,
            },
        });
    } catch (error) {
        next(error);
    }
});

// GET /api/auth/me (protected - requires token)
router.get('/me', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, config.jwt.secret) as { id: string };

        const user = await User.findById(decoded.id).populate('solvedProblems');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                rank: user.rank,
                score: user.score,
                badges: user.badges,
                solvedProblems: user.solvedProblems,
            },
        });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

export default router;
