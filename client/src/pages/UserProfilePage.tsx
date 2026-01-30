import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Trophy, Zap, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
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
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
};

export function UserProfilePage() {
    const { username } = useParams<{ username: string }>();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (username) {
            fetchProfile();
        }
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
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
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
        <div className="container mx-auto px-6 py-12">
            {/* Back Button */}
            <Link to="/leaderboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Leaderboard
            </Link>

            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <GlassCard className="p-8 mb-8">
                    <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-cyan-500/20">
                            {profile.username.charAt(0).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {profile.username}
                            </h1>
                            <div className="flex items-center gap-6 text-slate-400">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Joined {joinDate}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-yellow-400" />
                                    Rank #{profile.position}
                                </span>
                            </div>
                        </div>

                        {/* Score Badge */}
                        <div className="text-right">
                            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                {profile.score}
                            </div>
                            <div className="text-sm text-slate-400 flex items-center justify-end gap-1">
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
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
                <GlassCard className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                        {profile.problemsSolved}
                    </div>
                    <div className="text-slate-400">Problems Solved</div>
                </GlassCard>
                <GlassCard className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                        #{profile.position}
                    </div>
                    <div className="text-slate-400">Global Rank</div>
                </GlassCard>
                <GlassCard className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                        {profile.badges.length}
                    </div>
                    <div className="text-slate-400">Badges Earned</div>
                </GlassCard>
            </motion.div>

            {/* Solved Problems */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Solved Problems
                </h2>

                {profile.solvedProblems.length === 0 ? (
                    <GlassCard className="p-8 text-center text-slate-400">
                        No problems solved yet.
                    </GlassCard>
                ) : (
                    <GlassCard className="overflow-hidden">
                        {profile.solvedProblems.map((problem, index) => (
                            <Link
                                key={problem._id}
                                to={`/problems/${problem._id}`}
                                className="flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-500 w-8">{index + 1}.</span>
                                    <span className="font-medium text-white">{problem.title}</span>
                                    <span className={`text-sm ${difficultyColors[problem.difficulty]}`}>
                                        {problem.difficulty}
                                    </span>
                                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-slate-400">
                                        {problem.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-cyan-400">
                                    <Zap className="w-4 h-4" />
                                    {problem.points}
                                </div>
                            </Link>
                        ))}
                    </GlassCard>
                )}
            </motion.div>
        </div>
    );
}
