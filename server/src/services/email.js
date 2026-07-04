import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export async function sendContactNotification({ name, email, subject, message }) {
  const transport = getTransporter();
  if (!transport) {
    console.warn('Email not configured — set SMTP_* env vars to enable notifications');
    return false;
  }

  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

  await transport.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to,
    replyTo: email,
    subject: `[apurva.dev] ${subject || 'New contact message'}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '—'}\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;color:#111">
        <h2 style="color:#4F8EF7">New message from apurva.dev</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || '—'}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:1rem 0"/>
        <p style="white-space:pre-wrap;line-height:1.6">${message}</p>
        <p style="color:#888;font-size:12px;margin-top:2rem">Sent from your portfolio contact form</p>
      </div>
    `,
  });

  return true;
}
