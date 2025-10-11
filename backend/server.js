const express = require("express");
const path = require("path");
const app = express();
const PORT = 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let currentLetter = letters[Math.floor(Math.random() * letters.length)];

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/home.html"));
});

// API to get current letter
app.get("/letter", (req, res) => {
  res.send(currentLetter);
});

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, place, animal, thing } = req.body;

  // Ensure all fields are filled
  if (!name || !place || !animal || !thing) {
    return res.send("<h2>Fill all fields 😭</h2>");
  }

  let score = 0;
  [name, place, animal, thing].forEach(word => {
    if (word.trim()[0].toUpperCase() === currentLetter) score += 10;
  });

  // Generate a new letter for the next round
  currentLetter = letters[Math.floor(Math.random() * letters.length)];

  res.send(`
    <h2>Congrats! You scored ${score}/40 🎯</h2>
    <p>New letter: ${currentLetter}</p>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 NPAT server running at http://localhost:${PORT}`);
});
