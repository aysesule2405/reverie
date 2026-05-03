<p align="center">
  <img src="src/assets/logos/light-reverie-written-logo.png#gh-light-mode-only" height="80" alt="Reverie" />
  <img src="src/assets/logos/dark-reverie-written-logo.png#gh-dark-mode-only" height="80" alt="Reverie" />
</p>

<p align="center">
  <img src="src/assets/logos/light-reverie-logo.png#gh-light-mode-only" height="60" alt="Reverie icon" />
  <img src="src/assets/logos/dark-reverie-logo.png#gh-dark-mode-only" height="60" alt="Reverie icon" />
</p>

# Reverie Web App

## Description

Reverie is a mood space and memory curation web application where users can create personalized emotional environments using music, visuals, videos, and reflections. It allows users to organize moods, store memories, and explore both private and public mood spaces in a calm and immersive digital space. Built as a full-stack MERN application for a Back-End Web Development course.

---

## Tech Stack

- HTML5
- CSS3
- TypeScript
- React 18 + Vite
- Tailwind CSS v4
- React Router v7
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Multer (file uploads)
- concurrently

---

## Features

- User sign up and login with JWT authentication
- Private and public mood spaces with full CRUD
- Per-user data isolation (users only see their own spaces)
- Image, audio, and video file uploads (mp4, webm, mov)
- Personal media library with image, video, and audio management
- Background music playlist with volume and loop controls
- Ambient music player embedded in the sidebar
- Mood timeline with date and visibility filters
- Community page with public mood spaces
- Comments, likes, and saved mood spaces
- Search and filter by title, category, and mood
- Color palette builder per mood space
- AI mood board prompt and result field
- Profile management with photo upload
- Light and dark mode
- Responsive layout (desktop sidebar + mobile hamburger nav)

---

## Screenshots

### Landing Page

<img src="public/screenshots/Screenshot 1 - Home Screen 1.png" width="100%" alt="Landing page hero" />

<table>
  <tr>
    <td width="50%"><img src="public/screenshots/Screenshot 2 - Home Screen 2.png" alt="Landing page — How It Works" width="100%" /></td>
    <td width="50%"><img src="public/screenshots/Screenshot 3 - Home Screen 3.png" alt="Landing page — Public moodboards" width="100%" /></td>
  </tr>
</table>

### Authentication

<img src="public/screenshots/Screenshot 4 - Sign Up Screen.png" width="100%" alt="Sign Up screen" />

### My Spaces (Dashboard)

<img src="public/screenshots/Screenshot 5 - My Spaces.png" width="100%" alt="Dashboard — My Spaces" />

### Community

<img src="public/screenshots/Screenshot 6 - Community.png" width="100%" alt="Community page" />

### Saved Spaces & Timeline

<table>
  <tr>
    <td width="50%"><img src="public/screenshots/Screenshot 7 - Saved.png" alt="Saved Spaces" width="100%" /></td>
    <td width="50%"><img src="public/screenshots/Screenshot 8 - Timeline.png" alt="Mood Timeline" width="100%" /></td>
  </tr>
</table>

### Library & Create New

<table>
  <tr>
    <td width="50%"><img src="public/screenshots/Screenshot 9 - Library.png" alt="Personal Media Library" width="100%" /></td>
    <td width="50%"><img src="public/screenshots/Screenshot 10 - Create New.png" alt="Create New Mood Space" width="100%" /></td>
  </tr>
</table>

### Profile & Database

<table>
  <tr>
    <td width="50%"><img src="public/screenshots/Screenshot 11 - Profile.png" alt="Profile page" width="100%" /></td>
    <td width="50%"><img src="public/screenshots/Screenshot 12 - MongoDB Dataview.png" alt="MongoDB Atlas data view" width="100%" /></td>
  </tr>
</table>

---

## How to Run

### Prerequisites

- Node.js >= 18
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repository

```bash
git clone <repo-url>
cd reverie
```

### 2. Install dependencies

```bash
# Root (frontend)
npm install

# Server (backend)
cd server && npm install && cd ..
```

### 3. Configure environment variables

Create `server/.env`:

```env
PORT=5001
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/reverie
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

### 4. Run the app

```bash
npm run dev:all
```

Or run frontend and backend separately:

```bash
# Terminal 1 — backend
npm run dev:server

# Terminal 2 — frontend
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. (Optional) Seed demo data

```bash
cd server && npm run seed
```

---

## API Routes

### Auth — `/api/auth`

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | — | Register a new user |
| `POST` | `/api/auth/login` | — | Log in, receive JWT |
| `GET` | `/api/auth/me` | ✓ | Get current user |

### Mood Spaces — `/api/atmospheres`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/atmospheres` | — | List public spaces (`?mine=true` for your own) |
| `GET` | `/api/atmospheres/timeline` | ✓ | Timeline view with date/mood filters |
| `GET` | `/api/atmospheres/:id` | — | Get a single mood space |
| `POST` | `/api/atmospheres` | ✓ | Create a mood space (multipart/form-data) |
| `PUT` | `/api/atmospheres/:id` | ✓ | Update a mood space (owner only) |
| `DELETE` | `/api/atmospheres/:id` | ✓ | Delete a mood space (owner only) |

### Profile — `/api/profile`

| Method | Route | Auth | Description |
|---|---|---|---|
| `PUT` | `/api/profile` | ✓ | Update name |
| `POST` | `/api/profile/photo` | ✓ | Upload profile photo |
| `GET` | `/api/profile/music` | ✓ | Get music playlist |
| `POST` | `/api/profile/music/upload` | ✓ | Upload a music track |
| `POST` | `/api/profile/music/link` | ✓ | Add a default or external track |
| `PUT` | `/api/profile/music/active` | ✓ | Set active track |
| `PUT` | `/api/profile/music/settings` | ✓ | Update volume and loop settings |
| `DELETE` | `/api/profile/music/:trackId` | ✓ | Remove a track |

### Community — `/api/community`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/community/spaces` | — | List all public mood spaces |
| `POST` | `/api/community/spaces/:id/like` | ✓ | Like or unlike a space |
| `POST` | `/api/community/spaces/:id/save` | ✓ | Save or unsave a space |

### Comments — `/api/comments`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/comments/:atmosphereId` | — | Get comments for a space |
| `POST` | `/api/comments/:atmosphereId` | ✓ | Post a comment |
| `DELETE` | `/api/community/spaces/:id/comments/:commentId` | ✓ | Delete a comment (owner or space owner) |

### Library — `/api/library`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/library` | ✓ | List user's media library items |
| `POST` | `/api/library/upload` | ✓ | Upload an image, video, or audio file |
| `POST` | `/api/library/link` | ✓ | Add an external media URL |
| `PUT` | `/api/library/:id` | ✓ | Rename a library item |
| `DELETE` | `/api/library/:id` | ✓ | Delete a library item |

### Saved Spaces — `/api/favorites`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/favorites` | ✓ | List saved spaces |
| `POST` | `/api/favorites/:atmosphereId` | ✓ | Save a space |
| `DELETE` | `/api/favorites/:atmosphereId` | ✓ | Unsave a space |

---

## Project Structure

```
reverie/
├── index.html
├── package.json              # Root: Vite + React dependencies
├── vite.config.ts            # Vite config with /api proxy
│
├── src/
│   ├── main.tsx
│   ├── api/
│   │   └── client.ts         # Fetch wrapper (auto-attaches JWT)
│   └── app/
│       ├── App.tsx
│       ├── AuthContext.tsx
│       ├── ThemeContext.tsx
│       ├── AmbientPlayerContext.tsx
│       ├── components/
│       │   └── layout/
│       │       ├── AppShell.tsx        # Sidebar layout + mobile nav
│       │       ├── AmbientPlayer.tsx   # Sidebar music player widget
│       │       └── ProtectedRoute.tsx
│       └── pages/
│           ├── Landing.tsx
│           ├── Login.tsx
│           ├── Signup.tsx
│           ├── Dashboard.tsx
│           ├── CreateMoodSpace.tsx
│           ├── EditMood.tsx
│           ├── MoodDetail.tsx
│           ├── Community.tsx
│           ├── SavedSpaces.tsx
│           ├── Timeline.tsx
│           ├── Library.tsx
│           └── Profile.tsx
│
└── server/
    ├── server.js
    ├── package.json
    ├── uploads/              # Multer file storage
    │   ├── images/
    │   ├── audio/
    │   ├── videos/
    │   ├── profiles/
    │   ├── music/
    │   └── library/
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── User.js
    │   ├── Atmosphere.js
    │   ├── MediaItem.js
    │   ├── Comment.js
    │   └── Favorite.js
    ├── controllers/
    │   ├── authController.js
    │   ├── atmosphereController.js
    │   ├── profileController.js
    │   ├── communityController.js
    │   ├── commentController.js
    │   ├── libraryController.js
    │   └── favoriteController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── atmosphereRoutes.js
    │   ├── profileRoutes.js
    │   ├── communityRoutes.js
    │   ├── commentRoutes.js
    │   ├── libraryRoutes.js
    │   └── favoriteRoutes.js
    └── middleware/
        ├── authMiddleware.js
        ├── upload.js
        └── errorMiddleware.js
```

---

## Rubric Checklist

- [x] Node.js + Express backend
- [x] MongoDB database (Atlas)
- [x] User authentication with bcrypt-hashed passwords
- [x] JWT-based session management
- [x] Full CRUD routes for mood spaces
- [x] File upload support (images, audio, video) with Multer
- [x] Per-user data isolation
- [x] Server-side and client-side form validation
- [x] Clean error handling with meaningful messages
- [x] Responsive design (desktop, tablet, mobile)
- [x] Professional README with API docs and setup instructions

---

## Author

Ayse Sule — Full-stack development, UI/UX design, authentication, CRUD, file uploads, deployment.
