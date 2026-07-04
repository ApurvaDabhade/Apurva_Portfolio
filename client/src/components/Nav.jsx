import { RESUME_PATH, RESUME_FILENAME } from '../data/constants';

export default function Nav({ onOpenCmd }) {
  return (
    <nav id="mn">
      <a href="#hero" className="n-logo-wrap" aria-label="Apurva Dabhade home">
        <img src="/favicon.svg" alt="" className="n-logo-img" width="28" height="28" />
        <div className="n-logo">apurva<span>.dev</span></div>
      </a>
      <div className="n-sep" />
      <ul className="n-links" id="nl">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#achievements">Wins</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="n-sep" />
      <div className="n-actions">
        <a className="n-btn n-btn-ghost" href={RESUME_PATH} download={RESUME_FILENAME}>↓ Resume</a>
        <a className="n-btn n-btn-ghost" href="https://github.com/ApurvaDabhade" target="_blank" rel="noreferrer">⌥ GitHub</a>
        <a className="n-btn n-btn-ghost" href="https://linkedin.com/in/apurva-dabhade" target="_blank" rel="noreferrer">in LinkedIn</a>
        <button type="button" className="n-btn n-btn-solid" onClick={onOpenCmd} title="Open command palette (⌘K)">⌘K</button>
      </div>
    </nav>
  );
}
