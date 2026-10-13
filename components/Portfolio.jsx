'use client';

import { useEffect, useRef, useState } from 'react';
import { initMotion } from '@/lib/motion';
import { WORD, EMAIL, SOCIALS, JOURNEY, PROJECTS, CAPS, STATEMENT, QUOTES, CLIENT_LOGOS, FAQS } from '@/lib/content';

const pad = n => String(n).padStart(2, '0');

/* <img> that removes itself when the file is missing, so the placeholder behind it shows */
function Img({ src, alt = '', onLoad }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const i = ref.current;
    if (i && i.complete) i.naturalWidth === 0 ? setFailed(true) : onLoad?.();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (failed) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={src} alt={alt} onLoad={onLoad} onError={() => setFailed(true)} />;
}

function Portrait() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="portrait">
      {!loaded && <div className="ph-person" />}
      <div className="media"><Img src="/images/portrait.png" alt="Portrait of Saad" onLoad={() => setLoaded(true)} /></div>
    </div>
  );
}

const Odometer = ({ d }) => (
  <span className="dg"><span className="col" data-d={d}>{Array.from({ length: 20 }, (_, k) => <i key={k}>{k % 10}</i>)}</span></span>
);

const Line = ({ children }) => <span className="line"><span>{children}</span></span>;

const NAV = [
  ['home', 'Home', 'M12 3 2 11h3v10h6v-6h2v6h6V11h3z'],
  ['about', 'About me', 'M12 2a10 10 0 1 0 10 10H12z'],
  ['projects', 'Projects', 'M7 3h10v3H7zM4 8h16v13H4z'],
  ['overview', 'What you get', 'm12 2 10 5-10 5L2 7zm-7.5 8.3L12 14l7.5-3.7L22 12l-10 5-10-5zm0 5L12 19l7.5-3.7L22 17l-10 5-10-5z'],
  ['services', 'Services', 'M13 2 4 14h7l-1 8 9-12h-7z'],
  ['clients', 'Clients', 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10m0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6'],
  ['faq', 'FAQ', 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m1 17h-2v-2h2zm2.1-7.7-.9.9c-.7.7-1.2 1.3-1.2 2.8h-2v-.5c0-1.1.5-2.1 1.2-2.8l1.2-1.3A2 2 0 0 0 12 7a2 2 0 0 0-2 2H8a4 4 0 1 1 7.1 2.3'],
];

const Sep = () => <i className="sep hfade" />;

export default function Portfolio() {
  useEffect(() => initMotion(), []);

  return (
    <>
      <div className="loader" aria-hidden="true">
        <div className="loader-word wordfont">{[...WORD].map((c, i) => <span className="m" key={i}><span>{c}</span></span>)}</div>
      </div>
      <div className="cursor"><span>DRAG</span></div>
      <div className="toast">Email copied!</div>

      {/* fixed portrait (blurs into a background as you scroll) */}
      <Portrait />

      {/* the big name that shrinks into the sidebar logo (desktop) */}
      <div className="morph-word wordfont" aria-hidden="true">{WORD}</div>

      {/* SIDEBAR — on desktop these exact elements start in the hero and fly into place */}
      <aside className="side" aria-label="Sidebar">
        <div className="panel s-brand"><span className="pbg" />
          <div className="s-top">
            <a href="#home" className="pill wordfont" aria-label="Home"><span className="pill-bg" /><span className="sp">{WORD}</span></a>
            <div className="socials fi">
              <a href={SOCIALS.x} aria-label="X"><svg viewBox="0 0 24 24"><path d="M18.2 2H21l-6.5 7.4L22 22h-6l-4.7-6.1L5.8 22H3l7-8L2 2h6.1l4.2 5.6zm-1 18h1.6L7 3.9H5.3z" /></svg></a>
              <a href={SOCIALS.linkedin} aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9h4v12H3zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" /></svg></a>
            </div>
          </div>
          <p className="s-blurb fi">I help brands and agencies launch sharp, fast websites — built with care and simple to update.</p>
        </div>
        <div className="panel s-stats"><span className="pbg" />
          <div className="st mv" data-anchor="a-st1"><b>50+</b><small>Projects<br />delivered</small></div>
          <span className="div fi" />
          <div className="st mv" data-anchor="a-st2"><b>5+</b><small>Years of<br />experience</small></div>
        </div>
        <nav className="panel s-nav"><span className="pbg" />
          {NAV.map(([id, label, icon], i) => (
            <a key={id} href={'#' + id} data-nav={id} className="mv" data-anchor={'a-n' + (i + 1)}>
              <span className="nbg" /><svg className="ic" viewBox="0 0 24 24"><path d={icon} /></svg><span className="mt">{label}</span>
            </a>
          ))}
        </nav>
        <div className="panel marquee fi"><span className="pbg" /><div className="mk"><div className="marquee-track">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => <span key={i}>{l}</span>)}
        </div></div></div>
        <div className="panel mail fi"><span className="pbg" />
          <button data-copy={EMAIL}>{EMAIL} <svg viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2" /></svg></button>
        </div>
        <a href="#cta" className="btn s-btn mv" data-anchor="a-btn" data-btn="1">Book a Call</a>
      </aside>

      {/* mobile top bar + menu */}
      <div className="topbar glass"><a href="#home" className="pill">{WORD}</a><button className="burger" aria-label="Menu"><i /><i /></button></div>
      <nav className="menu" aria-label="Mobile menu">
        {NAV.map(([id, label]) => <a key={id} href={'#' + id}>{label}</a>)}
        <small>{EMAIL}</small>
      </nav>

      {/* ===== HERO ===== */}
      <header className="hero" id="home">
        <div className="a-word anc wordfont" id="a-word">{WORD}</div>
        <nav className="hero-nav">
          <div className="row">
            <a href="#home" className="anc" id="a-n1">Home</a><Sep /><a href="#about" className="anc" id="a-n2">About me</a><Sep /><a href="#projects" className="anc" id="a-n3">Projects</a>
          </div>
          <div className="row">
            <a href="#overview" className="anc" id="a-n4">What you get</a><Sep /><a href="#services" className="anc" id="a-n5">Services</a><Sep /><a href="#clients" className="anc" id="a-n6">Clients</a><Sep /><a href="#faq" className="anc" id="a-n7">FAQ</a>
          </div>
        </nav>
        <div className="chip-l">
          <div className="gdark hchip wide hfade-bg"><div className="st anc" id="a-st1"><b>50+</b><small>Projects<br />delivered</small></div></div>
          <div className="gdark hchip hfade-bg"><div className="st anc" id="a-st2"><b>5+</b><small>Years of<br />experience</small></div></div>
        </div>
        <ul className="gdark traits hfade">
          <li><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10H12z" /></svg>Creative</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z" /></svg>Reliable</li>
          <li><svg viewBox="0 0 24 24"><path d="M3 21V10l4 3 5-9 5 9 4-3v11z" /></svg>Strategic</li>
          <li><svg viewBox="0 0 24 24"><path d="M12 2 3 7v10l9 5 9-5V7z" /></svg>Builder</li>
          <li><svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>Fast</li>
        </ul>
        <div className="hero-center">
          <h1 className="hero-title"><Line>Websites,</Line><Line>Built to</Line><Line>Stand Out.</Line></h1>
          <div className="hero-cta"><a href="#cta" className="btn anc" id="a-btn">Book a Call</a><a href="#about" className="btn hfade">About Me</a></div>
        </div>
        <p className="foot-l hfade">The web developer for bold brands.<br />That&apos;s Saad.</p>
        <p className="foot-r hfade">I help brands and agencies launch sharp, fast websites — built with care and simple to update.</p>
      </header>

      <main>
        {/* ABOUT / JOURNEY */}
        <section className="section" id="about">
          <span className="tag rv">Small start, big goals</span>
          <h2 className="h2 sl"><Line>About Me (&amp;)</Line><Line>My Journey</Line></h2>
          <p className="lead rv" style={{ marginTop: 20 }}>A few years, a lot of late nights and a growing list of happy clients. It&apos;s easier to show than explain.</p>
          <div className="timeline" id="timeline">
            <svg className="path"><path className="p-fg" /></svg>
            <div className="m-line"><i /></div>
            {JOURNEY.map((j, i) => [
              <span className="t-vl" key={'vl' + i} />,
              <span className="t-dot" key={'dot' + i} />,
              <article className="glass t-card" key={'card' + i}>
                <div className="yr"><span>&apos;</span>{[...j.yr].map((d, k) => <Odometer d={d} key={k} />)}</div>
                <h3><Line>{j.title}</Line></h3><p className="tp">{j.short}</p>
                <div className="t-meta">
                  <div className="who">
                    <span className="av">
                      <span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /></svg></span>
                      <span><svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg></span>
                    </span>
                    <span>{j.who}<br />{j.ago}</span>
                  </div>
                  <button className="read" data-i={i}>Read more</button>
                </div>
              </article>,
            ])}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="work-head sec-head">
            <div>
              <span className="tag rv">Selected work</span>
              <h2 className="h2 sl"><Line>Crafted with Care,</Line><Line>Built to Perform</Line></h2>
            </div>
            <p className="lead rv">A selection of projects across different industries — each one designed to look sharp and work flawlessly.</p>
          </div>
          <div className="work-pin"><div className="work-track" id="workTrack">
            {PROJECTS.map((p, i) => (
              <a href={p.href} className="w-card" data-cursor="CLICK" key={i}>
                <div className="media" data-label={`Project ${pad(i + 1)} image\nimages/project-${pad(i + 1)}.jpg`}><Img src={`/images/project-${pad(i + 1)}.jpg`} alt={p.name} /></div>
                <div className="w-top"><span className="wp">{pad(i + 1)}</span><span className="wps">{p.tags.map(t => <span className="wp" key={t}>{t}</span>)}</span></div>
                <div className="w-bot">
                  <div><h3>{p.name}</h3><p>{p.desc}</p></div>
                  <span className="arrow"><svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" stroke="#121212" strokeWidth="2.6" fill="none" /></svg></span>
                </div>
              </a>
            ))}
          </div></div>
        </section>

        {/* WHAT YOU GET */}
        <section className="section" id="overview">
          <h2 className="wyg">What<br />You Get?</h2>
          <span className="tag rv" style={{ marginTop: 28 }}>Capabilities overview</span>
          <p className="statement" id="statement">
            {STATEMENT.split(' ').map((w, i) => {
              const m = w.match(/^\{(\w+)\}$/);
              const sp = i ? ' ' : '';
              if (!m) return [sp, <span className="w" key={i}>{w}</span>];
              const c = CAPS[m[1]];
              return [sp, <span className="cap" tabIndex={0} key={i}>
                <svg className="ci" viewBox="0 0 24 24"><path d={c.icon} /></svg><span className="car" />
                <span className="tip"><b>{c.t}</b>{c.d}</span>
              </span>];
            })}
          </p>
        </section>

        {/* SERVICES */}
        <section className="section" id="services">
          <span className="tag rv">Services</span>
          <h2 className="h2 sl"><Line>Plans That</Line><Line>Fit Your Goals</Line></h2>
          <p className="lead rv" style={{ marginTop: 20 }}>Same quality and attention to detail. The only difference is the size of the project and what you need right now.</p>
          <div className="glass plans">
            <div className="plan feat">
              <div className="ph"><i><svg viewBox="0 0 24 24"><path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z" /></svg></i>Monthly Retainer</div>
              <div className="price">$<span data-price="2000">0</span> <small>/ month</small></div>
              <p>A dedicated developer each month — whatever your site needs, handled.</p>
              <ul><li>New pages, sections and features</li><li>Campaign updates and landing pages</li><li>Maintenance, fixes and content edits</li><li>Ongoing SEO and speed tuning</li></ul>
              <div className="note">ⓘ For teams that need steady, long-term support.</div>
            </div>
            <div className="plan">
              <div className="ph"><i><svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg></i>Launch Package</div>
              <div className="price">$<span data-price="3500">0</span></div>
              <p>A polished website ready to go live in about two weeks.</p>
              <ul><li>Up to 6 pages</li><li>CMS setup</li><li>Scroll animations &amp; interactions</li><li>Technical SEO setup</li><li>Handover training after launch</li></ul>
              <div className="note">ⓘ For new sites or redesigns that need a quick, clean start.</div>
            </div>
            <div className="plan">
              <div className="ph"><i><svg viewBox="0 0 24 24"><path d="M3 21V10l4 3 5-9 5 9 4-3v11z" /></svg></i>Custom Build</div>
              <div className="price">Book a Call</div>
              <p>For bigger, more complex projects. Every scope is different, so we start with a conversation.</p>
              <ul><li>Advanced animation systems</li><li>Multi-collection CMS architecture</li><li>Modular components &amp; dynamic content</li><li>API-driven features</li><li>Post-launch support included</li></ul>
              <div className="note">ⓘ For projects that need a tailored approach.</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" id="cta">
          <h2 className="cta-title" id="ctaTitle"><Line>Ready to Build</Line><Line>Something</Line><Line>Bold</Line><Line>Together?</Line></h2>
          <p className="lead rv">Every website has room to grow. Get a clear view of what works, what holds you back, and how to make it faster and easier to manage.</p>
          <div className="chat">
            <div className="bubble"><div className="media" data-label=""><Img src="/images/avatar-me.jpg" /></div><p>Have something in mind?</p></div>
            <a href={'mailto:' + EMAIL} className="btn">Let&apos;s Talk</a>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section" id="clients">
          <span className="tag rv">Testimonials</span>
          <div className="sec-head">
            <h2 className="h2 sl"><Line>Kind Words From</Line><Line>Great Clients</Line></h2>
            <div className="dots rv" id="dots">{QUOTES.map((_, i) => <i key={i} />)}</div>
          </div>
          <div className="t-viewport" data-cursor="DRAG"><div className="t-track" id="tTrack">
            {QUOTES.map((q, i) => (
              <article className="glass q-card" key={i}>
                <span className="qm"><svg viewBox="0 0 24 24"><path d="M3 21v-7c0-5 2.5-8 7-9l1 2c-2.5 1-3.6 2.8-3.8 5H11v9zm10 0v-7c0-5 2.5-8 7-9l1 2c-2.5 1-3.6 2.8-3.8 5H21v9z" /></svg></span>
                <h3>{q.title}</h3><blockquote>{q.text}</blockquote>
                <div className="q-who"><div className="media" data-label=""><Img src={`/images/avatar-${i + 1}.jpg`} /></div><div><b>{q.name}</b><small>{q.role}</small></div></div>
              </article>
            ))}
          </div></div>
        </section>

        <div className="bigword wordfont" id="bigword" aria-hidden="true">{[...WORD].map((c, i) => <span key={i}>{c}</span>)}</div>

        {/* FAQ */}
        <section className="section" id="faq" style={{ paddingTop: 60 }}>
          <span className="tag rv">FAQ</span>
          <h2 className="h2 sl faq-h"><span className="line"><span>Got <span className="soft">any</span></span></span><Line>questions?</Line></h2>
          <div className="faq-grid" id="faqList">
            {FAQS.map(([q, a], i) => (
              <div className="glass qa" key={i}><button><span>{q}</span><span className="pm" /></button><div className="ans"><p>{a}</p></div></div>
            ))}
          </div>
        </section>
      </main>
      <div className="endbar"><span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> Saad. All rights reserved.</span><a href="#home">Back to top ↑</a></div>

      <div className="modal" role="dialog" aria-modal="true"><div className="modal-bg" />
        <div className="modal-box"><button className="modal-x" aria-label="Close">×</button><div className="big" /><h3 /><p /></div>
      </div>
    </>
  );
}
