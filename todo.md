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
- [x] Create global CSS variables for the "Glassmorphic IDE" theme
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
- [x] Create hero layout with centered text + floating code card
- [x] Implement "floating levitation" animation (y-axis bob)
- [x] Add mesh gradient background blobs (cyan + violet)
- [x] Style gradient text ("Master Web Dev In The Arena")
- [x] Add CTA button with glow hover effect

### 2.2 Features Bento Grid
- [x] Build Bento Grid layout (large, tall, small boxes)
- [x] Create "Real-time IDE" feature card with mock browser window
- [x] Create "Leaderboard" feature card with glowing rank badges
- [x] Create "Speed" feature card with radial performance graph
- [ ] Add scroll-reveal staggered animations on outer grid cards (`whileInView` on container)

### 2.3 Additional Sections
- [x] Build "How It Works" section with step indicators
- [x] Build footer with navigation and social links
- [ ] Apply `.noise-overlay` class on body/layout (CSS added but not yet applied)

---

## Phase 3: Authentication System

### 3.1 Backend Auth (JWT + Passport.js)
- [x] Set up Express.js server structure
- [x] Configure MongoDB connection (Mongoose)
- [x] Create `User` schema (email, password hash, scores, rank, badges)
- [x] Implement `/api/auth/register` endpoint
- [x] Implement `/api/auth/login` endpoint (returns JWT)
- [x] Implement `/api/auth/me` endpoint (protected, returns user profile)
- [x] Add password hashing (bcrypt)
- [x] Add JWT middleware for protected routes

### 3.2 Frontend Auth Pages
- [x] Create Login page with glassmorphic form
- [x] Create Signup page with validation
- [x] Implement auth context/state management
- [x] Add protected route wrapper component (`ProtectedRoute.tsx`)
- [x] Handle JWT storage (secure localStorage)

---

## Phase 4: Problem System

### 4.1 Problem Schema & API
- [x] Create `Problem` schema
- [x] Create `Submission` schema
- [x] Implement `/api/problems` (list all problems)
- [x] Implement `/api/problems/:id` (get single problem with starter code)
- [x] Implement `/api/submissions` (create submission, get user history)

### 4.2 Problem List Page
- [x] Build problem cards with difficulty badges
- [x] Add category filter (React, CSS, Node.js)
- [x] Add difficulty filter (Easy, Medium, Hard)
- [x] Add search functionality
- [x] Show user's completion status per problem (green "Solved" badge)

---

## Phase 5: The IDE (Core Feature)

### 5.1 Monaco Editor Integration
- [x] Install `@monaco-editor/react`
- [x] Configure editor themes (codehub-dark custom theme)
- [x] Enable JSX, CSS, JavaScript language support
- [x] Add TypeScript IntelliSense
- [x] Configure keyboard shortcuts
- [x] Add skeleton loading state while Monaco downloads

### 5.2 Split-Pane Layout
- [x] Create resizable split-pane component
- [x] Left pane: Monaco Editor
- [x] Right pane: Preview iframe / Console output
- [ ] Add tabs for multiple files (if needed)

### 5.3 Live Preview (Sandpack)
- [x] Install `@codesandbox/sandpack-react`
- [x] Configure Sandpack provider for React projects
- [x] Pipe Monaco editor content into Sandpack bundler
- [x] Display live preview in right pane
- [x] Handle bundling errors gracefully

### 5.4 Console Output (for Backend Challenges)
- [x] Create console output component
- [x] Display `console.log` outputs
- [x] Display test results (pass/fail with details — `TestResults.tsx`)

---

## Phase 6: Grading System

### 6.1 Backend Grading (grader.ts)
- [x] JavaScript grading via vm sandbox (with function + output comparison)
- [x] CSS grading via pattern matching (properties, selectors)
- [x] React grading via pattern matching & component checks
- [x] Node.js grading via pattern matching (Express routes, middleware)
- [x] Docker sandbox (`dockerSandbox.ts`) with vm fallback when Docker unavailable
- [x] Dockerfile + `run.js` for containerized execution
- [x] Timeout + memory limits
- [ ] Set up Puppeteer/Playwright visual grading (Phase 6.2 — stretch goal)
- [ ] Build Docker image and test E2E orchestration

### 6.2 Frontend Grading UI
- [x] `TestResults.tsx` — per-test pass/fail, expected vs actual, hint expansion
- [x] Auto-scroll to results after submission
- [x] Confetti animation when all tests pass
- [x] `AnimatePresence` exit animation on test results

---

## Phase 7: Competitive Features

### 7.1 Leaderboard
- [x] `/api/leaderboard` endpoint (top N users)
- [x] Build leaderboard page with glassmorphic user cards + rank badges
- [x] Show current user's position (highlighted row)
- [x] Skeleton loading state for leaderboard
- [ ] Calculate Elo rating or weighted scoring formula

### 7.2 User Profile
- [x] Create profile page (`ProfilePage.tsx`) for logged-in user
- [x] Display global rank, total problems solved
- [x] Display skill badges ("CSS Wizard", "API Architect")
- [x] Show submission history on profile

### 7.3 Public User Profile
- [x] `/api/leaderboard/user/:username` endpoint
- [x] `UserProfilePage.tsx` — rank-colored avatar, badges grid, solved problems
- [x] Skeleton loading state
- [ ] Add coding activity heatmap (like GitHub)

### 7.4 Submission Metrics
- [x] Track execution time per submission (stored in Submission model)
- [ ] Track code character count (optimization metric)
- [ ] Show percentile rankings per problem

---

## Phase 8: Polish & Optimization

### 8.1 Animations
- [x] Glass shimmer hover effect on cards (`.shimmer-effect` CSS class)
- [x] Confetti CSS animation (`confetti-fall` + `.confetti-particle`)
- [x] Page transitions (`animate-page-enter`, Framer Motion `initial`/`animate`)
- [x] Loading skeleton states (problems grid, leaderboard table, Monaco editor)
- [x] Micro-interactions (hover scale on badges, whileHover on emojis)
- [ ] Add scroll-reveal stagger animation to outer Features Bento grid cards

### 8.2 Performance
- [x] Monaco Editor lazy load via `loading` prop with skeleton
- [ ] Code splitting for routes (React.lazy + Suspense per page)
- [ ] Optimize production bundle size analysis
- [ ] Ensure editor loads under 2 seconds (benchmark)

### 8.3 Responsiveness
- [ ] Ensure landing page is fully mobile-friendly
- [ ] Show "Desktop recommended" banner on IDE pages for mobile users
- [ ] Test on various screen sizes (320px, 768px, 1024px, 1440px)

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
| UI Components | Lucide Icons + Custom GlassCard/Button |
| Code Editor | Monaco Editor |
| Sandbox | Sandpack (frontend) + Docker/vm (backend) |
| Backend | Node.js + Express |
| Database | MongoDB (Atlas) |
| Auth | JWT + bcrypt |
| Deployment | Vercel (FE) + Render/Railway (BE) |
