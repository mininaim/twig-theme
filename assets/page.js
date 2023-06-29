const headerTitle = document.querySelector('.js-header-title');
const article = document.querySelector('.js-article');
const modalTitle = document.querySelector('.js-fullscreenModalTitle');
const modalContent = document.querySelector('.js-fullscreenModalBody');

const cloneContent = () => {
  const titleText = headerTitle.textContent;
  const articleText = article.textContent;

  modalContent.innerHTML = articleText;
  modalTitle.innerHTML = titleText;
};

let timeoutId;

const debouncedCloneContent = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(cloneContent, 250);
};

const button = document.querySelector('#js-page-fullscreen');
if (button) {
  button.addEventListener('click', debouncedCloneContent);
}
