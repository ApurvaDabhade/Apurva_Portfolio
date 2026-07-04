# apurva.dev — Personal Website (MERN)

Full-stack personal portfolio for **Apurva Dabhade** — Backend Developer, Full-Stack Engineer & AI/ML Builder.

## Stack

| Layer | Tech |
|-------|------|
| **M**ongoDB | Portfolio data, contact messages |
| **E**xpress | REST API, rate limiting, validation |
| **R**eact | Vite + component-based UI |
| **N**ode.js | Server runtime |

## Project Structure

```
portfolio/
├── client/          # React frontend (Vite)
├── server/          # Express API + MongoDB
└── apurva_portfolio.html   # Original single-file portfolio (reference)
```

## Quick Start

### Prerequisites

- **Node.js** 18+
- **MongoDB** running locally, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/apurva_portfolio
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Seed the database

```bash
npm run seed
```

### 4. Run development servers

In two terminals:

```bash
npm run dev:server    # http://localhost:5000
npm run dev:client    # http://localhost:5173
```

Or combined:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/profile` | Profile, skills, achievements |
| GET | `/api/projects` | Featured projects |
| GET | `/api/projects/:slug` | Single project |
| POST | `/api/contact` | Submit contact form (saves to DB + emails you) |
| GET | `/api/contact` | List messages — requires `x-api-key` header |

### Contact form example

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Recruiter","email":"hr@company.com","message":"We have an internship opening!"}'
```

### View contact messages (admin)

```bash
curl -H "x-api-key: YOUR_ADMIN_API_KEY" http://localhost:5000/api/contact
```

## Email Notifications

When someone submits the contact form, you receive an email if SMTP is configured in `server/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=apurvadabhade13@gmail.com
SMTP_PASS=your_gmail_app_password   # Google App Password, not login password
NOTIFY_EMAIL=apurvadabhade13@gmail.com
ADMIN_API_KEY=your-secret-key
```

Get a Gmail App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) (requires 2FA).

## Resume Download

Add your PDF to:

```
client/public/Apurva_Dabhade_Resume.pdf
```

Download buttons appear in the Hero, Nav, and Command Palette (⌘K → Resume).

## Deploy to Production

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step Vercel + Railway + MongoDB Atlas setup.

Quick summary:
- **Frontend** → Vercel (`client/`) with `VITE_API_URL=https://your-api.railway.app/api`
- **Backend** → Railway (`server/`) with Atlas `MONGODB_URI` and SMTP vars
- **Domain** → Point `apurva.dev` to Vercel

## Production Build

```bash
npm run build        # builds client to client/dist
NODE_ENV=production npm start   # serves API + static React build
```

## Assets Included

- `client/public/favicon.svg` — Browser tab icon
- `client/public/logo.svg` — apurva.dev wordmark
- `client/public/images/avatar.svg` — Profile placeholder (replace with your photo)
- `client/public/og-image.svg` — Social sharing preview (LinkedIn, Twitter)
- `client/public/Apurva_Dabhade_Resume.pdf` — **You add this** (see RESUME_README.txt)

## Color Palette

Unified dark theme with consistent accent colors:

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0B0B0B` | Page bg |
| Card | `#0F0F12` | Bento cards |
| Text | `#F5F5F7` | Primary text |
| Blue (primary) | `#4F8EF7` | CTAs, links, accents |
| Purple | `#B49BFF` | Gradients, AI sections |
| Green | `#2DD4A0` | Status badges, success |
| Amber | `#FBBF24` | Industry project accent |
| Rose | `#FB7185` | Contact section accent |

## What You Still Need

1. **Resume PDF** — Drop `Apurva_Dabhade_Resume.pdf` into `client/public/`
2. **Real profile photo** — Replace `client/public/images/avatar.svg` with your photo
3. **Gmail App Password** — For contact form email alerts (see Email Notifications above)
4. **MongoDB Atlas** — Free cluster for production ([DEPLOY.md](./DEPLOY.md))
5. **Deploy** — Follow [DEPLOY.md](./DEPLOY.md) for Vercel + Railway
6. **Custom domain** — e.g. `apurva.dev` pointed to Vercel
7. **Google Analytics** — Optional traffic tracking

## License

Personal portfolio — © Apurva Dabhade
