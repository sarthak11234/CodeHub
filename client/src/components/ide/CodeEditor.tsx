import Editor, { type OnMount } from '@monaco-editor/react';
import { useRef } from 'react';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language?: string;
    readOnly?: boolean;
}

export function CodeEditor({ value, onChange, language = 'javascript', readOnly = false }: CodeEditorProps) {
    const editorRef = useRef<any>(null);

    const handleEditorMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // Define custom dark theme
        monaco.editor.defineTheme('codehub-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'C586C0' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'number', foreground: 'B5CEA8' },
                { token: 'type', foreground: '4EC9B0' },
                { token: 'function', foreground: 'DCDCAA' },
                { token: 'variable', foreground: '9CDCFE' },
            ],
            colors: {
                'editor.background': '#0f172a',
                'editor.foreground': '#e2e8f0',
                'editor.lineHighlightBackground': '#1e293b',
                'editor.selectionBackground': '#334155',
                'editorCursor.foreground': '#06b6d4',
                'editorLineNumber.foreground': '#475569',
                'editorLineNumber.activeForeground': '#94a3b8',
                'editor.inactiveSelectionBackground': '#1e293b',
            },
        });

        monaco.editor.setTheme('codehub-dark');

        // Format on mount
        setTimeout(() => {
            editor.getAction('editor.action.formatDocument')?.run();
        }, 100);
    };

    return (
        <div className="h-full w-full overflow-hidden rounded-lg border border-white/10">
            <Editor
                height="100%"
                language={language}
                value={value}
                onChange={(val) => onChange(val || '')}
                onMount={handleEditorMount}
                theme="codehub-dark"
                options={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontLigatures: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    renderLineHighlight: 'line',
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                    readOnly,
                    padding: { top: 16, bottom: 16 },
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    smoothScrolling: true,
                    bracketPairColorization: { enabled: true },
                }}
            />
        </div>
    );
}
