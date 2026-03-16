import { reactProblems } from './data/react-problems.js';
import { nodeProblems } from './data/node-problems.js';
import { cssProblems } from './data/css-problems.js';
import { javascriptProblems } from './data/javascript-problems.js';

// The base premium 100 problems
const baseProblems = [
    ...reactProblems,
    ...nodeProblems,
    ...cssProblems,
    ...javascriptProblems
];

// Mutators arrays
const themes = [
    "E-commerce", "Social Media", "Banking", "Healthcare", "Gaming", 
    "Education", "Real Estate", "Travel", "Fitness", "Crypto"
];

const variables = [
    ["data", "information", "payload"],
    ["user", "customer", "client"],
    ["product", "item", "entity"],
    ["cart", "basket", "collection"]
];

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function mutateDescription(desc: string, theme: string): string {
    // Intelligently mutate the markdown string to insert the theme context
    let mutated = desc;
    
    // Add context to the top
    if (mutated.includes('## Requirements')) {
        mutated = mutated.replace('## Requirements', `**Context:** This feature is for a ${theme} application.\n\n## Requirements`);
    } else {
        mutated += `\n\n**Context:** This feature is for a ${theme} application.`;
    }

    // Randomize some common words
    variables.forEach(group => {
        const from = group[0];
        const to = group[getRandomInt(group.length)];
        // naive replacement of the word
        const regex = new RegExp(`\\\\b${from}\\\\b`, 'gi');
        mutated = mutated.replace(regex, (match) => {
           const isUpper = match.charAt(0) === match.charAt(0).toUpperCase();
           return isUpper ? to.charAt(0).toUpperCase() + to.slice(1) : to;
        });
    });

    return mutated;
}

export function generateTotalProblems(targetCount: number = 500) {
    const totalProblems = [];
    
    // 1. Add the original pure 100 problems first
    for (const problem of baseProblems) {
        // deep clone to avoid reference mutations
        totalProblems.push(JSON.parse(JSON.stringify(problem)));
    }

    // 2. Generate the remaining (400) via intelligent mutations
    const needed = targetCount - totalProblems.length;
    let baseIndex = 0;

    for (let i = 0; i < needed; i++) {
        // cycle through the base problems
        const source = baseProblems[baseIndex % baseProblems.length];
        const theme = themes[getRandomInt(themes.length)];
        
        // Create mutated clone
        const clone = JSON.parse(JSON.stringify(source));
        
        // Mutate title slightly
        clone.title = `${source.title} (${theme} Variant - ${i + 1})`;
        
        // Mutate description
        clone.description = mutateDescription(source.description, theme);
        
        // Mutate points slightly (+0 to +15 pts randomly) to make leaderboards varied
        clone.points += getRandomInt(16);
        
        // Optionally bump difficulty randomly 10% of the time (e.g. easy -> medium)
        if (Math.random() > 0.9) {
            if (clone.difficulty === 'easy') {
                clone.difficulty = 'medium';
                clone.points += 10;
            } else if (clone.difficulty === 'medium') {
                clone.difficulty = 'hard';
                clone.points += 20;
            }
        }
        
        totalProblems.push(clone);
        baseIndex++;
    }

    return totalProblems;
}
