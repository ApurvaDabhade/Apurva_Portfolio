import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import { sendContactNotification } from '../services/email.js';

export async function submitContact(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;
  const contact = await Contact.create({ name, email, subject, message });

  sendContactNotification({ name, email, subject, message }).catch((err) => {
    console.error('Email notification failed:', err.message);
  });

  res.status(201).json({
    success: true,
    message: 'Message received! I typically respond within 24 hours.',
    id: contact._id,
  });
}

export async function getContacts(req, res) {
  const contacts = await Contact.find().sort({ createdAt: -1 }).select('-__v');
  res.json({ success: true, data: contacts });
}
