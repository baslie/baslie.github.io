/**
 * Offer form submission handler.
 *
 * Credentials are in client-side code because this is a static site (Astro SSG)
 * deployed to GitHub Pages — there is no server-side runtime to proxy requests.
 * The Telegram bot token is scoped to sending messages only; the Google Apps Script
 * URL is a public POST endpoint. Risk is limited to potential spam.
 */

const BOT_TOKEN = '8298368299:AAHWzsXXSzhAdJSHboxBDs5BX4skw56_eUc';
const CHAT_ID = '-5212108457';
const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbwFWWiB9aSqEb_gi4rOnol4vQ-oiIfGt1UmiGB6hQuUw_toCu-GRFO71YHHpaGW2NwhhQ/exec';
const TELEGRAM_HANDLE = '@roman_purtow';

// Read UTM: prefer current URL, fall back to localStorage (saved on landing page)
const currentQs = window.location.search;
const saved: { path?: string; search?: string } | null = JSON.parse(
  localStorage.getItem('o3_utm') || 'null',
);
const utmSearch = currentQs.length > 1 ? currentQs : (saved?.search || '');
const utmLandingPath = saved?.path || window.location.pathname;
const urlParams = new URLSearchParams(utmSearch);

const form = document.querySelector<HTMLFormElement>('.o3-form');

if (form) {
  form.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();

    const btn = form.querySelector<HTMLButtonElement>('.o3-cta--submit')!;
    const originalText = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.disabled = true;

    const name = (form.querySelector('#o3-name') as HTMLInputElement).value.trim();
    const contact = (form.querySelector('#o3-contact') as HTMLInputElement).value.trim();
    const project = (form.querySelector('#o3-project') as HTMLTextAreaElement).value.trim();

    const isResolved = (v: string | null) => v && !v.includes('{') && !v.includes('}');
    const get = (k: string) => {
      const v = urlParams.get(k);
      return isResolved(v) ? v : null;
    };

    let text = `📩 <b>Новая заявка</b>\n\n👤 Имя: ${name}\n📱 Контакт: ${contact}`;
    if (project) {
      text += `\n📝 Проект: ${project}`;
    }
    text += `\n\n🔗 ${window.location.pathname}`;

    const source = get('utm_source');
    const medium = get('utm_medium');

    if (source) text += `\n📊 ${source}${medium ? ' / ' + medium : ''}`;

    const shown = new Set(['utm_source', 'utm_medium']);
    const utmOtherParts: string[] = [];
    for (const [key, raw] of urlParams) {
      if (shown.has(key)) continue;
      if (!isResolved(raw)) continue;
      text += `\n🏷 ${key}: ${raw}`;
      utmOtherParts.push(`${key}=${raw}`);
    }

    if (utmSearch) text += `\n\n🔗 ${utmLandingPath}${utmSearch}`;

    const sheetData = {
      name,
      contact,
      project,
      page: window.location.pathname,
      utm_source: source || '',
      utm_medium: medium || '',
      utm_other: utmOtherParts.join(', '),
      landing_url: utmSearch ? `${utmLandingPath}${utmSearch}` : '',
    };

    try {
      const [tgResult, sheetsResult] = await Promise.allSettled([
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
        }),
        fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetData),
        }),
      ]);

      if (sheetsResult.status === 'rejected') {
        console.warn('Google Sheets submission failed:', sheetsResult.reason);
      }

      if (tgResult.status === 'rejected' || !(tgResult as PromiseFulfilledResult<Response>).value.ok) {
        throw new Error('Telegram API error');
      }

      const wrap = form.closest('.o3-form-wrap')!;
      const note = wrap.querySelector('.o3-form-note');
      localStorage.removeItem('o3_utm');
      form.innerHTML = '<p class="o3-success">✓ Заявка отправлена! Свяжусь с вами в течение часа.</p>';
      if (note) note.remove();
    } catch {
      btn.textContent = originalText;
      btn.disabled = false;

      if (!form.querySelector('.o3-error')) {
        const err = document.createElement('p');
        err.className = 'o3-error';
        err.textContent = `Не удалось отправить. Напишите в Telegram: ${TELEGRAM_HANDLE}`;
        form.appendChild(err);
      }
    }
  });
}
