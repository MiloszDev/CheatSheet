const express = require("express");
const multer = require("multer");
const CheatSheet = require("../models/cheatSheet");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/cheatsheets", async (req, res) => {
  try {
    const cheatSheets = await CheatSheet.find();
    res.json(cheatSheets);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/cheatsheets", upload.single("file"), async (req, res) => {
  const { title } = req.body;
  const filePath = req.file.path;

  try {
    const newCheatSheet = new CheatSheet({ title, filePath });
    await newCheatSheet.save();
    res.status(201).json(newCheatSheet);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/cheatsheets/:id", async (req, res) => {
  try {
    const cheatSheet = await CheatSheet.findById(req.params.id);
    if (!cheatSheet)
      return res.status(404).json({ message: "Cheat Sheet not found" });

    // Send the content of the cheat sheet file
    res.sendFile(path.resolve(__dirname, `../${cheatSheet.filePath}`));
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
