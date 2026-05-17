<div align="center">

# 🚀 AI Website Builder

### Turn thoughts into websites instantly — with the power of AI.

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-website--builder--topaz.vercel.app-6366f1?style=for-the-badge)](https://website-builder-topaz.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20PostgreSQL-0f172a?style=for-the-badge)](#tech-stack)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

<br/>

> A full-stack SaaS application that lets you generate, edit, version, and publish complete websites using **Gemini 2.5 Flash** — all from a single prompt.

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Website Generation** | Describe your website in plain English and get a fully styled, responsive HTML site instantly |
| ✏️ **AI Revisions** | Chat with the AI to request specific changes — colors, layout, content, animations |
| 🔄 **Version History** | Every generation is saved as a version; roll back to any previous state with one click |
| 👁️ **Live Preview** | Instant in-browser preview of your generated website via iframe |
| 🌐 **Publish & Share** | Toggle publish to make your site publicly accessible via a shareable link |
| 🏘️ **Community Gallery** | Browse published projects from the community for inspiration |
| 💳 **Credit System** | Built-in credit economy — each create/revise costs 5 credits; purchase more via plans |
| 🔐 **Auth (Better Auth)** | Secure email/password authentication with session management |

---

## 🖼️ Screenshots

> **Live App →** [website-builder-topaz.vercel.app](https://website-builder-topaz.vercel.app)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** + **Vite** | UI framework & build tool |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **React Router v7** | Client-side routing |
| **Better Auth UI** | Drop-in auth components |
| **Axios** | HTTP client |
| **Sonner** | Toast notifications |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** + **Express v5** | REST API server |
| **TypeScript** | Type safety |
| **Prisma ORM** | Database access layer |
| **PostgreSQL** | Relational database |
| **Better Auth** | Authentication & session management |
| **OpenAI SDK** (Gemini) | AI code generation via `gemini-2.5-flash` |
| **Stripe** | Payment processing (credit purchases) |

### Deployment
| Service | Purpose |
|---|---|
| **Vercel** | Frontend & Backend hosting |
| **PostgreSQL** (cloud) | Database (Neon / Supabase compatible) |

---

## 📁 Project Structure

```
ai-website-builder/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx        # Landing page with prompt input
│   │   │   ├── Projects.tsx    # AI builder workspace (chat + preview)
│   │   │   ├── MyProjects.tsx  # Dashboard of user's saved projects
│   │   │   ├── Community.tsx   # Public gallery of published sites
│   │   │   ├── Pricing.tsx     # Credit plans & pricing
│   │   │   ├── Preview.tsx     # Fullscreen website preview
│   │   │   └── View.tsx        # Public view of a published project
│   │   ├── components/         # Shared UI components (Navbar, Footer, etc.)
│   │   ├── configs/            # Axios instance config
│   │   ├── lib/                # Auth client setup
│   │   └── types/              # TypeScript type definitions
│   └── vercel.json             # SPA routing config for Vercel
│
└── server/                     # Express backend
    ├── controllers/
    │   ├── userController.ts   # Auth, project creation, credits, publishing
    │   └── projectController.ts# Revisions, rollback, preview, delete
    ├── routes/
    │   ├── userRoutes.ts       # /api/user/* routes
    │   └── projectRoutes.ts    # /api/project/* routes
    ├── lib/
    │   ├── auth.ts             # Better Auth configuration
    │   └── prisma.ts           # Prisma client singleton
    ├── configs/
    │   └── openai.ts           # OpenAI/Gemini client config
    ├── prisma/
    │   └── schema.prisma       # Database schema
    ├── middlewares/            # Auth middleware (userId injection)
    ├── app.ts                  # Express app setup & CORS config
    ├── server.ts               # Server entry point
    └── vercel.json             # Serverless function config for Vercel
```

---

## 🗄️ Database Schema

```
User ──< WebsiteProject ──< Conversation
                       ──< Version
User ──< Transaction
User ──< Session
User ──< Account
```

- **User** — stores credits (default: 20), total creations, auth info
- **WebsiteProject** — stores initial prompt, current HTML code, publish status
- **Conversation** — chat history between user & AI for each project
- **Version** — snapshot of HTML code at each revision (for rollback)
- **Transaction** — credit purchase history

---

## 🔄 How It Works

```
User enters prompt
       ↓
Backend receives prompt → deducts 5 credits
       ↓
Gemini 2.5 Flash enhances the prompt (better design details)
       ↓
Gemini 2.5 Flash generates complete standalone HTML with Tailwind CSS
       ↓
HTML saved to DB as WebsiteProject + Version
       ↓
Frontend polls for updates → renders live preview in iframe
       ↓
User requests revision → same AI pipeline with existing code as context
       ↓
User can rollback to any previous version at any time
       ↓
User publishes → project gets a public shareable URL
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- PostgreSQL database (or use Neon/Supabase free tier)
- Google AI Studio API Key (for Gemini)

### 1. Clone the repository

```bash
git clone https://github.com/Abhinav-180/ai-website-builder.git
cd ai-website-builder
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
BETTER_AUTH_SECRET=your_secret_key_here
TRUSTED_ORIGINS=http://localhost:5173
OPENAI_API_KEY=your_gemini_api_key_here
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=3001
```

Run database migrations:

```bash
npx prisma migrate deploy
npx prisma generate
```

Start the dev server:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:3001
```

Start the dev server:

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 💳 Credit Plans

| Plan | Credits | Price |
|---|---|---|
| **Basic** | 100 credits | $5 |
| **Pro** | 400 credits | $19 |
| **Enterprise** | 1000 credits | $49 |

> Each **website creation** or **AI revision** costs **5 credits**. New users start with **20 free credits**.

---

## 🚀 Deployment

Both frontend and backend are deployed on **Vercel**.

### Backend (Serverless)
The `server/vercel.json` configures Express as a serverless function. Set all `.env` variables in Vercel project settings.

### Frontend
The `client/vercel.json` rewrites all routes to `index.html` for SPA routing support.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**Built with ❤️ by [Abhinav](https://github.com/Abhinav-180)**

⭐ Star this repo if you found it useful!

</div>
