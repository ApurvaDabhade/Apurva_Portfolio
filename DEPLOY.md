# Deployment Guide — Vercel + Railway

Deploy the **React frontend** on Vercel and the **Express API** on Railway with MongoDB Atlas.

---

## Part 1: MongoDB Atlas (free)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free cluster
2. **Database Access** → Add user with password
3. **Network Access** → Allow access from anywhere (`0.0.0.0/0`) for Railway
4. **Connect** → Drivers → copy connection string:
   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/apurva_portfolio
   ```

---

## Part 2: Deploy Backend (Railway)

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
3. Select your repo — **Root Directory** can stay as `/` (repo root). The root `railway.toml` installs and starts only the `server/` API (no Vite build).
   - **Alternative:** set Root Directory to `server` in Railway → Settings
4. Add environment variables in Railway dashboard:

| Variable | Value |
|----------|-------|
| `PORT` | `5000` (Railway sets this automatically — optional) |
| `MONGODB_URI` | Your Atlas connection string |
| `CLIENT_URL` | `https://your-site.vercel.app` (add after Vercel deploy) |
| `NODE_ENV` | `production` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `apurvadabhade13@gmail.com` |
| `SMTP_PASS` | Gmail [App Password](https://myaccount.google.com/apppasswords) |
| `NOTIFY_EMAIL` | `apurvadabhade13@gmail.com` |
| `ADMIN_API_KEY` | Long random string (e.g. `openssl rand -hex 32`) |

5. Deploy → copy your Railway public URL, e.g. `https://apurva-api.up.railway.app`

6. **Seed the database** (one time, from your machine):
   ```bash
   cd server
   MONGODB_URI="your-atlas-uri" npm run seed
   ```

---

## Part 3: Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import GitHub repo
2. Set **Root Directory** to `client`
3. Add environment variable:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-railway-url.up.railway.app/api` |

4. Deploy → your site will be at `https://your-project.vercel.app`

5. Go back to Railway and update `CLIENT_URL` to your Vercel URL, then redeploy

---

## Part 4: Custom Domain (apurva.dev)

### Vercel (frontend)
1. Vercel project → **Settings** → **Domains** → Add `apurva.dev` and `www.apurva.dev`
2. At your domain registrar, add DNS records Vercel shows (usually A + CNAME)

### Railway (optional API subdomain)
1. Railway service → **Settings** → **Networking** → Generate domain or add `api.apurva.dev`
2. Update `VITE_API_URL` on Vercel to `https://api.apurva.dev/api`
3. Update `CLIENT_URL` on Railway to `https://apurva.dev`

---

## Gmail App Password Setup

1. Enable 2FA on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create app password for "Mail" → copy 16-char password
4. Set `SMTP_PASS` in Railway to that password (no spaces)

---

## Resume PDF

Before going live, add your resume:

```
client/public/Apurva_Dabhade_Resume.pdf
```

Commit and redeploy Vercel.

---

## Verify Deployment

```bash
# Health check
curl https://your-railway-url.up.railway.app/api/health

# Profile data
curl https://your-railway-url.up.railway.app/api/profile

# Contact form (from browser on your Vercel site)
```

View admin messages:
```bash
curl -H "x-api-key: YOUR_ADMIN_API_KEY" https://your-railway-url.up.railway.app/api/contact
```

---

## Alternative: Single-server deploy

If you prefer one host instead of Vercel + Railway:

```bash
npm run build          # builds client to client/dist
NODE_ENV=production npm start   # Express serves API + static files
```

Deploy the whole repo to Render, Fly.io, or a VPS with `server` as the start directory and `NODE_ENV=production`.
