const [jsCategoriesManosry, jsCategoriesGrid] = [
  document.querySelector('.js-categories-manosry'),
  document.querySelector('.js-categories-grid'),
];

const [jsButtonManosry, jsButtonGrid] = [
  document.querySelector('.js-button-manosry'),
  document.querySelector('.js-button-grid'),
];

const showManosry = async () => {
  jsCategoriesManosry.classList.remove('d-none');
  jsCategoriesGrid.classList.add('d-none');

  jsCategoriesManosry.classList.add('animate__animated', 'animate__fadeIn');

  jsButtonManosry.classList.add('active');
  jsButtonGrid.classList.remove('active');

  localStorage.setItem('display', 'manosry');

  const jsRowManosry = document.querySelector('.js-row-manosry');
  if (jsRowManosry) {
    const msnry = new Masonry(jsRowManosry, {
      itemSelector: '.col',
      column: 5,
      gutter: 0,
      percentPosition: false,
      isOriginLeft: false,
      initLayout: true,
      isAnimated: true,
      resize: false,
    });

    imagesLoaded(jsRowManosry, function () {
      msnry.layout({
        transitionDuration: '0.4s',
        percentPosition: true,
        layoutMode: 'masonry',
      });
    });
  }
};

const showGrid = async () => {
  jsCategoriesGrid.classList.remove('d-none');
  jsCategoriesManosry.classList.add('d-none');

  jsCategoriesGrid.classList.add('animate__animated', 'animate__fadeIn');

  jsButtonGrid.classList.add('active');
  jsButtonManosry.classList.remove('active');

  localStorage.setItem('display', 'grid');
};

if (jsCategoriesManosry) {
  jsButtonManosry.addEventListener('click', showManosry);
}

if (jsCategoriesGrid) {
  jsButtonGrid.addEventListener('click', showGrid);
}

const display = localStorage.getItem('display') || 'grid';
if (display === 'manosry') {
  showManosry();
} else if (display === 'grid') {
  showGrid();
}
