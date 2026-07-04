import { RESUME_PATH, RESUME_FILENAME } from '../data/constants';

export default function Hero({ profile }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-dots" id="hero-dots" />
      <span className="hero-section-tag">apurva · portfolio · 2026</span>
      <div className="hero-inner">
        <img src="/images/avatar.svg" alt="Apurva Dabhade" className="hero-avatar" width="88" height="88" />
        <div className="hero-tag"><span className="pulse" />{profile.availability} · B.Tech {profile.graduationYear}</div>
        <h1 className="hero-name">Apurva <em>Dabhade.</em><span className="hero-cursor" /></h1>
        <p className="hero-role">
          {profile.roles.map((r, i) => (
            <span key={r}><strong>{r}</strong>{i < profile.roles.length - 1 ? ' · ' : ''}</span>
          ))}
          <br />
          <span style={{ fontSize: '.88rem', fontWeight: 400, color: 'var(--muted)' }}>
            B.Tech {profile.branch} · VIIT Pune · 4th Year · {profile.graduationYear}
          </span>
        </p>
        <div className="hero-btns">
          <a href={`mailto:${profile.email}`} className="btn btn-primary" data-rpl>✉ Get in Touch</a>
          <a href={RESUME_PATH} download={RESUME_FILENAME} className="btn btn-outline" data-rpl>↓ Resume</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-outline" data-rpl>⌥ GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline" data-rpl>in LinkedIn</a>
          <a href="#projects" className="btn btn-outline" data-rpl>View Projects →</a>
        </div>
        <div className="hero-stats">
          <div className="hstat">
            <div className="hstat-tooltip">AI + Full-Stack projects</div>
            <div className="hstat-n">{profile.stats.projects}</div>
            <div className="hstat-l">Projects Built</div>
          </div>
          <div className="hstat">
            <div className="hstat-tooltip">VIIT Pune · E&TC</div>
            <div className="hstat-n" data-count={profile.cgpa} data-dec="2">0</div>
            <div className="hstat-l">CGPA / 10</div>
          </div>
          <div className="hstat">
            <div className="hstat-tooltip">SIH, AgriAI & more</div>
            <div className="hstat-n">{profile.stats.hackathons}</div>
            <div className="hstat-l">Hackathons</div>
          </div>
        </div>
      </div>
    </section>
  );
}
