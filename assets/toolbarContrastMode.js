const CONTRAST_SETTING_KEY = 'highContrast';

const contrastModes = {
  high: {
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '1em',
  },
  low: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '1em',
  },
};

const defaultContrastMode = 'low';

const setContrast = (mode) => {
  const styles = contrastModes[mode];
  Object.entries(styles).forEach(([property, value]) => {
    document.body.style[property] = value;
  });
};

const toggleContrast = () => {
  const currentMode = localStorage.getItem(CONTRAST_SETTING_KEY) || defaultContrastMode;
  const newMode = currentMode === 'high' ? 'low' : 'high';
  setContrast(newMode);
  localStorage.setItem(CONTRAST_SETTING_KEY, newMode);
};

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'c') {
    toggleContrast();
  }
});

const contrastToggle = document.getElementById('contrast-toggle');

if (contrastToggle) {
  contrastToggle.addEventListener('click', toggleContrast);
}

const contrastSelect = document.getElementById('contrast-select');

if (contrastSelect) {
  contrastSelect.addEventListener('change', (event) => {
    setContrast(event.target.value);
  });
}

const contrastOptions = document.querySelectorAll('[data-contrast-option]');

if (contrastOptions) {
  contrastOptions.forEach((option) => {
    option.addEventListener('input', (event) => {
      document.body.style[event.target.dataset.contrastOption] = event.target.value;
    });
  });
}

const contrastMode = localStorage.getItem(CONTRAST_SETTING_KEY) || defaultContrastMode;

setContrast(contrastMode);

if (contrastSelect) {
  contrastSelect.value = contrastMode;
}

if (contrastOptions) {
  contrastOptions.forEach((option) => {
    option.value = contrastModes[contrastMode][option.dataset.contrastOption];
  });
}
