import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Zap, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { GlassCard, Button } from '../components/ui';
import { IDE } from '../components/ide';
import { useAuth } from '../context/AuthContext';

interface Problem {
    _id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: 'react' | 'css' | 'node' | 'javascript';
    starterCode: string;
    points: number;
    solvedCount: number;
}

const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function ProblemDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDescription, setShowDescription] = useState(true);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetchProblem();
    }, [id]);

    const fetchProblem = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/problems/${id}`);
            const data = await response.json();

            if (response.ok) {
                setProblem(data.problem);
            } else {
                setError(data.error || 'Problem not found');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (code: string) => {
        if (!token || !problem) return;

        setSubmitStatus('submitting');
        try {
            const response = await fetch('/api/submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    problemId: problem._id,
                    code,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setTimeout(() => setSubmitStatus('idle'), 3000);
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus('idle'), 3000);
            }
        } catch (err) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !problem) {
        return (
            <div className="container mx-auto px-6 py-12">
                <GlassCard className="p-12 text-center max-w-lg mx-auto">
                    <Code2 className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Problem Not Found</h3>
                    <p className="text-slate-400 mb-6">{error || 'This problem does not exist.'}</p>
                    <Link to="/problems">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Problems
                        </Button>
                    </Link>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-6 max-w-7xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Link to="/problems" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Problems
                </Link>

                {/* Status Badge */}
                {submitStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium"
                    >
                        ✓ Solution submitted successfully!
                    </motion.div>
                )}
                {submitStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium"
                    >
                        ✗ Failed to submit. Please try again.
                    </motion.div>
                )}
            </div>

            {/* Problem Info Collapsible */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <GlassCard className="overflow-hidden">
                    {/* Header - Always visible */}
                    <button
                        onClick={() => setShowDescription(!showDescription)}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-bold text-white">{problem.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${difficultyColors[problem.difficulty]}`}>
                                {problem.difficulty}
                            </span>
                            <span className="px-2 py-1 text-xs font-medium uppercase rounded bg-white/10 text-slate-400">
                                {problem.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                                <span className="flex items-center gap-1">
                                    <Zap className="w-4 h-4 text-cyan-500" />
                                    {problem.points} pts
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4 text-violet-500" />
                                    {problem.solvedCount} solved
                                </span>
                            </div>
                            {showDescription ? (
                                <ChevronUp className="w-5 h-5 text-slate-400" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-slate-400" />
                            )}
                        </div>
                    </button>

                    {/* Description - Collapsible */}
                    {showDescription && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/10"
                        >
                            <div className="p-4 text-slate-300 whitespace-pre-wrap text-sm max-h-60 overflow-y-auto">
                                {problem.description}
                            </div>
                        </motion.div>
                    )}
                </GlassCard>
            </motion.div>

            {/* IDE */}
            <IDE
                starterCode={problem.starterCode}
                category={problem.category}
                problemTitle={problem.title}
                onSubmit={token ? handleSubmit : undefined}
            />

            {/* Login prompt if not authenticated */}
            {!token && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4"
                >
                    <GlassCard className="p-4 text-center">
                        <p className="text-slate-400 text-sm">
                            <Link to="/login" className="text-cyan-400 hover:underline">Log in</Link>
                            {' '}or{' '}
                            <Link to="/signup" className="text-cyan-400 hover:underline">sign up</Link>
                            {' '}to submit your solution and track your progress.
                        </p>
                    </GlassCard>
                </motion.div>
            )}
        </div>
    );
}
