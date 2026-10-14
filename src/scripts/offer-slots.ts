import type { OfferSlotsConfig } from '../data/offer-slots';

const DAY_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTH_SHORT = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const DAY_MS = 86_400_000;

interface Cell {
  day: number; // 0 = понедельник
  time: string;
  at: number; // начало слота, «наивное» время пояса в мс
  state: 'free' | 'taken' | 'past';
}

/* ---------- время в заданном поясе ---------- */

// Текущее время пояса как «наивная» UTC-метка: вся арифметика календаря дальше идёт в UTC
function zonedNow(timeZone: string): number {
  if (import.meta.env.DEV) {
    const override = new URLSearchParams(location.search).get('now');
    if (override) return Date.parse(`${override}Z`);
  }
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'));
}

function mondayOf(ts: number): number {
  const d = new Date(ts);
  const dayStart = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const dow = (d.getUTCDay() + 6) % 7;
  return dayStart - dow * DAY_MS;
}

/* ---------- расчётная занятость ---------- */

function splitmix(seed: number): number {
  let h = (seed + 0x9e3779b9) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 0x100000000;
}

function buildWeek(cfg: OfferSlotsConfig, weekStart: number, now: number, simulate: boolean): Cell[] {
  const perDay = Array.from({ length: 7 }, (_, i) =>
    Math.min(cfg.times.length, Math.floor(cfg.limit / 7) + (i < cfg.limit % 7 ? 1 : 0)),
  );
  // Сид — номер недели: у каждой недели свой рисунок занятости
  const weekSeed = Math.round(weekStart / DAY_MS / 7);
  const cells: Cell[] = [];

  perDay.forEach((count, day) => {
    cfg.times.slice(0, count).forEach((time) => {
      const [h, m] = time.split(':').map(Number);
      const at = weekStart + day * DAY_MS + (h * 60 + m) * 60_000;
      const i = cells.length;
      let state: Cell['state'] = 'free';

      if (simulate) {
        if (at <= now) {
          state = 'past';
        } else if (splitmix(weekSeed * 1009 + i * 2) >= cfg.neverBooked) {
          // Слот «бронируют» в случайный момент между началом недели и самим слотом,
          // чаще ближе к слоту: корень сдвигает момент брони к концу отрезка
          const bookedAt = weekStart + Math.sqrt(splitmix(weekSeed * 1009 + i * 2 + 1)) * (at - weekStart);
          if (bookedAt <= now) state = 'taken';
        }
      }
      cells.push({ day, time, at, state });
    });
  });

  return cells;
}

/* ---------- текст ---------- */

function plural(n: number, one: string, few: string, many: string): string {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
  return many;
}

function counterText(free: number, limit: number): string {
  if (free === 0) return 'На этой неделе мест нет. Запишитесь на следующую';
  if (free <= 5) {
    const verb = plural(free, 'остался', 'осталось', 'осталось');
    return `На этой неделе ${verb} ${free} ${plural(free, 'слот', 'слота', 'слотов')}`;
  }
  // «из 20 слотов», «из 21 слота»
  return `На этой неделе свободно ${free} из ${limit} ${plural(limit, 'слота', 'слотов', 'слотов')}`;
}

function dayLabel(date: Date, day: number): string {
  return `${DAY_SHORT[day]}, ${date.getUTCDate()} ${MONTH_SHORT[date.getUTCMonth()]}`;
}

function freeText(n: number): string {
  return n === 0 ? 'нет мест' : `${n} ${plural(n, 'свободен', 'свободно', 'свободно')}`;
}

/* ---------- отрисовка ---------- */

function render(root: HTMLElement) {
  const cfg: OfferSlotsConfig = JSON.parse(root.dataset.config || '');
  const now = zonedNow(cfg.timeZone);
  const thisMonday = mondayOf(now);

  let cells = buildWeek(cfg, thisMonday, now, true);
  let free = cells.filter((c) => c.state === 'free').length;
  const counter = counterText(free, cells.length);
  const isNextWeek = free === 0;

  if (isNextWeek) {
    cells = buildWeek(cfg, thisMonday + 7 * DAY_MS, now, false);
    free = cells.length;
  }
  const weekStart = isNextWeek ? thisMonday + 7 * DAY_MS : thisMonday;
  const todayIdx = isNextWeek ? -1 : Math.floor((now - thisMonday) / DAY_MS);

  const counterEl = root.querySelector<HTMLElement>('[data-slots-counter]')!;
  counterEl.textContent = counter;
  root.classList.toggle('is-low', !isNextWeek && free <= 5);
  root.classList.toggle('is-next', isNextWeek);

  const meter = root.querySelector<HTMLElement>('[data-slots-meter]')!;
  meter.style.width = `${Math.round(((cells.length - free) / cells.length) * 100)}%`;

  const grid = root.querySelector<HTMLElement>('[data-slots-grid]')!;
  grid.textContent = '';

  // День — одна колонка: ячейки без времени и число свободных. Время договариваемся отдельно
  for (let day = 0; day < 7; day++) {
    const date = new Date(weekStart + day * DAY_MS);
    const dayCells = cells.filter((c) => c.day === day);
    const dayFree = dayCells.filter((c) => c.state === 'free').length;
    const label = dayLabel(date, day);

    let col: HTMLElement;
    if (dayFree > 0) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.day = label;
      btn.setAttribute('aria-label', `${label}: ${freeText(dayFree)}. Выбрать день`);
      col = btn;
    } else {
      col = document.createElement('div');
      col.setAttribute('aria-label', `${label}: нет мест`);
    }
    col.className = 'o3-slots-day';
    if (day === todayIdx) col.classList.add('is-today');
    if (day < todayIdx) col.classList.add('is-past');
    if (dayFree === 0) col.classList.add('is-full');

    const head = document.createElement('span');
    head.className = 'o3-slots-head';
    head.innerHTML = `<span>${DAY_SHORT[day]}</span><span>${date.getUTCDate()}</span>`;
    col.appendChild(head);

    const pips = document.createElement('span');
    pips.className = 'o3-slots-pips';
    pips.setAttribute('aria-hidden', 'true');
    for (const cell of dayCells) {
      const pip = document.createElement('span');
      pip.className = `o3-slot is-${cell.state}`;
      pips.appendChild(pip);
    }
    col.appendChild(pips);

    const count = document.createElement('span');
    count.className = 'o3-slots-free';
    count.setAttribute('aria-hidden', 'true');
    count.textContent = day < todayIdx ? '—' : dayFree === 0 ? 'нет' : String(dayFree);
    col.appendChild(count);

    grid.appendChild(col);
  }

  grid.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-day]');
    if (!btn) return;
    grid.querySelectorAll('.is-selected').forEach((b) => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
    document.dispatchEvent(new CustomEvent('offer:slot', { detail: btn.dataset.day }));
  });

  root.hidden = false;
}

const root = document.querySelector<HTMLElement>('[data-offer-slots]');
if (root) {
  try {
    render(root);
  } catch (err) {
    root.hidden = true;
    console.warn('Offer slots failed:', err);
  }
}
