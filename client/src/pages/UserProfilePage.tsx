import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Trophy, Zap, Calendar, CheckCircle, ArrowLeft, Award } from 'lucide-react';
import { GlassCard, Button } from '../components/ui';

interface SolvedProblem {
    _id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    points: number;
}

interface UserProfile {
    username: string;
    score: number;
    position: number;
    badges: string[];
    problemsSolved: number;
    solvedProblems: SolvedProblem[];
    joinedAt: string;
}

const difficultyColors = {
    easy: 'text-green-400 bg-green-500/10 border-green-500/20',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    hard: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const categoryIcons: Record<string, string> = {
    react: '⚛️',
    css: '🎨',
    node: '🟢',
    javascript: '📜',
};

const badgeMetadata: Record<string, { emoji: string; color: string }> = {
    'CSS Wizard': { emoji: '🎨', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
    'API Architect': { emoji: '🏗️', color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30' },
    'React Master': { emoji: '⚛️', color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30' },
    'JS Ninja': { emoji: '🥷', color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30' },
    'Speed Demon': { emoji: '⚡', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30' },
    'Problem Solver': { emoji: '🧩', color: 'from-green-500/20 to-emerald-500/20 border-green-500/30' },
};

const positionGlow: Record<number, string> = {
    1: '0 0 30px rgba(251,191,36,0.4)',
    2: '0 0 20px rgba(148,163,184,0.3)',
    3: '0 0 20px rgba(217,119,6,0.3)',
};

export function UserProfilePage() {
    const { username } = useParams<{ username: string }>();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (username) fetchProfile();
    }, [username]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/api/leaderboard/user/${username}`);
            const data = await response.json();
            if (response.ok) {
                setProfile(data.profile);
            } else {
                setError(data.error || 'User not found');
            }
        } catch (err) {
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-12 space-y-6">
                <div className="skeleton w-40 h-6 rounded-lg" />
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <div className="flex items-start gap-6">
                        <div className="skeleton w-24 h-24 rounded-2xl" />
                        <div className="flex-1 space-y-3">
                            <div className="skeleton w-48 h-8 rounded" />
                            <div className="skeleton w-64 h-5 rounded" />
                        </div>
                        <div className="skeleton w-24 h-14 rounded" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="skeleton h-24 rounded-2xl" />)}
                </div>
                <div className="skeleton h-64 rounded-2xl" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="container mx-auto px-6 py-12">
                <GlassCard className="p-12 text-center max-w-lg mx-auto">
                    <User className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">User Not Found</h3>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <Link to="/leaderboard">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Leaderboard
                        </Button>
                    </Link>
                </GlassCard>
            </div>
        );
    }

    const joinDate = new Date(profile.joinedAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="container mx-auto px-6 py-12 animate-page-enter">
            {/* Back Button */}
            <Link to="/leaderboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Leaderboard
            </Link>

            {/* Profile Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard
                    className="p-8 mb-8"
                    glowColor="cyan"
                    style={profile.position <= 3 ? { boxShadow: positionGlow[profile.position] ?? undefined } : undefined}
                >
                    <div className="flex flex-wrap items-start gap-6">
                        {/* Avatar */}
                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white text-4xl font-bold shadow-lg flex-shrink-0 ${
                            profile.position === 1 ? 'from-yellow-400 to-amber-500 shadow-yellow-500/30' :
                            profile.position === 2 ? 'from-slate-300 to-slate-400 shadow-slate-400/20' :
                            profile.position === 3 ? 'from-amber-600 to-orange-500 shadow-amber-600/20' :
                            'from-cyan-500 to-violet-500 shadow-cyan-500/20'
                        }`}>
                            {profile.username.charAt(0).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-3xl font-bold text-white mb-1 truncate">
                                {profile.username}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    Joined {joinDate}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Trophy className={`w-4 h-4 ${profile.position === 1 ? 'text-yellow-400' : 'text-slate-400'}`} />
                                    <span className={profile.position <= 3 ? 'font-bold text-white' : ''}>
                                        Rank #{profile.position}
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Score */}
                        <div className="text-right flex-shrink-0">
                            <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                {profile.score}
                            </div>
                            <div className="text-sm text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                points
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
            >
                <GlassCard className="p-6 text-center">
                    <CheckCircle className="w-7 h-7 mx-auto mb-2 text-green-400" />
                    <div className="text-3xl font-bold text-white mb-1">{profile.problemsSolved}</div>
                    <div className="text-slate-400 text-sm">Problems Solved</div>
                </GlassCard>
                <GlassCard className="p-6 text-center">
                    <Trophy className={`w-7 h-7 mx-auto mb-2 ${profile.position <= 3 ? 'text-yellow-400' : 'text-slate-400'}`} />
                    <div className="text-3xl font-bold text-white mb-1">#{profile.position}</div>
                    <div className="text-slate-400 text-sm">Global Rank</div>
                </GlassCard>
                <GlassCard className="p-6 text-center">
                    <Award className="w-7 h-7 mx-auto mb-2 text-violet-400" />
                    <div className="text-3xl font-bold text-white mb-1">{profile.badges.length}</div>
                    <div className="text-slate-400 text-sm">Badges Earned</div>
                </GlassCard>
            </motion.div>

            {/* Badges Section */}
            {profile.badges.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mb-8"
                >
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-violet-400" />
                        Skill Badges
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {profile.badges.map((badge) => {
                            const meta = badgeMetadata[badge] ?? { emoji: '🏆', color: 'from-slate-500/20 to-slate-600/20 border-slate-500/30' };
                            return (
                                <motion.div
                                    key={badge}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${meta.color} border backdrop-blur-sm`}
                                >
                                    <span className="text-xl">{meta.emoji}</span>
                                    <span className="text-sm font-semibold text-white">{badge}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {/* Solved Problems */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Solved Problems
                    <span className="ml-1 text-sm font-normal text-slate-500">({profile.solvedProblems.length})</span>
                </h2>

                {profile.solvedProblems.length === 0 ? (
                    <GlassCard className="p-8 text-center text-slate-400">
                        No problems solved yet.
                    </GlassCard>
                ) : (
                    <GlassCard className="overflow-hidden">
                        {profile.solvedProblems.map((problem, index) => (
                            <motion.div
                                key={problem._id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.04 }}
                            >
                                <Link
                                    to={`/problems/${problem._id}`}
                                    className="flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <span className="text-slate-600 w-7 text-sm font-mono shrink-0">{index + 1}.</span>
                                        <span className="text-lg shrink-0">{categoryIcons[problem.category] ?? '📄'}</span>
                                        <span className="font-medium text-white group-hover:text-cyan-300 transition-colors truncate">
                                            {problem.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${difficultyColors[problem.difficulty]}`}>
                                            {problem.difficulty}
                                        </span>
                                        <div className="flex items-center gap-1 text-cyan-400 text-sm font-semibold">
                                            <Zap className="w-3.5 h-3.5" />
                                            {problem.points}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </GlassCard>
                )}
            </motion.div>
        </div>
    );
}
