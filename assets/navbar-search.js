const texts = {
  en: {
    seeMoreText: 'See All',
    arrowDirection: 'right',
    noResultText: 'We could not find any results for your search',
    resultLabel: 'Results',
    photoPlaceholder: 'Pic',
  },
  ar: {
    seeMoreText: 'استعرض  الكل',
    arrowDirection: 'left',
    noResultText: 'لم يتم العثور على نتائج مطابقة',
    resultLabel: 'نتيجة',
    photoPlaceholder: 'صورة',
  },
};

const getlang = document.documentElement.lang;
const { seeMoreText, arrowDirection, noResultText, resultLabel, photoPlaceholder } = texts[getlang];

async function fetchProductsSearch(catId, query) {
  const autocompleteItems = document.querySelector('.js-autocomplete-items');

  if (!query || query.trim().length <= 0) {
    autocompleteItems.innerHTML = '';
    return;
  }

  autocompleteItems.innerHTML = `
        <a class="list-group-item list-group-item-action border-secondary-subtle disabled">
          <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">{{ locals.accessibility.spinner.label }}</span>
            </div>
          </div>
        </a>`;

  try {
    const response = await zid.store.product.fetchAll(catId, { search: encodeURI(query) });
    if (response.status === '404') {
      return;
    }

    if (response.status === 'success') {
      if (response.data.products.data.length > 0) {
        autocompleteItems.innerHTML = '';

        for (let i = 0; i < 5; i++) {
          const product = response.data.products.data[i];
          if (!product) {
            break;
          }

          let productImage;
          if (product.images && product.images.length > 0 && product.image_url !== null) {
            productImage = `<img src="${product.images[0]['image']['small']}" class="img-fluid rounded" width="50" height="50" alt="${product.name}">`;
          } else {
            productImage = `
                        <svg class="placeholder-img img-fluid rounded text-primary" width="50" height="50" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${photoPlaceholder}" preserveaspectratio="xMidYMid slice" focusable="false">
                            <title>${photoPlaceholder}</title>
                            <rect width="100%" height="100%" fill="currentColor"></rect>
                            <text x="50%" y="50%" fill="#fff" dy=".3em">${photoPlaceholder}</text>
                        </svg>`;
          }

          autocompleteItems.innerHTML += `
                        <a class="list-group-item list-group-item-action border-secondary-subtle" href="/products/${product.slug}">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="me-3 overflow-hidden zooming rounded-2">
                            ${productImage}
                            </div>
                            <div class="flex-grow-1 d-flex justify-content-between align-items-center">
                            <h6 class="mb-0 fw-light">${product.name}</h6>
                            <span class="badge bg-body-tertiary text-secondary-emphasis rounded-pill">${product.formatted_price}</span>
                            </div>
                        </div>
                        </a>`;
        }

        const redirect = '/products?search=' + query;
        autocompleteItems.innerHTML += `
                <a class="list-group-item py-3 rounded-0 rounded-bottom link-primary border-secondary-subtle text-body-emphasis" href="${redirect}">
                  <div class="text-center">
                    <h6 class="mb-0 fw-light">
                     <span>(${response.data.products.total}) ${seeMoreText}</span>
                      <i class="ti ti-arrow-${arrowDirection} align-middle" aria-hidden="true"></i>
                    </h6>
              </div>
            </a>`;
      } else {
        autocompleteItems.innerHTML = `
          <a class="list-group-item list-group-item-action border-secondary-subtle disabled py-3">
            <div class="d-flex justify-content-center align-items-center">
              <h6 class="mb-0 fw-light">
                <i class="ti ti-search align-middle" aria-hidden="true"></i> 
                <span class="px-1">${noResultText}</span>
              </h6>
            </div>
          </a>`;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('keyup', (event) => {
  if (event.key !== '/' || event.ctrlKey || event.metaKey) return;
  if (/^(?:input|textarea|select|button)$/i.test(event.target.tagName)) return;

  event.preventDefault();
  document.getElementById('js-search-focus').focus();
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-search-submit').addEventListener('click', (event) => {
    const search = document.querySelector('.js-search-input-text').value;
    if (search === '') {
      event.preventDefault();
    } else {
      window.location.href = '/products?search=' + search;
    }
  });

  document.querySelector('.js-search-input-text').addEventListener('keyup', () => {
    if (document.querySelector('.js-search-input-text').value !== '') {
      document.querySelector('.js-search-submit').classList.remove('disabled');
      document.querySelector('.js-search-results').classList.remove('d-none');
      document
        .querySelector('.js-autocomplete-items')
        .classList.add(
          'list-group',
          'list-group-flush',
          'rounded',
          'bg-white',
          'shadow-lg',
          'position-absolute',
          'w-100',
          'mt-2',
          'shadow',
        );
    } else {
      document.querySelector('.js-search-submit').classList.add('disabled');
      document.querySelector('.js-search-results').classList.add('d-none');
      document
        .querySelector('.js-autocomplete-items')
        .classList.remove(
          'list-group',
          'list-group-flush',
          'rounded',
          'bg-white',
          'shadow-lg',
          'position-absolute',
          'w-100',
          'mt-2',
          'shadow',
        );
    }
  });

  $('.js-search-input-text').off('mousedown', function () {
    document.querySelector('.js-search-input-text').value = '';
    document.querySelector('.js-search-submit').classList.add('disabled');
    document.querySelector('.js-search-results').classList.add('d-none');
    document
      .querySelector('.js-autocomplete-items')
      .classList.remove(
        'list-group',
        'list-group-flush',
        'rounded',
        'bg-white',
        'shadow-sm',
        'position-absolute',
        'w-100',
        'mt-2',
        'shadow',
      );
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const searchInputText = document.querySelector('.js-search-input-text');
  searchInputText.addEventListener('input', function (event) {
    fetchProductsSearchDebounce(event.currentTarget);
  });
});

const debounce = (func, wait, immediate) => {
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

const fetchProductsSearchDebounce = debounce(function (target) {
  fetchProductsSearch($(target).attr('data-category-id'), $(target).val());
}, 650);

document.addEventListener('click', function (event) {
  if (!event.target.closest('.js-search-input-text')) {
    document.querySelector('.js-search-input-text').value = '';
    document.querySelector('.js-search-submit').classList.add('disabled');
    document.querySelector('.js-search-results').classList.add('d-none');
    document
      .querySelector('.js-autocomplete-items')
      .classList.remove(
        'list-group',
        'list-group-flush',
        'rounded',
        'bg-white',
        'shadow-sm',
        'position-absolute',
        'w-100',
        'mt-2',
        'shadow',
      );
  }
});

/**
 * Voice search functionality for the search bar in the header.
 */

let isRecording = false;
const startVoiceSearch = () => {
  const searchInput = document.getElementById('js-search-focus');
  const microphoneIcon = document.getElementById('js-microphone-icon');
  let recognition;
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    const lang = document.documentElement.lang;
    recognition.lang = lang === 'ar' ? 'ar-SA' : 'en-US';

    recognition.maxAlternatives = 1;
  } else {
    alert('Voice search is not supported in your browser.');
    return;
  }

  recognition.onstart = () => {
    if (event.error == 'not-allowed') {
      alert('Please allow access to your microphone.');
      return;
    }
    microphoneIcon.classList.add('text-danger');
    isRecording = true;
  };
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    document.querySelector('.js-search-submit').click();

    recognition.stop();
  };

  recognition.onend = () => {
    microphoneIcon.classList.remove('text-danger');
    isRecording = false;
  };
  if (isRecording) {
    recognition.stop();
    isRecording = false;
  } else {
    recognition.start();
  }
};

document.getElementById('js-microphone-icon').addEventListener('click', startVoiceSearch);

/**
 * Show search mobile container.
 */
const showSearchMobileContainer = () => {
  const searchMobile = document.getElementById('js-search-mobile');
  const searchMobileContainer = document.querySelector('.js-search-mobile-container');
  const body = document.querySelector('body');
  const closeBtn = document.getElementById('js-search-mobile-close');

  if (searchMobile) {
    searchMobile.addEventListener('click', () => {
      searchMobileContainer.style.display = 'block';
      searchMobileContainer.style.top = '0';
      searchMobileContainer.style.left = '0';
      searchMobileContainer.style.width = '100%';
      searchMobileContainer.style.height = '100%';
      searchMobileContainer.style.position = 'fixed';
      searchMobileContainer.style.zIndex = '1000';
      searchMobileContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
      searchMobileContainer.classList.add('css-search-mobile-container-animated');
      body.style.overflow = 'hidden';

      closeBtn.addEventListener('click', () => {
        searchMobileContainer.style.display = 'none';
        setTimeout(() => {
          searchMobileContainer.classList.add('css-search-mobile-container-animated');
        }, 10);
        body.style.overflow = 'auto';
      });
    });
  }
};

window.addEventListener('load', showSearchMobileContainer);
