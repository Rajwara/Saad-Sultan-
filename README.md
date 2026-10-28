# Saad — Portfolio

Next.js (App Router) portfolio with GSAP + Lenis scroll animations.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Edit content

- **Text, projects, testimonials, FAQ, email, social links:** `lib/content.js`
- **Images:** drop files into `public/images/` (see the list at the top of `lib/content.js`)
- **Styles:** `app/globals.css`
- **Page markup:** `components/Portfolio.jsx`
- **Animations:** `lib/motion.js`

## Contact form, WhatsApp and Calendly

- **WhatsApp number, Calendly link, form dropdown options:** `CONTACT` and `FORM_OPTIONS` in `lib/content.js`
- **Form delivery:** `app/api/contact/route.js` sends each enquiry to your email (Resend) and WhatsApp (CallMeBot).
  Add `RESEND_API_KEY` and `CALLMEBOT_API_KEY` in Vercel → Settings → Environment Variables (see `.env.example`), then redeploy.
  Until then the form shows visitors direct WhatsApp and email buttons instead.

## Deploy

Pushing to GitHub redeploys automatically on Vercel (`vercel.json` sets the framework to Next.js).
