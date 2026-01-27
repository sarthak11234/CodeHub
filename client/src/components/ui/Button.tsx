import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<'button'> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    className?: string;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    className = '',
    ...motionProps
}: ButtonProps) {
    const baseStyles = 'font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]',
        secondary: 'bg-white/10 border border-white/20 text-white hover:bg-white/20',
        ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={loading}
            {...motionProps}
        >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </motion.button>
    );
}
