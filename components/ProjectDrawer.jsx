'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PROJECTS } from '@/lib/content';

const pad = n => String(n).padStart(2, '0');

/* Cards open the drawer with: window.dispatchEvent(new CustomEvent('project:open', { detail: index })) */
export const openProject = i => window.dispatchEvent(new CustomEvent('project:open', { detail: i }));

function Cover({ p }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    setFailed(false);
    const i = ref.current;
    if (i && i.complete && i.naturalWidth === 0) setFailed(true);
  }, [p.image]);
  return (
    <div className="media pd-cover" data-label={`${p.name} image\nimages/portfolio/${p.image}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!failed && <img ref={ref} src={`/images/portfolio/${p.image}`} alt={`${p.name} — ${p.type}`} onError={() => setFailed(true)} />}
    </div>
  );
}

export default function ProjectDrawer() {
  const [index, setIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const bodyRef = useRef(null);
  const lastFocus = useRef(null);

  const close = useCallback(() => setOpen(false), []);
  const go = useCallback(d => setIndex(i => (i + d + PROJECTS.length) % PROJECTS.length), []);

  useEffect(() => {
    const onOpen = e => { lastFocus.current = document.activeElement; setIndex(e.detail); setOpen(true); };
    window.addEventListener('project:open', onOpen);
    return () => window.removeEventListener('project:open', onOpen);
  }, []);

  // pause page scrolling while open, and let the page know (lib/motion.js listens)
  useEffect(() => {
    if (index === null) return;
    document.documentElement.classList.toggle('drawer-open', open);
    window.dispatchEvent(new CustomEvent('project:drawer', { detail: open }));
    if (open) closeRef.current?.focus({ preventScroll: true });
    else lastFocus.current?.focus?.({ preventScroll: true });
  }, [open, index === null]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, go]);

  useEffect(() => { bodyRef.current?.scrollTo(0, 0); }, [index]);

  if (index === null) return null;
  const p = PROJECTS[index];

  return (
    <div className={`pd${open ? ' open' : ''}`} aria-hidden={!open}>
      <div className="pd-bg" onClick={close} />
      <aside className="pd-panel" role="dialog" aria-modal="true" aria-label={`${p.name} project details`}>
        <button ref={closeRef} className="pd-x" onClick={close} aria-label="Close">×</button>
        <div className="pd-body" ref={bodyRef} data-lenis-prevent>
          <Cover p={p} />
          <div className="pd-content">
            <span className="pd-eyebrow"><i />Project {pad(index + 1)} · {p.type}</span>
            <h3 className="pd-title">{p.name}</h3>
            <p className="pd-lead">{p.desc}</p>
            {p.about.map((t, k) => <p className="pd-text" key={k}>{t}</p>)}

            {p.work.length > 0 && <>
              <span className="pd-label">What I did</span>
              <ul className="pd-list">{p.work.map(w => <li key={w}>{w}</li>)}</ul>
            </>}

            <span className="pd-label">Tech stack</span>
            <div className="pd-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>

            <div className="pd-cta">
              <a href="#cta" className="btn dark" data-book onClick={() => {
                // resume page scrolling right away so the page can scroll to the contact section
                window.dispatchEvent(new CustomEvent('project:drawer', { detail: false }));
                close();
              }}>Book a call</a>
              {p.live && <a href={p.live} className="btn" target="_blank" rel="noopener noreferrer">View live site ↗</a>}
            </div>

            <nav className="pd-nav" aria-label="Other projects">
              <button onClick={() => go(-1)}>← {PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length].name}</button>
              <button onClick={() => go(1)}>{PROJECTS[(index + 1) % PROJECTS.length].name} →</button>
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
}
