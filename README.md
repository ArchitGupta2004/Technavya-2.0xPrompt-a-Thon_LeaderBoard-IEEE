# Technavya 2.0 × Prompt‑A‑Thon Leaderboard

A **production‑ready, real‑time leaderboard application** built for the **Technavya 2.0 × Prompt‑A‑Thon** event at **GLA University**. This system enables live score tracking, seamless administration, and instant data export — all without the overhead of a traditional database.

---

## ✨ Key Highlights

- **Real‑Time Leaderboard** – Live ranking updates with zero refresh
- **Admin Dashboard** – Secure interface for managing teams and scores
- **Score Controls** – One‑click increments and manual score editing
- **Responsive UI** – Optimized for desktop, tablet, and mobile devices
- **Secure REST API** – Backend endpoints protected by admin authentication
- **Zero DB Setup** – Uses a secure local JSON‑based storage system
- **Excel Export** – Download leaderboard data instantly as `.xlsx`

---

## 🚀 Getting Started

### Option 1: Automated Startup (Recommended)
Run the platform‑specific startup script. It installs dependencies and launches both frontend and backend automatically.

- **Windows:** `start.bat`
- **Linux / macOS:** `./start.sh`
- **PowerShell:** `start.ps1`

---

### Option 2: Manual Startup
If you prefer full control, start the backend and frontend separately.

#### Backend
```bash
cd backend
npm install
npm run dev
```
Backend will start at: **http://localhost:5000**

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend will start at: **http://localhost:5173**

Open your browser and visit:
👉 **http://localhost:5173**

---

## 📁 Project Structure

```
Technavya-2.0xPrompt-a-Thon_LeaderBoard-IEEE/
├── frontend/                    # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/          # Admin, Leaderboard, Login, Header
│   │   ├── App.jsx              # Main application router
│   │   └── main.jsx             # Frontend entry point
│   └── package.json
│
├── backend/                     # Node.js + Express API
│   ├── database.json            # Local JSON database (auto‑generated)
│   ├── database.backup.json     # Automatic backup file
│   ├── server.js                # API logic, security & file handling
│   └── package.json
│
├── start.bat                    # Windows startup script
├── start.sh                     # Linux/macOS startup script
└── start.ps1                    # PowerShell startup script
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18** (Vite)
- **Tailwind CSS** – Styling
- **Lucide React** – Icons

### Backend
- **Node.js**
- **Express.js**
- **File System (fs)** – JSON‑based storage
- **ExcelJS** – Excel report generation

### Database
- **Local JSON Storage** – No MongoDB or external DB required

---

## 🔐 Admin Access

- Navigate to the login page and click **“Admin”**
- **Default Password:** `admin123`

> 🔒 **Security Note:**
> Change the default password in:
> - `backend/server.js`
> - `frontend/src/components/Admin.jsx`

---

## 🐛 Troubleshooting

### CORS Issues
- Ensure `FRONTEND_URL` in the backend `.env` file matches your frontend URL
- Confirm backend is running on port **5000**

### Port Conflicts
- Backend default: **5000**
- Frontend default: **5173**

If ports are in use, stop conflicting processes or update:
- `backend/server.js`
- `frontend/vite.config.js`

### Data Not Saving
- Ensure write permissions are enabled for the `backend/` directory
- Check terminal logs for file permission errors

---

## 👥 Credits & Links

Developed for **Technavya 2.0 × Prompt‑A‑Thon**

- 🏫 **GLA University**
- 🌐 **Technavya Official Platform**

---

> Built with ❤️ for competitive innovation and real‑time collaboration by IEEE @ GLA University
> 
