'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { EMAIL, CONTACT, FORM_OPTIONS } from '@/lib/content';

const waLink = (text = CONTACT.whatsappMessage) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
const pauseScroll = on => window.dispatchEvent(new CustomEvent('project:drawer', { detail: on }));

/* Calendly popup — the script loads the first time someone books */
let calendlyLoad;
function openCalendly() {
  if (!calendlyLoad) {
    calendlyLoad = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet'; css.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(css);
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js'; s.async = true;
      s.onload = resolve; s.onerror = () => { calendlyLoad = null; reject(); };
      document.head.appendChild(s);
    });
  }
  return calendlyLoad.then(() => window.Calendly.initPopupWidget({ url: CONTACT.calendly }));
}

const Icon = {
  chat: 'M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m3 6v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z',
  close: 'm6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z',
  whatsapp: 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2m4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3',
  mail: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1m9 7.6L4 7.5V17h16V7.5zM4.6 7l7.4 4.6L19.4 7z',
  calendar: 'M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3zm12 8H5v9h14zM5 6v2h14V6z',
};
const Svg = ({ d }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>;

const EMPTY = { name: '', email: '', phone: '', service: '', budget: '', timeline: '', website: '', message: '', hp_check: '' };

function ContactForm({ onClose }) {
  const [f, setF] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [error, setError] = useState('');
  const set = k => e => setF(v => ({ ...v, [k]: e.target.value }));

  const summary = `Hi Saad, I'm ${f.name || '…'}.\nService: ${f.service || '…'}\n${f.budget ? `Budget: ${f.budget}\n` : ''}${f.timeline ? `Timeline: ${f.timeline}\n` : ''}\n${f.message}`;

  const submit = async e => {
    e.preventDefault();
    setStatus('sending'); setError('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Your message could not be sent.');
      setStatus('sent');
    } catch (err) {
      setError(err.message); setStatus('failed');
    }
  };

  if (status === 'sent') {
    return (
      <div className="cf-done">
        <span className="cf-tick"><Svg d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" /></span>
        <h3>Thanks, {f.name.split(' ')[0]}!</h3>
        <p>Your message is on its way. I usually reply within 24 hours — by email or WhatsApp.</p>
        <button className="btn dark" onClick={onClose}>Back to the site</button>
      </div>
    );
  }

  return (
    <form className="cf-form" onSubmit={submit} noValidate={false}>
      <div className="cf-row">
        <label>Name *<input required autoComplete="name" value={f.name} onChange={set('name')} placeholder="Your full name" /></label>
        <label>Email *<input required type="email" autoComplete="email" value={f.email} onChange={set('email')} placeholder="you@company.com" /></label>
      </div>
      <div className="cf-row">
        <label>Phone / WhatsApp *<input required type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} placeholder="+1 555 000 0000" /></label>
        <label>Service *
          <select required value={f.service} onChange={set('service')}>
            <option value="" disabled>Choose a service</option>
            {FORM_OPTIONS.services.map(o => <option key={o}>{o}</option>)}
          </select>
        </label>
      </div>
      <div className="cf-row">
        <label>Budget
          <select value={f.budget} onChange={set('budget')}>
            <option value="">Select a range</option>
            {FORM_OPTIONS.budgets.map(o => <option key={o}>{o}</option>)}
          </select>
        </label>
        <label>Timeline
          <select value={f.timeline} onChange={set('timeline')}>
            <option value="">When do you need it?</option>
            {FORM_OPTIONS.timelines.map(o => <option key={o}>{o}</option>)}
          </select>
        </label>
      </div>
      <label><span className="cf-l">Current website <em>(optional)</em></span><input type="url" inputMode="url" value={f.website} onChange={set('website')} placeholder="https://" /></label>
      <label>Project details *<textarea required rows={5} value={f.message} onChange={set('message')} placeholder="What are you building, and what do you need help with?" /></label>
      {/* spam trap — hidden from people, bots fill it. Its label/name must not look like a real field
          (e.g. "Company"), or browser autofill fills it and real messages get dropped */}
      <div className="cf-hp" aria-hidden="true"><label>Leave this field empty<input name="hp_check" type="text" tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore value={f.hp_check} onChange={set('hp_check')} /></label></div>

      {status === 'failed' && (
        <div className="cf-error" role="alert">
          <p>{error} You can still reach me directly:</p>
          <div className="cf-alt">
            <a className="btn" href={waLink(summary)} target="_blank" rel="noopener noreferrer"><Svg d={Icon.whatsapp} />Send on WhatsApp</a>
            <a className="btn dark" href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Project enquiry: ${f.service || 'New project'}`)}&body=${encodeURIComponent(`${summary}\n\nEmail: ${f.email}\nPhone: ${f.phone}${f.website ? `\nWebsite: ${f.website}` : ''}`)}`}><Svg d={Icon.mail} />Send by email</a>
          </div>
        </div>
      )}
      <button className="btn dark cf-submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
      <p className="cf-note">Goes straight to my email and WhatsApp. I usually reply within 24 hours.</p>
    </form>
  );
}

export default function Contact() {
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const closeRef = useRef(null);

  const openForm = useCallback(() => { setMenu(false); setFormKey(k => k + 1); setPanel(true); }, []);
  const closeForm = useCallback(() => setPanel(false), []);

  // Book a call buttons ([data-book]) open Calendly; "Let's talk" buttons ([data-contact]) open the form
  useEffect(() => {
    const onClick = e => {
      const book = e.target.closest('[data-book]');
      if (book && CONTACT.calendly) {
        e.preventDefault(); e.stopPropagation(); setMenu(false);
        openCalendly().catch(() => { location.hash = 'cta'; });
        return;
      }
      if (e.target.closest('[data-contact]')) { e.preventDefault(); e.stopPropagation(); openForm(); }
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [openForm]);

  useEffect(() => {
    document.documentElement.classList.toggle('drawer-open', panel);
    pauseScroll(panel);
    if (panel) closeRef.current?.focus({ preventScroll: true });
  }, [panel]);

  useEffect(() => {
    if (!menu && !panel) return;
    const onKey = e => { if (e.key === 'Escape') { setMenu(false); setPanel(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu, panel]);

  return (
    <>
      <div className={`cw${menu ? ' open' : ''}`}>
        <div className="cw-menu" role="menu" aria-hidden={!menu}>
          <a role="menuitem" className="cw-item wa" href={waLink()} target="_blank" rel="noopener noreferrer" tabIndex={menu ? 0 : -1} onClick={() => setMenu(false)}>
            <Svg d={Icon.whatsapp} /><span><b>Chat on WhatsApp</b><small>{CONTACT.whatsappDisplay}</small></span>
          </a>
          <button role="menuitem" className="cw-item" onClick={openForm} tabIndex={menu ? 0 : -1}>
            <Svg d={Icon.mail} /><span><b>Send a message</b><small>Email & WhatsApp</small></span>
          </button>
          {CONTACT.calendly && (
            <button role="menuitem" className="cw-item" data-book onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>
              <Svg d={Icon.calendar} /><span><b>Book a call</b><small>Pick a time</small></span>
            </button>
          )}
        </div>
        <button className="cw-fab" aria-expanded={menu} aria-label={menu ? 'Close contact options' : 'Contact me'} onClick={() => setMenu(m => !m)}>
          <Svg d={menu ? Icon.close : Icon.chat} /><span>{menu ? 'Close' : 'Contact'}</span>
        </button>
      </div>

      <div className={`pd cf${panel ? ' open' : ''}`} aria-hidden={!panel}>
        <div className="pd-bg" onClick={closeForm} />
        <aside className="pd-panel" role="dialog" aria-modal="true" aria-label="Contact form">
          <button ref={closeRef} className="pd-x" onClick={closeForm} aria-label="Close">×</button>
          <div className="pd-body" data-lenis-prevent>
            <div className="pd-content">
              <span className="pd-eyebrow"><i />Let&apos;s work together</span>
              <h3 className="pd-title">Start a project</h3>
              <p className="pd-lead">Tell me a little about what you need and I&apos;ll get back to you within 24 hours.</p>
              <ContactForm key={formKey} onClose={closeForm} />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
