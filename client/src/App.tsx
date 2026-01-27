import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { HomePage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Future routes */}
          <Route path="/problems" element={<ComingSoon title="Problems" />} />
          <Route path="/leaderboard" element={<ComingSoon title="Leaderboard" />} />
          <Route path="/profile" element={<ComingSoon title="Profile" />} />
          <Route path="/login" element={<ComingSoon title="Login" />} />
          <Route path="/signup" element={<ComingSoon title="Sign Up" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

// Placeholder for routes we'll implement next
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-slate-400">Coming soon in Phase 2...</p>
      </div>
    </div>
  );
}

export default App;
