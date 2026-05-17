# AI Website Builder

AI Website Builder is a full-stack SaaS application where users can generate complete, responsive websites using AI — just by describing what they want in plain English.

Instead of writing code manually, users can type a prompt, get a fully styled website instantly, request changes through chat, and publish it with a single click.

**Live Demo**
[View Live Application](https://website-builder-topaz.vercel.app)

---

## What this project does

The goal of this project is to make website creation as simple as writing a message.

A user can:

- create an account
- describe their website in a text prompt
- get a fully generated HTML website instantly
- request AI-powered revisions through a chat interface
- preview the website live in the browser
- publish it and share it with anyone
- roll back to any previous version

Anyone with the published project link can view the website without logging in.

---

## Features

- Authentication using email/password (Better Auth)
- AI website generation from a plain text prompt
- AI-powered revisions through a conversational chat interface
- Full version history with rollback support
- Live in-browser preview via iframe
- Publish and share generated websites publicly
- Community gallery to browse other users' published projects
- Credit-based system (each creation or revision costs 5 credits)
- Responsive UI for mobile and desktop

---

## Tech Stack

**Frontend**
- React 19 with Vite
- TypeScript
- Tailwind CSS v4
- React Router v7
- Better Auth UI
- Axios, Sonner, Lucide React

**Backend**
- Node.js with Express v5
- TypeScript
- Prisma ORM
- PostgreSQL
- Better Auth
- OpenAI SDK (connected to Gemini 2.5 Flash)
- Stripe (for credit purchases)

**Deployment**
- Vercel (frontend and backend)

---

## Application Flow

1. User registers using email/password
2. User describes their website in a text prompt on the home page
3. The backend enhances the prompt using Gemini 2.5 Flash for better design detail
4. Gemini 2.5 Flash generates a complete, standalone HTML file with Tailwind CSS
5. The generated website is saved and displayed as a live preview
6. User can chat with the AI to request specific changes (colors, layout, content, etc.)
7. Every revision is saved as a new version — user can roll back anytime
8. User publishes the project and shares the public link

---

## Setup Instructions

Clone the repository:

```bash
git clone https://github.com/Abhinav-180/ai-website-builder.git
cd ai-website-builder
```

**Backend setup:**

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```
DATABASE_URL=your_postgresql_connection_string
BETTER_AUTH_SECRET=your_secret_key
TRUSTED_ORIGINS=http://localhost:5173
OPENAI_API_KEY=your_gemini_api_key
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=3001
```

Run database migrations and start the server:

```bash
npx prisma migrate deploy
npm run dev
```

**Frontend setup:**

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client/` folder:

```
VITE_API_URL=http://localhost:3001
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Credit Plans

New users get 20 free credits. Each website creation or AI revision costs 5 credits.

Additional credits can be purchased:

- Basic — 100 credits for $5
- Pro — 400 credits for $19
- Enterprise — 1000 credits for $49

---

## Notes

This project was built as a full-stack SaaS application to practice AI integration, authentication, database design, and building a real-world product using React and Node.js.

Future improvements can include custom domain support, code editor for manual edits, analytics for published pages, and team collaboration features.
