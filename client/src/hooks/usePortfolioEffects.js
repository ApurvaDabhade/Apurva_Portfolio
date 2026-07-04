import { useEffect } from 'react';

export default function usePortfolioEffects() {
  useEffect(() => {
    const cd = document.getElementById('cur-dot');
    const cr = document.getElementById('cur-ring');
    let mx = -100, my = -100, rx = -100, ry = -100;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove);
    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.09;
      ry += (my - ry) * 0.09;
      if (cd) { cd.style.left = mx + 'px'; cd.style.top = my + 'px'; }
      if (cr) { cr.style.left = rx + 'px'; cr.style.top = ry + 'px'; }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const cv = document.getElementById('starfield');
    if (!cv) return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
    const ctx = cv.getContext('2d');
    let W, H, stars = [], shooters = [], cmx = -9999, cmy = -9999;
    const onMove2 = (e) => { cmx = e.clientX; cmy = e.clientY; };
    window.addEventListener('mousemove', onMove2);

    const initStars = () => {
      stars = Array.from({ length: 280 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.5 + 0.1, a: Math.random(),
        da: (Math.random() - 0.5) * 0.004, big: Math.random() > 0.85,
      }));
    };
    const resize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; initStars(); };
    resize();
    window.addEventListener('resize', resize);

    const shooterInterval = setInterval(() => {
      if (Math.random() > 0.4) shooters.push({ x: Math.random() * W * 0.6, y: Math.random() * H * 0.4, vx: 5 + Math.random() * 5, vy: 2.5 + Math.random() * 2.5, life: 1 });
    }, 2800);

    const drawFrame = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        s.a += s.da;
        if (s.a <= 0 || s.a >= 1) s.da *= -1;
        const col = s.big ? `rgba(200,215,255,${s.a * 0.9})` : `rgba(150,170,220,${s.a * 0.55})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
      });
      shooters.forEach((sh, i) => {
        ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(sh.x - sh.vx * 18, sh.y - sh.vy * 18);
        const g = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 18, sh.y - sh.vy * 18);
        g.addColorStop(0, `rgba(147,197,253,${sh.life * 0.9})`);
        g.addColorStop(1, 'transparent');
        ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
        sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.018;
        if (sh.life <= 0 || sh.x > W + 60) shooters.splice(i, 1);
      });
      const CELL = 70;
      for (let x = 0; x <= W; x += CELL) {
        for (let y = 0; y <= H; y += CELL) {
          const d = Math.hypot(x - cmx, y - cmy);
          const gw = Math.max(0, 1 - d / 170);
          ctx.beginPath(); ctx.arc(x, y, gw > 0.05 ? 1 + gw * 1.5 : 0.8, 0, Math.PI * 2);
          ctx.fillStyle = gw > 0.05 ? `rgba(79,142,247,${0.05 + gw * 0.25})` : 'rgba(255,255,255,0.04)';
          ctx.fill();
        }
      }
      requestAnimationFrame(drawFrame);
    };
    drawFrame();

    const scrollBar = document.getElementById('scroll-bar');
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollBar) scrollBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const heroDots = document.getElementById('hero-dots');
    if (heroDots) {
      const dotColors = ['rgba(79,142,247,.5)', 'rgba(180,155,255,.5)', 'rgba(45,212,160,.4)', 'rgba(251,191,36,.4)', 'rgba(251,113,133,.4)'];
      for (let i = 0; i < 18; i++) {
        const d = document.createElement('div');
        d.className = 'hero-dot';
        const s = 2 + Math.random() * 5;
        d.style.cssText = `width:${s}px;height:${s}px;background:${dotColors[Math.floor(Math.random() * dotColors.length)]};left:${Math.random() * 100}%;animation-duration:${8 + Math.random() * 12}s;animation-delay:${-Math.random() * 12}s;`;
        heroDots.appendChild(d);
      }
    }

    const pc = document.getElementById('parts');
    const pCols = ['rgba(79,142,247,.18)', 'rgba(180,155,255,.15)', 'rgba(45,212,160,.14)', 'rgba(251,191,36,.12)', 'rgba(251,113,133,.12)'];
    const spP = () => {
      if (!pc) return;
      const el = document.createElement('div');
      const s = 1.5 + Math.random() * 4;
      el.style.cssText = `position:absolute;border-radius:50%;background:${pCols[Math.floor(Math.random() * pCols.length)]};width:${s}px;height:${s}px;left:${Math.random() * 100}%;top:${100 + Math.random() * 8}%;pointer-events:none;`;
      pc.appendChild(el);
      el.animate([{ transform: 'translateY(0)', opacity: 0 }, { transform: `translateY(-${H + 80}px)`, opacity: 0.7, offset: 0.08 }, { transform: `translateY(-${H + 120}px)`, opacity: 0 }], { duration: (10 + Math.random() * 8) * 1000, easing: 'ease-in' }).onfinish = () => el.remove();
    };
    const particleInterval = setInterval(spP, 500);
    for (let i = 0; i < 8; i++) setTimeout(spP, i * 350);

    const rw = document.getElementById('rw');
    let ra = false;
    const launch = () => {
      if (!rw || ra) return;
      ra = true;
      rw.style.opacity = '1';
      rw.style.bottom = '-140px';
      let st = null;
      const go = (ts) => {
        if (!st) st = ts;
        const p = Math.min((ts - st) / 1900, 1);
        const e = 1 - Math.pow(1 - p, 3);
        rw.style.bottom = (-140 + e * (H + 260)) + 'px';
        rw.style.transform = `translateX(${Math.sin(p * 10) * 5}px)`;
        if (p < 1) requestAnimationFrame(go);
        else {
          rw.style.opacity = '0';
          setTimeout(() => { rw.style.bottom = '-140px'; rw.style.transform = ''; setTimeout(() => { ra = false; }, 400); }, 260);
        }
      };
      requestAnimationFrame(go);
    };
    let lsy = 0;
    const onScrollRocket = () => {
      const sy = window.scrollY;
      if (sy < 80 && lsy >= 80 && !ra) launch();
      lsy = sy;
    };
    window.addEventListener('scroll', onScrollRocket, { passive: true });
    setTimeout(launch, 1000);

    const smoothTo = (t) => {
      const ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(11,11,11,.45);opacity:0;transition:opacity .2s;pointer-events:none;backdrop-filter:blur(4px);';
      document.body.appendChild(ov);
      requestAnimationFrame(() => { ov.style.opacity = '1'; });
      setTimeout(() => { t.scrollIntoView({ behavior: 'smooth' }); ov.style.opacity = '0'; setTimeout(() => ov.remove(), 250); }, 180);
    };
    document.querySelectorAll('a[href^="#"]').forEach((l) => {
      l.addEventListener('click', function (e) {
        const t = document.querySelector(this.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        smoothTo(t);
      });
    });

    const animC = (el) => {
      const tar = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.dec || '0', 10);
      const dur = 1600, s = performance.now();
      const tick = (ts) => {
        const p = Math.min((ts - s) / dur, 1);
        el.textContent = (tar * (1 - Math.pow(1 - p, 4))).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = tar.toFixed(dec);
      };
      requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.querySelectorAll('[data-count]').forEach(animC); cio.unobserve(e.target); }
    }), { threshold: 0.3 });
    const hs = document.querySelector('.hero-stats');
    if (hs) cio.observe(hs);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('v'); io.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fi,.fl2,.fr,.si').forEach((el) => io.observe(el));

    const labelIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('v'); labelIO.unobserve(e.target); } });
    }, { threshold: 0.4 });
    document.querySelectorAll('.sec-label').forEach((el) => labelIO.observe(el));

    const statIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.hstat').forEach((h, i) => setTimeout(() => h.classList.add('v'), i * 110));
        statIO.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    if (hs) statIO.observe(hs);

    const cardIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const parent = el.closest('.bento');
        const siblings = parent ? [...parent.querySelectorAll('.bento-card')] : [];
        const idx = siblings.indexOf(el);
        setTimeout(() => {
          el.classList.add('v');
          el.querySelectorAll('.chip').forEach((c, i) => setTimeout(() => c.classList.add('v'), 120 + i * 22));
          el.querySelectorAll('.tag').forEach((t, i) => setTimeout(() => t.classList.add('v'), 100 + i * 18));
          el.querySelectorAll('.impact-fill').forEach((f, i) => {
            setTimeout(() => {
              const match = (f.getAttribute('style') || '').match(/--w:\s*([^;]+)/);
              if (match) f.style.width = match[1].trim();
            }, 400 + i * 120);
          });
        }, idx * 85);
        cardIO.unobserve(el);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.bento-card').forEach((el) => { el.classList.add('fi-card'); cardIO.observe(el); });

    const secs = document.querySelectorAll('section[id]');
    const nls = document.querySelectorAll('.n-links a');
    const heroInner = document.querySelector('.hero-inner');
    const onNavScroll = () => {
      const sy = window.scrollY;
      let cur = '';
      secs.forEach((s) => { if (sy >= s.offsetTop - 130) cur = s.id; });
      nls.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
      document.getElementById('mn')?.classList.toggle('glow', sy > 40);
      document.getElementById('stb')?.classList.toggle('show', sy > 400);
      if (heroInner && sy < window.innerHeight) heroInner.style.transform = `translateY(${sy * 0.18}px)`;
    };
    window.addEventListener('scroll', onNavScroll, { passive: true });

    document.getElementById('stb')?.addEventListener('click', () => { launch(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

    document.querySelectorAll('.bento-card').forEach((c) => {
      c.addEventListener('mousemove', function (e) {
        const r = this.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        this.style.transform = `rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
        this.style.transition = 'transform .06s';
      });
      c.addEventListener('mouseleave', function () { this.style.transform = ''; this.style.transition = 'transform .5s ease'; });
    });

    const secIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle('in-view', e.isIntersecting));
    }, { threshold: 0.1 });
    document.querySelectorAll('section').forEach((s) => secIO.observe(s));

    const sectionColors = { hero: '#F5F5F7', about: '#4F8EF7', projects: '#B49BFF', skills: '#2DD4A0', achievements: '#FBBF24', contact: '#FB7185' };
    const dotEl = document.getElementById('cur-dot');
    const cursorSecIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.target.id && sectionColors[e.target.id]) {
          const col = sectionColors[e.target.id];
          dotEl?.querySelector('circle:first-child')?.setAttribute('fill', col);
          dotEl?.querySelector('circle:last-child')?.setAttribute('stroke', col);
          document.getElementById('cur-ring')?.querySelector('circle')?.setAttribute('stroke', col);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('section[id]').forEach((s) => cursorSecIO.observe(s));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousemove', onMove2);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScrollRocket);
      window.removeEventListener('scroll', onNavScroll);
      clearInterval(shooterInterval);
      clearInterval(particleInterval);
      cio.disconnect(); io.disconnect(); labelIO.disconnect();
      statIO.disconnect(); cardIO.disconnect(); secIO.disconnect(); cursorSecIO.disconnect();
    };
  }, []);
}
