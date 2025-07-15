require('dotenv').config();
const express = require('express');
const { connectDB } = require('./Database/mongo');
const userRoutes = require('./route/UserRoute');

const app = express();
app.use(express.json());

// Example root route
app.get('/', (req, res) => {
  res.send(`Server running on port ${process.env.PORT || 5000}`);
});

// Use user routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
  });
});
