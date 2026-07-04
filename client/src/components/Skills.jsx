import SectionTitle from './SectionTitle';
import { skillIcons } from '../data/fallback';

const ROW_ACCENTS = {
  blue: {
    rowClass: 'marquee-row-blue',
    hoverBorder: 'rgba(79,142,247,.45)',
    hoverGlow: 'rgba(79,142,247,.12)',
    highlightBg: 'rgba(79,142,247,.08)',
    highlightBorder: 'rgba(79,142,247,.35)',
    highlightText: 'var(--blue)',
  },
  purple: {
    rowClass: 'marquee-row-purple',
    hoverBorder: 'rgba(180,155,255,.45)',
    hoverGlow: 'rgba(180,155,255,.12)',
    highlightBg: 'rgba(180,155,255,.08)',
    highlightBorder: 'rgba(180,155,255,.35)',
    highlightText: 'var(--purple)',
  },
  green: {
    rowClass: 'marquee-row-green',
    hoverBorder: 'rgba(45,212,160,.45)',
    hoverGlow: 'rgba(45,212,160,.12)',
    highlightBg: 'rgba(45,212,160,.08)',
    highlightBorder: 'rgba(45,212,160,.35)',
    highlightText: 'var(--green)',
  },
  rose: {
    rowClass: 'marquee-row-rose',
    hoverBorder: 'rgba(251,113,133,.45)',
    hoverGlow: 'rgba(251,113,133,.12)',
    highlightBg: 'rgba(251,113,133,.08)',
    highlightBorder: 'rgba(251,113,133,.35)',
    highlightText: 'var(--rose)',
  },
};

function MarqueeRow({ label, items, reverse, slow, accent = 'blue' }) {
  const doubled = [...items, ...items];
  const a = ROW_ACCENTS[accent] || ROW_ACCENTS.blue;

  return (
    <>
      <div className="marquee-row-label" style={label !== 'Languages & Frameworks' ? { marginTop: '1.2rem' } : undefined}>{label}</div>
      <div className={`marquee-outer ${a.rowClass}`}>
        <div className={`marquee-track${reverse ? ' marquee-reverse' : ''}${slow ? ' marquee-slow' : ''}`}>
          {doubled.map((item, i) => (
            <div
              className={`marquee-item${item.highlight ? ' marquee-item-highlight' : ''}`}
              key={`${item.name}-${i}`}
              style={item.highlight ? {
                '--mi-accent': a.highlightText,
                '--mi-accent-bg': a.highlightBg,
                '--mi-accent-border': a.highlightBorder,
              } : undefined}
            >
              {item.icon ? (
                item.icon.startsWith('http') ? (
                  <img src={item.icon} alt={item.name} style={item.name === 'LangChain' ? { background: '#1C3C3C', borderRadius: 6 } : item.name === 'Pinecone' ? { background: '#fff', borderRadius: 6, padding: 2 } : undefined} />
                ) : (
                  <span className="marquee-item-icon" style={{ fontSize: '1rem', color: item.highlight ? a.highlightText : undefined }}>{item.icon}</span>
                )
              ) : item.name === 'Java' ? (
                <svg viewBox="0 0 128 128" width="18" height="18"><path fill="#EA2D2E" d="M27.35 80.52l10.68-68.44h24.55l-6.28 40.2h24.76L91.9 12.08h24.55l-10.68 68.44z" /><path fill="#0074BD" d="M19.64 127.33l4.57-29.24H8.48l5.11-32.77h17.73l2.11-13.55H16.7l5.11-32.77h17.73l2.2-14.12H65.3l-2.2 14.12h17.73l-5.11 32.77H58.0l-2.11 13.55h17.73l-5.11 32.77H50.78l-4.57 29.24z" /></svg>
              ) : null}
              <span className="marquee-item-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function toItems(names, highlights = []) {
  return names.map((name) => ({
    name,
    icon: highlights.includes(name) ? '✦' : skillIcons[name],
    highlight: highlights.includes(name),
  }));
}

export default function Skills({ profile }) {
  const { skills } = profile;
  return (
    <section id="skills">
      <div className="fi">
        <div className="sec-num">03 —</div>
        <div className="sec-stripe"><div className="sec-stripe-dot" /><div className="sec-stripe-line" /></div>
        <div className="sec-label">Skills</div>
        <SectionTitle>Tools of the <em>trade.</em></SectionTitle>
      </div>
      <div className="marquee-wrap fi">
        <MarqueeRow label="Languages & Frameworks" items={toItems(skills.languages, ['React.js', 'Node.js', 'TypeScript'])} accent="blue" />
        <MarqueeRow label="AI / ML & Data" items={toItems(skills.aiMl, ['OpenAI', 'LangChain', 'PyTorch'])} reverse accent="purple" />
        <MarqueeRow label="Databases & Tools" items={toItems(skills.databases, ['MongoDB', 'Docker', 'Figma'])} accent="green" />
        <MarqueeRow label="Design & UI/UX" items={toItems(skills.design, ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research'])} reverse slow accent="rose" />
      </div>
    </section>
  );
}
