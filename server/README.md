Reverie - Server

This folder contains a minimal Express + Mongoose backend for the Reverie app.

Features
- JWT auth (register/login/me)
- Atmosphere CRUD with visibility rules
- Favorites for users
- Seed script for preset atmospheres

Setup
1. Copy `.env.example` to `.env` and set values (MONGO_URI, JWT_SECRET, PORT)
2. npm install
3. npm run dev
4. To seed demo data: npm run seed

Notes
- Images are stored as URLs for now; Cloudinary integration can be added later.
