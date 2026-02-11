import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission extends Document {
    userId: mongoose.Types.ObjectId;
    problemId: mongoose.Types.ObjectId;
    code: string;
    result: 'pass' | 'fail' | 'error' | 'pending';
    executionTime: number;
    testResults: {
        passed: number;
        total: number;
        details: Array<{
            testCase: string;
            passed: boolean;
            message?: string;
            expected?: string;
            actual?: string;
            hint?: string;
        }>;
    };
    createdAt: Date;
}

const submissionSchema = new Schema<ISubmission>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        problemId: {
            type: Schema.Types.ObjectId,
            ref: 'Problem',
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        result: {
            type: String,
            enum: ['pass', 'fail', 'error', 'pending'],
            default: 'pending',
        },
        executionTime: {
            type: Number,
            default: 0,
        },
        testResults: {
            passed: { type: Number, default: 0 },
            total: { type: Number, default: 0 },
            details: [{
                testCase: String,
                passed: Boolean,
                message: String,
                expected: String,
                actual: String,
                hint: String,
            }],
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for querying
submissionSchema.index({ userId: 1, createdAt: -1 });
submissionSchema.index({ problemId: 1, result: 1 });
submissionSchema.index({ userId: 1, problemId: 1 });

export const Submission = mongoose.model<ISubmission>('Submission', submissionSchema);
