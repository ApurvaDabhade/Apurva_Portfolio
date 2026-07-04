import SectionTitle from './SectionTitle';

const ACCENT_CLASS = { blue: 'bc-accent-blue', amber: 'bc-accent-a', green: 'bc-accent-g', purple: 'bc-accent-p' };
const EVT_CLASS = { blue: 'ae-blue', amber: 'ae-amber', green: 'ae-green', purple: 'ae-purple' };
const COLOR_VAR = { blue: 'var(--blue)', green: 'var(--green)', purple: 'var(--purple)', amber: 'var(--amber)', rose: 'var(--rose)' };

export default function Achievements({ achievements }) {
  return (
    <section id="achievements">
      <div className="fi">
        <div className="sec-num">04 —</div>
        <div className="sec-stripe"><div className="sec-stripe-dot" /><div className="sec-stripe-line" /></div>
        <div className="sec-label">Achievements</div>
        <SectionTitle>Competitions &amp; <em>Awards.</em></SectionTitle>
      </div>
      <div className="bento ach-bento fi">
        {achievements.map((a, i) => (
          <div key={a.title} className={`bento-card ach-card ${ACCENT_CLASS[a.accent] || 'bc-accent-blue'}`}>
            <div className="ach-top">
              <span className="ach-medal">{a.medal}</span>
              <span className="ach-num">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="ach-title">{a.title}</div>
            <div className={`ach-evt ${EVT_CLASS[a.accent] || 'ae-blue'}`}>{a.event}</div>
            <div className="ach-detail">{a.detail}</div>
            {a.meta?.length > 0 && (
              <div className="card-meta" style={{ marginTop: '.6rem' }}>
                {a.meta.map((m) => (
                  <div className="card-meta-item" key={m.label}>
                    <span className="card-meta-dot" style={{ background: COLOR_VAR[m.color] || 'var(--blue)' }} />{m.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
