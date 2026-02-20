import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    className?: string;
    glowColor?: 'cyan' | 'violet';
    hoverGlow?: boolean;
}

export function GlassCard({
    children,
    className = '',
    glowColor = 'violet',
    hoverGlow = true,
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
        transition-all duration-300
        ${hoverGlow ? 'glow-hover shimmer-effect' : ''}
        hover:border-white/20
        ${className}
      `}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            {...motionProps}
        >
            {/* Glow Effect Blob */}
            <div
                className={`absolute -top-10 -left-10 w-40 h-40 ${glowClass} rounded-full blur-3xl pointer-events-none transition-opacity duration-500`}
            />
            {/* Bottom-right secondary glow */}
            <div
                className={`absolute -bottom-16 -right-16 w-32 h-32 ${glowColor === 'cyan' ? 'bg-violet-500/10' : 'bg-cyan-500/10'} rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            {children}
        </motion.div>
    );
}
