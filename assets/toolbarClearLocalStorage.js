const clearFormatting = (buttonClass, callback) => {
  const toolbarClearFormattingButton = document.querySelector(buttonClass);
  if (toolbarClearFormattingButton) {
    toolbarClearFormattingButton.addEventListener('click', callback);
  }
};

clearFormatting('.js-toolbar-clear-formatting', () => {
  localStorage.clear();
  window.location.reload();
});
