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

/**
 * Grade JavaScript code by running it and checking console output
 */
function gradeJavaScript(code: string, testCases: TestCase[]): GradeResult {
    const startTime = Date.now();
    const details: TestResult[] = [];
    let passed = 0;

    try {
        // Strip imports for evaluation
        const cleanCode = code
            .split('\n')
            .filter(line => !line.trim().startsWith('import ') && !line.trim().startsWith('export '))
            .join('\n');

        for (const testCase of testCases) {
            try {
                // Create a context with captured console output
                const logs: string[] = [];
                const context = vm.createContext({
                    console: {
                        log: (...args: unknown[]) => logs.push(args.map(a =>
                            typeof a === 'object' ? JSON.stringify(a) : String(a)
                        ).join(' ')),
                    },
                    JSON,
                    Math,
                    Date,
                    Array,
                    Object,
                    String,
                    Number,
                    Boolean,
                    RegExp,
                    parseInt,
                    parseFloat,
                    isNaN,
                    isFinite,
                });

                // Parse the test input and create a test script
                const testScript = `
                    ${cleanCode}
                    
                    // Run direct test if it's a function call
                    const testInput = ${testCase.input};
                    if (typeof stats === 'function') {
                        const result = stats(testInput);
                        console.log(JSON.stringify(result));
                    }
                `;

                vm.runInContext(testScript, context, { timeout: 3000 });

                // Check if output matches expected
                const output = logs.join('\n').trim();
                const expected = testCase.expectedOutput;

                // Flexible matching - check JSON equality or string contains
                let testPassed = false;
                try {
                    const outputObj = JSON.parse(output);
                    const expectedObj = JSON.parse(expected);
                    testPassed = JSON.stringify(outputObj) === JSON.stringify(expectedObj);
                } catch {
                    testPassed = output.includes(expected) || expected.includes(output);
                }

                if (testPassed) {
                    passed++;
                    details.push({
                        testCase: testCase.description,
                        passed: true,
                        message: 'Test passed!',
                    });
                } else {
                    details.push({
                        testCase: testCase.description,
                        passed: false,
                        message: `Expected: ${expected}, Got: ${output || '(no output)'}`,
                    });
                }
            } catch (err: unknown) {
                details.push({
                    testCase: testCase.description,
                    passed: false,
                    message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
                });
            }
        }
    } catch (err: unknown) {
        return {
            result: 'error',
            executionTime: Date.now() - startTime,
            testResults: {
                passed: 0,
                total: testCases.length,
                details: [{
                    testCase: 'Code Execution',
                    passed: false,
                    message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
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

    // Simple CSS property checking
    const cssLower = code.toLowerCase();

    for (const testCase of testCases) {
        const property = testCase.input.replace('check ', '');
        const expectedValue = testCase.expectedOutput.toLowerCase();

        // Check if CSS contains the property with expected value
        const regex = new RegExp(`${property}\\s*:\\s*${expectedValue}`, 'i');
        const hasProperty = regex.test(code) || cssLower.includes(`${property}:${expectedValue}`) ||
            cssLower.includes(`${property}: ${expectedValue}`);

        if (hasProperty) {
            passed++;
            details.push({
                testCase: testCase.description,
                passed: true,
                message: `Found "${property}: ${expectedValue}"`,
            });
        } else {
            details.push({
                testCase: testCase.description,
                passed: false,
                message: `Missing "${property}: ${expectedValue}"`,
            });
        }
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
 * Grade React code by checking for required patterns
 */
function gradeReact(code: string, testCases: TestCase[]): GradeResult {
    const startTime = Date.now();
    const details: TestResult[] = [];
    let passed = 0;

    for (const testCase of testCases) {
        let testPassed = false;
        let message = '';

        // Check for specific React patterns
        switch (testCase.input) {
            case 'initial render':
                // Check if useState is used with initial value
                testPassed = /useState\s*\(\s*0\s*\)|useState\s*\(\s*\[\s*\]\s*\)|useState\s*\(\s*['"][^'"]*['"]\s*\)/.test(code);
                message = testPassed ? 'useState found with initial value' : 'useState not properly initialized';
                break;

            case 'click increment':
            case 'click decrement':
                // Check for increment/decrement patterns
                testPassed = /setCount|setState/.test(code) && /onClick/.test(code);
                message = testPassed ? 'Click handlers with state updates found' : 'Missing click handlers or state updates';
                break;

            case 'click decrement at 0':
                // Check for Math.max or condition to prevent negative
                testPassed = /Math\.max\s*\(\s*0/.test(code) || /prev\s*-\s*1\s*>=?\s*0|count\s*>\s*0/.test(code) || /if\s*\(\s*\w+\s*>\s*0/.test(code);
                message = testPassed ? 'Guard against negative count found' : 'No guard against negative count';
                break;

            case 'loading state':
                testPassed = /loading/i.test(code) && /useState/.test(code);
                message = testPassed ? 'Loading state found' : 'Missing loading state';
                break;

            case 'success render':
            case 'error state':
                testPassed = /useEffect/.test(code) && /fetch|axios/.test(code);
                message = testPassed ? 'Data fetching pattern found' : 'Missing data fetching logic';
                break;

            case 'add todo':
                testPassed = /setTodos/.test(code) && /\.\.\.todos|\.concat/.test(code);
                message = testPassed ? 'Add todo logic found' : 'Missing add todo logic';
                break;

            case 'toggle todo':
                testPassed = /completed/.test(code) && /map/.test(code);
                message = testPassed ? 'Toggle logic found' : 'Missing toggle logic';
                break;

            case 'filter active':
            case 'filter':
                testPassed = /filter/.test(code) && /completed|active/.test(code);
                message = testPassed ? 'Filter logic found' : 'Missing filter logic';
                break;

            case 'localStorage':
                testPassed = /localStorage/.test(code);
                message = testPassed ? 'localStorage usage found' : 'Missing localStorage persistence';
                break;

            default:
                // Generic pattern check
                testPassed = code.includes(testCase.expectedOutput);
                message = testPassed ? 'Pattern found' : 'Pattern not found';
        }

        if (testPassed) passed++;
        details.push({
            testCase: testCase.description,
            passed: testPassed,
            message,
        });
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
 * Grade Node.js code (placeholder - just checks structure for now)
 */
function gradeNode(code: string, testCases: TestCase[]): GradeResult {
    const startTime = Date.now();
    const details: TestResult[] = [];
    let passed = 0;

    for (const testCase of testCases) {
        let testPassed = false;
        let message = '';

        // Check for Express patterns
        switch (testCase.input) {
            case 'GET /notes':
                testPassed = /router\.get\s*\(\s*['"]\/['"]/.test(code) && /res\.json/.test(code);
                message = testPassed ? 'GET endpoint found' : 'Missing GET /notes endpoint';
                break;

            case 'POST /notes':
                testPassed = /router\.post\s*\(\s*['"]\/['"]/.test(code) && (/201|created/i.test(code) || /res\.status\s*\(\s*201/.test(code));
                message = testPassed ? 'POST endpoint found' : 'Missing POST /notes endpoint';
                break;

            case 'GET /notes/:id (not found)':
                testPassed = /router\.get\s*\(\s*['"]\/:id['"]/.test(code) && /404|not.?found/i.test(code);
                message = testPassed ? '404 handling found' : 'Missing 404 error handling';
                break;

            default:
                testPassed = code.includes(testCase.expectedOutput);
                message = testPassed ? 'Pattern found' : 'Pattern not found';
        }

        if (testPassed) passed++;
        details.push({
            testCase: testCase.description,
            passed: testPassed,
            message,
        });
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
 * Main grading function - routes to appropriate grader
 */
export function gradeSubmission(
    code: string,
    category: string,
    testCases: TestCase[]
): GradeResult {
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
                        testCase: 'Unknown Category',
                        passed: false,
                        message: `Unsupported challenge category: ${category}`,
                    }],
                },
            };
    }
}
