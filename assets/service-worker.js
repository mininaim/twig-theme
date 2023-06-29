const CACHE_NAME = 'zid-default-theme-cache-v2';
const urlsToCache = [
  // css
  'bootstrap.min.css',
  'theme.css',
  'animate.min.css',
  'swiper-bundle.min.css',
  'animate.interactive.css',
  'aos.css',
  'global.css',
  'bootstrap.rtl.min.css',
  'bootstrap.custom.css',
  'simplebar.min.css',
  'store.css',
  'swiper.css',
  'cookies.css',
  'nouislider.css',
  'tabler-icons.min.css',
  'reveal.css',
  'darkmode.css',
  'glightbox.min.css',
  'swiper.gallery.css',
  'nouislider.min.css',
  'nuggets.css',
  'animate.svg.css',

  // js
  'createFavoritesToggle.js',
  'confettiCart.js',
  'confettiOrders.js',
  'wNumb.min.js',
  'toolbarFontSize.js',
  'simplebarInit.js',
  'categories.js',
  'accountFaqs.js',
  'countWord.js',
  'orderStatusFilter.js',
  'shipping-and-payments.js',
  'toolbarFontFamily.js',
  'productReviews.js',
  'progressbarInit.js',
  'estimateReadingTime.js',
  'keyboard.min.js',
  'bindShortcutsinit.js',
  'clipboardInit.js',
  'toolbarClearLocalStorage.js',
  'page.js',
  'recentlyVisited.js',
  'swiperInit.js',
  'header.js',
  'cart.js',
  'masonry.pkgd.min.js',
  'clipboard.min.js',
  'cookies.js',
  'offcanvas-products-prices.js',
  'store.js',
  'generateHeading.js',
  'swiper-bundle.min.js',
  'scrollreveal.min.js',
  'bootstrap.bundle.min.js',
  'global.js',
  'instantSearch.js',
  'simplebar.min.js',
  'qrcodeInit.js',
  'confettiAccount.js',
  'createSliderForProducts.js',
  'progressbar.min.js',
  'changeGrid.js',
  'qrious.min.js',
  'toolbarColorTheme.js',
  'raterInit.js',
  'revealInit.js',
  'darkmode.js',
  'nouislider.min.js',
  'rater.js',
  'glightboxInit.js',
  'addresses.js',
  'vanilla-tilt.min.js',
  'smooth-scroll.min.js',
  'serviceWorker.js',
  'toolbarContrastMode.js',
  // 'aos.js',
  'cartCSSClasses.js',
  'navbar-profile.js',
  'service-worker.js',
  'faqs.js',
  'imagesloaded.pkgd.js',
  'createSlider.js',
  'jquery-3.6.1.min.js',
  'navbar-search.js',
  'tsparticles.preset.confetti.bundle.min.js',
  'productsFilters.js',
  'product.js',
  'moment.ar.min.js',
  'resetFilters.js',
  'moment.min.js',
  'mustache.js',
  'productCssClasses.js',
  'footer.js',
  'filterByDataAttribute.js',
  'productSwiper.js',
  'glightbox.min.js',
  'printPage.js',
  'offcanvas-internationalization.js',

  // fonts
  'tabler-icons.eot',
  'tabler-icons.woff',
  'tabler-icons.woff2',
  'tabler-icons.ttf',

  // svg
  '404.svg',
  'app_store_badge_en.svg',
  'google_store_badge_en.svg',
  'maroof.svg',
  'mazeed-logo.svg',
  'vat.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      //console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});
