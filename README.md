
  # Reverie — full-stack Atmosphere app

Project overview
----------------

- Title of Project: Reverie — a nostalgic atmosphere creator
- Table Number: 13

Elevator pitch
--------------

Rediscover emotional comfort through curated atmospheres — users sign up, craft moodscapes with images and song links, explore presets, and save favorites for gentle, nostalgic wellness.

What's your idea? (short tagline)
--------------------------------

Comfortable digital spaces to calm, focus, and reminisce.

Built with (TECH STACK)
-----------------------

- Frontend: React + Vite, TypeScript
- Styling: Tailwind CSS + project UI components
- Backend: Node.js + Express
- Database: MongoDB Atlas (Mongoose ODM)
- Auth: JWT-based auth (jsonwebtoken)
- Dev tooling: Vite, nodemon, concurrently

Thumbnail image
---------------

Include a 3:2 JPG/PNG/GIF in the repo (recommended path: `/assets/thumbnail.jpg`) and reference it here. Example (replace with your file):

![Reverie thumbnail](/src/assets/573cbd7ceaaa6d73a84668028329e1776130e659.png)

About the project
-----------------

Track Category: Wellness / Mental Health / Experience Design

Inspiration
- Inspired by gentle, nostalgic scenes (Ghibli-like landscapes) and the desire for small, calming digital rituals.

What it does
- Users can register and log in, create atmospheres (title, images, songs, tags), browse public presets, view details, favorite atmospheres, and manage their own creations.

How we built it
- Frontend: reused the existing Reverie component library and added pages and an Auth context to connect to a backend API.
- Backend: Express + Mongoose provides secure endpoints for auth, atmospheres, and favorites. Seed data provides demo presets.
- Audio: ambient sounds live in `/public/sounds/*` and are played on atmosphere entry.

Challenges we ran into
- Managing asset import conventions across Vite and Figma exports required switching to local asset paths for reliability.
- Browser autoplay restrictions for audio required gating playback on user gestures (we implemented a reliable, user-triggered play flow).

Accomplishments we’re proud of
- Preserved the project's emotional UI/UX while converting it into a full-stack, demo-able app.
- Small, production-style backend with authentication, seeded presets, and favorite management.

What we learned
- How to turn a design-first repo into a working full-stack prototype quickly.
- Small UX details (audio, onboarding) matter for perceived polish.

Video demo of project features & functionality
--------------------------------------------

Upload a ~2-minute demo to YouTube and paste the link here:

YouTube demo: [PASTE DEMO LINK HERE]

Link to Source Code (MANDATORY)
--------------------------------

Public repository: https://github.com/aysesule2405/reverie

Participants
------------
- Full name (Team member 1)
- Full name (Team member 2)

Live Deployment (optional)
-------------------------

If you deploy the app, paste the URL here:

Live demo: [OPTIONAL DEPLOYMENT LINK]

How to run locally (developer notes)
-----------------------------------

Prerequisites
- Node.js (v18+) and npm
- MongoDB Atlas or local MongoDB instance

Install & run
1. Install frontend dependencies (repo root):

   npm install

2. Install & configure server:

   cd server
   npm install
   cp .env.example .env
   # Edit server/.env and set MONGO_URI and JWT_SECRET (PORT defaults to 5001)

3. Start backend (dev):

   cd server
   npm run dev

4. Start frontend (dev, opens browser):

   # in repo root
   npm run dev:client

5. Or run both together:

   npm run dev:all

Environment variables
- server/.env (required):
  - PORT=5001 (default)
  - MONGO_URI=your_mongodb_atlas_connection_string
  - JWT_SECRET=your_jwt_secret
  - CLIENT_URL=http://localhost:5173

- root .env (optional):
  - VITE_API_BASE=http://localhost:5001/api

Seed data
- To populate demo atmospheres (demo user and presets):

  cd server
  npm run seed

Notes
- Audio autoplay may be blocked by browsers until the user interacts with the page — click "Begin" or enter an atmosphere to enable sounds.

Judging checklist (make sure you include these before submission)
- Project overview with table number (this file)
- 2-minute YouTube demo link
- Public Git repository link (this repository)
- Team member full names listed above
- README with run instructions (this file)

Contact
-------
If the judges or mentors need to reach the team, add a contact email here.


Run both servers
---------------

  To run frontend and backend together from the project root (recommended during development):

    npm run dev:all

  Notes about ports
  - Backend: http://localhost:5001 (server default)
  - Frontend: http://localhost:5173 (Vite)

Alternatively run client and server separately in two terminals:

  npm run dev:client
  # in another terminal
  npm run dev:server

  