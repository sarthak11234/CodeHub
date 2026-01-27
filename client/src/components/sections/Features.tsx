import { motion } from 'framer-motion';
import { Monitor, Trophy, Zap, Code, Users, Award } from 'lucide-react';
import { GlassCard } from '../ui';

const features = [
    {
        icon: Monitor,
        title: 'Real-time IDE',
        description: 'Write, test, and submit code directly in your browser with our Monaco-powered editor.',
        size: 'large',
    },
    {
        icon: Trophy,
        title: 'Global Leaderboard',
        description: 'Compete with developers worldwide and climb the ranks.',
        size: 'tall',
    },
    {
        icon: Zap,
        title: 'Instant Feedback',
        description: 'Get results in milliseconds with our optimized grading system.',
        size: 'small',
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

                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <GlassCard
                                    className={`p-6 h-full flex flex-col shimmer-effect ${sizeClasses}`}
                                    glowColor={index % 2 === 0 ? 'cyan' : 'violet'}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-slate-400 text-sm flex-grow">{feature.description}</p>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
