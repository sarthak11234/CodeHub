# CodeHub - Implementation Todo

> A competitive web development learning platform with browser-based IDE

---

## Phase 1: Foundation & Project Setup

### 1.1 Project Initialization
- [x] Initialize Vite + React + TypeScript project
- [x] Configure Tailwind CSS with custom color palette (Cyber-Blue & Violet theme)
- [x] Add JetBrains Mono / Fira Code fonts for code elements
- [x] Add Inter / Plus Jakarta Sans fonts for UI headings
- [x] Set up NPM Workspaces monorepo structure (frontend + backend)

### 1.2 Design System Setup
- [x] Create global CSS variables for the "Glassmorphic IDE" theme:
  - `bg-slate-950` (deep blue-black background)
  - `bg-white/5` + `backdrop-blur-xl` (glass surfaces)
  - `cyan-500` / `violet-500` (accent colors)
  - `slate-100` / `slate-400` (text hierarchy)
- [x] Install and configure Framer Motion for animations
- [x] Install Lucide React for icons
- [ ] Install Shadcn/UI components (optional - can add later)

### 1.3 Reusable Components
- [x] Build `GlassCard` component (frosted glass with glow effects)
- [x] Build animated button with neon glow hover state
- [x] Build mesh gradient background component (in Layout)
- [x] Build Layout component with glassmorphic navbar

---

## Phase 2: Landing Page (Hero & Features)

### 2.1 Hero Section
- [ ] Create hero layout with centered text + floating code card
- [ ] Implement "floating levitation" animation (y-axis bob)
- [ ] Add mesh gradient background blobs (cyan + violet)
- [ ] Style gradient text ("Master Web Dev In The Arena")
- [ ] Add CTA button with glow hover effect

### 2.2 Features Bento Grid
- [ ] Build Bento Grid layout (large, tall, small boxes)
- [ ] Create "Real-time IDE" feature card with mock browser window
- [ ] Create "Leaderboard" feature card with glowing rank badges
- [ ] Create "Speed" feature card with radial performance graph
- [ ] Implement scroll-reveal staggered animations (`whileInView`)

### 2.3 Additional Sections
- [ ] Build "How It Works" section with step indicators
- [ ] Build footer with navigation and social links
- [ ] Add subtle noise texture overlay for premium feel

---

## Phase 3: Authentication System

### 3.1 Backend Auth (JWT + Passport.js)
- [ ] Set up Express.js server structure
- [ ] Configure MongoDB connection (Mongoose)
- [ ] Create `User` schema (email, password hash, scores, rank, badges)
- [ ] Implement `/api/auth/register` endpoint
- [ ] Implement `/api/auth/login` endpoint (returns JWT)
- [ ] Implement `/api/auth/me` endpoint (protected, returns user profile)
- [ ] Add password hashing (bcrypt)
- [ ] Add JWT middleware for protected routes

### 3.2 Frontend Auth Pages
- [ ] Create Login page with glassmorphic form
- [ ] Create Signup page with validation
- [ ] Implement auth context/state management
- [ ] Add protected route wrapper component
- [ ] Handle JWT storage (httpOnly cookie or secure localStorage)

---

## Phase 4: Problem System

### 4.1 Problem Schema & API
- [ ] Create `Problem` schema:
  - Title, description (Markdown), difficulty
  - Starter code, solution code
  - Test cases (hidden), category tags
- [ ] Create `Submission` schema:
  - UserID, ProblemID, code, result, timestamp, execution time
- [ ] Implement `/api/problems` (list all problems)
- [ ] Implement `/api/problems/:id` (get single problem with starter code)
- [ ] Implement `/api/submissions` (create submission, get user history)

### 4.2 Problem List Page
- [ ] Build problem cards with difficulty badges
- [ ] Add category filter (React, CSS, Node.js)
- [ ] Add difficulty filter (Easy, Medium, Hard)
- [ ] Add search functionality
- [ ] Show user's completion status per problem

---

## Phase 5: The IDE (Core Feature)

### 5.1 Monaco Editor Integration
- [ ] Install `@monaco-editor/react`
- [ ] Configure editor themes (Dracula / Tokyo Night style)
- [ ] Enable JSX, CSS, JavaScript language support
- [ ] Add TypeScript IntelliSense
- [ ] Configure keyboard shortcuts

### 5.2 Split-Pane Layout
- [ ] Create resizable split-pane component
- [ ] Left pane: Monaco Editor
- [ ] Right pane: Preview iframe / Console output
- [ ] Add tabs for multiple files (if needed)

### 5.3 Live Preview (Sandpack)
- [ ] Install `@codesandbox/sandpack-react`
- [ ] Configure Sandpack provider for React projects
- [ ] Pipe Monaco editor content into Sandpack bundler
- [ ] Display live preview in right pane
- [ ] Handle bundling errors gracefully

### 5.4 Console Output (for Backend Challenges)
- [ ] Create console output component
- [ ] Display `console.log` outputs
- [ ] Display test results (pass/fail with details)

---

## Phase 6: Grading System

### 6.1 Frontend Grading (Jest/Vitest)
- [ ] Set up test runner on backend (containerized)
- [ ] Create test case format for React components:
  - DOM structure checks
  - Event handler verification
  - State change validation
- [ ] Return detailed test results to frontend

### 6.2 Visual Grading (Optional MVP)
- [ ] Set up Puppeteer/Playwright on backend server
- [ ] Implement screenshot comparison logic
- [ ] Calculate visual match percentage
- [ ] Return visual diff result to user

### 6.3 Backend/API Grading
- [ ] Create Docker container for secure code execution
- [ ] Implement endpoint that:
  1. Spins up container with user's Node.js code
  2. Sends HTTP requests to user's API
  3. Validates responses against expected output
  4. Returns pass/fail result
- [ ] Add timeout limits (prevent infinite loops)
- [ ] Add resource limits (prevent memory bombs)

---

## Phase 7: Competitive Features

### 7.1 Leaderboard
- [ ] Calculate Elo rating or point-based scores
- [ ] Create `/api/leaderboard` endpoint (top N users)
- [ ] Build leaderboard page with glassmorphic user cards
- [ ] Add rank badges with glowing effects (#1, #2, #3 special)
- [ ] Show current user's position

### 7.2 User Profile
- [ ] Create profile page layout
- [ ] Display global rank, total problems solved
- [ ] Display skill badges ("CSS Wizard", "API Architect")
- [ ] Show submission history with performance charts
- [ ] Add heatmap of coding activity (like GitHub)

### 7.3 Submission Metrics
- [ ] Track and display execution time per submission
- [ ] Track code character count (optimization metric)
- [ ] Show percentile rankings

---

## Phase 8: Polish & Optimization

### 8.1 Animations
- [ ] Add "Glass Shimmer" hover effect on cards
- [ ] Ensure all page transitions use Framer Motion
- [ ] Add loading skeleton states
- [ ] Add micro-interactions (button presses, form submissions)

### 8.2 Performance
- [ ] Ensure editor loads under 2 seconds
- [ ] Lazy load Monaco Editor
- [ ] Optimize images and assets
- [ ] Add code splitting for routes

### 8.3 Responsiveness
- [ ] Ensure landing page is mobile-friendly
- [ ] Show "Desktop recommended" message on IDE pages for mobile
- [ ] Test on various screen sizes

---

## Phase 9: Deployment

### 9.1 Frontend Deployment (Vercel)
- [ ] Configure Vercel project
- [ ] Set up environment variables
- [ ] Deploy production build

### 9.2 Backend Deployment (Render/Railway)
- [ ] Containerize backend with Docker
- [ ] Configure Render/Railway project
- [ ] Set up MongoDB Atlas connection
- [ ] Deploy with Docker support for code execution

### 9.3 Final Testing
- [ ] End-to-end test: Register → Login → Solve Problem → Submit
- [ ] Test leaderboard updates
- [ ] Test across browsers (Chrome, Firefox, Safari)
- [ ] Security audit: XSS prevention, secure code sandbox

---

## Future Features (Post-MVP)

- [ ] AI Code Review with GenAI hints
- [ ] "Code Clash" real-time multiplayer mode
- [ ] Social features (follow users, share solutions)
- [ ] Premium subscription with advanced challenges
- [ ] Company-sponsored challenges (hiring pipeline)

---

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| UI Components | Shadcn/UI + Lucide Icons |
| Code Editor | Monaco Editor |
| Sandbox | Sandpack (frontend) + Docker (backend) |
| Backend | Node.js + Express |
| Database | MongoDB (Atlas) |
| Auth | JWT + Passport.js |
| Testing | Jest/Vitest + Puppeteer/Playwright |
| Deployment | Vercel (FE) + Render/Railway (BE) |
