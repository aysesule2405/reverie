# ✦ Reverie — Mood Space & Memory Curation Web App

> A dreamy, full-stack web application where users create private mood spaces — saving soundtracks, reflections, emotions, color themes, and AI mood board prompts as living memories.

---

## Summary

Reverie is a personal sanctuary for emotional memory curation. Users register for a private account, then build **Mood Spaces** — richly detailed records of how a moment felt: the music playing, the colors in the air, the reflection only they can see. Built as a full-stack MERN application for a Back-End Web Development course.

---

## Technologies Used

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite 6 | Build tool & dev server |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations |
| Radix UI / shadcn | Accessible UI primitives |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 4 | REST API server |
| MongoDB Atlas | Cloud document database |
| Mongoose 7 | ODM & schema validation |
| bcryptjs | Password hashing |
| JSON Web Tokens (JWT) | Stateless authentication |
| CORS | Cross-origin request handling |
| dotenv | Environment variable management |
| nodemon | Dev server auto-restart |

---

## Features

- **User authentication** — sign up, log in, stay logged in via JWT (7-day expiry)
- **Password security** — bcrypt-hashed passwords, never stored in plaintext
- **Private mood spaces** — full CRUD (create, read, update, delete)
- **Per-user data isolation** — each user only sees their own spaces
- **Rich mood space fields:**
  - Title, description, personal reflection
  - Category, mood tags & emotion labels
  - Cover image URL, gallery image URLs
  - Soundtrack links (Spotify, YouTube, etc.)
  - Color palette (up to 6 swatches)
  - AI mood board prompt & result
  - Public / private visibility toggle
- **Responsive layout** — desktop sidebar + mobile hamburger navigation
- **Profile management** — update display name and avatar URL
- **Search & filter** — search by title, filter by category
- **Form validation** — inline client-side and server-side error messages
- **Dreamy design system** — Ghibli-inspired soft palette, glass-morphism cards, ambient aurora effects

---

## Setup Instructions

### Prerequisites
- Node.js ≥ 18
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- `npm` or `yarn`

### 1. Clone the repository
```bash
git clone <repo-url>
cd reverie
```

### 2. Install root dependencies
```bash
npm install
```

### 3. Install server dependencies
```bash
cd server
npm install
cd ..
```

### 4. Configure environment variables

**Server** — create `server/.env`:
```env
PORT=5001
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/reverie
JWT_SECRET=your_super_secret_key_here
CLIENT_URL=http://localhost:5173
```

**Client** — create `.env` in the root (optional; Vite proxy handles local dev):
```env
VITE_API_BASE=http://localhost:5001/api
```

### 5. Run the app

Run both client and server concurrently:
```bash
npm run dev:all
```

Or separately:
```bash
# Terminal 1 — backend
npm run dev:server

# Terminal 2 — frontend
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. (Optional) Seed the database
```bash
cd server
npm run seed
```

---

## API Routes

### Auth — `/api/auth`

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | — | Register a new user |
| `POST` | `/api/auth/login` | — | Log in, receive JWT |
| `GET` | `/api/auth/me` | ✓ | Get current user |
| `PUT` | `/api/auth/profile` | ✓ | Update name & avatar |

### Mood Spaces — `/api/atmospheres`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/atmospheres` | — | List public spaces (add `?mine=true` for your own) |
| `GET` | `/api/atmospheres/:id` | — | Get a single space |
| `POST` | `/api/atmospheres` | ✓ | Create a mood space |
| `PUT` | `/api/atmospheres/:id` | ✓ | Update a mood space (owner only) |
| `DELETE` | `/api/atmospheres/:id` | ✓ | Delete a mood space (owner only) |

**Query params for `GET /api/atmospheres`:**
- `mine=true` — return the authenticated user's spaces (any visibility)
- `category=cozy` — filter by category
- `q=autumn` — search by title (case-insensitive)

### Favorites — `/api/favorites`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/favorites` | ✓ | List user's favorited spaces |
| `POST` | `/api/favorites/:atmosphereId` | ✓ | Add to favorites |
| `DELETE` | `/api/favorites/:atmosphereId` | ✓ | Remove from favorites |

---

## Project Structure

```
reverie/
├── index.html
├── package.json            # Root: Vite + React dependencies
├── vite.config.ts          # Vite config with /api proxy
│
├── src/
│   ├── main.tsx            # React entry point
│   ├── api/
│   │   └── client.ts       # Fetch wrapper (auto-attaches JWT)
│   ├── app/
│   │   ├── App.tsx         # Router setup
│   │   ├── AuthContext.tsx # Auth state & hooks
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AppShell.tsx       # Sidebar layout
│   │   │   │   └── ProtectedRoute.tsx # Auth guard
│   │   │   └── ui/                    # shadcn/Radix primitives
│   │   └── pages/
│   │       ├── Landing.tsx
│   │       ├── Login.tsx
│   │       ├── Signup.tsx
│   │       ├── Dashboard.tsx
│   │       ├── CreateMoodSpace.tsx
│   │       ├── MoodDetail.tsx
│   │       ├── EditMood.tsx
│   │       └── Profile.tsx
│   └── styles/
│       ├── index.css       # Style imports
│       ├── theme.css       # Ghibli-inspired design tokens
│       ├── fonts.css       # Google Fonts
│       └── tailwind.css    # Tailwind base
│
└── server/
    ├── server.js           # Express entry point
    ├── package.json        # Server dependencies
    ├── config/
    │   └── db.js           # MongoDB connection
    ├── models/
    │   ├── User.js
    │   ├── Atmosphere.js   # Mood space schema
    │   └── Favorite.js
    ├── controllers/
    │   ├── authController.js
    │   ├── atmosphereController.js
    │   └── favoriteController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── atmosphereRoutes.js
    │   └── favoriteRoutes.js
    ├── middleware/
    │   ├── authMiddleware.js  # JWT verification
    │   └── errorMiddleware.js
    └── seed/
        └── seedAtmospheres.js
```

---

## Team / Contributions

| Member | Contributions |
|---|---|
| **Ayse Sule** | Full-stack development — React frontend, Express/MongoDB backend, UI/UX design system, authentication, CRUD, deployment |

---

## Rubric Checklist

- [x] Node.js + Express backend
- [x] MongoDB database (Atlas)
- [x] User authentication with bcrypt-hashed passwords
- [x] JWT-based session management
- [x] Full CRUD routes for mood spaces
- [x] Per-user data isolation (users only see their own spaces)
- [x] Server-side and client-side form validation
- [x] Clean error handling with meaningful messages
- [x] Responsive design (desktop, tablet, mobile)
- [x] Professional README with API docs and setup instructions
- [x] Clean, organized, commented code

---

*Designed with softness & care — Reverie ✦*
