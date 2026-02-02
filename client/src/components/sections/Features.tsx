import { motion } from 'framer-motion';
import { Monitor, Trophy, Zap, Code, Users, Award } from 'lucide-react';
import { GlassCard } from '../ui';

// Animated typing code for the IDE feature card
const codeLines = [
    'function Counter() {',
    '  const [count, setCount] = useState(0);',
    '  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;',
    '}',
];

// Mock Browser Window Component
function MockBrowser() {
    return (
        <div className="relative w-full h-full min-h-[200px] bg-slate-900/50 rounded-lg overflow-hidden border border-white/10">
            {/* Browser Top Bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 border-b border-white/10">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                    <div className="bg-slate-700/50 rounded px-3 py-1 text-xs text-slate-400 text-center">
                        codehub.dev
                    </div>
                </div>
            </div>
            {/* Code Content with Typing Animation */}
            <div className="p-4 font-mono text-xs">
                {codeLines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 + 0.5 }}
                        viewport={{ once: true }}
                        className="text-slate-300"
                    >
                        <span className="text-violet-400">{line.includes('function') ? 'function ' : ''}</span>
                        <span className="text-cyan-400">{line.includes('useState') ? 'useState' : ''}</span>
                        <span>{line.replace('function ', '').replace('useState', '')}</span>
                    </motion.div>
                ))}
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.5, repeat: Infinity, repeatType: 'reverse', duration: 0.5 }}
                    viewport={{ once: true }}
                    className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                />
            </div>
        </div>
    );
}

// Glowing Rank Badges for Leaderboard Feature Card
function LeaderboardPreview() {
    const ranks = [
        { position: 1, name: 'Alex', score: 2450, color: 'from-yellow-400 to-amber-500' },
        { position: 2, name: 'Sam', score: 2180, color: 'from-slate-300 to-slate-400' },
        { position: 3, name: 'Jordan', score: 1920, color: 'from-amber-600 to-orange-500' },
    ];

    return (
        <div className="space-y-2 py-2">
            {ranks.map((rank, i) => (
                <motion.div
                    key={rank.position}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r ${rank.color} bg-opacity-10 border border-white/10`}
                    style={{
                        boxShadow: rank.position === 1 ? '0 0 20px rgba(251, 191, 36, 0.3)' : undefined,
                    }}
                >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${rank.color} flex items-center justify-center text-xs font-bold text-slate-900`}>
                        {rank.position}
                    </div>
                    <span className="text-sm font-medium text-white flex-1">{rank.name}</span>
                    <span className="text-xs text-slate-300">{rank.score}</span>
                </motion.div>
            ))}
        </div>
    );
}

// Radial Speed Indicator
function SpeedIndicator() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="relative w-24 h-24">
                {/* Background Circle */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#speedGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="251"
                        initial={{ strokeDashoffset: 251 }}
                        whileInView={{ strokeDashoffset: 50 }}
                        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    />
                    <defs>
                        <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold text-white"
                    >
                        12ms
                    </motion.span>
                    <span className="text-xs text-slate-400">avg</span>
                </div>
            </div>
        </div>
    );
}

const features = [
    {
        icon: Monitor,
        title: 'Real-time IDE',
        description: 'Write, test, and submit code directly in your browser with our Monaco-powered editor.',
        size: 'large',
        customContent: <MockBrowser />,
    },
    {
        icon: Trophy,
        title: 'Global Leaderboard',
        description: 'Compete with developers worldwide and climb the ranks.',
        size: 'tall',
        customContent: <LeaderboardPreview />,
    },
    {
        icon: Zap,
        title: 'Instant Feedback',
        description: 'Get results in milliseconds with our optimized grading system.',
        size: 'small',
        customContent: <SpeedIndicator />,
    },
    {
        icon: Code,
        title: 'Real-World Challenges',
        description: 'Practice React, Node.js, and CSS challenges that mirror industry tasks.',
        size: 'wide',
    },
    {
        icon: Users,
        title: 'Community',
        description: 'Learn from solutions and discuss approaches with peers.',
        size: 'small',
    },
    {
        icon: Award,
        title: 'Skill Badges',
        description: 'Earn badges like "CSS Wizard" and "API Architect".',
        size: 'small',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Everything You Need to <span className="gradient-text">Level Up</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Built for developers who want to master web development through competition and practical challenges.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const sizeClasses = {
                            large: 'md:col-span-2 md:row-span-2',
                            tall: 'md:row-span-2',
                            wide: 'md:col-span-2',
                            small: '',
                        }[feature.size];

                        // For cards with custom content, use a different layout
                        const hasCustomContent = !!feature.customContent;

                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <GlassCard
                                    className={`p-6 h-full flex flex-col shimmer-effect ${sizeClasses}`}
                                    glowColor={index % 2 === 0 ? 'cyan' : 'violet'}
                                >
                                    {hasCustomContent && feature.size === 'large' ? (
                                        // Large card with mock browser
                                        <>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                                                    <Icon className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                                                    <p className="text-xs text-slate-400">{feature.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex-grow">{feature.customContent}</div>
                                        </>
                                    ) : hasCustomContent ? (
                                        // Cards with custom content (tall/small)
                                        <>
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-3">
                                                <Icon className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                                            <div className="flex-grow">{feature.customContent}</div>
                                        </>
                                    ) : (
                                        // Standard cards without custom content
                                        <>
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-4">
                                                <Icon className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                            <p className="text-slate-400 text-sm flex-grow">{feature.description}</p>
                                        </>
                                    )}
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
