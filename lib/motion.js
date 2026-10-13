import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { JOURNEY } from './content';

/* Sets up every scroll/hover animation on the page. Returns a cleanup function. */
export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const body = document.body;
  const offs = [];
  const on = (t, type, fn, opts) => { t.addEventListener(type, fn, opts); offs.push(() => t.removeEventListener(type, fn, opts)); };
  let dead = false, rT;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  const desktop = () => innerWidth >= 1200;
  let lenis, raf;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis = new Lenis({ lerp: .085 });
    lenis.on('scroll', ScrollTrigger.update);
    raf = t => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const goTo = h => { const el = $(h); if (!el) return; lenis ? lenis.scrollTo(h === '#home' ? 0 : el, { duration: 1.6 }) : el.scrollIntoView({ behavior: 'smooth' }); };
  on(document, 'click', e => { const a = e.target.closest('a[href^="#"]'); if (!a) return; e.preventDefault(); body.classList.remove('menu-open'); if (a.getAttribute('href').length > 1) goTo(a.getAttribute('href')); });

  const mm = gsap.matchMedia();
  let morphTL = null;

  const ctx = gsap.context(() => {
    /* ---------- HERO → SIDEBAR MORPH (desktop) ----------
       The sidebar items (logo, menu links, stats, button) start exactly on top of their
       hero counterparts and fly into the sidebar as you scroll the first screen. */
    const docRect = el => { const r = el.getBoundingClientRect(); return { x: r.left, y: r.top + scrollY, w: r.width, h: r.height }; };
    function buildMorph() {
      const sy = scrollY;
      if (morphTL) { morphTL.scrollTrigger && morphTL.scrollTrigger.kill(); morphTL.progress(0).kill(); morphTL = null; }
      // the button goes first: its starting size changes the sidebar layout the other items are measured in
      const movers = $$('.side .mv').sort((a, b) => !!b.dataset.btn - !!a.dataset.btn), word = $('.morph-word');
      gsap.set([...movers, word], { clearProps: 'transform,width,height,padding,opacity,filter,color' });
      gsap.set('.side .pbg,.side .fi,.s-nav .nbg,.s-nav .ic,.pill-bg,.hfade,.hfade-bg,.s-stats small', { clearProps: 'all' });
      if (!desktop()) { body.classList.remove('morph'); return; }
      body.classList.add('morph');
      gsap.set('.s-stats small', { color: '#fff' });
      morphTL = gsap.timeline({ defaults: { ease: 'power2.inOut' }, scrollTrigger: { start: 0, end: () => innerHeight * 1.05, scrub: .7 } });
      // big word → logo pill
      const a = docRect($('#a-word')), wr = word.getBoundingClientRect(), W = wr.width, H = wr.height, p = $('.pill .sp').getBoundingClientRect();
      const s = p.width / W;
      morphTL.fromTo(word, { x: a.x + (a.w - W) / 2, y: a.y, scale: 1 }, { x: p.left, y: p.top + (p.height - H * s) / 2, scale: s, duration: .72 }, 0);
      morphTL.to(word, { color: '#121212', duration: .12, ease: 'none' }, .74);
      // movers
      movers.forEach(m => {
        const A = docRect($('#' + m.dataset.anchor)), L = m.getBoundingClientRect();
        if (m.dataset.btn) {
          // resizing the button moves it inside the sidebar, so measure it again before placing it
          gsap.set(m, { width: A.w, height: A.h });
          const L2 = m.getBoundingClientRect(), from = { x: A.x - L2.left, y: A.y - L2.top, width: A.w, height: A.h };
          gsap.set(m, from);
          morphTL.fromTo(m, from, { x: 0, y: 0, width: L.width, height: L.height, duration: .6 }, .12);
          return;
        }
        const isNav = !!m.querySelector('.mt'), at = isNav ? .03 + (+m.dataset.anchor.slice(3) - 1) * .05 : .08;
        const T = (m.querySelector('.mt') || m).getBoundingClientRect(), ox = T.left - L.left, oy = T.top - L.top;
        // nav links scale by font size and sit centred on their hero link, so they line up with the separators
        const sc = isNav ? parseFloat(getComputedStyle($('#' + m.dataset.anchor)).fontSize) / parseFloat(getComputedStyle(m).fontSize) : A.w / T.width;
        const cx = A.x + A.w / 2 - T.width * sc / 2, cy = A.y + A.h / 2 - T.height * sc / 2;
        gsap.set(m, { transformOrigin: '0 0' });
        morphTL.fromTo(m, { x: cx - L.left - ox * sc, y: cy - L.top - oy * sc, scale: sc }, { x: 0, y: 0, scale: 1, duration: isNav ? .5 : .62 }, at);
      });
      // hero-only bits fade, sidebar furniture fades in at the end
      morphTL.to('.hfade', { opacity: 0, duration: .25, ease: 'none' }, 0)
        .to('.hfade-bg', { opacity: 0, scale: .9, duration: .3, ease: 'none' }, .05)
        .to('.s-stats small', { color: '#121212', duration: .3 }, .35)
        .from('.side .pbg', { opacity: 0, scale: .96, duration: .25, stagger: .03, ease: 'power1.out' }, .7)
        .from('.pill-bg', { scale: 0, duration: .2, ease: 'back.out(2)' }, .72)
        .from('.side .fi', { opacity: 0, y: 10, duration: .22, stagger: .03 }, .74)
        .from('.s-nav .nbg', { opacity: 0, duration: .2, stagger: .02 }, .74)
        .from('.s-nav .ic', { opacity: 0, scale: 0, duration: .22, stagger: .02 }, .72);
      ScrollTrigger.refresh();
      if (sy) { lenis ? lenis.scrollTo(sy, { immediate: true }) : scrollTo(0, sy); }
    }

    /* ---------- LOADER INTRO ---------- */
    function intro() {
      const lw = $('.loader-word');
      const t = gsap.timeline({ onComplete() { body.classList.remove('is-loading'); lenis && lenis.start(); ctx.add(buildMorph); } });
      t.to('.loader-word .m span', { y: 0, duration: 1, stagger: .08, ease: 'power4.out' })
        .add(() => {
          let tx, ty, tw;
          if (desktop()) { const r = $('.morph-word').getBoundingClientRect(); tx = r.left; ty = r.top; tw = r.width; }
          else { const el = $('#a-word'), rg = document.createRange(); rg.selectNodeContents(el); const r = rg.getBoundingClientRect(); tx = r.left; ty = el.getBoundingClientRect().top; tw = r.width; }
          const lr = lw.getBoundingClientRect();
          gsap.to(lw, { x: tx - lr.left, y: ty - lr.top, scale: tw / lr.width, duration: 1.1, ease: 'power4.inOut' });
        }, '+=.25')
        .to('.loader', { backgroundColor: 'rgba(214,207,190,0)', duration: .5, ease: 'none' }, '+=.85')
        .set('.loader', { display: 'none' })
        .fromTo('.portrait', { y: 140, opacity: 0, filter: 'blur(18px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' }, '-=1.1')
        .from('.hero-title .line>span', { yPercent: 110, filter: 'blur(10px)', duration: 1.1, stagger: .1, ease: 'power4.out' }, '-=1')
        .from(desktop() ? '.s-nav .mt' : '.hero-nav .anc', { opacity: 0, y: -10, duration: .6, stagger: .04 }, '-=.9')
        .from('.hero-nav .sep', { scaleY: 0, duration: .5, stagger: .04 }, '<')
        .from('.hchip,.traits', { opacity: 0, scale: .85, filter: 'blur(12px)', duration: .9, stagger: .12, ease: 'power3.out', clearProps: 'scale,filter' }, '-=.8')
        .from(desktop() ? '.s-stats .st b,.s-stats .st small' : '.chip-l .st', { opacity: 0, filter: 'blur(8px)', duration: .8, stagger: .1 }, '<.1')
        .from('.traits li', { opacity: 0, x: 10, duration: .4, stagger: .05 }, '<.3')
        .from(desktop() ? '.hero-cta .hfade' : '.hero-cta .btn', { opacity: 0, y: 24, filter: 'blur(6px)', duration: .7, stagger: .08, ease: 'power3.out' }, '-=.7')
        .from('.foot-l,.foot-r', { opacity: 0, y: 14, duration: .7 }, '<');
    }

    /* ---------- PORTRAIT / HERO SCROLL ---------- */
    gsap.to('.portrait', { filter: 'blur(46px)', opacity: .6, scale: 1.06, ease: 'none', scrollTrigger: { start: 0, end: () => innerHeight * .9, scrub: true } });
    gsap.to('.hero-title', { y: () => -innerHeight * .18, ease: 'none', scrollTrigger: { start: 0, end: () => innerHeight, scrub: true } });
    ScrollTrigger.create({ trigger: '#about', start: 'top 85%', onEnter: () => body.classList.add('side-on'), onLeaveBack: () => body.classList.remove('side-on') });

    /* ---------- GENERIC REVEALS ---------- */
    $$('.sl').forEach(h => gsap.from($$('.line>span', h), { yPercent: 110, duration: 1.1, stagger: .1, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 88%' } }));
    $$('.rv').forEach(el => gsap.from(el, { y: 30, opacity: 0, filter: 'blur(6px)', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } }));

    /* ---------- JOURNEY ---------- */
    const tl = $('#timeline');
    const cards = $$('.t-card', tl), dots = $$('.t-dot', tl), vls = $$('.t-vl', tl);
    const cardTL = cards.map((c, i) => {
      const t = gsap.timeline({ paused: true });
      t.fromTo(c, { opacity: 0, y: 50, filter: 'blur(14px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .9, ease: 'power3.out' })
        .from($('h3 .line>span', c), { yPercent: 110, duration: .8, ease: 'power4.out' }, .2)
        .from($('.tp', c), { opacity: 0, y: 14, filter: 'blur(6px)', duration: .7 }, .3)
        .from($('.t-meta', c), { opacity: 0, y: 10, duration: .6 }, .45);
      $$('.yr .col', c).forEach((col, k) => t.fromTo(col, { yPercent: 0 }, { yPercent: -(10 + (+col.dataset.d)) * 5, duration: 1.3 + k * .2, ease: 'power4.out' }, .1));
      if (vls[i]) t.to(vls[i], { scaleY: 1, duration: .8, ease: 'power3.out' }, 0);
      return t;
    });
    let shown = cards.map(() => false), pathPts = [], table = [], total = 0;
    function layoutTimeline() {
      const W = tl.clientWidth, n = JOURNEY.length, step = Math.max(340, innerHeight * .44), H = n * step + 260;
      tl.style.height = H + 'px';
      const svg = $('svg.path', tl); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.style.height = H + 'px';
      pathPts = JOURNEY.map((_, i) => ({ x: i % 2 ? W * .1 : W * .92, y: 300 + i * step }));
      const bulge = x => x > W / 2 ? W * .15 : -W * .15;
      let d = `M ${W * .92} 0 C ${W * .92} 120, ${pathPts[0].x} ${pathPts[0].y - 140}, ${pathPts[0].x} ${pathPts[0].y}`;
      for (let i = 1; i < n; i++) { const a = pathPts[i - 1], b = pathPts[i]; d += ` C ${a.x + bulge(a.x)} ${a.y + step * .42}, ${b.x + bulge(b.x)} ${b.y - step * .42}, ${b.x} ${b.y}`; }
      const l = pathPts[n - 1]; d += ` C ${l.x + bulge(l.x)} ${l.y + 160}, ${W * .5} ${H - 80}, ${W * .5} ${H}`;
      const fg = $('.p-fg', tl); fg.setAttribute('d', d);
      total = fg.getTotalLength(); fg.style.strokeDasharray = total; fg.style.strokeDashoffset = total;
      table = []; const N = 800; let maxY = -1;
      for (let k = 0; k <= N; k++) { const L = total * k / N, pt = fg.getPointAtLength(L); maxY = Math.max(maxY, pt.y); table.push([L, maxY]); }
      pathPts.forEach((p, i) => {
        dots[i].style.left = p.x + 'px'; dots[i].style.top = p.y + 'px';
        const c = cards[i], ch = c.offsetHeight || 260, cw = c.offsetWidth;
        c.style.top = (p.y - ch - 24) + 'px';
        c.style.left = (i % 2 ? Math.min(p.x + 40, W - cw) : p.x - cw - 40) + 'px';
        vls[i].style.left = p.x + 'px'; vls[i].style.top = (p.y - ch - 10) + 'px'; vls[i].style.height = (ch - 12) + 'px';
      });
    }
    function lenAtY(y) { let lo = 0, hi = table.length - 1; if (y <= 0) return 0; if (y >= table[hi][1]) return total; while (hi - lo > 1) { const m = (lo + hi) >> 1; table[m][1] < y ? lo = m : hi = m; } return table[hi][0]; }
    mm.add('(min-width:1200px)', () => {
      layoutTimeline();
      const st = ScrollTrigger.create({ trigger: tl, start: 'top bottom', end: 'bottom top', onUpdate: () => {
        const tipY = innerHeight * .66 - tl.getBoundingClientRect().top;
        $('.p-fg', tl).style.strokeDashoffset = total - lenAtY(tipY);
        pathPts.forEach((p, i) => {
          dots[i].classList.toggle('on', tipY >= p.y);
          if (tipY >= p.y - 80 && !shown[i]) { shown[i] = true; cardTL[i].timeScale(1).play(); }
          else if (tipY < p.y - 160 && shown[i]) { shown[i] = false; cardTL[i].timeScale(2).reverse(); }
        });
      } });
      const r = () => { layoutTimeline(); st.refresh(); };
      addEventListener('resize', r);
      return () => removeEventListener('resize', r);
    });
    mm.add('(max-width:1199px)', () => {
      tl.style.height = '';
      gsap.to('.m-line i', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 70%', scrub: true } });
      cards.forEach((c, i) => ScrollTrigger.create({ trigger: c, start: 'top 88%', onEnter: () => cardTL[i].play(), onLeaveBack: () => cardTL[i].reverse() }));
    });

    /* modal */
    const mtl = gsap.timeline({ paused: true }).set('.modal', { visibility: 'visible' }).to('.modal-bg', { opacity: 1, duration: .4 })
      .fromTo('.modal-box', { y: 70, opacity: 0, scale: .95, filter: 'blur(10px)' }, { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: .7, ease: 'power4.out' }, '<')
      .from('.modal-box .big,.modal-box h3,.modal-box p', { y: 24, opacity: 0, stagger: .07, duration: .5 }, '<.2');
    $$('.read').forEach(b => on(b, 'click', () => {
      const j = JOURNEY[b.dataset.i];
      $('.modal-box .big').textContent = '20' + j.yr; $('.modal-box h3').textContent = j.title; $('.modal-box p').textContent = j.long;
      lenis && lenis.stop(); mtl.timeScale(1).play(0);
    }));
    const closeM = () => { mtl.timeScale(1.7).reverse(); lenis && lenis.start(); };
    on($('.modal-x'), 'click', closeM); on($('.modal-bg'), 'click', closeM); on(window, 'keydown', e => e.key === 'Escape' && closeM());

    /* ---------- PROJECTS (pinned horizontal) ---------- */
    mm.add('(min-width:768px)', () => {
      const track = $('#workTrack'), pin = $('.work-pin');
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: pin, pin: true, scrub: 1, start: 'top top', end: () => '+=' + dist(), invalidateOnRefresh: true, anticipatePin: 1 } });
      $$('.w-card').forEach(c => {
        gsap.timeline({ scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
          .fromTo(c, { opacity: .25, scale: .88, y: 40, rotate: 2 }, { opacity: 1, scale: 1, y: 0, rotate: 0, ease: 'power1.out', duration: 1 })
          .to(c, { opacity: .3, scale: .92, y: -20, ease: 'power1.in', duration: 1 }, '+=.6');
        gsap.fromTo($('.media', c), { xPercent: -7 }, { xPercent: 7, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      });
    });
    mm.add('(max-width:767px)', () => {
      gsap.from('.w-card', { y: 60, opacity: 0, stagger: .1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.work-pin', start: 'top 85%' } });
    });

    /* ---------- WHAT YOU GET ---------- */
    gsap.to('.wyg', { backgroundPosition: '0% 0', ease: 'none', scrollTrigger: { trigger: '.wyg', start: 'top 85%', end: 'bottom 35%', scrub: true } });
    gsap.from('.wyg', { scale: .9, y: 60, ease: 'none', scrollTrigger: { trigger: '#overview', start: 'top bottom', end: 'top 30%', scrub: true } });
    {
      const kids = [...$('#statement').children], t = gsap.timeline({ scrollTrigger: { trigger: '#statement', start: 'top 82%', end: 'bottom 45%', scrub: .6 } });
      kids.forEach((el, i) => { if (el.classList.contains('w')) t.to(el, { opacity: 1, filter: 'blur(0px)', duration: .5, ease: 'none' }, i * .14); else t.to(el, { scale: 1, duration: .5, ease: 'back.out(2.2)' }, i * .14); });
      $$('.cap').forEach(c => {
        on(c, 'mouseenter', () => matchMedia('(hover:hover)').matches && c.classList.add('open'));
        on(c, 'mouseleave', () => c.classList.remove('open'));
        on(c, 'click', () => { const o = c.classList.contains('open'); $$('.cap.open').forEach(x => x.classList.remove('open')); if (!o) c.classList.add('open'); });
      });
    }

    /* ---------- SERVICES ---------- */
    gsap.from('.plans', { y: 80, opacity: 0, filter: 'blur(10px)', duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.plans', start: 'top 88%' } });
    $$('.plan').forEach((p, i) => gsap.from(p.children, { y: 24, opacity: 0, duration: .7, stagger: .05, delay: i * .12, ease: 'power3.out', scrollTrigger: { trigger: '.plans', start: 'top 75%' } }));
    $$('[data-price]').forEach(s => { const o = { v: 0 }; ScrollTrigger.create({ trigger: s, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: +s.dataset.price, duration: 1.8, ease: 'power3.out', onUpdate: () => { s.textContent = Math.round(o.v).toLocaleString(); } }) }); });

    /* ---------- CTA ---------- */
    {
      const lines = $$('#ctaTitle .line>span');
      gsap.from(lines, { yPercent: 110, duration: 1.1, stagger: .1, ease: 'power4.out', scrollTrigger: { trigger: '#ctaTitle', start: 'top 85%' } });
      const t = gsap.timeline({ scrollTrigger: { trigger: '#ctaTitle', start: 'top 70%', end: 'bottom 25%', scrub: .5 } });
      lines.forEach((l, i) => t.to(l, { color: '#121212', duration: 1, ease: 'none' }, i * .9));
      gsap.timeline({ scrollTrigger: { trigger: '.chat', start: 'top 90%' } })
        .from('.bubble .media', { scale: 0, duration: .5, ease: 'back.out(2)' })
        .from('.bubble p', { scale: .4, opacity: 0, transformOrigin: '0 100%', duration: .6, ease: 'back.out(1.8)' }, '-=.2')
        .from('.chat .btn', { scale: .4, opacity: 0, transformOrigin: '0 0', duration: .6, ease: 'back.out(1.8)' }, '+=.35');
    }

    /* ---------- TESTIMONIALS (drag) ---------- */
    {
      const vp = $('.t-viewport'), tr = $('#tTrack'), dotsEl = $$('#dots i'), st = { x: 0 }; let down = false, sx = 0, sp = 0, lx = 0, lt = 0, vel = 0;
      const min = () => Math.min(0, -(tr.scrollWidth - vp.clientWidth));
      const cardW = () => $('.q-card').offsetWidth + 16;
      const apply = () => { gsap.set(tr, { x: st.x }); const idx = Math.round(-st.x / cardW()); dotsEl.forEach((d, i) => d.classList.toggle('on', i === Math.min(idx, dotsEl.length - 1))); };
      const sk = gsap.quickTo(tr, 'skewX', { duration: .5, ease: 'power3' });
      on(vp, 'pointerdown', e => { down = true; sx = lx = e.clientX; sp = st.x; lt = performance.now(); vel = 0; gsap.killTweensOf(st); vp.setPointerCapture(e.pointerId); });
      on(vp, 'pointermove', e => {
        if (!down) return; const now = performance.now(); vel = (e.clientX - lx) / Math.max(1, now - lt); lx = e.clientX; lt = now;
        let nx = sp + (e.clientX - sx); const m = min(); if (nx > 0) nx *= .3; if (nx < m) nx = m + (nx - m) * .3; st.x = nx; apply(); sk(gsap.utils.clamp(-5, 5, -vel * 3));
      });
      const up = () => { if (!down) return; down = false; sk(0); const w = cardW(); const target = gsap.utils.clamp(min(), 0, Math.round((st.x + vel * 380) / w) * w); gsap.to(st, { x: target, duration: 1.1, ease: 'power3.out', onUpdate: apply }); };
      on(vp, 'pointerup', up); on(vp, 'pointercancel', up);
      dotsEl.forEach((d, i) => on(d, 'click', () => gsap.to(st, { x: gsap.utils.clamp(min(), 0, -i * cardW()), duration: 1, ease: 'power3.out', onUpdate: apply })));
      apply();
      gsap.from('.q-card', { x: 160, opacity: 0, filter: 'blur(10px)', stagger: .08, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: vp, start: 'top 85%' } });
    }

    /* ---------- BIG WORD + FAQ ---------- */
    gsap.from('#bigword span', { yPercent: 100, scaleY: 1.4, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: '#bigword', start: 'top 95%', end: 'bottom 70%', scrub: .6 } });
    $$('.qa').forEach(q => {
      const a = $('.ans', q);
      on($('button', q), 'click', () => {
        const open = !q.classList.contains('open');
        $$('.qa.open').forEach(o => { if (o !== q) { o.classList.remove('open'); gsap.to($('.ans', o), { height: 0, duration: .5, ease: 'power3.inOut' }); } });
        q.classList.toggle('open', open); gsap.to(a, { height: open ? 'auto' : 0, duration: .6, ease: 'power3.inOut', onComplete: () => ScrollTrigger.refresh() });
      });
    });
    gsap.from('.qa', { y: 30, opacity: 0, filter: 'blur(6px)', stagger: .06, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '#faqList', start: 'top 88%' } });

    /* ---------- CURSOR, MENU, COPY ---------- */
    const cur = $('.cursor');
    if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
      const cx = gsap.quickTo(cur, 'x', { duration: .3, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: .3, ease: 'power3' });
      on(window, 'mousemove', e => { cx(e.clientX); cy(e.clientY); });
      on(document, 'mouseover', e => { const t = e.target.closest('[data-cursor]'); if (t) { cur.classList.add('big'); cur.firstElementChild.textContent = t.dataset.cursor; } else cur.classList.remove('big'); });
    }
    on($('.burger'), 'click', () => body.classList.toggle('menu-open'));
    $$('.menu a').forEach((a, i) => { a.style.transitionDelay = (.15 + i * .05) + 's'; });
    $$('[data-copy]').forEach(b => on(b, 'click', () => { navigator.clipboard?.writeText(b.dataset.copy); const t = $('.toast'); t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1800); }));

    /* ---------- NAV ACTIVE + DARK MODE (refresh last so pin spacing counts) ---------- */
    $$('main section[id], header#home').forEach(sec => ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', refreshPriority: -1,
      onToggle: s => { if (s.isActive) $$('.s-nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === sec.id)); } }));
    ScrollTrigger.create({ trigger: '#projects', start: 'top 45%', end: 'bottom 45%', refreshPriority: -1, toggleClass: { targets: 'body', className: 'dark' } });

    /* ---------- BOOT ---------- */
    let lastW = document.documentElement.clientWidth;
    on(window, 'resize', () => { clearTimeout(rT); rT = setTimeout(() => { const w = document.documentElement.clientWidth; if (w === lastW) return; lastW = w; ctx.add(buildMorph); }, 200); });
    const boot = () => { if (!dead) ctx.add(() => { buildMorph(); intro(); }); };
    Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 2500))]).then(() => requestAnimationFrame(boot));
    on(window, 'load', () => ScrollTrigger.refresh());
  });

  return () => {
    dead = true;
    clearTimeout(rT);
    offs.forEach(off => off());
    mm.revert();
    ctx.revert();
    if (lenis) { gsap.ticker.remove(raf); lenis.destroy(); }
    body.classList.remove('morph', 'dark', 'side-on', 'menu-open');
    body.classList.add('is-loading');
  };
}
