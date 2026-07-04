import SectionTitle from './SectionTitle';

const ACCENT = {
  blue: { card: 'bc-accent-blue', cat: 'pc-blue', icon: 'pi-blue', link: 'proj-link' },
  green: { card: 'bc-accent-g', cat: 'pc-green', icon: 'pi-green', link: 'proj-link proj-link-g' },
  purple: { card: 'bc-accent-p', cat: 'pc-purple', icon: 'pi-purple', link: 'proj-link proj-link-p' },
  amber: { card: 'bc-accent-a', cat: '', icon: '', link: '' },
};

const COLOR_VAR = { blue: 'var(--blue)', green: 'var(--green)', purple: 'var(--purple)', amber: 'var(--amber)', rose: 'var(--rose)' };

export default function Projects({ projects }) {
  return (
    <section id="projects">
      <div className="fi">
        <div className="sec-num">02 —</div>
        <div className="sec-stripe"><div className="sec-stripe-dot" /><div className="sec-stripe-line" /></div>
        <div className="sec-label">Projects</div>
        <SectionTitle>Things I&apos;ve built <em>that actually work.</em></SectionTitle>
      </div>
      <div className="bento pj-bento fi" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto' }}>
        {projects.map((p, idx) => {
          const a = ACCENT[p.accent] || ACCENT.blue;
          const isIndustry = p.slug === 'industrial-spc';
          return (
            <div key={p._id || p.slug} className={`bento-card ${a.card}`} style={{ gridColumn: idx % 2 === 0 ? '1/2' : '2/3' }}>
              <div className="proj-top">
                <div className={`proj-icon ${a.icon}`} style={isIndustry ? { background: 'var(--amber-l)' } : undefined}>{p.icon}</div>
                <span className="proj-num">{String(idx + 1).padStart(2, '0')} /</span>
              </div>
              <div className={`proj-cat ${a.cat}`} style={isIndustry ? { color: 'var(--amber)' } : undefined}>{p.category}</div>
              <div className="proj-name">{p.title}</div>
              <p className="proj-desc">{p.description}</p>
              <div className="proj-hls">
                {p.highlights.map((h) => (
                  <div className="proj-hl" key={h.slice(0, 40)}>
                    <span style={isIndustry ? { color: 'var(--amber)' } : undefined}>–</span>{h}
                  </div>
                ))}
              </div>
              <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              {p.githubUrl ? (
                <a className={a.link} href={p.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', fontFamily: "'DM Mono',monospace", fontSize: '.72rem', color: 'var(--amber)', padding: '.28rem .65rem', border: '1px solid rgba(251,191,36,.25)', borderRadius: 7, background: 'var(--amber-l)' }}>
                  🏭 Industry Project — Vision Gauges & Services
                </span>
              )}
              {p.meta?.length > 0 && (
                <div className="card-meta" style={{ marginTop: '.75rem' }}>
                  {p.meta.map((m) => (
                    <div className="card-meta-item" key={m.label}>
                      <span className="card-meta-dot" style={{ background: COLOR_VAR[m.color] || 'var(--blue)' }} />{m.label}
                    </div>
                  ))}
                </div>
              )}
              {isIndustry && (
                <div className="card-stat-row" style={{ marginTop: '.75rem' }}>
                  <div className="card-stat"><div className="card-stat-n" style={{ color: 'var(--amber)' }}>12</div><div className="card-stat-l">Channels</div></div>
                  <div className="card-stat"><div className="card-stat-n" style={{ color: 'var(--amber)' }}>24×7</div><div className="card-stat-l">Operation</div></div>
                  <div className="card-stat"><div className="card-stat-n" style={{ color: 'var(--amber)' }}>SPC</div><div className="card-stat-l">Analytics</div></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
