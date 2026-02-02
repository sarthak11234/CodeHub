import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Trophy, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface TestResultDetail {
    testCase: string;
    passed: boolean;
    message?: string;
    expected?: string;
    actual?: string;
    hint?: string;
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

function ExpectedActualComparison({ expected, actual }: { expected?: string; actual?: string }) {
    if (!expected && !actual) return null;

    return (
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-green-500/10 rounded p-2 border border-green-500/20">
                <span className="text-green-400 font-medium block mb-1">Expected:</span>
                <code className="text-slate-300 break-all">{expected || '(none)'}</code>
            </div>
            <div className="bg-red-500/10 rounded p-2 border border-red-500/20">
                <span className="text-red-400 font-medium block mb-1">Your Output:</span>
                <code className="text-slate-300 break-all">{actual || '(none)'}</code>
            </div>
        </div>
    );
}

function HintBox({ hint }: { hint?: string }) {
    const [expanded, setExpanded] = useState(false);

    if (!hint) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2"
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"
            >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Show Hint</span>
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {expanded && (
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded text-xs text-amber-200"
                >
                    💡 {hint}
                </motion.div>
            )}
        </motion.div>
    );
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
                            {allPassed ? 'All Tests Passed!' : result === 'error' ? 'Execution Error' : 'Some Tests Failed'}
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
            <div className="max-h-[400px] overflow-y-auto">
                {testResults.details.map((detail, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`px-4 py-3 border-b border-white/5 last:border-0 ${detail.passed ? 'hover:bg-green-500/5' : 'hover:bg-red-500/5'
                            }`}
                    >
                        <div className="flex items-start gap-3">
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

                                {/* Show expected vs actual for failed tests */}
                                {!detail.passed && (detail.expected || detail.actual) && (
                                    <ExpectedActualComparison
                                        expected={detail.expected}
                                        actual={detail.actual}
                                    />
                                )}

                                {/* Show hint for failed tests */}
                                {!detail.passed && detail.hint && (
                                    <HintBox hint={detail.hint} />
                                )}
                            </div>
                        </div>
                    </motion.div>
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
