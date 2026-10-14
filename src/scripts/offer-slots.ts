import type { OfferSlotsConfig } from '../data/offer-slots';

const DAY_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTH_SHORT = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;

// Вес «записей» по дням недели (Пн…Вс): чаще в начале недели, в выходные почти нет
const DAY_WEIGHTS = [1.3, 1.2, 1.1, 1.0, 0.9, 0.3, 0];
// Записи случаются с 9:00 до 22:00
const FIRST_HOUR = 9;
const LAST_HOUR = 22;
// Сегодняшний день предлагается в форме только до этого часа
const TODAY_UNTIL_HOUR = 18;

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

function dayStartOf(ts: number): number {
  const d = new Date(ts);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function mondayOf(ts: number): number {
  const dow = (new Date(ts).getUTCDay() + 6) % 7;
  return dayStartOf(ts) - dow * DAY_MS;
}

/* ---------- расчётный счётчик ---------- */

function splitmix(seed: number): number {
  let h = (seed + 0x9e3779b9) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 0x100000000;
}

// Моменты «записей» недели. Зависят только от номера недели, поэтому одинаковы для всех посетителей.
// Их не больше limit − minFree, так что счётчик никогда не опускается ниже minFree
function weekBookings(cfg: OfferSlotsConfig, weekStart: number): number[] {
  const weekSeed = Math.round(weekStart / DAY_MS / 7);
  const rnd = (i: number) => splitmix(weekSeed * 7919 + i);
  const count = cfg.limit - cfg.minFree - Math.floor(rnd(0) * (cfg.spread + 1));
  const totalWeight = DAY_WEIGHTS.reduce((a, b) => a + b, 0);

  const times: number[] = [];
  for (let k = 0; k < count; k++) {
    let pick = rnd(1 + k * 3) * totalWeight;
    let day = 0;
    while (day < 6 && pick >= DAY_WEIGHTS[day]) pick -= DAY_WEIGHTS[day++];
    const hours = FIRST_HOUR + rnd(2 + k * 3) * (LAST_HOUR - FIRST_HOUR);
    times.push(weekStart + day * DAY_MS + hours * HOUR_MS);
  }
  return times;
}

/** Свободно слотов в момент t (наивное время пояса). Внутри недели не растёт, не ниже minFree */
export function freeAt(cfg: OfferSlotsConfig, t: number): number {
  const booked = weekBookings(cfg, mondayOf(t)).filter((at) => at <= t).length;
  return cfg.limit - booked;
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
  if (free <= 5) {
    const verb = plural(free, 'остался', 'осталось', 'осталось');
    return `На этой неделе ${verb} ${free} ${plural(free, 'слот', 'слота', 'слотов')}`;
  }
  // «из 20 слотов», «из 21 слота»
  return `На этой неделе свободно ${free} из ${limit} ${plural(limit, 'слота', 'слотов', 'слотов')}`;
}

/* ---------- отрисовка ---------- */

function renderCounter(el: HTMLElement, cfg: OfferSlotsConfig, now: number) {
  const free = freeAt(cfg, now);
  el.querySelector<HTMLElement>('[data-counter-text]')!.textContent = counterText(free, cfg.limit);
  el.classList.toggle('is-low', free <= 5);
  el.hidden = false;
}

// Ближайшие 7 дней, начиная с сегодня (сегодня — только до TODAY_UNTIL_HOUR)
function renderDays(fieldset: HTMLElement, now: number) {
  const list = fieldset.querySelector<HTMLElement>('[data-days-list]')!;
  const today = dayStartOf(now);
  const startOffset = now - today >= TODAY_UNTIL_HOUR * HOUR_MS ? 1 : 0;
  list.textContent = '';

  for (let i = startOffset; i < startOffset + 7; i++) {
    const date = new Date(today + i * DAY_MS);
    const dow = DAY_SHORT[(date.getUTCDay() + 6) % 7];
    const label = document.createElement('label');
    label.className = 'o3-day';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'slot';
    input.value = `${dow}, ${date.getUTCDate()} ${MONTH_SHORT[date.getUTCMonth()]}`;
    const text = document.createElement('span');
    text.innerHTML = `<b>${dow}</b> ${date.getUTCDate()}`;
    label.append(input, text);
    list.appendChild(label);
  }

  // Повторный клик по выбранному дню снимает выбор: поле необязательное
  let lastChecked: HTMLInputElement | null = null;
  list.addEventListener('click', (e) => {
    const input = e.target as HTMLInputElement;
    if (input.name !== 'slot') return;
    if (input === lastChecked) {
      input.checked = false;
      lastChecked = null;
    } else {
      lastChecked = input;
    }
  });

  fieldset.hidden = false;
}

const counterEl = document.querySelector<HTMLElement>('[data-slots-counter]');
const daysEl = document.querySelector<HTMLElement>('[data-slots-days]');
const configEl = counterEl ?? daysEl;

if (configEl) {
  try {
    const cfg: OfferSlotsConfig = JSON.parse(configEl.dataset.config || '');
    const now = zonedNow(cfg.timeZone);
    if (counterEl) renderCounter(counterEl, cfg, now);
    if (daysEl) renderDays(daysEl, now);
  } catch (err) {
    // Без счётчика и выбора дня страница и форма работают как обычно
    if (counterEl) counterEl.hidden = true;
    if (daysEl) daysEl.hidden = true;
    console.warn('Offer slots failed:', err);
  }
}
