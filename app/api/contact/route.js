import { EMAIL, CONTACT, FORM_OPTIONS } from '@/lib/content';

/* Contact form endpoint. Sends each enquiry to:
   - email, through Resend          (Vercel env var RESEND_API_KEY)
   - WhatsApp, through CallMeBot    (Vercel env var CALLMEBOT_API_KEY)
   Optional env vars: CONTACT_EMAIL (defaults to EMAIL in lib/content.js),
   CONTACT_FROM (defaults to Resend's test sender), CALLMEBOT_PHONE (defaults to CONTACT.whatsapp). */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // read the env vars at request time

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

  // each sender resolves to { ok, detail } so failures can be explained in the Vercel logs
  const tasks = [];
  if (process.env.RESEND_API_KEY) {
    tasks.push(['email', (async () => {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`, 'Content-Type': 'application/json' },
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
      });
      return { ok: res.ok, detail: `${res.status} ${(await res.text()).slice(0, 300)}` };
    })()]);
  }
  if (process.env.CALLMEBOT_API_KEY) {
    tasks.push(['whatsapp', (async () => {
      const phone = (process.env.CALLMEBOT_PHONE || CONTACT.whatsapp).replace(/[^\d+]/g, '');
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text.slice(0, 1500))}&apikey=${encodeURIComponent(process.env.CALLMEBOT_API_KEY.trim())}`;
      const res = await fetch(url);
      const body = (await res.text()).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      // CallMeBot answers 200 even for a wrong key, so check what it says
      return { ok: res.ok && /queued|sent/i.test(body) && !/invalid|error|not\s+(allowed|activated)/i.test(body), detail: `${res.status} ${body.slice(0, 300)}` };
    })()]);
  }
  if (!tasks.length) {
    console.error('contact: no RESEND_API_KEY or CALLMEBOT_API_KEY set — add them in Vercel and redeploy');
    return Response.json({ ok: false, error: 'The contact form is not set up yet.' }, { status: 503 });
  }

  const results = await Promise.allSettled(tasks.map(([, t]) => t));
  const sent = [], failed = [];
  results.forEach((r, i) => {
    const name = tasks[i][0];
    if (r.status === 'fulfilled' && r.value.ok) sent.push(name);
    else { failed.push(name); console.error(`contact: ${name} failed —`, r.status === 'fulfilled' ? r.value.detail : String(r.reason)); }
  });
  if (!sent.length) return Response.json({ ok: false, error: 'Your message could not be sent.', failed }, { status: 502 });
  return Response.json({ ok: true, sent, failed });
}

/* Open /api/contact in a browser to check the setup (shows no secrets) */
export function GET() {
  return Response.json({
    email: process.env.RESEND_API_KEY ? `ready — sends to ${process.env.CONTACT_EMAIL || EMAIL}` : 'NOT SET UP — add RESEND_API_KEY in Vercel, then redeploy',
    whatsapp: process.env.CALLMEBOT_API_KEY ? `ready — sends to +${(process.env.CALLMEBOT_PHONE || CONTACT.whatsapp).replace(/\D/g, '')}` : 'NOT SET UP — add CALLMEBOT_API_KEY in Vercel, then redeploy',
  });
}
