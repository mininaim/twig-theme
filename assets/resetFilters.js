const resetFilters = () => {
  const items = document.querySelectorAll(
    '[data-availability], [data-onsale], [data-hasoptions], [data-hasfields], [data-isinfinite], [data-hasvariants], [data-lowstockquantity]',
  );

  items.forEach((item) => {
    item.style.display = 'block';
    item.classList.remove('animated', 'slideIn');
  });

  const filterElements = document.querySelectorAll('.btn-check:not([data-reset])');
  filterElements.forEach((element) => {
    element.checked = false;
  });
  const resetButton = document.querySelector('[data-reset]');
  resetButton.checked = true;
};
