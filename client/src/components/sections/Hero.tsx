import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

export function Hero() {
    return (
        <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
            {/* Decorative Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] -z-10" />

            <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-slate-300 font-medium">The ultimate arena for web developers</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Master Web Dev <br />
                        <span className="gradient-text">
                            In The Arena
                        </span>
                    </h1>

                    <p className="text-slate-400 text-lg lg:text-xl mb-8 max-w-lg leading-relaxed">
                        Compete in real-world React & Node.js challenges.
                        Level up your skills, build your rank, and prove your code.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link to="/problems">
                            <Button size="lg" className="shadow-lg shadow-cyan-500/20">
                                Start Coding
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/leaderboard">
                            <Button variant="secondary" size="lg">
                                View Arena Rank
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex gap-8 lg:gap-12 mt-12 py-6 border-t border-white/5">
                        {[
                            { value: '10K+', label: 'Warriors' },
                            { value: '500+', label: 'Challenges' },
                            { value: '50+', label: 'Top Partners' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Floating Code Card (Visual Centerpiece) */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [-6, -4, -6] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative hidden lg:block"
                >
                    <div className="bg-slate-900/80 border border-slate-700 backdrop-blur-xl rounded-2xl p-8 shadow-2xl transition-all duration-700 hover:rotate-0 hover:scale-105">
                        {/* Fake Window Controls */}
                        <div className="flex gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                        </div>

                        {/* Code Content */}
                        <pre className="font-mono text-sm leading-relaxed">
                            <code>
                                <span className="text-violet-400 font-semibold">async function</span>{' '}
                                <span className="text-yellow-300 italic">deploySolution</span>
                                <span className="text-white">() {'{'}</span>
                                <br />
                                <span className="text-white">  </span>
                                <span className="text-violet-400 italic">const</span>
                                <span className="text-white"> winner = </span>
                                <span className="text-cyan-400">await</span>
                                <span className="text-white"> validateArena();</span>
                                <br />
                                <span className="text-white">  </span>
                                <span className="text-violet-400">return</span>
                                <span className="text-white"> (</span>
                                <br />
                                <span className="text-white">    </span>
                                <span className="text-cyan-300">&lt;</span>
                                <span className="text-blue-400 font-bold">ArenaVictory</span>
                                <span className="text-cyan-300"> </span>
                                <br />
                                <span className="text-white">      </span>
                                <span className="text-cyan-300">rank=</span>
                                <span className="text-green-400">"S-TIER"</span>
                                <span className="text-cyan-300"> </span>
                                <br />
                                <span className="text-white">      </span>
                                <span className="text-cyan-300">reward=</span>
                                <span className="text-white">{'{'}</span>
                                <span className="text-yellow-300">Trophy</span>
                                <span className="text-white">{'}'}</span>
                                <span className="text-cyan-300"> </span>
                                <br />
                                <span className="text-white">    /&gt;</span>
                                <br />
                                <span className="text-white">  );</span>
                                <br />
                                <span className="text-white">{'}'}</span>
                            </code>
                        </pre>
                    </div>

                    {/* Artistic Glow */}
                    <div className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/20 via-transparent to-violet-500/20 rounded-full blur-3xl -z-10 opacity-50" />
                </motion.div>
            </div>
        </section>
    );
}
