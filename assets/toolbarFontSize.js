const runFontSizeControls = () => {
  const fontSizeControls = document.querySelector('.js-font-size-controls');
  if (!fontSizeControls) return;

  // Check if the browser is in private mode
  const isPrivate = (() => {
    try {
      localStorage.setItem('testPrivateMode', '1');
      localStorage.removeItem('testPrivateMode');
      return false;
    } catch (e) {
      return true;
    }
  })();

  if (isPrivate) {
    // Display a message to the user asking them to disable private mode or use a different browser
    alert(
      'This feature is not available in private mode. Please disable private mode or use a different browser to use this feature.',
    );
    return;
  }

  const dropdown = fontSizeControls.parentElement;
  const resetButton = document.getElementById('js-font-size-reset');
  if (!resetButton) return;
  const DEFAULT_FONT_SIZE = 16;
  const rangeInput = document.getElementById('changeFontSize');
  if (!rangeInput) return;
  let fontSize = localStorage.getItem('fontSize') || DEFAULT_FONT_SIZE;
  rangeInput.value = fontSize;
  document.documentElement.style.fontSize = `${fontSize}px`;

  resetButton.addEventListener('click', () => {
    fontSize = DEFAULT_FONT_SIZE;
    rangeInput.value = fontSize;
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize);
  });

  rangeInput.addEventListener('input', () => {
    fontSize = rangeInput.value;
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize);
  });
};

document.addEventListener('DOMContentLoaded', runFontSizeControls);
