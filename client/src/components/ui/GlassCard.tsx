import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    className?: string;
    glowColor?: 'cyan' | 'violet';
}

export function GlassCard({
    children,
    className = '',
    glowColor = 'violet',
    ...motionProps
}: GlassCardProps) {
    const glowClass = glowColor === 'cyan'
        ? 'bg-cyan-500/20'
        : 'bg-violet-500/20';

    return (
        <motion.div
            className={`
        relative overflow-hidden
        bg-white/5 border border-white/10
        backdrop-blur-md rounded-2xl
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
        hover:border-white/20 transition-colors duration-300
        ${className}
      `}
            {...motionProps}
        >
            {/* Glow Effect Blob */}
            <div
                className={`absolute -top-10 -left-10 w-40 h-40 ${glowClass} rounded-full blur-3xl pointer-events-none`}
            />
            {children}
        </motion.div>
    );
}
