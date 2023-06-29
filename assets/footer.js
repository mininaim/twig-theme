/**
 * Modify the Zid icon, whithin `footer-marketing-link` in the footer.
 */
const modifyImgInFooter = () => {
  const links = document.querySelectorAll('.footer-marketing-link');
  links.forEach((link) => {
    link.classList.add('text-secondary');
    if (link.querySelector('img')) {
      const img = link.querySelector('img');
      img.setAttribute('loading', 'lazy');
      img.setAttribute('alt', 'Zid زد');
    }
  });
};
modifyImgInFooter();

/**
 * Updates the robots meta tag to include the 'index' directive, (or create it if it doesn't exist).
 */
const updateRobotsMetaTag = () => {
  let meta = document.getElementsByName('robots')[0];
  if (meta) {
    if (meta.getAttribute('content') === 'noindex') {
      meta.setAttribute('content', 'index');
    }
  } else {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'robots');
    meta.setAttribute('content', 'index');
    document.head.appendChild(meta);
  }
};
updateRobotsMetaTag();

/**
 * Replace a missing image in the footer with a new one. (We should probably do this in the backend.)
 */
document.addEventListener(
  'DOMContentLoaded',
  function () {
    const replaceImageFooter = (imageUrl, newImageUrl) => {
      const images = document.querySelectorAll('.js-shipping-icon');
      images.forEach((image) => {
        if (image.src === imageUrl) {
          image.src = newImageUrl;
        }
      });
    };
    replaceImageFooter(
      'https://media.zid.store/cdn-cgi/image/h=100,q=100/https://media.zid.store/static/default/icons/zid_zidship_Cold.png',
      'https://media.zid.store/a739c51c-8103-4648-873b-cc3a8ea2dc8a/2f147271-c2f9-4990-ae41-7c6f92036102.jpg',
    );
    replaceImageFooter(
      'https://media.zid.store/cdn-cgi/image/h=100,q=100/https://media.zid.store/static/mada-circle.png',
      'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-original-577x577/s3/022018/untitled-2_27.jpg',
    );
  },
  false,
);

/**
 * Blur effect when search input is focused.
 */
const toggleBlur = () => {
  const navigationMenu = document.getElementById('navigation-menu');
  const pageContent = document.getElementsByClassName('js-wrapper')[0];
  const searchInput = document.getElementById('js-search-focus');

  if (!searchInput) {
    return;
  }
  searchInput.addEventListener('focus', () => {
    pageContent.classList.add('blur-mode');
    navigationMenu.classList.add('blur-mode');
  });

  searchInput.addEventListener('blur', () => {
    if (searchInput.value === '') {
      pageContent.classList.remove('blur-mode');
      navigationMenu.classList.remove('blur-mode');
    }
  });
  searchInput.addEventListener('input', () => {
    if (searchInput.value === '') {
      pageContent.classList.remove('blur-mode');
      navigationMenu.classList.remove('blur-mode');
    }
  });
  document.addEventListener('mousedown', (event) => {
    if (event.target !== searchInput && !searchInput.contains(event.target)) {
      pageContent.classList.remove('blur-mode');
      navigationMenu.classList.remove('blur-mode');
    }
  });
  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' ||
      event.key === 'Esc' ||
      event.keyCode === 27 ||
      event.key === 'Tab' ||
      event.key === 'Enter'
    ) {
      pageContent.classList.remove('blur-mode');
      navigationMenu.classList.remove('blur-mode');
    }
  });
  const searchButton = document.querySelector('js-search-submit');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      pageContent.classList.remove('blur-mode');
      navigationMenu.classList.remove('blur-mode');
    });
  }
};
toggleBlur();

/**
 * Toggles the visibility of elements contained within the footer based on the screen size.
 */
const toggleFooterSections = (
  parentElementSelector,
  headingSelector,
  dataSelector,
  dataSectionSelector,
  toggleClass,
) => {
  const parentElement = document.querySelector(parentElementSelector);
  if (window.matchMedia('(max-width: 576px)').matches && parentElement) {
    parentElement.classList.remove('shadow-sm');
    const headingElements = parentElement.querySelectorAll(headingSelector);
    const dataElements = parentElement.querySelectorAll(dataSelector);
    const dataCopyright = parentElement.querySelector(dataSectionSelector);
    if (dataCopyright) {
      dataCopyright.classList.remove('border-top', 'border-bottom');
    }
    headingElements.forEach((headingElement, index) => {
      headingElement.style.cursor = 'pointer';
      const iconElement = document.createElement('i');
      iconElement.classList.add('ti', 'ti-circle-plus', 'align-middle', 'float-end');
      iconElement.setAttribute('aria-hidden', 'true');
      headingElement.insertBefore(iconElement, headingElement.firstChild);
      const dataElement = dataElements[index];
      dataElement.classList.add(toggleClass);

      headingElement.addEventListener('click', (event) => {
        const dataElement = dataElements[index];
        dataElement.classList.toggle(toggleClass);
        dataElement.classList.toggle('animated');
        dataElement.classList.toggle('slideIn');
        iconElement.classList.toggle('ti-circle-plus');
        iconElement.classList.toggle('ti-circle-minus');
      });
    });
  }
};
toggleFooterSections(
  'footer',
  'h2',
  'div[data-toggle="js-data-toggle"]',
  'section[data-section="js-copyright"]',
  'd-none',
);

/**
 * Clears data from local storage that is older than a week.
 */
const clearOldLocalStorage = () => {
  const now = Date.now();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const data = JSON.parse(value);
    if (data.timestamp + 1000 * 60 * 60 * 24 * 7 < now) {
      localStorage.removeItem(key);
    }
  }
};
setInterval(clearOldLocalStorage, 1000 * 60 * 60 * 24 * 7);

/*
 * This function submits the form when the value of the select element changes.
 */
function submitFormOnSelectChange(formId, selectClass) {
  const form = document.querySelector(`#${formId}`);
  if (form) {
    const selects = form.querySelectorAll(`.${selectClass}`);
    const currencyInput = form.querySelector('#input-change-session-currency-footer');

    selects.forEach((select) => {
      select.addEventListener('change', () => {
        const selectedCountry = select.value;
        const selectedCurrency = select.options[select.selectedIndex].getAttribute('data-currency');
        const selectedCurrencySymbol = select.options[select.selectedIndex].getAttribute('data-currency-symbol');
        currencyInput.setAttribute('value', selectedCurrency);
        currencyInput.setAttribute('data-currency', selectedCurrency);
        currencyInput.setAttribute('name', selectedCurrency);
        currencyInput.value = selectedCurrency;

        form.submit();
      });
    });
  }
}
submitFormOnSelectChange('changeLanguageCountry', 'form-select');

submitFormOnSelectChange('changeLanguageCountryMobile', 'form-select');
