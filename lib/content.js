/* ======================= CONTENT (edit freely) =======================
   IMAGES — put these files in /public/images (placeholders show until then):
     portrait.webp         hero portrait (transparent cut-out, ~1200px tall)
     portfolio/            project card images (portrait ratio ~ 4:5), file names set in PROJECTS below
     testimonial-logos/    client logos on testimonial cards (see QUOTES below)
     avatar-me.jpg         your small avatar in the "Have something in mind?" bubble
*/
export const WORD = 'SAAD';
export const FULL_NAME = 'Saad Sultan';
export const EMAIL = 'maliksaadsultan766@gmail.com';
/* social links in the sidebar — replace '#' with your profile URL */
export const SOCIALS = {
  github: 'https://github.com/Rajwara',
  linkedin: 'https://www.linkedin.com/in/muhammad-saad-sultan-%F0%9F%9A%80-6695181a0/',
  facebook: '#',
  instagram: '#',
};
export const BLURB = 'I build responsive websites and Shopify stores that load fast, are easy to manage and keep visitors engaged.';
export const STATS = [
  { value: '50+', label: ['Projects', 'delivered'], icon: 'briefcase' },
  { value: '7+', label: ['Years of', 'experience'], icon: 'medal' },
];

export const JOURNEY = [
  { yr: '19', title: 'Where it started', short: 'Started my career as a WordPress Developer at Z-Tech.', long: 'Z-Tech is where I built a strong foundation in web development. I worked on diverse projects with modern technologies, growing my front-end and back-end skills, problem-solving and collaboration.', who: '@Z-Tech', ago: 'Sep 2019 – Jun 2021' },
  { yr: '20', title: 'BS Computer Science', short: 'Graduated from NCBAE Lahore with a degree in Computer Science.', long: 'Completed my BS in Computer Science at the National College of Business Administration and Economics (NCBAE), Lahore (2016 – 2020), while already building websites for real clients.', who: '@NCBAE', ago: '2016 – 2020' },
  { yr: '21', title: 'WordPress Developer', short: 'Built and customized WordPress sites, themes and plugins at Devxsol.', long: 'Developed and customized WordPress websites, themes and plugins with responsive design. Managed hosting, domains and migrations, ran updates, backups and security checks, and translated Figma designs into precise, user-friendly websites while working directly with clients.', who: '@Devxsol', ago: 'Jul 2021 – Jan 2023' },
  { yr: '21', title: 'Front-End Developer', short: 'Brought web designs to life with UX/UI designers and back-end teams.', long: 'At NaqsTechDigital I designed and developed user-friendly, responsive websites, kept front-end code maintained and fast, and worked closely with UX/UI designers, back-end developers and project managers to make sure every design was technically feasible.', who: '@NaqsTechDigital', ago: 'Nov 2021 – 2024' },
  { yr: '24', title: 'Shopify Developer', short: 'Built and improved Shopify stores for brands at Contigo Media.', long: 'Designed and developed Shopify storefronts with a seamless, responsive shopping experience, and kept improving front-end code for better performance and functionality.', who: '@Contigo Media', ago: 'Jun 2024 – Dec 2025' },
  { yr: '24', title: 'E-Commerce Development', short: 'Developed e-commerce experiences for ShopSemlim.', long: 'Built visually appealing, user-friendly e-commerce pages for ShopSemlim, maintaining and improving the front end to keep the store fast and reliable.', who: '@ShopSemlim', ago: 'Sep 2024 – Feb 2025' },
  { yr: '24', title: 'CMS & CRM Specialist', short: 'Running websites, CMS and CRM work at Exergy Systems.', long: 'Designing and developing user-friendly, responsive websites at Exergy Systems, regularly updating and maintaining the front end, and implementing improvements to performance and functionality.', who: '@Exergy Systems', ago: '2024 – Present' },
  { yr: '26', title: 'The journey continues', short: 'Certified in AI (ML & DL) and exploring how AI fits into the web.', long: 'Earned an AI (Machine Learning & Deep Learning) certification through Corvit Systems and NAVTTC. Next up: bringing AI-powered features and smarter workflows into the websites and stores I build.', who: '@saad', ago: 'now' },
];

export const PROJECTS = [
  { name: 'Cymbiotika', image: 'cymbiotika.jpg', tags: ['Shopify', 'JavaScript', 'Custom'], desc: 'Shopify store with custom JavaScript features and theme customization.' },
  { name: 'Illusive', image: 'illusive.jpg', tags: ['WordPress', 'ACF'], desc: 'WordPress site with flexible, editable content built on Advanced Custom Fields.' },
  { name: 'Nutrafol', image: 'nutrafol.jpg', tags: ['React', 'Tailwind', 'Analytics'], desc: 'React and Tailwind CSS front end with Google Analytics tracking.' },
  { name: 'Make Us Care', image: 'make-us-care.jpg', tags: ['Elementor'], desc: 'Responsive WordPress website built with Elementor.' },
  { name: 'Wow Flow', image: 'wow-flow.jpg', tags: ['Custom code', 'Elementor'], desc: 'Elementor build extended with custom code.' },
  { name: 'Skriblbox', image: 'skriblbox.jpg', tags: ['Elementor', 'WooCommerce'], desc: 'WooCommerce online store built with Elementor.' },
  { name: 'Point Innovation', image: 'point-innovation.jpg', tags: ['Elementor'], desc: 'Company website built with Elementor.' },
  { name: 'Shorter Investment Group', image: 'shorter-investment-group.jpg', tags: ['Elementor'], desc: 'Corporate website built with Elementor.' },
  { name: 'Sixkind', image: 'sixkind.jpg', tags: ['Wix'], desc: 'Website designed and built on Wix.' },
  { name: 'Atoz Leather', image: 'atoz-leather.jpg', tags: ['E-commerce'], desc: 'Online store for a leather goods brand.' },
].map(p => ({ href: '#', ...p }));

/* statement: plain words + {capability} badges (hover/tap shows the description) */
export const CAPS = {
  dev: { icon: 'M3 4h18v12H3zm6 14h6v2H9z', t: 'Website Development', d: 'Responsive websites in WordPress, Webflow, React or hand-written HTML, CSS and JavaScript.' },
  shop: { icon: 'M7 4V3a5 5 0 0 1 10 0v1h4l-1 17H4L3 4zm2 0h6V3a3 3 0 0 0-6 0z', t: 'Shopify & E-commerce', d: 'Shopify and WooCommerce stores with custom themes and features that make buying easy.' },
  int: { icon: 'M7 7h4v4H7zm6 0h4v4h-4zM7 13h4v4H7zm6 2h4v2h-4z', t: 'API Integrations', d: 'APIs, CRMs and third-party tools connected so your site does more.' },
  seo: { icon: 'M10 2a8 8 0 0 1 6.3 12.9l5.4 5.4-1.4 1.4-5.4-5.4A8 8 0 1 1 10 2', t: 'SEO-Ready Setup', d: 'Clean structure, speed and on-page SEO so the right people find you.' },
  perf: { icon: 'M13 2 4 14h7l-1 8 9-12h-7z', t: 'Speed & Performance', d: 'Optimized pages and front-end code that keep your site fast as it grows.' },
};
export const STATEMENT = 'Clear strategy, careful detail and {dev} solid development working together {shop} to turn your idea into {int} a digital experience {seo} that feels effortless. {perf}';

/* testimonials — logo is a file in /public/images/testimonial-logos (the initial shows if it's missing) */
export const QUOTES = [
  { title: 'A game-changer for our store.', text: "Working with Saad was a game-changer for our ecommerce store. He not only improved our site's performance but also made the checkout experience smoother, which boosted our sales. Highly reliable and professional.", name: 'Angelo', role: 'Shop Slim', logo: 'shopslim.jpg' },
  { title: 'Clean, user-friendly WordPress.', text: 'Saad understood our requirements from day one and delivered a clean, user-friendly WordPress solution. His communication was clear, and he went the extra mile to ensure everything worked flawlessly.', name: 'Zahran Haji', role: 'Contigo', logo: 'contigo.jpg' },
  { title: 'Exceeded my expectations.', text: 'I needed a developer who could handle both design and technical integration, and Saad exceeded my expectations. From UI/UX to CRM setup, everything was seamless and delivered on time.', name: 'Sage', role: 'Get Boss Now', logo: 'boss.jpg' },
  { title: 'Instrumental in scaling our store.', text: 'Saad has been instrumental in scaling our Shopify store. His attention to detail, responsiveness, and ability to customize solutions exactly to our needs make him a valued partner in our growth.', name: 'Marcos', role: 'ModaHF', logo: 'moda.svg' },
  { title: 'Dependable and top-notch.', text: "Saad is one of the most dependable developers I've worked with. His expertise in frontend development and API integrations helped us launch projects faster and with top-notch quality.", name: 'Muzzam', role: 'Naqstech', logo: 'naqstech.jpg' },
];

/* companies shown in the sidebar marquee */
export const CLIENT_LOGOS = ['Exergy Systems', 'Contigo Media', 'ShopSemlim', 'NaqsTechDigital', 'Devxsol', 'Z-Tech'];

export const FAQS = [
  ['How long does a typical project take?', 'Most launch packages go live in about two weeks. Larger custom builds are scoped after a call.'],
  ['Which platforms do you work with?', 'Shopify, WordPress (Elementor, WooCommerce, ACF), Webflow, Wix and Squarespace, plus custom builds with React, Tailwind, Bootstrap, PHP and SQL.'],
  ['Do you handle design, or only development?', 'Mainly development, often from Figma designs, but I can help shape layouts and interactions when needed.'],
  ['Already have a site that needs work?', 'Absolutely — fixes, speed improvements, migrations and redesigns of existing sites are all on the table.'],
  ['What does ongoing support look like?', 'A monthly block of hours for new pages, updates, fixes, backups and SEO tweaks, with a fast turnaround.'],
  ["What's the process from start to launch?", 'Brief and call, scope and timeline, build with regular previews, review rounds, then launch and handover.'],
  ['Will I be able to edit the site myself?', 'Yes. Every build comes with a clean CMS setup and a short handover session.'],
  ['Not sure which plan fits your project?', "Send a short message about your goals and I'll recommend the best option."],
];
