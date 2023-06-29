const toggleLayout = () => {
  const main = document.getElementById('main');
  const body = document.querySelector('body');
  const toggleButton = document.querySelector('.js-toolbar-layout');
  const navbar = document.getElementById('navbar');

  toggleButton.addEventListener('click', () => {
    main.classList.toggle('full-width');
    navbar.classList.toggle('boxed-width');
    if (main.classList.contains('full-width')) {
      body.classList.remove('p-0', 'bg-light-subtle', 'bg-opacity-10', 'border', 'border-secondary-subtle');
      main.classList.remove('shadow-lg');
      navbar.style.width = '';
    } else {
      body.classList.add('p-0', 'bg-light-subtle', 'bg-opacity-10', 'border', 'border-secondary-subtle');
      main.classList.add('shadow-lg');
      const mainWidth = main.clientWidth;
      navbar.style.width = mainWidth + 'px';
      navbar.style.left = 'auto';
      navbar.style.right = 'auto';
    }

    localStorage.setItem(
      'layoutState',
      JSON.stringify({
        mainClass: main.classList.contains('full-width'),
        navbarClass: navbar.classList.contains('boxed-width'),
        navbarWidth: navbar.style.width,
        navbarLeft: navbar.style.left,
        navbarRight: navbar.style.right,
      }),
    );
  });
};

window.addEventListener('load', () => {
  const layoutState = JSON.parse(localStorage.getItem('layoutState'));

  if (layoutState) {
    if (layoutState.mainClass) {
      main.classList.add('full-width');
    } else {
      main.classList.remove('full-width');
    }

    if (layoutState.navbarClass) {
      navbar.classList.add('boxed-width');
    } else {
      navbar.classList.remove('boxed-width');
    }

    navbar.style.width = layoutState.navbarWidth;
    navbar.style.left = layoutState.navbarLeft;
    navbar.style.right = layoutState.navbarRight;
  }
});

toggleLayout();
