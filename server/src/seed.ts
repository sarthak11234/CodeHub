import mongoose from 'mongoose';
import { config } from './config/index.js';
import { connectDB } from './config/database.js';
import { Problem } from './models/Problem.js';
import { generateTotalProblems } from './generateProblems.js';

async function seed() {
    try {
        // Connect to database
        await connectDB();
        console.log('📦 Connected to database');

        // Clear existing problems
        await Problem.deleteMany({});
        console.log('🗑️  Cleared existing problems');

        // Generate 500 problems
        const problemsToInsert = generateTotalProblems(500);

        // Insert new generated problems
        const created = await Problem.insertMany(problemsToInsert);
        console.log(`✅ Inserted ${created.length} total problems!`);

        console.log('\n🎉 Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
