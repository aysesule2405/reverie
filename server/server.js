const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/atmospheres', require('./routes/atmosphereRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));

// Error handler
app.use(require('./middleware/errorMiddleware'));

app.listen(PORT, () => {
  console.log(`Reverie server listening on port ${PORT}`);
});
