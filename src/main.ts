import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { projects, type Project, type CaseProject, type Metric } from './data';
import { en, ui, projectsEn, type Lang } from './i18n';
import { mockups } from './mockups';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector(sel) as T | null;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll(sel)) as T[];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const pad = (n: number) => String(n).padStart(2, '0');

/* --------------------------------------------------------------------------
   Language
   -------------------------------------------------------------------------- */
const LANG_KEY = 'portfolio-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'ko' || saved === 'en') return saved;
  } catch {
    /* storage blocked: fall through to the browser language */
  }
  return navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

let lang: Lang = initialLang();
const t = () => ui[lang];

/** The project with its English copy merged in when English is active */
function localized(p: Project): Project {
  return lang === 'en' ? ({ ...p, ...projectsEn[p.id] } as Project) : p;
}
const findProject = (id?: string) => {
  const p = projects.find((x) => x.id === id);
  return p && localized(p);
};

/* --------------------------------------------------------------------------
   Data-driven content
   -------------------------------------------------------------------------- */
function fillStats() {
  const years = $('[data-years-since]');
  if (years) {
    const [y, m] = years.dataset.yearsSince!.split('-').map(Number);
    const now = new Date();
    const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
    years.dataset.count = String(Math.max(1, Math.floor(months / 12)));
  }
  const count = $('[data-project-count]');
  if (count) count.dataset.count = String(projects.length);
  const total = $('[data-work-total]');
  if (total) total.textContent = pad(projects.length);
}

/** Short metric under the card date: a worded value ("4 Portals", "3단계") stands alone, a bare number takes its label */
function cardMetric(p: CaseProject) {
  const { value, label } = p.metrics[0];
  return /[^\d\s.,+%→−-]/.test(value) ? value : `${value} ${label.split(' (')[0]}`;
}

/** Grainy gradient backdrop + hand-built UI mockup for in-house projects */
function caseVisual(p: { id: string; hue?: number }) {
  return `
    <div class="gradient" style="--hue:${p.hue ?? 0}deg" aria-hidden="true">
      <span class="gradient__blob gradient__blob--1"></span>
      <span class="gradient__blob gradient__blob--2"></span>
      <span class="gradient__blob gradient__blob--3"></span>
      <span class="grain"></span>
    </div>
    <div class="mock" aria-hidden="true">${mockups[p.id]?.() ?? ''}</div>`;
}

function cardDate(p: Project) {
  return `${p.date}${p.shape === 'case' ? `<br />${cardMetric(p)}` : ''}`;
}

/** Swap card copy in place so the scroll-linked tweens on the cards survive a language change */
function updateCardText() {
  projects.map(localized).forEach((p) => {
    const card = $(`[data-project="${p.id}"]`);
    if (!card) return;
    card.setAttribute('aria-label', t().view(p.title));
    $('.card__sub', card)!.innerHTML = p.subtitle;
    $('.card__date', card)!.innerHTML = cardDate(p);
  });
}

function renderCards() {
  const track = $('[data-hscroll-track]');
  if (!track) return;
  track.innerHTML = projects
    .map(localized)
    .map((p, i) => {
      // every card previews a mockup when one exists; screenshots stay in the modal gallery
      const mocked = p.shape === 'case' || p.id in mockups;
      const media =
        mocked
          ? caseVisual(p)
          : p.shape === 'tall'
            ? p.images
                .slice(0, 3)
                .map((src) => `<img src="${src}" alt="" loading="lazy" />`)
                .join('')
            : `<img src="${p.cover}" alt="" loading="lazy" />`;
      return `
        <button class="card card--${p.shape}${mocked ? ' card--mock' : ''}" type="button" data-project="${p.id}" aria-label="${t().view(p.title)}">
          <div class="card__media${mocked ? ' mock-frame' : ''}">
            <span class="card__index">${pad(i + 1)}</span>
            ${media}
          </div>
          <div class="card__meta">
            <div>
              <h3 class="card__title">${p.title}</h3>
              <p class="card__sub">${p.subtitle}</p>
            </div>
            <span class="card__date">${cardDate(p)}</span>
          </div>
        </button>`;
    })
    .join('');
}

/* --------------------------------------------------------------------------
   Smooth scroll
   -------------------------------------------------------------------------- */
let lenis: Lenis | null = null;

function initLenis() {
  if (reduceMotion) return;
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

function initAnchors() {
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!;
      const target = id === '#top' ? document.body : $(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target as HTMLElement, { duration: 1.6 });
      else target.scrollIntoView();
    });
  });
}

/* --------------------------------------------------------------------------
   Counters
   -------------------------------------------------------------------------- */
function countUp(el: HTMLElement, delay = 0) {
  const to = Number(el.dataset.count ?? 0);
  if (reduceMotion) {
    el.textContent = String(to);
    return;
  }
  const obj = { v: 0 };
  gsap.to(obj, {
    v: to,
    duration: 1.6,
    delay,
    ease: 'power3.out',
    onUpdate: () => {
      el.textContent = String(Math.round(obj.v));
    },
  });
}

/* --------------------------------------------------------------------------
   Loader + hero intro
   -------------------------------------------------------------------------- */
function waitForAssets(onProgress: (p: number) => void) {
  const imgLoaded = (img: HTMLImageElement) =>
    img.complete
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
        });
  const tasks: Promise<unknown>[] = [document.fonts.ready, ...$$<HTMLImageElement>('.hero img').map(imgLoaded)];
  let done = 0;
  tasks.forEach((t) => t.then(() => onProgress(++done / tasks.length)));
  return Promise.all(tasks);
}

async function runIntro() {
  const loader = $('.loader')!;
  const countEl = $('[data-loader-count]')!;
  const heroCounters = $$('.hero [data-count]');

  const finish = () => {
    document.body.classList.remove('is-loading');
    lenis?.start();
    ScrollTrigger.refresh();
    buildLens();
  };

  if (reduceMotion) {
    loader.remove();
    heroCounters.forEach((el) => countUp(el));
    finish();
    return;
  }

  const shown = { v: 0 };
  let target = 0;
  const tick = gsap.to(shown, {
    v: 100,
    duration: 1.4,
    ease: 'power2.inOut',
    paused: true,
    onUpdate: () => {
      countEl.textContent = String(Math.round(Math.min(shown.v, target * 100)));
    },
  });
  tick.play();
  await waitForAssets((p) => (target = p));
  target = 1;
  await tick.then();
  countEl.textContent = '100';

  gsap.set('.hero__title .reveal-line > span', { yPercent: 110 });
  gsap.set('.hero .reveal-fade', { opacity: 0, y: 20 });
  gsap.set('.hero__stats li', { opacity: 0, y: 20 });
  gsap.set('.hero__rail-line', { scaleY: 0 });
  gsap.set('.hero__portrait', { clipPath: 'inset(100% 0 0 0 round 280px 280px 20px 20px)' });
  gsap.set('.hero__portrait img', { scale: 1.3 });
  gsap.set('.header', { opacity: 0, y: -20 });

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: finish });
  tl.to(loader, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' })
    .to('.hero__portrait', { clipPath: 'inset(0% 0 0 0 round 280px 280px 20px 20px)', duration: 1.6 }, '-=0.45')
    .to('.hero__portrait img', { scale: 1, duration: 2 }, '<')
    .to('.hero__title .reveal-line > span', { yPercent: 0, duration: 1.4 }, '<0.15')
    .to('.hero__rail-line', { scaleY: 1, duration: 1.6, ease: 'power3.inOut' }, '<')
    .to('.hero__stats li', { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, '<0.2')
    .add(() => heroCounters.forEach((el, i) => countUp(el, i * 0.1)), '<')
    .to('.hero .reveal-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, '<0.2')
    .to('.header', { opacity: 1, y: 0, duration: 1 }, '<');
  tl.add(() => loader.remove(), 1.2);
}

/* --------------------------------------------------------------------------
   Magnifier lens (hero)
   -------------------------------------------------------------------------- */
function buildLens() {
  if (reduceMotion || !finePointer) return;
  const hero = $('[data-hero]')!;
  const source = $('[data-lens-source]', hero)!;
  const target = $('[data-lens-target]', hero)!;
  const lens = $('.lens', hero)!;
  const ring = $('.lens-ring', hero)!;
  const cursor = $('.cursor');

  // Snapshot the hero (after counters settle) into the lens
  gsap.delayedCall(1.8, () => {
    target.innerHTML = '';
    const clone = source.cloneNode(true) as HTMLElement;
    clone.removeAttribute('data-lens-source');
    $$('a', clone).forEach((a) => a.setAttribute('tabindex', '-1'));
    target.appendChild(clone);
  });

  const R = 92;
  const pos = { x: 0, y: 0, tx: 0, ty: 0 };
  const radius = { r: 0 };
  let inside = false;

  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    pos.tx = e.clientX - rect.left;
    pos.ty = e.clientY - rect.top;
    if (!inside) {
      inside = true;
      pos.x = pos.tx;
      pos.y = pos.ty;
      gsap.to(radius, { r: R, duration: 0.7, ease: 'expo.out' });
      cursor?.classList.add('is-lens');
    }
  });
  hero.addEventListener('pointerleave', () => {
    inside = false;
    gsap.to(radius, { r: 0, duration: 0.5, ease: 'expo.out' });
    cursor?.classList.remove('is-lens');
  });

  // Elements whose scroll-driven transforms must be mirrored into the clone
  const synced = ['.hero__portrait img', '[data-watermark]'].map((sel) => ({ sel, src: $(sel, source)! }));
  gsap.ticker.add(() => {
    if (radius.r < 0.5 && !inside) {
      if (lens.style.getPropertyValue('--r') !== '0px') {
        lens.style.setProperty('--r', '0px');
        ring.style.setProperty('--size', '0px');
      }
      return;
    }
    pos.x += (pos.tx - pos.x) * 0.18;
    pos.y += (pos.ty - pos.y) * 0.18;
    lens.style.setProperty('--x', `${pos.x}px`);
    lens.style.setProperty('--y', `${pos.y}px`);
    lens.style.setProperty('--r', `${radius.r}px`);
    ring.style.setProperty('--size', `${radius.r * 2}px`);
    ring.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    for (const { sel, src } of synced) {
      const copy = $(sel, target);
      if (copy) copy.style.transform = src.style.transform;
    }
  });
}

/* --------------------------------------------------------------------------
   Custom cursor + magnetic
   -------------------------------------------------------------------------- */
function initCursor() {
  if (!finePointer || reduceMotion) return;
  const cursor = $('.cursor')!;
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  window.addEventListener('pointermove', (e) => {
    cursor.classList.add('is-active');
    xTo(e.clientX);
    yTo(e.clientY);
  });
  document.addEventListener('pointerover', (e) => {
    const t = e.target as Element;
    cursor.classList.toggle('is-view', !!t.closest('.card'));
    cursor.classList.toggle('is-hover', !t.closest('.card') && !!t.closest('a, button'));
  });

  $$('.magnetic').forEach((el) => {
    const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - r.left - r.width / 2) * 0.25);
      my((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener('pointerleave', () => {
      mx(0);
      my(0);
    });
  });
}

/* --------------------------------------------------------------------------
   Word scrub (rebuilt whenever the paragraph text changes)
   -------------------------------------------------------------------------- */
const scrubTweens = new WeakMap<Element, gsap.core.Tween>();

function scrubWords(p: HTMLElement) {
  if (reduceMotion) return;
  scrubTweens.get(p)?.scrollTrigger?.kill();
  scrubTweens.get(p)?.kill();
  // split into words but keep any <br> line breaks from the markup
  p.innerHTML = p.innerHTML
    .split(/<br\s*\/?>/i)
    .map((line) =>
      line
        .trim()
        .split(/\s+/)
        .map((w) => `<span class="w">${w} </span>`)
        .join(''),
    )
    .join('<br />');
  const tween = gsap.fromTo(
    $$('.w', p),
    { opacity: 0.12 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 45%', scrub: true },
    },
  );
  scrubTweens.set(p, tween);
}

/* --------------------------------------------------------------------------
   Scroll animations
   -------------------------------------------------------------------------- */
function initScroll() {
  if (reduceMotion) {
    $$('[data-count]:not(.hero [data-count])').forEach((el) => countUp(el));
    return;
  }

  // Hero: watermark drifts sideways, portrait parallax, content lifts
  gsap.to('[data-watermark]', {
    xPercent: -28,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero__portrait img', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  // Line reveals outside the hero
  $$('.reveal-line:not(.hero .reveal-line)').forEach((line) => {
    gsap.from(line.children, {
      yPercent: 110,
      duration: 1.3,
      ease: 'expo.out',
      scrollTrigger: { trigger: line, start: 'top 88%' },
    });
  });

  // Fade-up blocks, batched so siblings stagger
  gsap.set('.reveal-up', { opacity: 0 });
  ScrollTrigger.batch('.reveal-up', {
    start: 'top 90%',
    onEnter: (els) =>
      gsap.fromTo(
        els,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, overwrite: true },
      ),
  });

  // Word-by-word scrubbed paragraph
  $$('[data-scrub-words]').forEach(scrubWords);

  // About card: grows to full width as it enters
  gsap.fromTo(
    '.about__card',
    { scale: 0.9, borderRadius: 48 },
    {
      scale: 1,
      borderRadius: 20,
      ease: 'none',
      scrollTrigger: { trigger: '.about__card', start: 'top bottom', end: 'top 30%', scrub: true },
    },
  );
  // stat card drifts against the scroll only where it sits beside the quote;
  // on mobile it is stacked above the quote and would slide over the text
  gsap.matchMedia().add('(min-width: 901px)', () => {
    gsap.from('.stat-card', {
      y: 80,
      ease: 'none',
      scrollTrigger: { trigger: '.about__card', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Counters outside hero
  $$('[data-count]:not(.hero [data-count])').forEach((el) => {
    ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => countUp(el) });
  });

  // Contact gradient parallax
  gsap.from('.gradient--contact', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top top', scrub: true },
  });
}

/* --------------------------------------------------------------------------
   Marquee — loops forever, speed & direction follow scroll velocity
   -------------------------------------------------------------------------- */
function initMarquee() {
  const track = $('[data-marquee]');
  if (!track) return;
  track.innerHTML += track.innerHTML; // duplicate for seamless loop
  if (reduceMotion) return;
  let x = 0;
  let dir = 1;
  gsap.ticker.add((_, delta) => {
    const v = lenis?.velocity ?? 0;
    if (Math.abs(v) > 0.5) dir = v > 0 ? 1 : -1;
    const speed = (0.04 + Math.min(Math.abs(v), 60) * 0.012) * dir;
    x -= speed * delta;
    const half = track.scrollWidth / 2;
    if (x <= -half) x += half;
    if (x > 0) x -= half;
    track.style.transform = `translate3d(${x}px,0,0)`;
  });
}

/* --------------------------------------------------------------------------
   Work — pinned horizontal scroll on desktop
   -------------------------------------------------------------------------- */
function initWork() {
  const section = $('[data-hscroll]')!;
  const track = $('[data-hscroll-track]', section)!;
  const indexEl = $('[data-work-index]');
  const cards = $$('.card', track);

  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    if (reduceMotion) return;
    const distance = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (st) => {
          if (!indexEl) return;
          const i = Math.min(cards.length - 1, Math.round(st.progress * (cards.length - 1)));
          indexEl.textContent = pad(i + 1);
        },
      },
    });

    // Each card's image drifts against the scroll for depth
    cards.forEach((card) => {
      gsap.fromTo(
        $$('.card__media img, .card__media .mock', card),
        { xPercent: -6 },
        {
          xPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        },
      );
    });
  });

  track.addEventListener('click', (e) => {
    const card = (e.target as Element).closest<HTMLElement>('[data-project]');
    const project = card && findProject(card.dataset.project);
    if (project) openModal(project, card);
  });
}

/* --------------------------------------------------------------------------
   Project modal
   -------------------------------------------------------------------------- */
const modal = $('[data-modal]')!;
const panel = $('.modal__panel', modal)!;
const body = $('[data-modal-body]', modal)!;
let lastFocus: HTMLElement | null = null;

function metricsHTML(metrics?: Metric[]) {
  if (!metrics?.length) return '';
  // four cards read better as a 2×2 grid than 3 + 1
  const cls = metrics.length === 4 ? 'modal__metrics modal__metrics--quad' : 'modal__metrics';
  return `<ul class="${cls}">${metrics
    .map(
      (m) =>
        `<li><strong>${m.value}</strong><span class="modal__metric-label">${m.label}</span>${
          m.desc ? `<span>${m.desc}</span>` : ''
        }</li>`,
    )
    .join('')}</ul>`;
}

function modalHTML(p: Project) {
  const link = p.link
    ? `<dt>Link</dt><dd><a href="${p.link.href}" target="_blank" rel="noopener">${p.link.label} ↗</a></dd>`
    : '';
  const head = `
    <p class="modal__category">${p.category}</p>
    <h2 class="modal__title" id="modal-title">${p.title}</h2>
    <p class="modal__subtitle">${p.subtitle}</p>`;
  const facts = `
      <dl class="modal__facts">
        <dt>Date</dt><dd>${p.date}</dd>
        ${link}
        <dt>Stack</dt>
        <dd class="modal__stack">${p.stack.map((s) => `<span class="chip">${s}</span>`).join('')}</dd>
      </dl>`;

  if (p.shape === 'case') {
    return `${head}
    <div class="modal__mock mock-frame" style="--hue:${p.hue}deg">${caseVisual(p)}</div>
    ${metricsHTML(p.metrics)}
    <div class="modal__info">
      ${facts}
      <div class="modal__desc modal__case">
        <section><h3>Problem</h3>${p.problem
          .split('\n\n')
          .map((t) => `<p>${t}</p>`)
          .join('')}</section>
        <section><h3>What I did</h3><ul>${p.did.map((d) => `<li>${d}</li>`).join('')}</ul></section>
        ${p.result ? `<section><h3>Result</h3><p>${p.result}</p></section>` : ''}
        ${
          p.teamwork?.length
            ? `<section class="modal__team"><h3>Teamwork</h3><ul>${p.teamwork.map((t) => `<li>${t}</li>`).join('')}</ul></section>`
            : ''
        }
      </div>
    </div>
    ${
      p.images?.length
        ? `<div class="modal__gallery">${p.images
            .map((src, i) => `<img src="${src}" alt="${t().shot(p.title, i + 1)}" loading="lazy" />`)
            .join('')}</div>`
        : ''
    }`;
  }

  const role = p.role
    ? `<p class="eyebrow" style="margin:40px 0 0">${t().role}</p><div class="modal__role">${p.role
        .map((r) => `<span class="chip">${r}</span>`)
        .join('')}</div>`
    : '';
  const gallery = p.images
    .map((src, i) => `<img src="${src}" alt="${t().shot(p.title, i + 1)}" loading="lazy" />`)
    .join('');
  return `${head}
    ${metricsHTML(p.metrics)}
    <div class="modal__info">
      ${facts}
      ${
        p.did
          ? `<div class="modal__desc modal__case">
        <section><h3>Overview</h3>${p.description.map((d) => `<p>${d}</p>`).join('')}</section>
        <section><h3>What I did</h3><ul>${p.did.map((d) => `<li>${d}</li>`).join('')}</ul></section>
        ${
          p.keyFeature
            ? `<section class="modal__team"><h3>Key Feature</h3><p class="modal__feature">${p.keyFeature.title}</p><p>${p.keyFeature.text}</p></section>`
            : ''
        }
        ${p.result ? `<section><h3>Result</h3><p>${p.result}</p></section>` : ''}
        ${p.resultGallery ? `<section><h3>Result</h3><div class="modal__gallery modal__gallery--inline">${gallery}</div></section>` : ''}
        ${role}
      </div>`
          : `<div class="modal__desc">
        ${p.description.map((d) => `<p>${d}</p>`).join('')}
        ${role}
      </div>`
      }
    </div>
    ${
      p.resultGallery
        ? ''
        : `<div class="modal__gallery ${p.shape === 'tall' ? 'modal__gallery--tall' : ''}">${gallery}</div>`
    }`;
}

let openId: string | null = null;

function openModal(p: Project, opener: HTMLElement) {
  lastFocus = opener;
  openId = p.id;
  body.innerHTML = modalHTML(p);
  modal.hidden = false;
  // reset only once visible: scrollTop is ignored while the modal is display:none
  panel.scrollTop = 0;
  lenis?.stop();
  document.body.style.overflow = 'hidden';
  panel.focus({ preventScroll: true });
  if (!reduceMotion) {
    gsap.fromTo('.modal__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.5 });
    gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.9, ease: 'expo.out' });
    gsap.from(body.children, { y: 40, opacity: 0, duration: 1, stagger: 0.05, delay: 0.2, ease: 'expo.out' });
  }
}

function closeModal() {
  if (modal.hidden) return;
  const done = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    lenis?.start();
    lastFocus?.focus({ preventScroll: true });
  };
  if (reduceMotion) return done();
  gsap.to('.modal__backdrop', { opacity: 0, duration: 0.4 });
  gsap.to(panel, { xPercent: 100, duration: 0.6, ease: 'expo.in', onComplete: done });
}

function initCopyEmail() {
  $$<HTMLButtonElement>('[data-copy-email]').forEach((btn) => {
    let timer = 0;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copyEmail!);
      } catch {
        return; // clipboard blocked: the mailto link next to it still works
      }
      btn.classList.add('is-copied');
      clearTimeout(timer);
      timer = window.setTimeout(() => btn.classList.remove('is-copied'), 1800);
    });
  });
}

function initModal() {
  $$('[data-modal-close]', modal).forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') {
      const focusables = $$<HTMLElement>('button, a[href]', panel);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* --------------------------------------------------------------------------
   Language switching
   -------------------------------------------------------------------------- */
const attrTargets: [string, string, keyof (typeof ui)['ko']][] = [
  ['.logo', 'aria-label', 'home'],
  ['.nav', 'aria-label', 'nav'],
  ['.marquee', 'aria-label', 'stack'],
  ['.hero__portrait img', 'alt', 'avatar'],
  ['.modal__close', 'aria-label', 'close'],
];

/** Swap every translatable string; `rebuild` re-runs the bits that animate text */
function applyLang(next: Lang, rebuild: boolean) {
  lang = next;
  document.documentElement.lang = next;
  document.title = t().title;
  $('meta[name="description"]')?.setAttribute('content', t().description);
  attrTargets.forEach(([sel, attr, key]) => $(sel)?.setAttribute(attr, t()[key] as string));

  $$('[data-i18n]').forEach((el) => {
    // the Korean markup is the source; remember it before the first swap
    el.dataset.ko ??= el.innerHTML;
    el.innerHTML = next === 'ko' ? el.dataset.ko : (en[el.dataset.i18n!] ?? el.dataset.ko);
  });
  $$<HTMLButtonElement>('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));

  if (!rebuild) return;
  $$('[data-scrub-words]').forEach(scrubWords);
  updateCardText();
  const open = openId && !modal.hidden && findProject(openId);
  if (open) body.innerHTML = modalHTML(open);
  ScrollTrigger.refresh();
}

function initLang() {
  applyLang(lang, false);
  $$<HTMLButtonElement>('[data-lang]').forEach((b) =>
    b.addEventListener('click', () => {
      const next = b.dataset.lang as Lang;
      if (next === lang) return;
      try {
        localStorage.setItem(LANG_KEY, next);
      } catch {
        /* not persisted; the switch still applies to this visit */
      }
      applyLang(next, true);
    }),
  );
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
fillStats();
initLang();
renderCards();
initLenis();
initAnchors();
initCursor();
initMarquee();
initScroll();
initWork();
initModal();
initCopyEmail();
runIntro();
