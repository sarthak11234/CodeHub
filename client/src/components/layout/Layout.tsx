import { Link, useLocation } from 'react-router-dom';
import { Code2, Trophy, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '../ui';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const { user, logout } = useAuth();

    const navLinks = [
        { to: '/problems', label: 'Problems', icon: Code2 },
        { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    ];

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-x-hidden">
            {/* Background Mesh Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="mesh-blob mesh-blob-cyan w-96 h-96 -top-48 -left-48 opacity-40" />
                <div className="mesh-blob mesh-blob-violet w-96 h-96 top-1/2 -right-48 opacity-40" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">CodeHub</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(({ to, label, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === to
                                    ? 'text-cyan-400'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/profile" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                        <UserIcon className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium hidden sm:inline">{user.username}</span>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={logout} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="primary" size="sm">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20 relative z-10">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 mt-20">
                <div className="container mx-auto px-6 py-12 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-violet-500 rounded flex items-center justify-center">
                            <Code2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white">CodeHub</span>
                    </div>
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} CodeHub Arena. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
