import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Defined inside useEffect to prevent "missing dependency" warnings
    const fetchData = async () => {
      try {
        // FIX: Use brackets ['BACKEND_CONFIG'] to stop the red underline
        const config = window['BACKEND_CONFIG'];
        const API_URL = config ? config.API_URL : "http://localhost:5000";
        
        const res = await fetch(`${API_URL}/leaderboard`);
        const data = await res.json();
        data.sort((a, b) => b.score - a.score);
        setTeams(data);
      } catch {
        console.error("Leaderboard fetch failed");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // Live update every 3s
    return () => clearInterval(interval);
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 pb-14">
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search for a team..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 shadow-lg"
        />
      </div>

      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-3 bg-slate-800 p-4 text-slate-300 font-semibold">
          <span>Rank</span>
          <span>Team</span>
          <span className="text-right">Score</span>
        </div>

        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => {
            const actualRank = teams.findIndex(t => t._id === team._id) + 1;
            
            return (
              <div
                key={team._id}
                className="grid grid-cols-3 p-4 border-b border-slate-800 text-white hover:bg-slate-800 transition-colors"
              >
                <span className="font-bold text-cyan-400">#{actualRank}</span>
                <span>{team.name}</span>
                <span className="text-right font-semibold text-xl">{team.score}</span>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-slate-500">
            No teams found
          </div>
        )}
      </div>

    </div>
  );
};

export default Leaderboard;