import { motion } from 'framer-motion';
import { Target, Code2, Trophy, ArrowRight } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Target,
        title: 'Pick a Challenge',
        description:
            'Browse our curated library of React, CSS, JavaScript, and Node.js challenges. Filter by difficulty and category.',
        color: 'from-cyan-500 to-blue-500',
        glow: 'rgba(6,182,212,0.3)',
        bgGlow: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
    },
    {
        number: '02',
        icon: Code2,
        title: 'Write Your Code',
        description:
            'Use our Monaco-powered browser IDE with live preview. No setup needed — just open and start coding.',
        color: 'from-violet-500 to-purple-500',
        glow: 'rgba(139,92,246,0.3)',
        bgGlow: 'bg-violet-500/10',
        border: 'border-violet-500/30',
    },
    {
        number: '03',
        icon: Trophy,
        title: 'Submit & Rank Up',
        description:
            'Submit your solution and watch it get graded instantly. Earn points, unlock skill badges, and climb the leaderboard.',
        color: 'from-amber-400 to-orange-500',
        glow: 'rgba(251,191,36,0.3)',
        bgGlow: 'bg-amber-500/10',
        border: 'border-amber-500/30',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const stepVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function HowItWorks() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background accent blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] -translate-y-1/2" />
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                        How It Works
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        Three Steps to{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                            Master Web Dev
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        Go from beginner to top-ranked developer with a process designed for rapid skill growth.
                    </p>
                </motion.div>

                {/* Steps */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-6 lg:gap-10 relative"
                >
                    {/* Connecting line (desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-cyan-500/40 via-violet-500/40 to-amber-500/40 z-0" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div key={step.number} variants={stepVariants} className="relative z-10">
                                <div
                                    className={`relative group rounded-2xl p-8 border ${step.border} ${step.bgGlow} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
                                    style={{
                                        boxShadow: `0 0 40px ${step.glow.replace('0.3', '0')}`,
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${step.glow}`;
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${step.glow.replace('0.3', '0')}`;
                                    }}
                                >
                                    {/* Step number watermark */}
                                    <div className={`absolute top-4 right-5 text-5xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-10 select-none`}>
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Step label */}
                                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                                        Step {index + 1}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>

                                    {/* Description */}
                                    <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>

                                    {/* Arrow (not on last step) */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden md:flex absolute -right-5 top-12 z-20 w-10 h-10 rounded-full bg-slate-900 border border-white/10 items-center justify-center">
                                            <ArrowRight className="w-4 h-4 text-slate-400" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
