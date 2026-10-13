/* ======================= CONTENT (edit freely) =======================
   IMAGES — put these files in /public/images (placeholders show until then):
     portrait.webp         hero portrait (transparent cut-out, ~1200px tall)
     project-01.jpg … 09   project cards (portrait ratio ~ 4:5)
     avatar-1.jpg … 8      testimonial avatars (square)
     avatar-me.jpg         your small avatar in the "Have something in mind?" bubble
*/
export const WORD = 'SAAD';
export const EMAIL = 'hello@yourdomain.com';
export const SOCIALS = { x: '#', linkedin: '#' };

export const JOURNEY = [
  { yr: '19', title: 'Where it started', short: 'Opened a code editor out of curiosity and never really closed it.', long: 'Write the longer story here — what got you into web development, who helped you, and the moment you knew this was it.', who: '@start', ago: '7 years ago' },
  { yr: '20', title: 'First client', short: 'Someone trusted me with their project. Suddenly every pixel mattered.', long: 'Describe your first paid project, what you learned, and how client work changed the way you build.', who: '@freelance', ago: '6 years ago' },
  { yr: '21', title: 'Pushing my limits', short: "A project I wasn't sure was possible — until it was.", long: 'Talk about the hardest project you took on and the skills you picked up along the way.', who: '@growth', ago: '5 years ago' },
  { yr: '22', title: 'Leveling up', short: 'Animation and CMS stopped being extras and became part of every build.', long: 'Explain how your process matured — tools, motion, content structure — and what clients started to notice.', who: '@motion', ago: '4 years ago' },
  { yr: '23', title: 'Referrals rolling in', short: "Clients started recommending me to people I'd never met.", long: 'Share what it felt like when word of mouth took over, and why trust matters more than any case study.', who: '@clients', ago: '3 years ago' },
  { yr: '24', title: 'A big year', short: 'Bigger projects, great partners and a much clearer focus.', long: 'Highlight a personal or professional milestone from this year and how it shaped the way you work.', who: '@milestone', ago: '2 years ago' },
  { yr: '26', title: 'The journey continues', short: 'Still obsessed. Now exploring how AI fits into what I do.', long: "Where you're heading next — new skills, new kinds of projects, and what clients can expect from you.", who: '@saad', ago: 'now' },
];

export const PROJECTS = [
  ['Project One', ['Components', 'GSAP', 'SEO']], ['Project Two', ['CMS', 'API', 'Motion']], ['Project Three', ['CMS', 'GSAP', 'SEO']],
  ['Project Four', ['CMS', 'Localization']], ['Project Five', ['CMS', 'GSAP']], ['Project Six', ['Motion', '3D']],
  ['Project Seven', ['Components', 'CMS']], ['Project Eight', ['Performance', 'API']], ['Project Nine', ['CMS', 'Performance']],
].map(([name, tags]) => ({ name, tags, href: '#', desc: 'Short one-line description of the project and the result it delivered.' }));

/* statement: plain words + {capability} badges (hover/tap shows the description) */
export const CAPS = {
  dev: { icon: 'M3 4h18v12H3zm6 14h6v2H9z', t: 'Website Development', d: 'Fast, scalable builds with a clean structure and a CMS you can actually manage.' },
  int: { icon: 'M7 7h4v4H7zm6 0h4v4h-4zM7 13h4v4H7zm6 2h4v2h-4z', t: 'Custom Integrations', d: 'APIs, third-party tools and custom features that extend what your site can do.' },
  seo: { icon: 'M10 2a8 8 0 0 1 6.3 12.9l5.4 5.4-1.4 1.4-5.4-5.4A8 8 0 1 1 10 2', t: 'SEO-Ready Setup', d: 'Solid structure, speed and on-page SEO so the right people find you.' },
  mo: { icon: 'M12 2 3 7v10l9 5 9-5V7z', t: 'Motion & Interaction', d: 'Smooth scroll animations and micro-interactions that make the site feel alive.' },
  perf: { icon: 'M13 2 4 14h7l-1 8 9-12h-7z', t: 'Performance', d: "Lighter pages, better Core Web Vitals and code that's built to last." },
};
export const STATEMENT = 'Clear strategy, careful detail and {dev} solid development working together {int} to turn your idea into {seo} a digital experience {mo} that feels effortless. {perf}';

export const QUOTES = ['A reliable long-term partner.', 'Thinks about the whole experience.', 'Fast, skilled and easy to work with.', 'The details make the difference.', 'Design-minded development.', 'A true product mindset.', 'An expert you can trust.', 'Takes real ownership.']
  .map((title, i) => ({ title, text: "Client testimonial goes here. Two to four sentences about what it was like to work together, the result, and why they'd recommend you.", name: 'Client Name ' + (i + 1), role: 'Role, Company' }));

export const CLIENT_LOGOS = ['LOGO ONE', 'Brand Two', 'COMPANY', 'Studio Four', 'LOGO FIVE'];

export const FAQS = [
  ['How long does a typical project take?', 'Most launch packages go live in about two weeks. Larger custom builds are scoped after a call.'],
  ['Do you handle design, or only development?', 'Mainly development from your designs, but I can help shape layouts and interactions when needed.'],
  ['Already have a site that needs work?', 'Absolutely — audits, fixes, speed improvements and redesigns of existing sites are all on the table.'],
  ['What does ongoing support look like?', 'A monthly block of hours for new pages, updates, fixes and SEO tweaks, with a fast turnaround.'],
  ["What's the process from start to launch?", 'Brief and call, scope and timeline, build with regular previews, review rounds, then launch and handover.'],
  ['How do you handle revisions and feedback?', 'Feedback happens on live previews so you see real progress. Revision rounds are agreed up front.'],
  ['Will I be able to edit the site myself?', 'Yes. Every build comes with a clean CMS setup and a short handover session.'],
  ['Not sure which plan fits your project?', "Send a short message about your goals and I'll recommend the best option."],
];
