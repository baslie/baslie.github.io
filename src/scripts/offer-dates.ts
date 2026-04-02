const ACC = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
const PREP = ['январе','феврале','марте','апреле','мае','июне','июле','августе','сентябре','октябре','ноябре','декабре'];

const FINAL_WEEK_THRESHOLD = 7;
const SLOTS_SINGLE = 10;
const SLOTS_DOUBLE = 20;

/* ---------- hash & fake-decrement ---------- */

function splitmix(seed: number): number {
  let h = (seed + 0x9e3779b9) >>> 0;
  h = ((h ^ (h >>> 16)) * 0x85ebca6b) >>> 0;
  h = ((h ^ (h >>> 13)) * 0xc2b2ae35) >>> 0;
  return (h ^ (h >>> 16)) >>> 0;
}

function getSlotsTaken(totalSlots: number, year: number, month: number, day: number): number {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Collect working days starting from day 2
  const workingDays: number[] = [];
  for (let d = 2; d <= daysInMonth; d++) {
    const dow = new Date(year, month, d).getDay();
    if (dow !== 0 && dow !== 6) workingDays.push(d);
  }

  // Pick `totalSlots` days from working days using hash
  const takenDays: number[] = [];
  const pool = [...workingDays];

  for (let i = 0; i < totalSlots && pool.length > 0; i++) {
    const h = splitmix(year * 374761 + month * 668265 + i * 119873);
    const norm = h / 0xFFFFFFFF;
    const biased = Math.pow(norm, 0.7); // slight front-loading
    const idx = Math.min(Math.floor(biased * pool.length), pool.length - 1);
    takenDays.push(pool[idx]);
    pool.splice(idx, 1);
  }

  // Count how many "taken" days have passed
  const taken = takenDays.filter(d => d <= day).length;

  // Always keep at least 1 slot free
  return Math.min(taken, totalSlots - 1);
}

/* ---------- count-up animation ---------- */

function animateCount(el: HTMLElement, target: number, duration = 600) {
  if (target <= 0) { el.textContent = '0'; return; }
  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = String(Math.round(eased * target));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- main ---------- */

const now = new Date();
const month = now.getMonth();
const year = now.getFullYear();
const day = now.getDate();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const daysLeft = daysInMonth - day;

const nextMonth = (month + 1) % 12;
const nextYear = month === 11 ? year + 1 : year;

const isDouble = daysLeft <= FINAL_WEEK_THRESHOLD;
const slots = isDouble ? SLOTS_DOUBLE : SLOTS_SINGLE;
const taken = getSlotsTaken(SLOTS_SINGLE, year, month, day);
const free = slots - taken;

// superTitle
const superEl = document.querySelector<HTMLElement>('.o3-super');
if (superEl) {
  superEl.textContent = isDouble
    ? `Специальное предложение на ${ACC[month]}–${ACC[nextMonth]} ${nextYear}`
    : `Специальное предложение на ${ACC[month]} ${year}`;
}

// monthLimit
const limitEl = document.querySelector<HTMLElement>('[data-offer-date="monthLimit"]');
if (limitEl) {
  const rest = '. Не больше — потому что каждым занимаюсь лично, в полном фокусе, без параллельных задач на фоне.';
  limitEl.textContent = isDouble
    ? `В ${PREP[month]}–${PREP[nextMonth]} я беру только ${slots} проектов${rest}`
    : `В ${PREP[month]} я беру только ${slots} проектов${rest}`;
}

// availability
const availEl = document.querySelector<HTMLElement>('[data-offer-date="availability"]');
if (availEl) {
  const dot = availEl.querySelector('.o3-dot');
  const monthLabel = isDouble ? `${ACC[month]}–${ACC[nextMonth]}` : ACC[month];

  // Build content with a span for the animated number
  const countSpan = document.createElement('span');
  countSpan.className = 'o3-free-count';
  countSpan.textContent = '0';

  availEl.textContent = '';
  if (dot) availEl.appendChild(dot);
  availEl.appendChild(document.createTextNode(' Свободно: '));
  availEl.appendChild(countSpan);
  availEl.appendChild(document.createTextNode(` из ${slots} мест на ${monthLabel}`));

  // Urgency classes
  if (free <= 1) {
    availEl.classList.add('is-critical');
  } else if (free <= 3) {
    availEl.classList.add('is-low');
  }

  // Fade-in + count-up
  requestAnimationFrame(() => {
    availEl.classList.add('is-visible');
    animateCount(countSpan, free);
  });
}
