const showFilterStatus = () => {
  const urlParams = new URLSearchParams(new URL(location.href).search);

  const hasPriceFilter = urlParams.has('from_price') || urlParams.has('to_price');

  const isOnSale = urlParams.has('on_sale');

  const filterStatusElement = document.querySelector('.js-filter-status');
  if (filterStatusElement && (hasPriceFilter || isOnSale)) {
    filterStatusElement.classList.remove('d-none');
  }
};
showFilterStatus();

const updateCheckbox = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let onSale = urlParams.has('on_sale') ? urlParams.get('on_sale') : false;

  const checkbox = document.getElementById('inputShowDiscounts');

  if (onSale === 'on') {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
};
window.addEventListener('load', updateCheckbox);

const redirectToSelectedPage = () => {
  const pageSelect = document.getElementById('redirectToSelectedPage');
  if (!pageSelect) return;

  const selectedPage = pageSelect.value;

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('page', selectedPage);

  window.location.href = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
};

function toggleDivs() {
  const sortDiv = document.getElementById('sortAttirbutesContainer');
  const filterDiv = document.getElementById('filterAttirbutesContainer');

  const button = document.querySelector('.js-toggleButton');

  if (sortDiv.hasAttribute('hidden')) {
    sortDiv.toggleAttribute('hidden');
  } else {
    sortDiv.setAttribute('hidden', true);
  }
  if (filterDiv.hasAttribute('hidden')) {
    filterDiv.toggleAttribute('hidden');
  } else {
    filterDiv.setAttribute('hidden', true);
  }

  button.classList.toggle('active');

  if (!button.hasAttribute('hidden')) {
    button.addEventListener('click', resetFilters);
  } else {
    button.removeEventListener('click', resetFilters);
  }
}
