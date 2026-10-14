// Попап с формой заявки на /offer/4: открывается кнопкой, закрывается крестиком, Esc и кликом по фону
const dialog = document.querySelector<HTMLDialogElement>('[data-form-dialog]');

if (dialog) {
  document.querySelectorAll('[data-open-form]').forEach((btn) => {
    btn.addEventListener('click', () => {
      dialog.showModal();
      dialog.querySelector<HTMLInputElement>('#o3-name')?.focus();
    });
  });

  dialog.querySelector('[data-close-form]')?.addEventListener('click', () => dialog.close());

  // Клик по затемнению: событие приходит на сам <dialog>, а не на его содержимое
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}
