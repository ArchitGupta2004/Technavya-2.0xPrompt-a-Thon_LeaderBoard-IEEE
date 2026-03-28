import { useState, useEffect } from "react";

const Admin = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [score, setScore] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // USE DYNAMIC URL
  const API_URL = window.BACKEND_CONFIG ? window.BACKEND_CONFIG.API_URL : "http://localhost:5000";
  const ADMIN_PASSWORD = "admin123";

  const fetchTeams = async () => {
    try {
      const res = await fetch(`${API_URL}/leaderboard`);
      const data = await res.json();
      setTeams(data);
    } catch {
      setMessage("Failed to fetch teams");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const downloadExcel = async () => {
    try {
      const res = await fetch(`${API_URL}/leaderboard/export`);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const now = new Date();
      const timestamp = now.toISOString().slice(0, 19).replace(/:/g, "-").replace("T", "_");
      const a = document.createElement("a");
      a.href = url;
      a.download = `TechNavya_Leaderboard_${timestamp}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      return true;
    } catch {
      setMessage("Error downloading file");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) { setMessage("Team name is required"); return; }

    const teamData = { name: teamName, score: parseInt(score) || 0 };

    try {
      let success = false;
      const headers = { "Content-Type": "application/json", "x-admin-password": ADMIN_PASSWORD };
      
      if (editingId) {
        const res = await fetch(`${API_URL}/leaderboard/${editingId}`, { method: "PUT", headers, body: JSON.stringify(teamData) });
        if (res.ok) { setMessage("Team updated!"); setEditingId(null); success = true; }
      } else {
        const res = await fetch(`${API_URL}/leaderboard`, { method: "POST", headers, body: JSON.stringify(teamData) });
        if (res.ok) { setMessage("Team created!"); success = true; }
      }

      if (success) {
        setTeamName(""); setScore(""); await fetchTeams(); setTimeout(() => setMessage(""), 5000);
      }
    } catch {
      setMessage("Error saving team");
    }
  };

  const handleEdit = (team) => {
    setEditingId(team._id);
    setTeamName(team.name);
    setScore(team.score);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this team?")) {
      try {
        const res = await fetch(`${API_URL}/leaderboard/${id}`, { method: "DELETE", headers: { "x-admin-password": ADMIN_PASSWORD } });
        if (res.ok) { setMessage("Team deleted!"); await fetchTeams(); setTimeout(() => setMessage(""), 5000); }
      } catch { setMessage("Error deleting team"); }
    }
  };

  const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div><h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Admin</h1></div>
          <button onClick={downloadExcel} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">📊 Download Excel</button>
        </div>

        {message && <div className="mb-6 p-4 rounded-lg bg-cyan-900/50 border border-cyan-500 text-cyan-200">{message}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Team" : "Add Team"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team name" className="w-full bg-slate-700 border border-slate-600 rounded p-2" />
                <input type="number" value={score} onChange={(e) => setScore(e.target.value)} placeholder="Score" className="w-full bg-slate-700 border border-slate-600 rounded p-2" />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-700 py-2 rounded">{editingId ? "Update" : "Add"}</button>
                  {editingId && <button type="button" onClick={() => {setEditingId(null); setTeamName(""); setScore("");}} className="px-4 bg-slate-600 rounded">Cancel</button>}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <input type="text" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 mb-4" />
            <div className="space-y-4">
              {filteredTeams.map((team, idx) => (
                <div key={team._id} className="bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-slate-700">
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-400 font-bold">#{idx + 1}</span>
                    <h3 className="font-bold">{team.name}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold">{team.score}</span>
                    <button onClick={() => handleEdit(team)} className="text-blue-400 hover:text-blue-300">Edit</button>
                    <button onClick={() => handleDelete(team._id)} className="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;