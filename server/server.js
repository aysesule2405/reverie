const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static file serving ───────────────────────────────────────────────────────
// Uploaded images and audio are served at /uploads/...
// e.g. GET /uploads/images/abc.jpg returns the file from server/uploads/images/abc.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Database connection ───────────────────────────────────────────────────────
connectDB();

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',        require('./routes/authRoutes'));
app.use('/api/atmospheres', require('./routes/atmosphereRoutes'));
app.use('/api/comments',    require('./routes/commentRoutes'));
app.use('/api/favorites',   require('./routes/favoriteRoutes'));
app.use('/api/community',   require('./routes/communityRoutes'));
app.use('/api/profile',     require('./routes/profileRoutes'));
app.use('/api/library',     require('./routes/libraryRoutes'));

// ── Global error handler ──────────────────────────────────────────────────────
app.use(require('./middleware/errorMiddleware'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Reverie server listening on port ${PORT}`));
