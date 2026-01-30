import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Filter, Search, Zap, Clock, Users } from 'lucide-react';
import { GlassCard, Button } from '../components/ui';

interface Problem {
    _id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: 'react' | 'css' | 'node' | 'javascript';
    points: number;
    solvedCount: number;
}

const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const categoryIcons: Record<string, string> = {
    react: '⚛️',
    css: '🎨',
    node: '🟢',
    javascript: '📜',
};

export function ProblemsPage() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchProblems();
    }, [difficulty, category]);

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (difficulty) params.append('difficulty', difficulty);
            if (category) params.append('category', category);
            if (search) params.append('search', search);

            const response = await fetch(`/api/problems?${params}`);
            const data = await response.json();

            if (response.ok) {
                setProblems(data.problems);
            } else {
                setError(data.error || 'Failed to fetch problems');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProblems();
    };

    return (
        <div className="container mx-auto px-6 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold text-white mb-4">
                    Coding <span className="gradient-text">Challenges</span>
                </h1>
                <p className="text-slate-400 max-w-lg mx-auto">
                    Sharpen your skills with real-world problems. Each challenge earns you points and badges.
                </p>
            </motion.div>

            {/* Filters */}
            <GlassCard className="p-6 mb-8">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Filter className="w-5 h-5" />
                        <span className="font-medium">Filters:</span>
                    </div>

                    {/* Difficulty Filter */}
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    >
                        <option value="">All Difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    {/* Category Filter */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    >
                        <option value="">All Categories</option>
                        <option value="react">React</option>
                        <option value="css">CSS</option>
                        <option value="javascript">JavaScript</option>
                        <option value="node">Node.js</option>
                    </select>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex-1 flex gap-2 min-w-[200px]">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search problems..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            />
                        </div>
                        <Button type="submit" size="sm">Search</Button>
                    </form>
                </div>
            </GlassCard>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                </div>
            )}

            {/* Error State */}
            {error && (
                <GlassCard className="p-8 text-center">
                    <p className="text-red-400">{error}</p>
                    <Button onClick={fetchProblems} className="mt-4">Retry</Button>
                </GlassCard>
            )}

            {/* Problems Grid */}
            {!loading && !error && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={problem._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/problems/${problem._id}`}>
                                <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform cursor-pointer group">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="text-2xl">{categoryIcons[problem.category]}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${difficultyColors[problem.difficulty]}`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                        {problem.title}
                                    </h3>

                                    {/* Description Preview */}
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                        {problem.description.split('\n')[0].replace(/^#+ /, '')}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Zap className="w-4 h-4 text-cyan-500" />
                                            <span>{problem.points} pts</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4 text-violet-500" />
                                            <span>{problem.solvedCount} solved</span>
                                        </div>
                                    </div>

                                    {/* Category Tag */}
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                                            {problem.category}
                                        </span>
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && problems.length === 0 && (
                <GlassCard className="p-12 text-center">
                    <Code2 className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Problems Found</h3>
                    <p className="text-slate-400">Try adjusting your filters or search query.</p>
                </GlassCard>
            )}
        </div>
    );
}
