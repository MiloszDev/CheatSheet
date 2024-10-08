const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const db = new sqlite3.Database("./database/cheatsheets.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

db.run(`CREATE TABLE IF NOT EXISTS cheatsheets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    file_path TEXT NOT NULL
)`);

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/api/cheatsheets", upload.single("file"), (req, res) => {
  const title = req.body.title;
  const filePath = req.file.path;

  db.run(
    `INSERT INTO cheatsheets (title, file_path) VALUES (?, ?)`,
    [title, filePath],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, title, filePath });
    }
  );
});

app.get("/api/cheatsheets", (req, res) => {
  db.all(`SELECT * FROM cheatsheets`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/api/cheatsheets/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM cheatsheets WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "Cheat sheet not found" });
    }

    const filePath = path.join(__dirname, row.file_path);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: "File not found" });
      }

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return res.status(500).json({ error: "Failed to read file" });
        }
        res.json({ title: row.title, content: data });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
