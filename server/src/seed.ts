import mongoose from 'mongoose';
import { config } from './config/index.js';
import { connectDB } from './config/database.js';
import { Problem } from './models/Problem.js';

const sampleProblems = [
    {
        title: 'Center a Div',
        description: `# Center a Div

Your task is to center a div both horizontally and vertically within its parent container.

## Requirements
- The inner div should be perfectly centered
- Use CSS Flexbox or Grid
- The parent container has a fixed height of 400px

## Starter Code
You are given an HTML structure with a parent container and a child box. Write the CSS to center the box.`,
        difficulty: 'easy',
        category: 'css',
        starterCode: `.container {
  height: 400px;
  background: #1e293b;
  /* Add your styles here */
}

.box {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  border-radius: 12px;
}`,
        solutionCode: `.container {
  height: 400px;
  background: #1e293b;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  border-radius: 12px;
}`,
        testCases: [
            { input: 'check display', expectedOutput: 'flex', description: 'Container uses flexbox' },
            { input: 'check justify-content', expectedOutput: 'center', description: 'Horizontal centering' },
            { input: 'check align-items', expectedOutput: 'center', description: 'Vertical centering' },
        ],
        points: 10,
    },
    {
        title: 'Build a Counter Component',
        description: `# Build a Counter Component

Create a simple React counter component with increment and decrement buttons.

## Requirements
- Display the current count
- "Increment" button increases count by 1
- "Decrement" button decreases count by 1
- Count should never go below 0

## Starter Code
Complete the Counter component using React hooks.`,
        difficulty: 'easy',
        category: 'react',
        starterCode: `import { useState } from 'react';

export function Counter() {
  // Add your state here

  return (
    <div className="counter">
      <h2>Count: {/* Display count here */}</h2>
      <button onClick={/* Decrement handler */}>-</button>
      <button onClick={/* Increment handler */}>+</button>
    </div>
  );
}`,
        solutionCode: `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => Math.max(0, prev - 1));

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}`,
        testCases: [
            { input: 'initial render', expectedOutput: '0', description: 'Initial count is 0' },
            { input: 'click increment', expectedOutput: '1', description: 'Count increases on increment' },
            { input: 'click decrement at 0', expectedOutput: '0', description: 'Count stays 0 when decrementing from 0' },
        ],
        points: 15,
    },
    {
        title: 'Array Manipulation',
        description: `# Array Manipulation

Write a function that takes an array of numbers and returns an object with statistics.

## Requirements
Return an object with:
- \`sum\`: Total of all numbers
- \`average\`: Mean of all numbers
- \`min\`: Smallest number
- \`max\`: Largest number
- \`count\`: Number of elements

## Example
\`\`\`javascript
stats([1, 2, 3, 4, 5])
// Returns: { sum: 15, average: 3, min: 1, max: 5, count: 5 }
\`\`\``,
        difficulty: 'medium',
        category: 'javascript',
        starterCode: `function stats(numbers) {
  // Your code here
}`,
        solutionCode: `function stats(numbers) {
  if (!numbers.length) {
    return { sum: 0, average: 0, min: 0, max: 0, count: 0 };
  }
  
  const sum = numbers.reduce((a, b) => a + b, 0);
  return {
    sum,
    average: sum / numbers.length,
    min: Math.min(...numbers),
    max: Math.max(...numbers),
    count: numbers.length,
  };
}`,
        testCases: [
            { input: '[1, 2, 3, 4, 5]', expectedOutput: '{"sum":15,"average":3,"min":1,"max":5,"count":5}', description: 'Basic array' },
            { input: '[-5, 0, 5]', expectedOutput: '{"sum":0,"average":0,"min":-5,"max":5,"count":3}', description: 'Negative numbers' },
            { input: '[]', expectedOutput: '{"sum":0,"average":0,"min":0,"max":0,"count":0}', description: 'Empty array' },
        ],
        points: 25,
    },
    {
        title: 'Fetch & Display Users',
        description: `# Fetch & Display Users

Create a React component that fetches user data from an API and displays it.

## Requirements
- Fetch data from the provided API endpoint
- Show a loading state while fetching
- Display users in a list
- Handle errors gracefully

## API Endpoint
\`/api/users\` returns: \`[{ id: 1, name: "John", email: "john@example.com" }, ...]\``,
        difficulty: 'medium',
        category: 'react',
        starterCode: `import { useState, useEffect } from 'react';

export function UserList() {
  // Add state for users, loading, and error

  // Add useEffect to fetch data

  // Handle loading state

  // Handle error state

  return (
    <ul>
      {/* Map through users and display them */}
    </ul>
  );
}`,
        solutionCode: `import { useState, useEffect } from 'react';

export function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}`,
        testCases: [
            { input: 'loading state', expectedOutput: 'Loading...', description: 'Shows loading indicator' },
            { input: 'success render', expectedOutput: 'list items', description: 'Renders user list' },
            { input: 'error state', expectedOutput: 'Error:', description: 'Handles errors' },
        ],
        points: 30,
    },
    {
        title: 'Build a REST Endpoint',
        description: `# Build a REST Endpoint

Create an Express.js endpoint that handles CRUD operations for a "notes" resource.

## Requirements
Implement the following endpoints:
- \`GET /notes\` - List all notes
- \`POST /notes\` - Create a new note
- \`GET /notes/:id\` - Get a single note
- \`DELETE /notes/:id\` - Delete a note

## Note Structure
\`\`\`javascript
{ id: string, title: string, content: string, createdAt: Date }
\`\`\``,
        difficulty: 'hard',
        category: 'node',
        starterCode: `import express from 'express';

const router = express.Router();
const notes = []; // In-memory storage

// GET /notes - List all notes
router.get('/', (req, res) => {
  // Your code here
});

// POST /notes - Create a note
router.post('/', (req, res) => {
  // Your code here
});

// GET /notes/:id - Get single note
router.get('/:id', (req, res) => {
  // Your code here
});

// DELETE /notes/:id - Delete a note
router.delete('/:id', (req, res) => {
  // Your code here
});

export default router;`,
        solutionCode: `import express from 'express';
import { randomUUID } from 'crypto';

const router = express.Router();
const notes = [];

router.get('/', (req, res) => {
  res.json(notes);
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  const note = {
    id: randomUUID(),
    title,
    content,
    createdAt: new Date(),
  };
  notes.push(note);
  res.status(201).json(note);
});

router.get('/:id', (req, res) => {
  const note = notes.find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  res.json(note);
});

router.delete('/:id', (req, res) => {
  const index = notes.findIndex(n => n.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  notes.splice(index, 1);
  res.status(204).send();
});

export default router;`,
        testCases: [
            { input: 'GET /notes', expectedOutput: '[]', description: 'List starts empty' },
            { input: 'POST /notes', expectedOutput: '201', description: 'Create returns 201' },
            { input: 'GET /notes/:id (not found)', expectedOutput: '404', description: 'Returns 404 for missing' },
        ],
        points: 50,
    },
    {
        title: 'Build a Todo App',
        description: `# Build a Todo App

Create a complete Todo application with React.

## Requirements
- Add new todos with an input field
- Toggle todo completion status
- Delete todos
- Filter todos (All, Active, Completed)
- Show todo count
- Persist to localStorage

## Component Structure
\`\`\`
<TodoApp>
  <TodoInput />
  <TodoList>
    <TodoItem />
  </TodoList>
  <TodoFilters />
</TodoApp>
\`\`\``,
        difficulty: 'hard',
        category: 'react',
        starterCode: `import { useState, useEffect } from 'react';

export function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load from localStorage on mount

  // Save to localStorage when todos change

  const addTodo = (text) => {
    // Add new todo
  };

  const toggleTodo = (id) => {
    // Toggle completion
  };

  const deleteTodo = (id) => {
    // Delete todo
  };

  const filteredTodos = todos.filter(todo => {
    // Filter based on current filter state
  });

  return (
    <div className="todo-app">
      {/* Build your UI here */}
    </div>
  );
}`,
        solutionCode: `import { useState, useEffect } from 'react';

export function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all');
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <form onSubmit={addTodo}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add todo..." />
        <button type="submit">Add</button>
      </form>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <p>{todos.filter(t => !t.completed).length} items left</p>
    </div>
  );
}`,
        testCases: [
            { input: 'add todo', expectedOutput: 'todo in list', description: 'Can add todos' },
            { input: 'toggle todo', expectedOutput: 'completed class', description: 'Can toggle completion' },
            { input: 'filter active', expectedOutput: 'only active shown', description: 'Filter works' },
            { input: 'localStorage', expectedOutput: 'persisted', description: 'Saves to localStorage' },
        ],
        points: 75,
    },
];

async function seed() {
    try {
        // Connect to database
        await connectDB();
        console.log('📦 Connected to database');

        // Clear existing problems
        await Problem.deleteMany({});
        console.log('🗑️  Cleared existing problems');

        // Insert sample problems
        const created = await Problem.insertMany(sampleProblems);
        console.log(`✅ Inserted ${created.length} sample problems:`);

        created.forEach(p => {
            const diffColor = p.difficulty === 'easy' ? '🟢' : p.difficulty === 'medium' ? '🟡' : '🔴';
            console.log(`   ${diffColor} ${p.title} (${p.category}) - ${p.points} pts`);
        });

        console.log('\n🎉 Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
