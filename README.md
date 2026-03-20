# 🚀 CodeHub

**CodeHub** is a premium, competitive learning platform dedicated to practical Web Development. Unlike traditional algorithm-heavy platforms, CodeHub focuses on real-world web skills. Users compete to solve frontend UI challenges and backend API logic problems within a high-performance, browser-based IDE.

![CodeHub Hero Placeholder](https://img.shields.io/badge/Design-Glassmorphic_IDE-blueviolet?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-MERN_|_TS_|_Tailwind_4-cyan?style=for-the-badge)

---

## ✨ Core Features

- **🎨 Visual & Architectural Challenges**: Focus on React, CSS, and API design rather than just DS&A.
- **💻 Browser-Based IDE**: Integrated Monaco Editor (powers VS Code) with syntax highlighting for JSX, CSS, and JS.
- **⚡ Real-Time Grading**: 
  - **Frontend**: Functional tests (Vitest/RTL) and Visual matching.
  - **Backend**: API validation via secure, isolated Docker sandboxes.
- **🏆 Competitive Mechanics**: Global leaderboards, Elo-based ranking, and performance metrics.
- **💎 Premium Aesthetic**: A "Cyber-Educational" design with glassmorphism, physics-based animations (Framer Motion), and a sleek dark theme.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **IDE Engine**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) + [@codesandbox/sandpack-react](https://sandpack.codesandbox.io/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Auth**: JWT-based authentication.
- **Sandbox**: Isolated [Docker](https://www.docker.com/) environment for safe code execution.

---

## 📂 Project Structure

CodeHub is organized as a monorepo using npm workspaces:

```text
CodeHub/
├── client/           # React + Vite frontend
├── server/           # Express + MongoDB backend
├── package.json      # Root configuration & scripts
└── PRD.txt           # Product Requirements Document
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or via Atlas)
- [Docker](https://www.docker.com/products/docker-desktop/) (Required for backend challenges)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CodeHub
   ```

2. Install dependencies for the entire project:
   ```bash
   npm install
   ```

3. Setup environment variables:
   - Create `.env` in `server/` (see `server/.env.example`).
   - Create `.env` in `client/` if needed.

### Running the App

Run both the frontend and backend concurrently:

```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🛣️ Roadmap

- [x] **Phase 1: MVP**: Basic Auth, Problem List, and Frontend (React/CSS) challenges.
- [ ] **Phase 2: Backend Arena**: Node.js/API challenges, Global Leaderboard, and User Profiles.
- [ ] **Phase 3: Advanced**: AI-powered code review, "Code Clash" multiplayer mode.

---

## 📄 License


---

**Built with ❤️ by [Sarthak](https://github.com/sarthak11234)**
