import { EMAIL, CONTACT, FORM_OPTIONS } from '@/lib/content';

/* Contact form endpoint. Sends each enquiry to:
   - email, through Resend          (Vercel env var RESEND_API_KEY)
   - WhatsApp, through CallMeBot    (Vercel env var CALLMEBOT_API_KEY)
   Optional env vars: CONTACT_EMAIL (defaults to EMAIL in lib/content.js),
   CONTACT_FROM (defaults to Resend's test sender), CALLMEBOT_PHONE (defaults to CONTACT.whatsapp). */
export const runtime = 'nodejs';

const LIMITS = { name: 100, email: 200, phone: 40, service: 80, budget: 40, timeline: 40, website: 300, message: 4000 };
const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: 'Invalid request' }, { status: 400 }); }

  // bots fill the hidden "company" field; pretend it worked
  if (body.company) return Response.json({ ok: true });

  const f = Object.fromEntries(Object.entries(LIMITS).map(([k, max]) => [k, clean(body[k], max)]));
  if (!f.name || !f.email || !f.phone || !f.service || !f.message) return Response.json({ ok: false, error: 'Please fill in all required fields.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return Response.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  if (!FORM_OPTIONS.services.includes(f.service)) return Response.json({ ok: false, error: 'Please choose a service.' }, { status: 400 });

  const rows = [['Name', f.name], ['Email', f.email], ['Phone / WhatsApp', f.phone], ['Service', f.service], ['Budget', f.budget], ['Timeline', f.timeline], ['Current website', f.website]].filter(([, v]) => v);
  const text = `New enquiry from your portfolio\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nProject details:\n${f.message}`;

  const tasks = [];
  if (process.env.RESEND_API_KEY) {
    tasks.push(['email', fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>',
        to: [process.env.CONTACT_EMAIL || EMAIL],
        reply_to: f.email,
        subject: `New enquiry: ${f.service} — ${f.name}`,
        text,
        html: `<h2 style="margin:0 0 12px">New enquiry from your portfolio</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="color:#666">${esc(k)}</td><td><b>${esc(v)}</b></td></tr>`).join('')}</table>
<h3 style="margin:18px 0 6px">Project details</h3><p style="white-space:pre-wrap">${esc(f.message)}</p>`,
      }),
    })]);
  }
  if (process.env.CALLMEBOT_API_KEY) {
    const phone = process.env.CALLMEBOT_PHONE || CONTACT.whatsapp;
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text.slice(0, 1500))}&apikey=${encodeURIComponent(process.env.CALLMEBOT_API_KEY)}`;
    tasks.push(['whatsapp', fetch(url)]);
  }
  if (!tasks.length) return Response.json({ ok: false, error: 'The contact form is not set up yet.' }, { status: 503 });

  const results = await Promise.allSettled(tasks.map(([, t]) => t));
  const sent = tasks.filter((_, i) => results[i].status === 'fulfilled' && results[i].value.ok).map(([k]) => k);
  results.forEach((r, i) => {
    if (!(r.status === 'fulfilled' && r.value.ok)) console.error(`contact: ${tasks[i][0]} failed`, r.status === 'fulfilled' ? r.value.status : r.reason);
  });
  if (!sent.length) return Response.json({ ok: false, error: 'Your message could not be sent.' }, { status: 502 });
  return Response.json({ ok: true, sent });
}
