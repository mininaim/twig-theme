const changeGridCols = (value, animate) => {
  const row = document.querySelector('.js-row-grid');
  removeRowColsClasses(row);
  row.classList.add('row-cols-lg-' + value);
};

const rangeSlider = document.querySelector('#grid-cols-range') ?? document.createElement('input');

rangeSlider.addEventListener('input', function (event) {
  const value = event.target.value;
  changeGridCols(value);
});

function removeRowColsClasses(element) {
  const classes = element.classList;
  for (const className of classes) {
    if (className.startsWith('row-cols-lg-')) {
      element.classList.remove(className);
    }
  }
}
