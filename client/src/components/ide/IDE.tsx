import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, RotateCcw, Send, GripVertical } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { Button } from '../ui';

interface IDEProps {
    starterCode: string;
    category: 'react' | 'css' | 'node' | 'javascript';
    problemTitle: string;
    onSubmit?: (code: string) => void;
}

export function IDE({ starterCode, category, problemTitle, onSubmit }: IDEProps) {
    const [code, setCode] = useState(starterCode);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editorWidth, setEditorWidth] = useState(50); // Percentage

    // Determine language for Monaco based on category
    const getLanguage = () => {
        switch (category) {
            case 'react':
                return 'javascript';
            case 'css':
                return 'css';
            case 'node':
            case 'javascript':
            default:
                return 'javascript';
        }
    };

    const handleReset = () => {
        setCode(starterCode);
    };

    const handleSubmit = async () => {
        if (onSubmit) {
            setIsSubmitting(true);
            try {
                await onSubmit(code);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Handle resize via drag
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = editorWidth;

        const handleMouseMove = (e: MouseEvent) => {
            const container = document.getElementById('ide-container');
            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const deltaX = e.clientX - startX;
            const deltaPercent = (deltaX / containerRect.width) * 100;
            const newWidth = Math.min(80, Math.max(20, startWidth + deltaPercent));
            setEditorWidth(newWidth);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[600px] bg-slate-900/50 rounded-xl border border-white/10 overflow-hidden flex flex-col"
        >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-800/50">
                <div className="flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-cyan-500" />
                    <span className="font-medium text-white">{problemTitle}</span>
                    <span className="px-2 py-0.5 text-xs font-medium uppercase rounded bg-white/10 text-slate-400">
                        {category}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors"
                        title="Reset to starter code"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                    <Button
                        onClick={handleSubmit}
                        loading={isSubmitting}
                        size="sm"
                        className="gap-1"
                    >
                        <Send className="w-4 h-4" />
                        Submit
                    </Button>
                </div>
            </div>

            {/* Editor + Preview Split Pane */}
            <div id="ide-container" className="flex-1 flex overflow-hidden">
                {/* Editor Panel */}
                <div style={{ width: `${editorWidth}%` }} className="h-full p-2">
                    <CodeEditor
                        value={code}
                        onChange={setCode}
                        language={getLanguage()}
                    />
                </div>

                {/* Resize Handle */}
                <div
                    onMouseDown={handleMouseDown}
                    className="w-2 bg-slate-700/50 hover:bg-cyan-500/50 transition-colors cursor-col-resize flex items-center justify-center group"
                >
                    <GripVertical className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                </div>

                {/* Preview Panel */}
                <div style={{ width: `${100 - editorWidth}%` }} className="h-full p-2">
                    <Preview code={code} category={category} />
                </div>
            </div>
        </motion.div>
    );
}
