const filterByDataAttribute = (filter) => {
  if (filter.dataset.reset) {
    resetFilters();
  } else {
    const dataAttribute = filter.dataset.filter;

    const items = document.querySelectorAll(`[data-${dataAttribute}]`);

    items.forEach((item) => {
      item.style.display = filter.checked && item.dataset[dataAttribute] !== '1' ? 'none' : 'block';
      item.classList.add('animated', 'slideIn');
    });
  }
};
