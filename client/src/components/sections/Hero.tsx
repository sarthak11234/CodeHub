import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

export function Hero() {
    return (
        <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
            {/* Background Mesh Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />

            <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-slate-300">The arena for web developers</span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Master Web Dev <br />
                        <span className="gradient-text">
                            In The Arena
                        </span>
                    </h1>

                    <p className="text-slate-400 text-lg mb-8 max-w-lg">
                        Compete in real-world React & Node.js challenges.
                        Build your rank. Prove your code. Land your dream job.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link to="/problems">
                            <Button size="lg">
                                Start Coding
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link to="/leaderboard">
                            <Button variant="secondary" size="lg">
                                View Leaderboard
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 mt-12">
                        {[
                            { value: '10K+', label: 'Developers' },
                            { value: '500+', label: 'Challenges' },
                            { value: '50+', label: 'Companies Hiring' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-slate-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Floating Code Card */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative hidden lg:block"
                >
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                        {/* Window Controls */}
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>

                        {/* Code Snippet */}
                        <pre className="font-mono text-sm">
                            <code>
                                <span className="text-violet-400">function</span>{' '}
                                <span className="text-yellow-300">Winner</span>
                                <span className="text-white">() {'{'}</span>
                                <br />
                                <span className="text-white">  </span>
                                <span className="text-violet-400">return</span>
                                <span className="text-white"> (</span>
                                <br />
                                <span className="text-white">    </span>
                                <span className="text-cyan-300">&lt;</span>
                                <span className="text-blue-400">Rank</span>
                                <span className="text-cyan-300"> badge=</span>
                                <span className="text-green-400">"#1"</span>
                                <span className="text-cyan-300"> /&gt;</span>
                                <br />
                                <span className="text-white">  );</span>
                                <br />
                                <span className="text-white">{'}'}</span>
                            </code>
                        </pre>
                    </div>

                    {/* Decorative Glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur-2xl -z-10" />
                </motion.div>
            </div>
        </section>
    );
}
