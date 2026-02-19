import { useState, useEffect } from 'react';
import { User, Trophy, Shield, Settings, History, Code, Zap, Award, CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';
import { GlassCard, Button } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Submission {
    _id: string;
    problemId: {
        _id: string;
        title: string;
        difficulty: 'easy' | 'medium' | 'hard';
        category: string;
    };
    result: 'pass' | 'fail' | 'error';
    executionTime: number;
    testResults: {
        passed: number;
        total: number;
    };
    createdAt: string;
}

// Level thresholds
const LEVELS = [
    { level: 1, minXP: 0, maxXP: 99, title: 'Beginner' },
    { level: 2, minXP: 100, maxXP: 249, title: 'Learner' },
    { level: 3, minXP: 250, maxXP: 499, title: 'Developer' },
    { level: 4, minXP: 500, maxXP: 999, title: 'Expert' },
    { level: 5, minXP: 1000, maxXP: Infinity, title: 'Master' },
];

const CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    javascript: { label: 'JavaScript', color: 'text-yellow-400', bg: 'bg-yellow-400' },
    css: { label: 'CSS', color: 'text-blue-400', bg: 'bg-blue-400' },
    react: { label: 'React', color: 'text-cyan-400', bg: 'bg-cyan-400' },
    node: { label: 'Node.js', color: 'text-green-400', bg: 'bg-green-400' },
};

const difficultyColors = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
};

function getLevelInfo(score: number) {
    const current = LEVELS.find(l => score >= l.minXP && score <= l.maxXP) || LEVELS[0];
    const next = LEVELS.find(l => l.level === current.level + 1);
    const progress = next
        ? ((score - current.minXP) / (next.minXP - current.minXP)) * 100
        : 100;
    const xpToNext = next ? next.minXP - score : 0;
    return { current, next, progress: Math.min(progress, 100), xpToNext };
}

function timeAgo(dateStr: string) {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString();
}

export function ProfilePage() {
    const { user, token, isLoading, refreshUser } = useAuth();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loadingSubs, setLoadingSubs] = useState(true);

    useEffect(() => {
        refreshUser();
    }, []);

    useEffect(() => {
        if (token) fetchSubmissions();
    }, [token]);

    const fetchSubmissions = async () => {
        try {
            const response = await fetch('/api/submissions/user?limit=10', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setSubmissions(data.submissions);
            }
        } catch (err) {
            console.error('Failed to fetch submissions:', err);
        } finally {
            setLoadingSubs(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const score = user.score || 0;
    const levelInfo = getLevelInfo(score);

    // Category breakdown from solved problems
    const categoryStats: Record<string, number> = {};
    const solvedProblems = (user.solvedProblems || []) as any[];
    solvedProblems.forEach((p: any) => {
        const cat = typeof p === 'object' ? p.category : null;
        if (cat) categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });
    const totalSolved = solvedProblems.length;

    const stats = [
        { label: 'Rank', value: `#${user.rank || '---'}`, icon: Trophy, color: 'text-yellow-400' },
        { label: 'Points', value: score, icon: Zap, color: 'text-cyan-400' },
        { label: 'Solutions', value: totalSolved, icon: Code, color: 'text-violet-400' },
        { label: 'Badges', value: user.badges?.length || 0, icon: Award, color: 'text-green-400' },
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <GlassCard className="p-8 text-center" glowColor="cyan">
                            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-full flex items-center justify-center p-1 mb-6">
                                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                                    <User className="w-12 h-12 text-white" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">{user.username}</h1>
                            <p className="text-slate-400 mb-4">{user.email}</p>
                            <div className="text-sm text-slate-500 mb-6">
                                {levelInfo.current.title} • Level {levelInfo.current.level}
                            </div>
                            <div className="flex justify-center gap-2 flex-wrap mb-6">
                                {(user.badges || []).map((badge: string) => (
                                    <span key={badge} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 font-medium">
                                        {badge}
                                    </span>
                                ))}
                                {(!user.badges || user.badges.length === 0) && (
                                    <span className="text-slate-500 text-sm">No badges earned yet</span>
                                )}
                            </div>
                            <Button variant="secondary" className="w-full justify-center">
                                <Settings className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                        </GlassCard>
                    </motion.div>

                    {/* Account Level */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <GlassCard className="p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center">
                                <Shield className="w-5 h-5 mr-3 text-cyan-500" />
                                Account Level
                            </h3>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-cyan-400">
                                    Lvl {levelInfo.current.level} — {levelInfo.current.title}
                                </span>
                                {levelInfo.next && (
                                    <span className="text-xs text-slate-500">
                                        Lvl {levelInfo.next.level}
                                    </span>
                                )}
                            </div>
                            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${levelInfo.progress}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                            </div>
                            <div className="text-xs text-slate-500 text-right">
                                {levelInfo.next
                                    ? `${levelInfo.xpToNext} XP to Level ${levelInfo.next.level}`
                                    : 'Max level reached! 🎉'}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Category Breakdown */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <GlassCard className="p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center">
                                <Code className="w-5 h-5 mr-3 text-violet-500" />
                                Skills Breakdown
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(CATEGORY_CONFIG).map(([key, cat]) => {
                                    const count = categoryStats[key] || 0;
                                    const percentage = totalSolved > 0 ? (count / totalSolved) * 100 : 0;
                                    return (
                                        <div key={key}>
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className={`text-sm font-medium ${cat.color}`}>{cat.label}</span>
                                                <span className="text-xs text-slate-500">{count} solved</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className={`h-full ${cat.bg} rounded-full opacity-80`}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                                {totalSolved === 0 && (
                                    <p className="text-slate-500 text-sm text-center py-2">
                                        Solve problems to see your skill breakdown
                                    </p>
                                )}
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>

                {/* Main Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {stats.map((stat, i) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                                <GlassCard className="p-6 text-center">
                                    <stat.icon className={`w-6 h-6 mx-auto mb-3 ${stat.color}`} />
                                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Recent Submissions */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        <GlassCard className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <History className="w-6 h-6 mr-3 text-violet-500" />
                                    Recent Submissions
                                </h2>
                                <Link to="/problems">
                                    <Button variant="ghost" size="sm">
                                        Solve More <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>
                            </div>

                            {loadingSubs ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="w-8 h-8 border-3 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                                </div>
                            ) : submissions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                                        <Code className="w-8 h-8 text-slate-600" />
                                    </div>
                                    <p className="text-slate-500 max-w-xs mb-4">
                                        You haven't submitted any solutions yet. Start a challenge to build your history!
                                    </p>
                                    <Link to="/problems">
                                        <Button>Explore Challenges</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {submissions.map((sub) => (
                                        <Link
                                            key={sub._id}
                                            to={`/problems/${sub.problemId._id}`}
                                            className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                {sub.result === 'pass' ? (
                                                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                                                )}
                                                <div className="min-w-0">
                                                    <div className="font-medium text-white text-sm truncate group-hover:text-cyan-300 transition-colors">
                                                        {sub.problemId.title}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                                        <span className={difficultyColors[sub.problemId.difficulty]}>
                                                            {sub.problemId.difficulty}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{sub.problemId.category}</span>
                                                        <span>•</span>
                                                        <span>{sub.testResults.passed}/{sub.testResults.total} tests</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {sub.executionTime}ms
                                                </span>
                                                <span>{timeAgo(sub.createdAt)}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
