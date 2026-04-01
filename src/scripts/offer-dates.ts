const ACC = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
const PREP = ['январе','феврале','марте','апреле','мае','июне','июле','августе','сентябре','октябре','ноябре','декабре'];

const FINAL_WEEK_THRESHOLD = 7;
const SLOTS_SINGLE = 5;
const SLOTS_DOUBLE = 10;

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

// superTitle: "Специальное предложение на апрель 2026" или "на апрель–май 2026"
const superEl = document.querySelector<HTMLElement>('.o3-super');
if (superEl) {
  if (isDouble) {
    superEl.textContent = `Специальное предложение на ${ACC[month]}–${ACC[nextMonth]} ${nextYear}`;
  } else {
    superEl.textContent = `Специальное предложение на ${ACC[month]} ${year}`;
  }
}

// monthLimit: "В апреле я беру только 5 проектов" или "В апреле–мае я беру только 10 проектов"
const limitEl = document.querySelector<HTMLElement>('[data-offer-date="monthLimit"]');
if (limitEl) {
  const rest = '. Не больше — потому что каждым занимаюсь лично, в полном фокусе, без параллельных задач на фоне.';
  if (isDouble) {
    limitEl.textContent = `В ${PREP[month]}–${PREP[nextMonth]} я беру только ${slots} проектов${rest}`;
  } else {
    limitEl.textContent = `В ${PREP[month]} я беру только ${slots} проектов${rest}`;
  }
}

// availability: "Свободно: 5 из 5 мест на апрель" или "10 из 10 мест на апрель–май"
const availEl = document.querySelector<HTMLElement>('[data-offer-date="availability"]');
if (availEl) {
  const dot = availEl.querySelector('.o3-dot');
  if (isDouble) {
    availEl.textContent = `Свободно: ${slots} из ${slots} мест на ${ACC[month]}–${ACC[nextMonth]}`;
  } else {
    availEl.textContent = `Свободно: ${slots} из ${slots} мест на ${ACC[month]}`;
  }
  if (dot) availEl.prepend(dot);
}
