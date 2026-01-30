import {
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
    SandpackConsole,
} from '@codesandbox/sandpack-react';
import { useState } from 'react';
import { Play, Terminal, Eye } from 'lucide-react';

interface PreviewProps {
    code: string;
    category: 'react' | 'css' | 'node' | 'javascript';
}

// Preview component for React code
function ReactPreview({ code }: { code: string }) {
    const [activeTab, setActiveTab] = useState<'preview' | 'console'>('preview');

    const files = {
        '/App.js': {
            code: code,
            active: true,
        },
        '/index.js': {
            code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
        },
        '/styles.css': {
            code: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { 
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  min-height: 100vh;
  padding: 20px;
}`,
        },
    };

    return (
        <SandpackProvider
            template="react"
            files={files}
            theme="dark"
            options={{
                externalResources: ['https://cdn.tailwindcss.com'],
            }}
        >
            <div className="h-full flex flex-col bg-slate-900/50 rounded-lg border border-white/10 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'preview'
                            ? 'text-cyan-400 border-b-2 border-cyan-400 bg-white/5'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        onClick={() => setActiveTab('console')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'console'
                            ? 'text-cyan-400 border-b-2 border-cyan-400 bg-white/5'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <Terminal className="w-4 h-4" />
                        Console
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    <SandpackLayout style={{ height: '100%', border: 'none', background: 'transparent' }}>
                        {activeTab === 'preview' ? (
                            <SandpackPreview
                                style={{ height: '100%' }}
                                showOpenInCodeSandbox={false}
                                showRefreshButton={true}
                            />
                        ) : (
                            <SandpackConsole style={{ height: '100%' }} />
                        )}
                    </SandpackLayout>
                </div>
            </div>
        </SandpackProvider>
    );
}

// Preview for CSS challenges
function CSSPreview({ code }: { code: string }) {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <style>${code}</style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
    </div>
</body>
</html>`;

    return (
        <div className="h-full bg-slate-900/50 rounded-lg border border-white/10 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">CSS Preview</span>
            </div>
            <iframe
                srcDoc={html}
                className="w-full h-[calc(100%-40px)] bg-slate-800"
                title="CSS Preview"
                sandbox="allow-scripts"
            />
        </div>
    );
}

// Preview for JavaScript challenges (console output)
function JSPreview({ code }: { code: string }) {
    const [output, setOutput] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const runCode = () => {
        setOutput([]);
        setError(null);
        const logs: string[] = [];

        const customConsole = {
            log: (...args: any[]) => logs.push(args.map(String).join(' ')),
            error: (...args: any[]) => logs.push(`❌ ${args.map(String).join(' ')}`),
            warn: (...args: any[]) => logs.push(`⚠️ ${args.map(String).join(' ')}`),
        };

        try {
            const fn = new Function('console', code);
            fn(customConsole);
            setOutput(logs);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="h-full bg-slate-900/50 rounded-lg border border-white/10 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-white">Console Output</span>
                </div>
                <button
                    onClick={runCode}
                    className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded text-sm font-medium transition-colors"
                >
                    <Play className="w-3 h-3" />
                    Run
                </button>
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                {output.map((line, i) => (
                    <div key={i} className="text-slate-300">{line}</div>
                ))}
                {error && (
                    <div className="text-red-400">Error: {error}</div>
                )}
                {output.length === 0 && !error && (
                    <div className="text-slate-500">Click "Run" to execute your code...</div>
                )}
            </div>
        </div>
    );
}

export function Preview({ code, category }: PreviewProps) {
    if (category === 'react') {
        return <ReactPreview code={code} />;
    }

    if (category === 'css') {
        return <CSSPreview code={code} />;
    }

    // JavaScript and Node.js use console preview
    return <JSPreview code={code} />;
}
