import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import { useEffect, useRef } from 'react';

// Animated counter component
function AnimatedStat({ value, label }: { value: string; label: string }) {
    const numericPart = value.replace(/[^0-9]/g, '');
    const suffix = value.replace(/[0-9]/g, '');
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const controls = animate(count, parseInt(numericPart) || 0, {
            duration: 2,
            ease: 'easeOut',
        });
        return controls.stop;
    }, [numericPart]);

    return (
        <div>
            <motion.span
                ref={ref}
                className="text-2xl font-bold text-white mb-1 block"
            >
                {rounded}
            </motion.span>
            <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">{label}</div>
        </div>
    );
}

// Floating code lines for visual effect
function FloatingCodeLine({ delay, text, x }: { delay: number; text: string; x: number }) {
    return (
        <motion.div
            className="absolute font-mono text-xs text-cyan-500/20 whitespace-nowrap pointer-events-none select-none"
            style={{ left: `${x}%` }}
            initial={{ opacity: 0, y: 100 }}
            animate={{
                opacity: [0, 0.4, 0.4, 0],
                y: [100, -20, -80, -150],
            }}
            transition={{
                duration: 8,
                delay,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            {text}
        </motion.div>
    );
}

export function Hero() {
    return (
        <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
            {/* Decorative Glows with orbit animation */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] -z-10 mesh-blob-cyan" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] -z-10 mesh-blob-violet" />

            {/* Floating code snippets in background */}
            <div className="absolute inset-0 overflow-hidden -z-5">
                <FloatingCodeLine delay={0} text="const score = await gradeSubmission();" x={5} />
                <FloatingCodeLine delay={2} text="<ArenaVictory rank='S-TIER' />" x={70} />
                <FloatingCodeLine delay={4} text="router.post('/submit', authenticate);" x={15} />
                <FloatingCodeLine delay={6} text="useState(() => challengeAccepted)" x={55} />
                <FloatingCodeLine delay={3} text="export function useLeaderboard()" x={80} />
                <FloatingCodeLine delay={5} text=".glass { backdrop-filter: blur(12px) }" x={30} />
            </div>

            {/* Particle system */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            '--x': `${8 + (i * 7.5)}%`,
                            '--delay': `${i * 0.7}s`,
                            '--duration': `${6 + Math.random() * 6}s`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm animate-border-glow"
                    >
                        <Sparkles className="w-4 h-4 text-cyan-400 animate-float" />
                        <span className="text-sm text-slate-300 font-medium">The ultimate arena for web developers</span>
                    </motion.div>

                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="block"
                        >
                            Master Web Dev
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="animate-gradient-text block"
                        >
                            In The Arena
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-slate-400 text-lg lg:text-xl mb-8 max-w-lg leading-relaxed"
                    >
                        Compete in real-world React & Node.js challenges.
                        Level up your skills, build your rank, and prove your code.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link to="/problems">
                            <Button size="lg" className="shadow-lg shadow-cyan-500/20 group">
                                Start Coding
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/leaderboard">
                            <Button variant="secondary" size="lg">
                                View Arena Rank
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Animated Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="flex gap-8 lg:gap-12 mt-12 py-6 border-t border-white/5"
                    >
                        <AnimatedStat value="10K+" label="Warriors" />
                        <AnimatedStat value="500+" label="Challenges" />
                        <AnimatedStat value="50+" label="Top Partners" />
                    </motion.div>
                </motion.div>

                {/* Right: Floating Code Card (Visual Centerpiece) */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [-6, -4, -6] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative hidden lg:block"
                >
                    <motion.div
                        className="bg-slate-900/80 border border-slate-700 backdrop-blur-xl rounded-2xl p-8 shadow-2xl transition-all duration-700 hover:rotate-0 hover:scale-105 animate-border-glow"
                        whileHover={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.2)' }}
                    >
                        {/* Fake Window Controls */}
                        <div className="flex gap-2 mb-6">
                            <motion.div
                                className="w-3 h-3 rounded-full bg-red-500/80"
                                animate={{ boxShadow: ['0 0 5px rgba(239,68,68,0.3)', '0 0 15px rgba(239,68,68,0.5)', '0 0 5px rgba(239,68,68,0.3)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                className="w-3 h-3 rounded-full bg-yellow-500/80"
                                animate={{ boxShadow: ['0 0 5px rgba(234,179,8,0.3)', '0 0 15px rgba(234,179,8,0.5)', '0 0 5px rgba(234,179,8,0.3)'] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                            />
                            <motion.div
                                className="w-3 h-3 rounded-full bg-green-500/80"
                                animate={{ boxShadow: ['0 0 5px rgba(34,197,94,0.3)', '0 0 15px rgba(34,197,94,0.5)', '0 0 5px rgba(34,197,94,0.3)'] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                            />
                        </div>

                        {/* Code Content with line-by-line reveal */}
                        <pre className="font-mono text-sm leading-relaxed">
                            <code>
                                {[
                                    { content: <><span className="text-violet-400 font-semibold">async function</span>{' '}<span className="text-yellow-300 italic">deploySolution</span><span className="text-white">() {'{'}</span></>, delay: 0.3 },
                                    { content: <><span className="text-white">  </span><span className="text-violet-400 italic">const</span><span className="text-white"> winner = </span><span className="text-cyan-400">await</span><span className="text-white"> validateArena();</span></>, delay: 0.5 },
                                    { content: <><span className="text-white">  </span><span className="text-violet-400">return</span><span className="text-white"> (</span></>, delay: 0.7 },
                                    { content: <><span className="text-white">    </span><span className="text-cyan-300">&lt;</span><span className="text-blue-400 font-bold">ArenaVictory</span></>, delay: 0.9 },
                                    { content: <><span className="text-white">      </span><span className="text-cyan-300">rank=</span><span className="text-green-400">"S-TIER"</span></>, delay: 1.1 },
                                    { content: <><span className="text-white">      </span><span className="text-cyan-300">reward=</span><span className="text-white">{'{'}</span><span className="text-yellow-300">Trophy</span><span className="text-white">{'}'}</span></>, delay: 1.3 },
                                    { content: <><span className="text-white">    /&gt;</span></>, delay: 1.5 },
                                    { content: <><span className="text-white">  );</span></>, delay: 1.7 },
                                    { content: <><span className="text-white">{'}'}</span></>, delay: 1.9 },
                                ].map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: line.delay, duration: 0.3 }}
                                    >
                                        {line.content}
                                    </motion.div>
                                ))}
                                <motion.span
                                    className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-cursor"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.2 }}
                                />
                            </code>
                        </pre>
                    </motion.div>

                    {/* Artistic Glow */}
                    <motion.div
                        className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/20 via-transparent to-violet-500/20 rounded-full blur-3xl -z-10"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
