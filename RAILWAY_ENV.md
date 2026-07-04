# Railway environment variables (required for production)

Copy these into Railway → your service → **Variables** tab.

| Variable | Example / notes |
|----------|-----------------|
| `MONGODB_URI` | `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/apurva_portfolio` |
| `CLIENT_URL` | `https://your-app.vercel.app` (your Vercel frontend URL) |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | Any long random string |
| `ADMIN_API_KEY` | Any long random string (for viewing contact messages) |

Optional (email notifications on contact form):

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | your Gmail |
| `SMTP_PASS` | Gmail App Password |
| `NOTIFY_EMAIL` | where to receive alerts |

**Do NOT commit real passwords to GitHub.** Set them only in Railway Variables.

### MongoDB Atlas checklist

1. **Network Access** → Add IP `0.0.0.0/0` (allow Railway's dynamic IPs)
2. **Database Access** → User exists with read/write on `apurva_portfolio`
3. Connection string uses database name: `...mongodb.net/apurva_portfolio`

After adding variables, click **Redeploy** in Railway.
