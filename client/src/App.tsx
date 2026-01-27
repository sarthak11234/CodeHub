import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <h1 className="text-5xl font-bold gradient-text mb-6">
                  CodeHub Arena
                </h1>
                <p className="text-slate-400 text-lg max-w-lg mb-8">
                  The infrastructure is now healthy. Starting to re-enable core modules.
                </p>
                <div className="flex gap-4">
                  <div className="glass px-8 py-3 text-white font-medium">
                    Glass Card Test
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
