import { useState } from "react";

const Login = ({ onLogin, onBack }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      onLogin();
      setPassword("");
      setError("");
    } else {
      setError("Invalid password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Admin Login
          </h1>
          <p className="text-slate-400">Technavya 2.0 × Prompt-A-Thon Leaderboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>

              <button
                type="button"
                onClick={onBack}
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-3 px-4 rounded-lg transition-all duration-300"
              >
                ← Back to Leaderboard
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            🌐 <a href="https://www.technavya.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">TechNavya Official</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;