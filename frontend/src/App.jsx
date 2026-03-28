import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import Admin from "./components/Admin.jsx";
import Login from "./components/Login.jsx";

function App() {
  const [view, setView] = useState("leaderboard"); // "leaderboard" or "admin"
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Check if admin is already logged in (from localStorage)
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth === "true") {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem("adminAuthenticated", "true");
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    setView("leaderboard");
  };

  // Show login if trying to access admin without authentication
  if (view === "admin" && !isAdminAuthenticated) {
    return (
      <Login 
        onLogin={handleAdminLogin} 
        onBack={() => setView("leaderboard")} // <--- ADDED THIS PROP
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      {/* Navigation Tabs */}
      <div className="border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 flex gap-4 justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => setView("leaderboard")}
              className={`py-4 px-6 font-semibold border-b-2 transition-all duration-300 ${
                view === "leaderboard"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              🏆 Leaderboard
            </button>
            <button
              onClick={() => setView("admin")}
              className={`py-4 px-6 font-semibold border-b-2 transition-all duration-300 ${
                view === "admin"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              ⚙️ Admin
            </button>
          </div>
          
          {/* Logout Button */}
          {view === "admin" && isAdminAuthenticated && (
            <button
              onClick={handleAdminLogout}
              className="py-2 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 text-sm whitespace-nowrap"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {view === "leaderboard" ? (
        <>
          <section className="text-center py-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Live Leaderboard
            </h1>
          </section>
          <Leaderboard />
        </>
      ) : (
        <Admin />
      )}
    </div>
  );
}

export default App;