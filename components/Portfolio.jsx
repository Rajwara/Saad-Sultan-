'use client';

import { useEffect, useRef, useState } from 'react';
import { initMotion } from '@/lib/motion';
import { WORD, FULL_NAME, EMAIL, SOCIALS, BLURB, STATS, JOURNEY, PROJECTS, CAPS, STATEMENT, QUOTES, CLIENT_LOGOS, FAQS } from '@/lib/content';

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
      <div className="media"><Img src="/images/portrait.webp" alt={`Portrait of ${FULL_NAME}`} onLoad={() => setLoaded(true)} /></div>
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

const SOCIAL_ICONS = {
  github: { label: 'GitHub', d: 'M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5' },
  linkedin: { label: 'LinkedIn', d: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9h4v12H3zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z' },
  facebook: { label: 'Facebook', d: 'M14 8.5V6.6c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.2 2 10.6 3.4 10.6 6.1v2.4H8v3.4h2.6V22H14V11.9h2.7l.4-3.4z' },
  instagram: { label: 'Instagram', d: 'M7 1h10a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H7a6 6 0 0 1-6-6V7a6 6 0 0 1 6-6m0 2.2A3.8 3.8 0 0 0 3.2 7v10A3.8 3.8 0 0 0 7 20.8h10a3.8 3.8 0 0 0 3.8-3.8V7A3.8 3.8 0 0 0 17 3.2zM12 6.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11m0 2.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6m5.8-3.6a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6' },
};

const Sep = () => <i className="sep hfade" />;

const Stat = ({ value, label, ...rest }) => (
  <div {...rest}><b>{value}</b><small>{label[0]}<br />{label[1]}</small></div>
);

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
              {Object.entries(SOCIALS).map(([key, href]) => (
                <a key={key} href={href} aria-label={SOCIAL_ICONS[key].label} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
                  <svg viewBox="0 0 24 24"><path fillRule="evenodd" d={SOCIAL_ICONS[key].d} /></svg>
                </a>
              ))}
            </div>
          </div>
          <p className="s-blurb fi">{BLURB}</p>
        </div>
        <div className="panel s-stats"><span className="pbg" />
          <Stat {...STATS[0]} className="st mv" data-anchor="a-st1" />
          <span className="div fi" />
          <Stat {...STATS[1]} className="st mv" data-anchor="a-st2" />
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
          <button data-copy={EMAIL} title={EMAIL}><span className="em">{EMAIL}</span><svg viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2" /></svg></button>
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
          <div className="gdark hchip wide hfade-bg"><Stat {...STATS[0]} className="st anc" id="a-st1" /></div>
          <div className="gdark hchip hfade-bg"><Stat {...STATS[1]} className="st anc" id="a-st2" /></div>
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
        <p className="foot-r hfade">{BLURB}</p>
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
                <div className="q-who"><div className="media" data-label={q.name[0]}><Img src={`/images/avatar-${i + 1}.jpg`} /></div><div><b>{q.name}</b><small>{q.role}</small></div></div>
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
      <div className="endbar"><span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {FULL_NAME}. All rights reserved.</span><a href="#home">Back to top ↑</a></div>

      <div className="modal" role="dialog" aria-modal="true"><div className="modal-bg" />
        <div className="modal-box"><button className="modal-x" aria-label="Close">×</button><div className="big" /><h3 /><p /></div>
      </div>
    </>
  );
}
