import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import ExcelJS from 'exceljs';

dotenv.config();

const app = express();

// 🔐 Admin password
const ADMIN_PASSWORD = "admin123";

// 📁 Setup file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');
const BACKUP_FILE = path.join(__dirname, 'database.backup.json');

// 📖 Read DB
const readDb = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// ✍️ Write DB with backup
const writeDb = async (data) => {
  try {
    const currentData = await fs.readFile(DB_FILE, 'utf8');
    await fs.writeFile(BACKUP_FILE, currentData);
  } catch (e) {}
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
};

// 🧠 Initialize DB
(async () => {
  try {
    await fs.access(DB_FILE);
  } catch {
    await writeDb([]);
    console.log('✓ Created local database.json');
  }
})();

// 🌐 Middleware
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));

// 🔐 Auth Middleware
const requireAuth = (req, res, next) => {
  if (req.method === 'GET') return next();
  const authHeader = req.headers['x-admin-password'];
  if (authHeader === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized: Incorrect Password' });
  }
};
app.use(requireAuth);



// ================= ROUTES =================

// ✅ ROOT ROUTE (VERY IMPORTANT FOR RENDER)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// 📊 Export Excel
app.get('/leaderboard/export', async (req, res) => {
  try {
    const teams = await readDb();
    teams.sort((a, b) => b.score - a.score);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Leaderboard');

    worksheet.columns = [
      { header: 'Rank', key: 'rank', width: 10 },
      { header: 'Team Name', key: 'name', width: 30 },
      { header: 'Score', key: 'score', width: 15 },
      { header: 'Last Updated', key: 'updatedAt', width: 25 }
    ];

    teams.forEach((team, index) => {
      worksheet.addRow({
        rank: index + 1,
        name: team.name,
        score: team.score,
        updatedAt: new Date(team.updatedAt).toLocaleString()
      });
    });

    worksheet.getRow(1).font = { bold: true };

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=leaderboard.xlsx');

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    res.status(500).json({ error: 'Failed to generate excel file' });
  }
});


// 📋 Get leaderboard
app.get('/leaderboard', async (req, res) => {
  const teams = await readDb();
  teams.sort((a, b) => b.score - a.score);
  res.json(teams);
});


// ➕ Add team
app.post('/leaderboard', async (req, res) => {
  const { name, score } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Team name is required' });
  }

  const teams = await readDb();

  if (teams.find(t => t.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ error: 'Team name already exists' });
  }

  const newTeam = {
    _id: Date.now().toString(),
    name,
    score: Number(score) || 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  teams.push(newTeam);
  await writeDb(teams);

  res.status(201).json(newTeam);
});


// ✏️ Update team
app.put('/leaderboard/:id', async (req, res) => {
  const { name, score } = req.body;

  const teams = await readDb();
  const index = teams.findIndex(t => t._id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Team not found' });
  }

  if (name) teams[index].name = name;
  if (score !== undefined) teams[index].score = score;

  teams[index].updatedAt = new Date();

  await writeDb(teams);
  res.json(teams[index]);
});


// ❌ Delete team
app.delete('/leaderboard/:id', async (req, res) => {
  let teams = await readDb();

  const initialLength = teams.length;
  teams = teams.filter(t => t._id !== req.params.id);

  if (teams.length === initialLength) {
    return res.status(404).json({ error: 'Team not found' });
  }

  await writeDb(teams);
  res.json({ message: 'Team deleted successfully' });
});


// ================= SERVER START =================

// 🔥 IMPORTANT FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n✓ Server started on PORT: ${PORT}`);
  console.log(`✓ Database: Local JSON\n`);
});