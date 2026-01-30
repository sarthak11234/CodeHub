import mongoose, { Document, Schema } from 'mongoose';

export interface ITestCase {
    input: string;
    expectedOutput: string;
    description: string;
}

export interface IProblem extends Document {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: 'react' | 'css' | 'node' | 'javascript';
    starterCode: string;
    solutionCode: string;
    testCases: ITestCase[];
    points: number;
    solvedCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const testCaseSchema = new Schema<ITestCase>(
    {
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true },
        description: { type: String, required: true },
    },
    { _id: false }
);

const problemSchema = new Schema<IProblem>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },
        description: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            required: true,
        },
        category: {
            type: String,
            enum: ['react', 'css', 'node', 'javascript'],
            required: true,
        },
        starterCode: {
            type: String,
            default: '',
        },
        solutionCode: {
            type: String,
            default: '',
        },
        testCases: [testCaseSchema],
        points: {
            type: Number,
            default: 10,
            min: 0,
        },
        solvedCount: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for filtering and sorting
problemSchema.index({ difficulty: 1, category: 1 });
problemSchema.index({ solvedCount: -1 });

export const Problem = mongoose.model<IProblem>('Problem', problemSchema);
