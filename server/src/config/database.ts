import mongoose from 'mongoose';
import { config } from './index.js';

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
});
