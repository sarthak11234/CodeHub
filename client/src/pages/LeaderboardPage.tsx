import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Users, Zap, Star, TrendingUp, Target } from 'lucide-react';
import { GlassCard } from '../components/ui';
import { useAuth } from '../context/AuthContext';

interface LeaderboardEntry {
    position: number;
    username: string;
    score: number;
    problemsSolved: number;
    badges: string[];
}

interface LeaderboardStats {
    totalUsers: number;
    averageScore: number;
    topScore: number;
}

export function LeaderboardPage() {
    const { user } = useAuth();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [stats, setStats] = useState<LeaderboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch('/api/leaderboard');
            const data = await response.json();
            if (response.ok) {
                setLeaderboard(data.leaderboard);
                setStats(data.stats);
            }
        } catch (err) {
            console.error('Failed to fetch leaderboard:', err);
        } finally {
            setLoading(false);
        }
    };

    const getPositionIcon = (position: number) => {
        switch (position) {
            case 1:
                return <Trophy className="w-6 h-6 text-yellow-400" />;
            case 2:
                return <Medal className="w-6 h-6 text-slate-300" />;
            case 3:
                return <Award className="w-6 h-6 text-amber-600" />;
            default:
                return <span className="w-6 text-center font-bold text-slate-500">{position}</span>;
        }
    };

    const getPositionBg = (position: number) => {
        switch (position) {
            case 1:
                return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-yellow-500/30';
            case 2:
                return 'bg-gradient-to-r from-slate-400/20 to-slate-500/10 border-slate-400/30';
            case 3:
                return 'bg-gradient-to-r from-amber-600/20 to-orange-500/10 border-amber-600/30';
            default:
                return 'bg-white/5 border-white/10 hover:bg-white/10';
        }
    };

    const getBadgeIcon = (badge: string) => {
        // Map badge names to icons/emojis
        const badgeMap: Record<string, string> = {
            'CSS Wizard': '🎨',
            'API Architect': '🏗️',
            'React Master': '⚛️',
            'JS Ninja': '🥷',
            'Speed Demon': '⚡',
            'Problem Solver': '🧩',
        };
        return badgeMap[badge] || '🏆';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Trophy className="w-10 h-10 text-yellow-400" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                        Leaderboard
                    </h1>
                </div>
                <p className="text-slate-400 text-lg">
                    Top coders ranked by score
                </p>
            </motion.div>

            {/* Stats Dashboard */}
            {stats && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <GlassCard className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-cyan-500/20 rounded-xl">
                                <Users className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Total Competitors</p>
                                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-violet-500/20 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-violet-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Average Score</p>
                                <p className="text-2xl font-bold text-white">{stats.averageScore}</p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/20 rounded-xl">
                                <Target className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Top Score</p>
                                <p className="text-2xl font-bold text-white">{stats.topScore}</p>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            )}

            {/* Leaderboard Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <GlassCard className="overflow-hidden">
                    {/* Header Row */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 bg-white/5 text-sm font-medium text-slate-400 uppercase tracking-wider">
                        <div className="col-span-1">#</div>
                        <div className="col-span-5">User</div>
                        <div className="col-span-3 text-center">Score</div>
                        <div className="col-span-3 text-center">Solved</div>
                    </div>

                    {/* Rows */}
                    {leaderboard.length === 0 ? (
                        <div className="px-6 py-12 text-center text-slate-400">
                            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No users yet. Be the first to solve a problem!</p>
                        </div>
                    ) : (
                        leaderboard.map((entry, index) => {
                            const isCurrentUser = user?.username === entry.username;
                            const glowStyle = entry.position <= 3 ? {
                                boxShadow: entry.position === 1
                                    ? '0 0 30px rgba(251, 191, 36, 0.3)'
                                    : entry.position === 2
                                        ? '0 0 20px rgba(148, 163, 184, 0.2)'
                                        : '0 0 20px rgba(217, 119, 6, 0.2)'
                            } : {};

                            return (
                                <motion.div
                                    key={entry.username}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        to={`/user/${entry.username}`}
                                        className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 transition-all relative ${isCurrentUser
                                            ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/10 border-l-4 border-l-cyan-500'
                                            : getPositionBg(entry.position)
                                            }`}
                                        style={glowStyle}
                                    >
                                        {isCurrentUser && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                                            </div>
                                        )}
                                        <div className="col-span-1 flex items-center">
                                            {getPositionIcon(entry.position)}
                                        </div>
                                        <div className="col-span-5 flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${isCurrentUser
                                                ? 'bg-gradient-to-br from-cyan-400 to-violet-400 ring-2 ring-cyan-400/50'
                                                : 'bg-gradient-to-br from-cyan-500 to-violet-500'
                                                }`}>
                                                {entry.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={`font-medium ${isCurrentUser ? 'text-cyan-300' : 'text-white'}`}>
                                                    {entry.username}
                                                    {isCurrentUser && <span className="ml-2 text-xs text-cyan-400">(You)</span>}
                                                </span>
                                                {entry.badges && entry.badges.length > 0 && (
                                                    <div className="flex gap-1 mt-1">
                                                        {entry.badges.slice(0, 3).map((badge, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-xs"
                                                                title={badge}
                                                            >
                                                                {getBadgeIcon(badge)}
                                                            </span>
                                                        ))}
                                                        {entry.badges.length > 3 && (
                                                            <span className="text-xs text-slate-400">+{entry.badges.length - 3}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-span-3 flex items-center justify-center gap-2">
                                            <Zap className="w-4 h-4 text-cyan-400" />
                                            <span className="font-bold text-cyan-400">{entry.score}</span>
                                        </div>
                                        <div className="col-span-3 flex items-center justify-center text-slate-400">
                                            {entry.problemsSolved} problems
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })
                    )}
                </GlassCard>
            </motion.div>
        </div>
    );
}
