const updateFont = (font) => {
  font = font.replace(/\+/g, ' ');

  const fontLinks = document.querySelectorAll('link[rel="stylesheet"][href^="https://fonts.googleapis.com/css"]');
  fontLinks.forEach((link) => link.parentNode.removeChild(link));

  const fontLink = document.createElement('link');

  fontLink.rel = 'preload';
  fontLink.as = 'style';
  fontLink.onload = () => {
    fontLink.rel = 'stylesheet';
  };

  fontLink.href = `https://fonts.googleapis.com/css?family=${font}:wght@400,700&display=swap`;
  document.head.appendChild(fontLink);

  font = `'${font}'`;
  document.documentElement.style.setProperty('--font-family', font + ', sans-serif');

  const options = document.querySelectorAll('.dropdown-item');
  options.forEach((option) => {
    if (option.dataset.value === font.replace(/'/g, '')) {
      option.classList.add('text-primary');
      if (option.querySelector('.ti-check')) return;
      option.innerHTML = `${option.innerHTML} <i class="ti ti-check px-2 align-middle" aria-hidden="true"></i>`;
    } else {
      option.classList.remove('text-primary');
      option.innerHTML = option.innerHTML.replace(
        ' <i class="ti ti-check px-2 align-middle" aria-hidden="true"></i>',
        '',
      );
    }
  });
};

const initFontSelect = () => {
  let fontSelect = document.querySelector('.js-toolbar-font');

  let defaultFont = 'Baloo Bhaijaan 2';
  if (document.documentElement.lang !== 'ar') {
    defaultFont = 'Inter';
  }
  defaultFont = localStorage.getItem('font-family') || defaultFont;

  if (fontSelect) {
    fontSelect.innerHTML = `<i class="ti ti-typography" aria-hidden="true"></i>`;
    document.documentElement.style.setProperty('--font-family', defaultFont + ', sans-serif');
  }

  const fontOptions = document.querySelectorAll('.dropdown-item');
  if (fontOptions.length) {
    fontOptions.forEach((item) => {
      item.addEventListener('click', (event) => {
        const font = event.target.dataset.value;
        localStorage.setItem('font-family', font);
        document.documentElement.style.setProperty('--font-family', font + ', sans-serif');

        updateFont(font);
      });
    });
  }

  updateFont(defaultFont);
};

window.addEventListener('load', initFontSelect);
