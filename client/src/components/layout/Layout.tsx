import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Trophy, User, LogIn } from 'lucide-react';
import { Button } from '../ui';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const location = useLocation();

    const navLinks = [
        { to: '/problems', label: 'Problems', icon: Code2 },
        { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
        { to: '/profile', label: 'Profile', icon: User },
    ];

    return (
        <div className="min-h-screen bg-slate-950 relative">
            {/* Background Mesh Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="mesh-blob mesh-blob-cyan w-96 h-96 -top-48 -left-48" />
                <div className="mesh-blob mesh-blob-violet w-96 h-96 top-1/2 -right-48" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-lg flex items-center justify-center">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">CodeHub</span>
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

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-3">
                        <Link to="/login">
                            <Button variant="ghost" size="sm">
                                <LogIn className="w-4 h-4" />
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="primary" size="sm">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20 relative z-10">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 mt-20">
                <div className="container mx-auto px-6 py-8 text-center text-slate-500 text-sm">
                    © {new Date().getFullYear()} CodeHub. Built for developers, by developers.
                </div>
            </footer>
        </div>
    );
}
