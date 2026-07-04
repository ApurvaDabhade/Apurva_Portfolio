import { useEffect, useState } from 'react';
import { api } from './api/client';
import { fallbackProfile, fallbackProjects } from './data/fallback';
import { LINKEDIN_URL } from './data/constants';
import usePortfolioEffects from './hooks/usePortfolioEffects';
import Cursor from './components/Cursor';
import Starfield from './components/Starfield';
import Rocket from './components/Rocket';
import Nav from './components/Nav';
import CommandPalette from './components/CommandPalette';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [projects, setProjects] = useState(fallbackProjects);
  const [cmdOpen, setCmdOpen] = useState(false);

  usePortfolioEffects();

  useEffect(() => {
    Promise.all([
      api.getProfile().catch(() => null),
      api.getProjects().catch(() => null),
    ]).then(([profileRes, projectsRes]) => {
      if (profileRes?.data) setProfile({ ...profileRes.data, linkedin: LINKEDIN_URL });
      if (projectsRes?.data?.length) setProjects(projectsRes.data);
    });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div id="scroll-bar" />
      <Cursor />
      <Starfield />
      <div id="parts"><div className="hero-glow" /></div>
      <Rocket />
      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
      <Nav onOpenCmd={() => setCmdOpen(true)} />
      <Hero profile={profile} />
      <div className="div" />
      <About profile={profile} />
      <div className="div" />
      <Projects projects={projects} />
      <div className="div" />
      <Skills profile={profile} />
      <Achievements achievements={profile.achievements} />
      <div className="div" />
      <Contact profile={profile} />
      <Footer profile={profile} />
      <button type="button" id="stb" title="Back to top">↑</button>
    </>
  );
}
