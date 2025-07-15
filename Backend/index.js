require('dotenv').config();
const express = require('express');
const { connectDB } = require('./Database/mongo');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
  });
});
