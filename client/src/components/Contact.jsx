import { useState } from 'react';
import SectionTitle from './SectionTitle';
import { LINKEDIN_LABEL } from '../data/constants';
import { api } from '../api/client';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Portfolio inquiry', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });
    try {
      const res = await api.submitContact(form);
      setStatus({ type: 'success', text: res.message });
      setForm({ name: '', email: '', subject: 'Portfolio inquiry', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Failed to send message. Try emailing directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="fi">
        <div className="sec-num">05 —</div>
        <div className="sec-stripe"><div className="sec-stripe-dot" /><div className="sec-stripe-line" /></div>
        <div className="sec-label">Contact</div>
        <SectionTitle>Let&apos;s build something <em>together.</em></SectionTitle>
      </div>
      <div className="contact-bento fi">
        <div className="contact-main">
          <h3 className="contact-heading">Open to<br /><em>Opportunities.</em></h3>
          <p className="contact-sub">Currently seeking internships in Backend Development, Full-Stack, UI/UX Design, and AI Engineering. Typically respond within 24 hours.</p>
          <p style={{ marginTop: '.6rem', fontFamily: "'DM Mono',monospace", fontSize: '.68rem', color: 'var(--muted)' }}>Quick nav: <span className="kbd-hint">⌘K</span> → Contact</p>
          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="contact-action">
              <span className="ca-icon">✉</span>
              <span><div className="ca-label">Send an Email</div><div className="ca-val">{profile.email}</div></span>
              <span className="ca-arrow">→</span>
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-action">
              <span className="ca-icon">📞</span>
              <span><div className="ca-label">Call / WhatsApp</div><div className="ca-val">{profile.phone}</div></span>
              <span className="ca-arrow">→</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-action">
              <span className="ca-icon" style={{ fontSize: '.72rem' }}>in</span>
              <span><div className="ca-label">Connect on LinkedIn</div><div className="ca-val">{LINKEDIN_LABEL}</div></span>
              <span className="ca-arrow">→</span>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-action">
              <span className="ca-icon" style={{ fontSize: '.72rem' }}>⌥</span>
              <span><div className="ca-label">Explore GitHub</div><div className="ca-val">github.com/ApurvaDabhade</div></span>
              <span className="ca-arrow">→</span>
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} required placeholder="Tell me about the opportunity..." />
            </div>
            {status.text && <div className={`form-msg ${status.type}`}>{status.text}</div>}
            <button type="submit" className="btn btn-primary form-submit" disabled={loading} data-rpl>
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </form>

          <div className="contact-social" style={{ marginTop: '1.5rem' }}>
            <a href={profile.leetcode} target="_blank" rel="noreferrer" className="social-btn">{'{}'} LeetCode</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-btn">in LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="social-btn">⌥ GitHub</a>
          </div>
        </div>
        <div className="contact-right">
          <div className="contact-card">
            <div className="avail-title">Open For</div>
            <div className="contact-avail">
              {['Backend Development', 'UI / UX Design', 'Agentic AI', 'Generative AI', 'Full-Stack Internship'].map((role, i) => (
                <div className="avail-item" key={role}>
                  <span className="avail-role">{role}</span>
                  <span className={`avail-badge ${i < 2 || i === 4 ? 'ab-yes' : 'ab-open'}`}>{i < 2 || i === 4 ? '✓ Open' : 'Exploring'}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-card">
            <div className="avail-title">Quick Facts</div>
            <div className="contact-avail">
              <div className="avail-item"><span className="avail-role" style={{ color: 'var(--muted)', fontSize: '.8rem', fontWeight: 400 }}>Graduating</span><span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.75rem', color: 'var(--text)' }}>June {profile.graduationYear}</span></div>
              <div className="avail-item"><span className="avail-role" style={{ color: 'var(--muted)', fontSize: '.8rem', fontWeight: 400 }}>CGPA</span><span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.75rem', color: 'var(--blue)' }}>{profile.cgpa} / 10</span></div>
              <div className="avail-item"><span className="avail-role" style={{ color: 'var(--muted)', fontSize: '.8rem', fontWeight: 400 }}>Response Time</span><span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.75rem', color: 'var(--green)' }}>Within 24hrs</span></div>
              <div className="avail-item"><span className="avail-role" style={{ color: 'var(--muted)', fontSize: '.8rem', fontWeight: 400 }}>Branch</span><span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.75rem', color: 'var(--text)' }}>{profile.branch} · VIIT Pune</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
