import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Zap, Users, Clock, Play } from 'lucide-react';
import { GlassCard, Button } from '../components/ui';

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
    const [problem, setProblem] = useState<Problem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        <div className="container mx-auto px-6 py-12">
            {/* Back Button */}
            <Link to="/problems" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Problems
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Problem Info */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <GlassCard className="p-8">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">{problem.title}</h1>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${difficultyColors[problem.difficulty]}`}>
                                            {problem.difficulty}
                                        </span>
                                        <span className="text-slate-400 uppercase text-sm font-medium">
                                            {problem.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="prose prose-invert prose-sm max-w-none">
                                <div className="text-slate-300 whitespace-pre-wrap">
                                    {problem.description}
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Starter Code */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <GlassCard className="p-6">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-cyan-500" />
                                Starter Code
                            </h2>
                            <pre className="bg-slate-900/50 rounded-xl p-4 overflow-x-auto">
                                <code className="text-sm text-slate-300 font-mono">
                                    {problem.starterCode}
                                </code>
                            </pre>
                        </GlassCard>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlassCard className="p-6">
                            <h2 className="text-lg font-bold text-white mb-4">Problem Stats</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-white/5">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Zap className="w-4 h-4 text-cyan-500" />
                                        Points
                                    </div>
                                    <span className="text-white font-bold">{problem.points}</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-white/5">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Users className="w-4 h-4 text-violet-500" />
                                        Solved By
                                    </div>
                                    <span className="text-white font-bold">{problem.solvedCount} users</span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Clock className="w-4 h-4 text-yellow-500" />
                                        Avg. Time
                                    </div>
                                    <span className="text-white font-bold">~15 min</span>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <GlassCard className="p-6 text-center" glowColor="cyan">
                            <h3 className="text-lg font-bold text-white mb-2">Ready to Code?</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Open the IDE and start solving this challenge!
                            </p>
                            <Button size="lg" className="w-full justify-center">
                                <Play className="w-5 h-5 mr-2" />
                                Start Challenge
                            </Button>
                            <p className="text-xs text-slate-500 mt-3">
                                IDE coming in Phase 5
                            </p>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
