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

## Deploy

Pushing to GitHub redeploys automatically on Vercel (`vercel.json` sets the framework to Next.js).
