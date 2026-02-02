import dotenv from 'dotenv';
dotenv.config();

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3001', 10),
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/codehub',
    jwt: {
        secret: process.env.JWT_SECRET || 'dev-secret-change-me',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    sandbox: {
        enabled: process.env.USE_DOCKER_SANDBOX === 'true',
        timeout: parseInt(process.env.SANDBOX_TIMEOUT || '5000', 10),
        memoryLimit: process.env.SANDBOX_MEMORY || '128m',
    },
};
