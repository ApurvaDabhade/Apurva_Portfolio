import SectionTitle from './SectionTitle';
import { LINKEDIN_LABEL } from '../data/constants';

const CORE_CHIPS = [
  'Data Structures & Algorithms', 'DBMS', 'Object-Oriented Programming', 'Operating Systems',
  'Computer Networks', 'Statistics & Probability', 'UI/UX Design', 'System Design',
  'REST API Architecture', 'LLM Integration', 'RAG Pipelines', 'Vector Databases',
  'Machine Learning', 'Model Evaluation',
];

export default function About({ profile }) {
  return (
    <section id="about">
      <div className="fi">
        <div className="sec-num">01 —</div>
        <div className="sec-stripe"><div className="sec-stripe-dot" /><div className="sec-stripe-line" /></div>
        <div className="sec-label">About</div>
        <SectionTitle>Engineer by degree, <em>builder by choice.</em></SectionTitle>
      </div>
      <div className="bento ab-bento fi">
        <div className="bento-card bc-bio bc-accent-blue ab-hover-card">
          <div className="corner-accent" />
          <div className="bc-label">Bio</div>
          <p>Final-year student in <strong>Electronics &amp; Telecommunication at VIIT Pune</strong> (Graduating {profile.graduationYear}). I build full-stack applications and AI-integrated systems across web, backend, and AI domains.</p>
          <p style={{ marginTop: '.55rem' }}>Participated in <strong>{profile.stats.hackathons} hackathons</strong> including SIH and multiple national-level competitions. I enjoy building scalable <strong>backend systems</strong>, intuitive interfaces, and AI-powered workflows that solve real problems.</p>
          <div className="callout">◈ &nbsp;Backend Developer · Full-Stack · UI/UX · Gen AI</div>
          <div className="card-stat-row">
            <div className="card-stat"><div className="card-stat-n">4th</div><div className="card-stat-l">Year</div></div>
            <div className="card-stat"><div className="card-stat-n">{profile.cgpa}</div><div className="card-stat-l">CGPA</div></div>
            <div className="card-stat"><div className="card-stat-n">{profile.stats.hackathons}</div><div className="card-stat-l">Hackathons</div></div>
            <div className="card-stat"><div className="card-stat-n">{profile.stats.projects}</div><div className="card-stat-l">AI Projects</div></div>
          </div>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`} className="contact-link"><span className="cl-icon">✉</span>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-link"><span className="cl-icon">📞</span>{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link"><span className="cl-icon" style={{ fontSize: '.65rem' }}>in</span>{LINKEDIN_LABEL}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link"><span className="cl-icon" style={{ fontSize: '.65rem' }}>⌥</span>github.com/ApurvaDabhade</a>
          </div>
        </div>

        <div className="bento-card bc-status ab-hover-card">
          <div className="corner-accent" />
          <div className="bc-label">Status</div>
          <div className="code-win">
            <div className="cw-bar">
              <div className="cwd cwd-r" /><div className="cwd cwd-y" /><div className="cwd cwd-g" />
              <div className="cw-file">apurva.js</div>
            </div>
            <div className="cw-body">
              <span className="cln"><span className="ck">const</span> <span className="cv">dev</span> <span className="cp">= {'{'}</span></span>
              <span className="cln">  <span className="cky">name</span><span className="cp">:</span>   <span className="cs">'Apurva Dabhade'</span><span className="cp">,</span></span>
              <span className="cln">  <span className="cky">focus</span><span className="cp">:</span>  <span className="cs">'Backend + Full-Stack + AI'</span><span className="cp">,</span></span>
              <span className="cln">  <span className="cky">cgpa</span><span className="cp">:</span>   <span className="cn">{profile.cgpa}</span><span className="cp">,</span></span>
              <span className="cln">  <span className="cky">year</span><span className="cp">:</span>   <span className="cs">'4th · {profile.graduationYear}'</span><span className="cp">,</span></span>
              <span className="cln">  <span className="cky">status</span><span className="cp">:</span> <span className="cs">'open ✓'</span></span>
              <span className="cln"><span className="cp">{'}'};</span><span className="bcur" /></span>
            </div>
          </div>
          <div className="status-grid" style={{ marginTop: '.85rem' }}>
            <div className="status-row"><span className="status-key">availability</span><span className="status-badge sb-green"><span className="pulse" style={{ width: 5, height: 5 }} />Open Now</span></div>
            <div className="status-row"><span className="status-key">year</span><span className="status-val">4th Year · {profile.graduationYear}</span></div>
            <div className="status-row"><span className="status-key">looking for</span><span className="status-badge sb-blue">SWE Internship</span></div>
            <div className="status-row"><span className="status-key">hackathons</span><span className="status-val" style={{ fontFamily: "'DM Mono',monospace", fontSize: '.75rem' }}>{profile.stats.hackathons} competed</span></div>
            <div className="status-row"><span className="status-key">specialty</span><span className="status-badge sb-purple">AI + Backend</span></div>
          </div>
          {[
            { label: 'Backend', w: '90%', grad: 'linear-gradient(90deg,var(--blue),var(--purple))' },
            { label: 'AI / ML', w: '85%', grad: 'linear-gradient(90deg,var(--purple),var(--rose))' },
            { label: 'UI / UX', w: '80%', grad: 'linear-gradient(90deg,var(--green),var(--blue))' },
          ].map((b) => (
            <div className="impact-bar" key={b.label} style={b.label === 'Backend' ? { marginTop: '1rem' } : undefined}>
              <div className="impact-label"><span>{b.label}</span><span>{b.w}</span></div>
              <div className="impact-track"><div className="impact-fill" style={{ '--w': b.w, background: b.grad }} /></div>
            </div>
          ))}
        </div>

        <div className="bento-card bc-edu ab-hover-card">
          <div className="corner-accent" />
          <div className="bc-label">Education</div>
          <div className="edu-stack edu-col">
            {profile.education.map((edu, i) => (
              <div className="edu-item" key={edu.degree} style={i > 0 ? { marginTop: '.55rem' } : undefined}>
                <div className="edu-deg">{edu.degree}</div>
                <div className="edu-sch">{edu.school}</div>
                {edu.period && <div className="edu-sch" style={{ marginTop: '.1rem' }}>{edu.period}</div>}
                <span className="edu-grd" style={edu.gradeType === 'percent' ? (i === 1 ? { background: 'var(--green-l)', color: 'var(--green)' } : { background: 'var(--purple-l)', color: 'var(--purple)' }) : undefined}>{edu.grade}</span>
              </div>
            ))}
          </div>
          <div className="card-meta">
            <div className="card-meta-item"><span className="card-meta-dot" style={{ background: 'var(--blue)' }} />VIIT Pune · Accredited A+</div>
            <div className="card-meta-item"><span className="card-meta-dot" style={{ background: 'var(--green)' }} />NAAC Accredited</div>
          </div>
        </div>

        <div className="bento-card bc-skills-main ab-hover-card">
          <div className="corner-accent" />
          <div className="bc-label">Core Concepts & Coursework</div>
          <div className="chips">
            {CORE_CHIPS.map((c) => <span className="chip" key={c}>{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
