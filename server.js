const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

// ✅ TELEGRAM JOIN
app.post('/bot/join', (req, res) => {
  const { username } = req.body;

  let existing = users.find(u => u.wallet === username);

  if (!existing) {
    users.push({
      wallet: username,
      ref: null,
      points: 5
    });
  }

  res.json({ message: "Telegram user added" });
});

// ✅ LEADERBOARD
app.get('/bot/leaderboard', (req, res) => {
  const sorted = [...users].sort((a, b) => b.points - a.points);
  res.json(sorted.slice(0, 10));
});

// ✅ AIRDROP JOIN (WEB)
app.post('/join', (req, res) => {
  const { wallet, ref } = req.body;

  let existingUser = users.find(u => u.wallet === wallet);

  if (!existingUser) {
    users.push({ wallet, ref, points: 0 });

    if (ref) {
      let refUser = users.find(u => u.wallet === ref);
      if (refUser) {
        refUser.points += 10;
      }
    }
  }

  res.json({ message: "Joined airdrop" });
});

// ✅ USERS
app.get('/users', (req, res) => {
  res.json(users);
});

// ✅ START SERVER (ALWAYS LAST)
app.listen(5000, () => console.log("Backend running on port 5000"));