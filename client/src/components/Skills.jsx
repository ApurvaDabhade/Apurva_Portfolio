import SectionTitle from './SectionTitle';
import { skillIcons } from '../data/fallback';

function MarqueeRow({ label, items, reverse, slow }) {
  const doubled = [...items, ...items];
  return (
    <>
      <div className="marquee-row-label" style={label !== 'Languages & Frameworks' ? { marginTop: '1.2rem' } : undefined}>{label}</div>
      <div className="marquee-outer">
        <div className={`marquee-track${reverse ? ' marquee-reverse' : ''}${slow ? ' marquee-slow' : ''}`}>
          {doubled.map((item, i) => (
            <div className={`marquee-item${item.highlight ? ' marquee-item-highlight' : ''}`} key={`${item.name}-${i}`}>
              {item.icon ? (
                item.icon.startsWith('http') ? (
                  <img src={item.icon} alt={item.name} style={item.name === 'LangChain' ? { background: '#1C3C3C', borderRadius: 6 } : item.name === 'Pinecone' ? { background: '#fff', borderRadius: 6, padding: 2 } : undefined} />
                ) : (
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                )
              ) : item.name === 'Java' ? (
                <svg viewBox="0 0 128 128" width="18" height="18"><path fill="#EA2D2E" d="M27.35 80.52l10.68-68.44h24.55l-6.28 40.2h24.76L91.9 12.08h24.55l-10.68 68.44z" /><path fill="#0074BD" d="M19.64 127.33l4.57-29.24H8.48l5.11-32.77h17.73l2.11-13.55H16.7l5.11-32.77h17.73l2.2-14.12H65.3l-2.2 14.12h17.73l-5.11 32.77H58.0l-2.11 13.55h17.73l-5.11 32.77H50.78l-4.57 29.24z" /></svg>
              ) : null}
              <span>{item.name}</span>
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
        <MarqueeRow label="Languages & Frameworks" items={toItems(skills.languages)} />
        <MarqueeRow label="AI / ML & Data" items={toItems(skills.aiMl)} reverse />
        <MarqueeRow label="Databases & Tools" items={toItems(skills.databases)} />
        <MarqueeRow label="Design & UI/UX" items={toItems(skills.design, ['Wireframing', 'Prototyping', 'Design Systems', 'User Research'])} reverse slow />
      </div>
    </section>
  );
}
