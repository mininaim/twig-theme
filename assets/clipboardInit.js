const clipboard = new ClipboardJS('.btn-clipboard');
clipboard.on('success', (e) => {
  e.trigger.innerHTML = '<i class="ti ti-clipboard-check align-middle fs-6" aria-hidden="true"></i>';
  setTimeout(() => {
    e.trigger.innerHTML = '<i class="ti ti-copy align-middle fs-6" aria-hidden="true"></i>';
  }, 1000);
  e.clearSelection();

  const toast = document.querySelector('.js-toast');
  const toastBody = document.querySelector('.js-toast-message');

  const root = document.querySelector('html[lang]');
  const language = root.getAttribute('lang');

  const messagesTranslate = {
    en: 'Content copied to clipboard!',
    ar: 'تم نسخ المحتوى إلى الحافظة!',
  };

  toastBody.innerHTML =
    '<i class="ti ti-circle-check align-middle fs-6" aria-hidden="true" hidden></i>' + messagesTranslate[language] ||
    'Content copied to clipboard!';

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 1500);
});
