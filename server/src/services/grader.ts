import vm from 'vm';

interface TestCase {
    input: string;
    expectedOutput: string;
    description: string;
}

interface TestResult {
    testCase: string;
    passed: boolean;
    message?: string;
    expected?: string;
    actual?: string;
    hint?: string;
}

interface GradeResult {
    result: 'pass' | 'fail' | 'error';
    executionTime: number;
    testResults: {
        passed: number;
        total: number;
        details: TestResult[];
    };
}

// Timeout for code execution (ms)
const EXECUTION_TIMEOUT = 5000;

/**
 * Generate helpful hints based on error type or failed test
 */
function generateHint(error: string, code: string): string {
    if (error.includes('is not defined')) {
        const match = error.match(/(\w+) is not defined/);
        if (match) {
            return `Make sure '${match[1]}' is defined before using it. Check for typos in variable/function names.`;
        }
    }
    if (error.includes('timeout')) {
        return 'Your code took too long to execute. Check for infinite loops or very large iterations.';
    }
    if (error.includes('SyntaxError')) {
        return 'Check your syntax - look for missing brackets, parentheses, or semicolons.';
    }
    if (error.includes('TypeError')) {
        return 'You might be calling a function on the wrong type of value, or accessing a property that doesn\'t exist.';
    }
    if (!code.includes('return') && code.includes('function')) {
        return 'Your function might be missing a return statement.';
    }
    return '';
}

/**
 * Create a secure sandbox context with common globals
 */
function createSandboxContext() {
    const logs: string[] = [];
    const errors: string[] = [];

    const context = vm.createContext({
        // Console
        console: {
            log: (...args: unknown[]) => logs.push(args.map(a =>
                typeof a === 'object' ? JSON.stringify(a) : String(a)
            ).join(' ')),
            error: (...args: unknown[]) => errors.push(args.map(a =>
                typeof a === 'object' ? JSON.stringify(a) : String(a)
            ).join(' ')),
            warn: (...args: unknown[]) => logs.push('[WARN] ' + args.map(a =>
                typeof a === 'object' ? JSON.stringify(a) : String(a)
            ).join(' ')),
        },
        // Built-in objects
        JSON,
        Math,
        Date,
        Array,
        Object,
        String,
        Number,
        Boolean,
        RegExp,
        Map,
        Set,
        Promise,
        Error,
        TypeError,
        RangeError,
        SyntaxError,
        // Utility functions
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
        encodeURIComponent,
        decodeURIComponent,
        // Array methods work natively
        // Simulated setTimeout for sync execution
        setTimeout: (fn: () => void, _ms: number) => { fn(); return 0; },
        clearTimeout: () => { },
        // For fetch simulations (mock)
        fetch: async () => ({ ok: true, json: async () => ({}) }),
    });

    return { context, logs, errors };
}

/**
 * Extract function names from code
 */
function extractFunctionNames(code: string): string[] {
    const functionPatterns = [
        /function\s+(\w+)\s*\(/g,                    // function foo()
        /const\s+(\w+)\s*=\s*(?:async\s*)?\(/g,     // const foo = () or const foo = async (
        /let\s+(\w+)\s*=\s*(?:async\s*)?\(/g,       // let foo = ()
        /var\s+(\w+)\s*=\s*(?:async\s*)?\(/g,       // var foo = ()
        /(\w+)\s*:\s*function/g,                     // foo: function
    ];

    const functions: string[] = [];
    for (const pattern of functionPatterns) {
        let match;
        while ((match = pattern.exec(code)) !== null) {
            if (match[1] && !functions.includes(match[1])) {
                functions.push(match[1]);
            }
        }
    }
    return functions;
}

/**
 * Compare outputs flexibly (JSON, string, numeric)
 */
function compareOutputs(actual: string, expected: string): boolean {
    // Exact match
    if (actual === expected) return true;

    // Trimmed match
    if (actual.trim() === expected.trim()) return true;

    // JSON comparison
    try {
        const actualObj = JSON.parse(actual);
        const expectedObj = JSON.parse(expected);
        return JSON.stringify(actualObj) === JSON.stringify(expectedObj);
    } catch {
        // Not valid JSON, continue
    }

    // Numeric comparison (handle floating point)
    const actualNum = parseFloat(actual);
    const expectedNum = parseFloat(expected);
    if (!isNaN(actualNum) && !isNaN(expectedNum)) {
        return Math.abs(actualNum - expectedNum) < 0.0001;
    }

    // Contains check (for partial matches)
    if (actual.includes(expected) || expected.includes(actual)) {
        return true;
    }

    return false;
}

/**
 * Grade JavaScript code by running it and checking output
 */
function gradeJavaScript(code: string, testCases: TestCase[]): GradeResult {
    const startTime = Date.now();
    const details: TestResult[] = [];
    let passed = 0;

    try {
        // Clean code - strip imports/exports for evaluation
        const cleanCode = code
            .split('\n')
            .filter(line => !line.trim().startsWith('import ') && !line.trim().startsWith('export '))
            .join('\n');

        // Detect function names in the code
        const functionNames = extractFunctionNames(cleanCode);

        for (const testCase of testCases) {
            try {
                const { context, logs } = createSandboxContext();

                // Build test script that tries to call detected functions
                let testScript = cleanCode + '\n';

                // If test input looks like a function call, execute it directly
                if (testCase.input.includes('(')) {
                    testScript += `
                        try {
                            const __result__ = ${testCase.input};
                            if (__result__ !== undefined) {
                                console.log(typeof __result__ === 'object' ? JSON.stringify(__result__) : __result__);
                            }
                        } catch (e) {
                            console.error(e.message);
                        }
                    `;
                } else if (functionNames.length > 0) {
                    // Try calling the first detected function with the test input
                    testScript += `
                        try {
                            const __input__ = ${testCase.input};
                            const __fn__ = ${functionNames[0]};
                            if (typeof __fn__ === 'function') {
                                const __result__ = __fn__(__input__);
                                console.log(typeof __result__ === 'object' ? JSON.stringify(__result__) : __result__);
                            }
                        } catch (e) {
                            console.error(e.message);
                        }
                    `;
                }

                vm.runInContext(testScript, context, { timeout: EXECUTION_TIMEOUT });

                const output = logs.join('\n').trim();
                const expected = testCase.expectedOutput;
                const testPassed = compareOutputs(output, expected);

                if (testPassed) {
                    passed++;
                    details.push({
                        testCase: testCase.description,
                        passed: true,
                        message: 'Test passed!',
                        expected,
                        actual: output,
                    });
                } else {
                    const hint = !output ? 'Your function may not be returning or logging a value.' : '';
                    details.push({
                        testCase: testCase.description,
                        passed: false,
                        message: 'Output does not match expected value',
                        expected,
                        actual: output || '(no output)',
                        hint,
                    });
                }
            } catch (err: unknown) {
                const errorMsg = err instanceof Error ? err.message : 'Unknown error';
                const hint = generateHint(errorMsg, cleanCode);
                details.push({
                    testCase: testCase.description,
                    passed: false,
                    message: `Runtime Error: ${errorMsg}`,
                    expected: testCase.expectedOutput,
                    actual: '(error)',
                    hint,
                });
            }
        }
    } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        return {
            result: 'error',
            executionTime: Date.now() - startTime,
            testResults: {
                passed: 0,
                total: testCases.length,
                details: [{
                    testCase: 'Code Compilation',
                    passed: false,
                    message: `Syntax Error: ${errorMsg}`,
                    hint: generateHint(errorMsg, code),
                }],
            },
        };
    }

    const executionTime = Date.now() - startTime;
    return {
        result: passed === testCases.length ? 'pass' : 'fail',
        executionTime,
        testResults: {
            passed,
            total: testCases.length,
            details,
        },
    };
}

/**
 * Grade CSS code by checking for required properties
 */
function gradeCSS(code: string, testCases: TestCase[]): GradeResult {
    const startTime = Date.now();
    const details: TestResult[] = [];
    let passed = 0;

    const cssLower = code.toLowerCase();

    for (const testCase of testCases) {
        const property = testCase.input.replace('check ', '');
        const expectedValue = testCase.expectedOutput.toLowerCase();

        // Multiple regex patterns for flexible CSS matching
        const patterns = [
            new RegExp(`${property}\\s*:\\s*${expectedValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i'),
            new RegExp(`${property}\\s*:\\s*[^;]*${expectedValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i'),
        ];

        const hasProperty = patterns.some(p => p.test(code)) ||
            cssLower.includes(`${property}:${expectedValue}`) ||
            cssLower.includes(`${property}: ${expectedValue}`);

        if (hasProperty) {
            passed++;
            details.push({
                testCase: testCase.description,
                passed: true,
                message: `Found "${property}: ${expectedValue}"`,
                expected: `${property}: ${expectedValue}`,
                actual: 'Found in CSS',
            });
        } else {
            details.push({
                testCase: testCase.description,
                passed: false,
                message: `Missing CSS property`,
                expected: `${property}: ${expectedValue}`,
                actual: 'Not found',
                hint: `Add "${property}: ${expectedValue};" to your CSS. Check spelling and value format.`,
            });
        }
    }

    return {
        result: passed === testCases.length ? 'pass' : 'fail',
        executionTime: Date.now() - startTime,
        testResults: { passed, total: testCases.length, details },
    };
}

/**
 * Grade React code with pattern matching and structure checks
 */
function gradeReact(code: string, testCases: TestCase[]): GradeResult {
    const startTime = Date.now();
    const details: TestResult[] = [];
    let passed = 0;

    // Pattern definitions for React concepts
    const reactPatterns: Record<string, { test: RegExp; hint: string }> = {
        'initial render': {
            test: /useState\s*\(\s*(?:0|''|""|`\s*`|\[\s*\]|\{\s*\}|null|false)\s*\)/,
            hint: 'Initialize useState with a default value like useState(0) or useState("")',
        },
        'click increment': {
            test: /onClick\s*=\s*\{[^}]*set\w+\s*\([^)]*\+/i,
            hint: 'Add an onClick handler that calls your setter function to increment',
        },
        'click decrement': {
            test: /onClick\s*=\s*\{[^}]*set\w+\s*\([^)]*-/i,
            hint: 'Add an onClick handler that calls your setter function to decrement',
        },
        'loading state': {
            test: /loading|isLoading/i,
            hint: 'Create a loading state variable with useState, e.g., const [loading, setLoading] = useState(true)',
        },
        'useEffect': {
            test: /useEffect\s*\(\s*(?:async\s*)?\(\s*\)\s*=>/,
            hint: 'Add useEffect hook for side effects: useEffect(() => { ... }, [])',
        },
        'fetch data': {
            test: /fetch\s*\(|axios\.|useQuery/,
            hint: 'Use fetch() or axios to make API calls inside useEffect',
        },
        'add todo': {
            test: /setTodos?\s*\(\s*(?:\[?\s*\.\.\.|\w+\.concat)/,
            hint: 'Use spread operator or concat to add items: setTodos([...todos, newTodo])',
        },
        'toggle todo': {
            test: /\.map\s*\([^)]*completed/i,
            hint: 'Use map to toggle: todos.map(t => t.id === id ? {...t, completed: !t.completed} : t)',
        },
        'filter': {
            test: /\.filter\s*\(/,
            hint: 'Use the filter method: items.filter(item => condition)',
        },
        'localStorage': {
            test: /localStorage\.(get|set)Item/,
            hint: 'Use localStorage.setItem("key", value) and localStorage.getItem("key")',
        },
    };

    for (const testCase of testCases) {
        let testPassed = false;
        let hint = '';
        const inputKey = testCase.input.toLowerCase();

        // Check if we have a specific pattern for this test
        for (const [key, pattern] of Object.entries(reactPatterns)) {
            if (inputKey.includes(key.toLowerCase())) {
                testPassed = pattern.test.test(code);
                hint = pattern.hint;
                break;
            }
        }

        // Fallback to general checks
        if (!testPassed && !hint) {
            testPassed = code.includes(testCase.expectedOutput);
            hint = `Make sure your code includes: ${testCase.expectedOutput}`;
        }

        if (testPassed) passed++;
        details.push({
            testCase: testCase.description,
            passed: testPassed,
            message: testPassed ? 'Pattern found' : 'Pattern not found in code',
            expected: testCase.expectedOutput,
            actual: testPassed ? 'Found' : 'Not found',
            hint: testPassed ? undefined : hint,
        });
    }

    return {
        result: passed === testCases.length ? 'pass' : 'fail',
        executionTime: Date.now() - startTime,
        testResults: { passed, total: testCases.length, details },
    };
}

/**
 * Grade Node.js/Express code with pattern matching
 */
function gradeNode(code: string, testCases: TestCase[]): GradeResult {
    const startTime = Date.now();
    const details: TestResult[] = [];
    let passed = 0;

    const nodePatterns: Record<string, { test: RegExp; hint: string }> = {
        'GET /': {
            test: /(?:router|app)\.get\s*\(\s*['"`]\/['"`]/,
            hint: 'Add a GET route: router.get("/", (req, res) => { ... })',
        },
        'POST /': {
            test: /(?:router|app)\.post\s*\(\s*['"`]\/['"`]/,
            hint: 'Add a POST route: router.post("/", (req, res) => { ... })',
        },
        'PUT /': {
            test: /(?:router|app)\.put\s*\(\s*['"`]\//,
            hint: 'Add a PUT route: router.put("/:id", (req, res) => { ... })',
        },
        'DELETE /': {
            test: /(?:router|app)\.delete\s*\(\s*['"`]\//,
            hint: 'Add a DELETE route: router.delete("/:id", (req, res) => { ... })',
        },
        'res.json': {
            test: /res\.json\s*\(/,
            hint: 'Return JSON data: res.json({ data: ... })',
        },
        'status 201': {
            test: /res\.status\s*\(\s*201\s*\)/,
            hint: 'Set created status: res.status(201).json({ ... })',
        },
        'status 404': {
            test: /res\.status\s*\(\s*404\s*\)|\.sendStatus\s*\(\s*404\s*\)/,
            hint: 'Handle not found: res.status(404).json({ error: "Not found" })',
        },
        'middleware': {
            test: /app\.use\s*\(|router\.use\s*\(/,
            hint: 'Add middleware with app.use() or router.use()',
        },
        'req.body': {
            test: /req\.body/,
            hint: 'Access request body: const { field } = req.body',
        },
        'req.params': {
            test: /req\.params/,
            hint: 'Access URL params: const { id } = req.params',
        },
    };

    for (const testCase of testCases) {
        let testPassed = false;
        let hint = '';
        const inputKey = testCase.input.toLowerCase();

        for (const [key, pattern] of Object.entries(nodePatterns)) {
            if (inputKey.includes(key.toLowerCase())) {
                testPassed = pattern.test.test(code);
                hint = pattern.hint;
                break;
            }
        }

        if (!testPassed && !hint) {
            testPassed = code.includes(testCase.expectedOutput);
            hint = `Expected pattern not found`;
        }

        if (testPassed) passed++;
        details.push({
            testCase: testCase.description,
            passed: testPassed,
            message: testPassed ? 'Pattern found' : 'Pattern not found',
            expected: testCase.expectedOutput,
            actual: testPassed ? 'Found' : 'Not found',
            hint: testPassed ? undefined : hint,
        });
    }

    return {
        result: passed === testCases.length ? 'pass' : 'fail',
        executionTime: Date.now() - startTime,
        testResults: { passed, total: testCases.length, details },
    };
}

/**
 * Main grading function - routes to appropriate grader
 */
export function gradeSubmission(
    code: string,
    category: string,
    testCases: TestCase[]
): GradeResult {
    // Input validation
    if (!code || code.trim().length === 0) {
        return {
            result: 'error',
            executionTime: 0,
            testResults: {
                passed: 0,
                total: testCases.length,
                details: [{
                    testCase: 'Code Validation',
                    passed: false,
                    message: 'No code submitted',
                    hint: 'Write some code before submitting!',
                }],
            },
        };
    }

    if (!testCases || testCases.length === 0) {
        return {
            result: 'error',
            executionTime: 0,
            testResults: {
                passed: 0,
                total: 0,
                details: [{
                    testCase: 'Test Cases',
                    passed: false,
                    message: 'No test cases defined for this problem',
                }],
            },
        };
    }

    switch (category) {
        case 'javascript':
            return gradeJavaScript(code, testCases);
        case 'css':
            return gradeCSS(code, testCases);
        case 'react':
            return gradeReact(code, testCases);
        case 'node':
            return gradeNode(code, testCases);
        default:
            return {
                result: 'error',
                executionTime: 0,
                testResults: {
                    passed: 0,
                    total: testCases.length,
                    details: [{
                        testCase: 'Category',
                        passed: false,
                        message: `Unsupported category: ${category}`,
                        hint: 'Supported categories: javascript, css, react, node',
                    }],
                },
            };
    }
}
