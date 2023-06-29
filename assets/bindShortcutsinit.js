function bindKeyboardShortcuts() {
  keyboardJS.bind('z > h', (e) => {
    e.preventRepeat();
    window.location.assign('/');
  });
  keyboardJS.bind('z > p', (e) => {
    e.preventRepeat();
    window.location.pathname = '/products';
  });
  keyboardJS.bind('z > t', (e) => {
    e.preventRepeat();
    window.location.pathname = '/categories';
  });
  keyboardJS.bind('z > b', (e) => {
    e.preventRepeat();
    window.location.pathname = '/blogs';
  });
  keyboardJS.bind('z > s', (e) => {
    e.preventRepeat();
    window.location.pathname = '/shipping-and-payment';
  });
  keyboardJS.bind('z > a', (e) => {
    e.preventRepeat();
    window.location.assign('/auth/login?redirect_to=account-profile');
  });
  keyboardJS.bind('z > c', (e) => {
    e.preventRepeat();
    window.location.assign('/cart/view');
  });
  keyboardJS.bind('z > l', (e) => {
    e.preventRepeat();
    let url = document.documentElement.lang === 'ar' ? '?lang=en' : '?lang=ar';
    window.location.assign(url);
  });
  // keyboardJS.bind('command+z', function (e) {
  //   e.preventRepeat();
  //   e.preventDefault();
  //   const searchInput = document.querySelector('.js-search-input-text');
  //   searchInput.focus();
  // });
  const darkButton = document.querySelector('button[data-bs-theme-value="dark"]');
  const lightButton = document.querySelector('button[data-bs-theme-value="light"]');
  keyboardJS.bind('z > d', function (e) {
    e.preventRepeat();
    e.preventDefault();
    if (darkButton.classList.contains('active')) {
      lightButton.click();
    } else {
      darkButton.click();
    }
  });
  keyboardJS.bind('z > o', function (e) {
    e.preventRepeat();
    e.preventDefault();
    const offcanvas = document.querySelector('[data-bs-target="#offcanvasCart"]');
    offcanvas.click();
  });
  keyboardJS.bind('z > g', function (e) {
    e.preventRepeat();
    e.preventDefault();
    const offcanvas = document.querySelector('[data-bs-target="#offcanvasCountries"]');
    offcanvas.click();
  });
}

bindKeyboardShortcuts();
