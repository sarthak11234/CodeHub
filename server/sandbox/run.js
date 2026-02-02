/**
 * Sandbox Runner - Executes user code safely within Docker container
 * Reads code from stdin, executes it, and outputs results to stdout
 */

const vm = require('vm');
const fs = require('fs');

// Read code from stdin
let inputData = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
    inputData += chunk;
});

process.stdin.on('end', () => {
    try {
        const { code, testInput, functionName } = JSON.parse(inputData);

        const logs = [];
        const errors = [];

        // Create sandbox context
        const context = vm.createContext({
            console: {
                log: (...args) => logs.push(args.map(a =>
                    typeof a === 'object' ? JSON.stringify(a) : String(a)
                ).join(' ')),
                error: (...args) => errors.push(args.map(a =>
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
            Map,
            Set,
            Promise,
            Error,
            parseInt,
            parseFloat,
            isNaN,
            isFinite,
        });

        // Execute user code
        const startTime = Date.now();

        let script = code;

        // If function name provided, try to call it with test input
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

        vm.runInContext(script, context, { timeout: 5000 });

        const executionTime = Date.now() - startTime;

        // Output results
        console.log(JSON.stringify({
            success: true,
            output: logs.join('\n'),
            errors: errors.join('\n'),
            executionTime,
        }));

    } catch (error) {
        console.log(JSON.stringify({
            success: false,
            error: error.message,
            executionTime: 0,
        }));
    }
});

// Handle timeout
setTimeout(() => {
    console.log(JSON.stringify({
        success: false,
        error: 'Execution timeout (5 seconds)',
        executionTime: 5000,
    }));
    process.exit(1);
}, 6000);
