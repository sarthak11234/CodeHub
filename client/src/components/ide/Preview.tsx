import { useState } from 'react';
import { SandpackProvider, SandpackPreview as SandpackPreviewPane } from '@codesandbox/sandpack-react';
import { Play, Terminal, Eye, RefreshCw } from 'lucide-react';

interface PreviewProps {
    code: string;
    category: 'react' | 'css' | 'node' | 'javascript';
}

// Strip import statements for client-side execution
function stripImports(code: string): string {
    return code
        .split('\n')
        .filter(line => !line.trim().startsWith('import ') && !line.trim().startsWith('export '))
        .join('\n');
}

// Preview component for React code using Sandpack
function ReactPreview({ code }: { code: string }) {
    const [key, setKey] = useState(0);

    // Transform code for Sandpack:
    // 1. Strip all import statements (we'll add our own)
    // 2. Strip export keywords
    const transformedCode = code
        .split('\n')
        .filter(line => !line.trim().startsWith('import '))
        .join('\n')
        .replace(/export\s+function\s+(\w+)/g, 'function $1')
        .replace(/export\s+const\s+(\w+)/g, 'const $1')
        .replace(/export\s+default\s+/g, '');

    // Find the component name
    const componentMatch = code.match(/(?:function|const)\s+(\w+)\s*(?:\(|=)/);
    const componentName = componentMatch ? componentMatch[1] : 'App';

    const files: Record<string, string> = {
        '/App.js': `import React from 'react';
import { useState, useEffect, useRef } from 'react';

${transformedCode}

export default ${componentName};`,
        '/styles.css': `* { box-sizing: border-box; margin: 0; padding: 0; }
body { 
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  min-height: 100vh;
  padding: 20px;
}
button {
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  color: white;
  font-weight: 600;
}
button:hover { opacity: 0.9; }
input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #475569;
  background: #1e293b;
  color: white;
}
h2 { font-size: 24px; margin-bottom: 16px; }
ul { list-style: none; }
li { padding: 8px; border-bottom: 1px solid #334155; display: flex; align-items: center; gap: 8px; }
.counter { text-align: center; }
.todo-app { max-width: 400px; margin: 0 auto; }
form { display: flex; gap: 8px; margin-bottom: 16px; }
form input { flex: 1; }`,
    };

    return (
        <div className="h-full min-h-[400px] bg-slate-900/50 rounded-lg border border-white/10 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-white">React Preview</span>
                </div>
                <button
                    onClick={() => setKey(k => k + 1)}
                    className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-white hover:bg-white/5 rounded text-sm transition-colors"
                >
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                </button>
            </div>
            <div key={key} className="flex-1" style={{ minHeight: 350 }}>
                <SandpackProvider
                    template="react"
                    files={files}
                    theme="dark"
                >
                    <SandpackPreviewPane
                        style={{ height: '100%', minHeight: 350 }}
                        showOpenInCodeSandbox={false}
                        showRefreshButton={false}
                    />
                </SandpackProvider>
            </div>
        </div>
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
        <div className="h-full min-h-[400px] bg-slate-900/50 rounded-lg border border-white/10 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">CSS Preview</span>
            </div>
            <iframe
                srcDoc={html}
                className="w-full h-[calc(100%-40px)] min-h-[350px] bg-slate-800"
                title="CSS Preview"
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
            log: (...args: unknown[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
            error: (...args: unknown[]) => logs.push(`❌ ${args.map(String).join(' ')}`),
            warn: (...args: unknown[]) => logs.push(`⚠️ ${args.map(String).join(' ')}`),
        };

        try {
            // Strip import/export statements for client-side execution
            const cleanCode = stripImports(code);
            const fn = new Function('console', cleanCode);
            fn(customConsole);
            setOutput(logs.length > 0 ? logs : ['✓ Code executed successfully (no console output)']);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    return (
        <div className="h-full min-h-[400px] bg-slate-900/50 rounded-lg border border-white/10 overflow-hidden flex flex-col">
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

// Preview for Node.js (shows info since we can't run Node in browser)
function NodePreview({ code }: { code: string }) {
    return (
        <div className="h-full min-h-[400px] bg-slate-900/50 rounded-lg border border-white/10 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-white">Node.js Preview</span>
            </div>
            <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                <div className="text-4xl mb-4">🟢</div>
                <p className="text-white font-medium mb-2">Node.js Server Code</p>
                <p className="text-slate-400 text-sm max-w-md">
                    Server-side code will be tested when you submit.
                    The grading system will evaluate your API endpoints against test cases.
                </p>
                <div className="mt-4 px-4 py-2 bg-slate-800/50 rounded-lg text-xs text-slate-500 font-mono">
                    {code.split('\n').length} lines of code
                </div>
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

    if (category === 'node') {
        return <NodePreview code={code} />;
    }

    // JavaScript uses console preview
    return <JSPreview code={code} />;
}
