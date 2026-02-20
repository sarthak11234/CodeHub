import { Link, useLocation } from 'react-router-dom';
import { Code2, Trophy, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
            {/* Background Mesh Gradients with orbit animation */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="mesh-blob mesh-blob-cyan w-96 h-96 -top-48 -left-48 opacity-40" />
                <div className="mesh-blob mesh-blob-violet w-96 h-96 top-1/2 -right-48 opacity-40" />
                {/* Extra subtle ambient glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[200px]" />
            </div>

            {/* Ambient particles (sparse, subtle) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            '--x': `${10 + i * 15}%`,
                            '--delay': `${i * 1.5}s`,
                            '--duration': `${10 + Math.random() * 5}s`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
            >
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <motion.div
                            className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-lg flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            <Code2 className="w-6 h-6 text-white" />
                        </motion.div>
                        <span className="text-xl font-bold text-white tracking-tight">CodeHub</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(({ to, label, icon: Icon }) => {
                            const isActive = location.pathname === to;

                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {label}
                                    {/* Active underline indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/profile" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group">
                                    <motion.div
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 flex items-center justify-center border border-white/10"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    >
                                        <UserIcon className="w-4 h-4" />
                                    </motion.div>
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
            </motion.nav>

            {/* Main Content with Page Transition */}
            <main className="pt-20 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
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
