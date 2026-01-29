import { User, Trophy, Shield, Settings, History, Code, Zap, Award } from 'lucide-react';
import { GlassCard, Button } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export function ProfilePage() {
    const { user, isLoading } = useAuth();

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

    const stats = [
        { label: 'Rank', value: `#${user.rank || '---'}`, icon: Trophy, color: 'text-yellow-400' },
        { label: 'Points', value: user.score || 0, icon: Zap, color: 'text-cyan-400' },
        { label: 'Solutions', value: user.solvedProblems?.length || 0, icon: Code, color: 'text-violet-400' },
        { label: 'Badges', value: user.badges?.length || 0, icon: Award, color: 'text-green-400' },
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <GlassCard className="p-8 text-center" glowColor="cyan">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-full flex items-center justify-center p-1 mb-6">
                            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                                <User className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">{user.username}</h1>
                        <p className="text-slate-400 mb-6">{user.email}</p>
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

                    <GlassCard className="p-6">
                        <h3 className="text-white font-bold mb-4 flex items-center">
                            <Shield className="w-5 h-5 mr-3 text-cyan-500" />
                            Account Level
                        </h3>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                            <div className="w-1/3 h-full bg-gradient-to-r from-cyan-500 to-violet-500" />
                        </div>
                        <div className="flex justify-between text-xs font-semibold">
                            <span className="text-cyan-400">Lvl 1</span>
                            <span className="text-slate-500 text-xs">250 XP to Lvl 2</span>
                        </div>
                    </GlassCard>
                </div>

                {/* Main Profile Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat) => (
                            <GlassCard key={stat.label} className="p-6 text-center">
                                <stat.icon className={`w-6 h-6 mx-auto mb-3 ${stat.color}`} />
                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
                            </GlassCard>
                        ))}
                    </div>

                    {/* Activity Section Placeholder */}
                    <GlassCard className="p-8 min-h-[400px]">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white flex items-center">
                                <History className="w-6 h-6 mr-3 text-violet-500" />
                                Recent Solutions
                            </h2>
                            <Button variant="ghost" size="sm">View All</Button>
                        </div>

                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                                <Code className="w-8 h-8 text-slate-600" />
                            </div>
                            <p className="text-slate-500 max-w-xs">
                                You haven't solved any problems yet. Start a challenge to build your history!
                            </p>
                            <Button className="mt-6">Explore Challenges</Button>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
