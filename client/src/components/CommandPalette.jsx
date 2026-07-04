import { useEffect, useRef, useState } from 'react';
import { RESUME_PATH, RESUME_FILENAME } from '../data/constants';

const CMD_ITEMS = [
  { href: '#about', icon: '👤', label: 'About', sub: 'who i am' },
  { href: '#projects', icon: '🛠', label: 'Projects', sub: 'what i built' },
  { href: '#skills', icon: '⚙', label: 'Skills', sub: 'tech stack' },
  { href: '#achievements', icon: '🏆', label: 'Achievements', sub: 'wins & awards' },
  { href: '#contact', icon: '✉', label: 'Contact', sub: 'get in touch' },
  { type: 'download', url: RESUME_PATH, filename: RESUME_FILENAME, icon: '↓', label: 'Resume', sub: 'download PDF' },
  { type: 'link', url: 'mailto:apurvadabhade13@gmail.com', icon: '✉', label: 'Email', sub: 'apurvadabhade13@gmail.com' },
  { type: 'link', url: 'https://linkedin.com/in/apurva-dabhade', icon: 'in', label: 'LinkedIn', sub: 'apurva-dabhade' },
  { type: 'link', url: 'https://github.com/ApurvaDabhade', icon: '⌥', label: 'GitHub', sub: 'ApurvaDabhade' },
  { type: 'link', url: 'https://leetcode.com/u/apurvadabhade27', icon: '{}', label: 'LeetCode', sub: 'apurvadabhade27' },
];

export default function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inpRef = useRef(null);

  const filtered = CMD_ITEMS.filter((i) => {
    const q = query.toLowerCase();
    return i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q);
  });

  const activate = (item) => {
    setOpen(false);
    if (item.href) {
      const t = document.querySelector(item.href);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    } else if (item.type === 'download') {
      const a = document.createElement('a');
      a.href = item.url;
      a.download = item.filename;
      a.click();
    } else if (item.url) window.open(item.url, '_blank');
  };

  useEffect(() => {
    if (open) setTimeout(() => inpRef.current?.focus(), 280);
    else { setQuery(''); setSel(0); }
  }, [open]);

  useEffect(() => { setSel(0); }, [query]);

  const onKey = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[sel]) activate(filtered[sel]);
  };

  return (
    <div id="cmd-ov" className={open ? 'open' : ''} onClick={(e) => e.target.id === 'cmd-ov' && setOpen(false)} onKeyDown={onKey}>
      <div id="cmd-box">
        <div className="cmd-top">
          <span className="cmd-si">⌕</span>
          <input ref={inpRef} id="cmd-inp" placeholder="Search sections, open links…" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" spellCheck="false" />
          <span className="cmd-esc">ESC</span>
        </div>
        <div id="cmd-list">
          <span className="cmd-sec">Navigate & Links</span>
          {filtered.map((item, i) => (
            <div key={item.label + item.sub} className={`cmd-item${i === sel ? ' sel' : ''}`} role="button" tabIndex={0} onClick={() => activate(item)} onMouseEnter={() => setSel(i)}>
              <div className="cmd-ico" style={item.icon.length > 2 ? {} : { fontSize: '.72rem' }}>{item.icon}</div>
              <span className="cmd-lbl">{item.label}</span>
              <span className="cmd-sub">{item.sub}</span>
            </div>
          ))}
        </div>
        <div className="cmd-foot">
          <span className="cmd-hint"><span className="cmd-k">↑↓</span>navigate</span>
          <span className="cmd-hint"><span className="cmd-k">↵</span>select</span>
          <span className="cmd-hint"><span className="cmd-k">ESC</span>close</span>
          <span className="cmd-hint" style={{ marginLeft: 'auto' }}><span className="cmd-k">⌘K</span>open</span>
        </div>
      </div>
    </div>
  );
}
