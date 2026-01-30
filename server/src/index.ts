import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.js';
import problemRoutes from './routes/problems.js';
import submissionRoutes from './routes/submissions.js';

const app = express();

// Middleware
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);

// Health check
app.get('/api/health', (_, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function start() {
    await connectDB();
    app.listen(config.port, () => {
        console.log(`🚀 Server running on http://localhost:${config.port}`);
    });
}

start();
