import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Trophy } from 'lucide-react';

interface TestResultDetail {
    testCase: string;
    passed: boolean;
    message?: string;
}

interface TestResultsData {
    result: 'pass' | 'fail' | 'error' | 'pending';
    executionTime: number;
    testResults: {
        passed: number;
        total: number;
        details: TestResultDetail[];
    };
}

interface TestResultsProps {
    data: TestResultsData;
    onClose?: () => void;
}

export function TestResults({ data, onClose }: TestResultsProps) {
    const { result, executionTime, testResults } = data;
    const allPassed = result === 'pass';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
        >
            {/* Header */}
            <div className={`px-4 py-3 flex items-center justify-between ${allPassed
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-b border-green-500/20'
                    : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-b border-red-500/20'
                }`}>
                <div className="flex items-center gap-3">
                    {allPassed ? (
                        <Trophy className="w-6 h-6 text-green-400" />
                    ) : (
                        <XCircle className="w-6 h-6 text-red-400" />
                    )}
                    <div>
                        <h3 className={`font-bold ${allPassed ? 'text-green-400' : 'text-red-400'}`}>
                            {allPassed ? 'All Tests Passed!' : 'Some Tests Failed'}
                        </h3>
                        <p className="text-sm text-slate-400">
                            {testResults.passed}/{testResults.total} tests passed
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock className="w-4 h-4" />
                    {executionTime}ms
                </div>
            </div>

            {/* Test Details */}
            <div className="max-h-[300px] overflow-y-auto">
                {testResults.details.map((detail, index) => (
                    <div
                        key={index}
                        className={`px-4 py-3 flex items-start gap-3 border-b border-white/5 last:border-0 ${detail.passed ? 'hover:bg-green-500/5' : 'hover:bg-red-500/5'
                            }`}
                    >
                        {detail.passed ? (
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                            <p className={`font-medium ${detail.passed ? 'text-green-300' : 'text-red-300'}`}>
                                {detail.testCase}
                            </p>
                            {detail.message && (
                                <p className="text-sm text-slate-400 mt-1 break-words">
                                    {detail.message}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer with close button */}
            {onClose && (
                <div className="px-4 py-3 border-t border-white/10 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-1.5 text-sm text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            )}
        </motion.div>
    );
}
