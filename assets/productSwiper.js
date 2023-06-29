function initSwiper() {
  var rootLang = document.documentElement.lang;
  var swiperGallery = new Swiper('.js-product-swiper', {
    initialSlide: rootLang === 'ar' ? 0 : 1,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
      hideOnClick: true,
    },
    grabCursor: false,
    observer: true,
    keyboard: { enabled: true },
    parallax: { enabled: true },
    threshold: 5,
    observeParents: true,
    effect: 'fade',
    watchSlidesProgress: true,
    preventClicks: true,
    speed: 600,
    pagination: { type: 'progressbar', el: '.swiper-pagination' },
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },

    lazy: { checkInView: true, loadPrevNext: false, enabled: true },
    // zoom: { minRatio: 2, maxRatio: 2 },
  });
}
initSwiper();
// english:

// prevEl: '.swiper-button-prev',
// nextEl: '.swiper-button-next',
