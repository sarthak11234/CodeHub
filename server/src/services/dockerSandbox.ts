import { spawn } from 'child_process';
import { config } from '../config/index.js';

interface SandboxResult {
    success: boolean;
    output?: string;
    error?: string;
    executionTime: number;
}

interface ExecuteOptions {
    code: string;
    testInput?: string;
    functionName?: string;
    timeout?: number;
    memoryLimit?: string;
}

// Check if Docker is available
let dockerAvailable: boolean | null = null;

async function checkDocker(): Promise<boolean> {
    if (dockerAvailable !== null) return dockerAvailable;

    return new Promise((resolve) => {
        const proc = spawn('docker', ['--version']);
        proc.on('error', () => {
            dockerAvailable = false;
            resolve(false);
        });
        proc.on('close', (code) => {
            dockerAvailable = code === 0;
            resolve(dockerAvailable);
        });
    });
}

/**
 * Execute code in a Docker sandbox
 */
export async function executeInSandbox(options: ExecuteOptions): Promise<SandboxResult> {
    const {
        code,
        testInput,
        functionName,
        timeout = 5000,
        memoryLimit = '128m',
    } = options;

    // Check if Docker sandbox is enabled and available
    const useDocker = config.sandbox?.enabled ?? false;

    if (!useDocker || !(await checkDocker())) {
        // Fall back to local vm execution
        return executeLocally(options);
    }

    return new Promise((resolve) => {
        const startTime = Date.now();

        // Run Docker container with resource limits
        const dockerArgs = [
            'run',
            '--rm',                          // Remove container after execution
            '-i',                            // Interactive (for stdin)
            '--network', 'none',             // No network access
            '--memory', memoryLimit,         // Memory limit
            '--cpus', '0.5',                 // CPU limit
            '--pids-limit', '20',            // Process limit
            '--read-only',                   // Read-only filesystem
            'codehub-sandbox',               // Image name
        ];

        const proc = spawn('docker', dockerArgs);

        let stdout = '';
        let stderr = '';

        proc.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        proc.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        // Send code to container via stdin
        const input = JSON.stringify({ code, testInput, functionName });
        proc.stdin.write(input);
        proc.stdin.end();

        // Handle timeout
        const timeoutId = setTimeout(() => {
            proc.kill('SIGKILL');
            resolve({
                success: false,
                error: 'Execution timeout',
                executionTime: timeout,
            });
        }, timeout + 1000);

        proc.on('close', (exitCode) => {
            clearTimeout(timeoutId);
            const executionTime = Date.now() - startTime;

            if (exitCode !== 0) {
                resolve({
                    success: false,
                    error: stderr || 'Container exited with error',
                    executionTime,
                });
                return;
            }

            try {
                const result = JSON.parse(stdout);
                resolve({
                    success: result.success,
                    output: result.output,
                    error: result.error || result.errors,
                    executionTime: result.executionTime || executionTime,
                });
            } catch {
                resolve({
                    success: false,
                    error: 'Failed to parse sandbox output',
                    executionTime,
                });
            }
        });

        proc.on('error', (err) => {
            clearTimeout(timeoutId);
            resolve({
                success: false,
                error: `Docker error: ${err.message}`,
                executionTime: Date.now() - startTime,
            });
        });
    });
}

/**
 * Fallback: Execute code locally using Node's vm module
 */
function executeLocally(options: ExecuteOptions): SandboxResult {
    const { code, testInput, functionName, timeout = 5000 } = options;
    const startTime = Date.now();

    try {
        const vm = require('vm');
        const logs: string[] = [];

        const context = vm.createContext({
            console: {
                log: (...args: unknown[]) => logs.push(
                    args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
                ),
            },
            JSON, Math, Date, Array, Object, String, Number, Boolean, RegExp,
            Map, Set, Promise, Error,
            parseInt, parseFloat, isNaN, isFinite,
        });

        let script = code;
        if (functionName && testInput !== undefined) {
            script += `\n;(function() {
                if (typeof ${functionName} === 'function') {
                    const result = ${functionName}(${testInput});
                    if (result !== undefined) {
                        console.log(typeof result === 'object' ? JSON.stringify(result) : result);
                    }
                }
            })();`;
        }

        vm.runInContext(script, context, { timeout });

        return {
            success: true,
            output: logs.join('\n'),
            executionTime: Date.now() - startTime,
        };
    } catch (err: unknown) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error',
            executionTime: Date.now() - startTime,
        };
    }
}

/**
 * Build the sandbox Docker image
 */
export async function buildSandboxImage(): Promise<boolean> {
    return new Promise((resolve) => {
        const proc = spawn('docker', ['build', '-t', 'codehub-sandbox', './sandbox'], {
            cwd: process.cwd(),
        });

        proc.on('close', (code) => {
            resolve(code === 0);
        });

        proc.on('error', () => {
            resolve(false);
        });
    });
}
