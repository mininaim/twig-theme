const swiper = new Swiper('.categoriesSwiper', {
  lazy: true,
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,
  spaceBetween: 30,
  centeredSlides: true,
  freeMode: true,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next-categories',
    prevEl: '.swiper-button-prev-categories',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },
});

const swiper1 = new Swiper('.partnersSwiper', {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination-sm',
    dynamicBullets: true,
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    // 320: {
    //   slidesPerView: 2,
    //   spaceBetween: 20,
    // },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});

const swiper2 = new Swiper('.reviewsSwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

var sliderSelector = '.swiper-container',
  defaultOptions = {
    // cssMode: true,
    checkInView: true,
    autoHeight: false,
    lazy: true,
    preloadImages: false,
    watchSlidesProgress: true,
    spaceBetween: 20,
    speed: 1000,
    loop: false,
    observer: true,
    freeMode: true,
    grabCursor: true,
    preventClicks: true,
    slidesPerView: 2,
    centeredSlides: false,
    breakpoints: {
      480: {
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 20,
        centeredSlides: false,
      },
    },
  };

// TODO: This code needs to remove its dependencies on jQuery in order to be more lightweight and efficient.
$(document).ready(function () {
  var jSlider = $(sliderSelector);
  jSlider.each(function (i, slider) {
    var data = $(slider).attr('data-swiper') || {};
    if (data) {
      var dataOptions = JSON.parse(data);
    }
    slider.options = $.extend({}, defaultOptions, dataOptions);
    var swiper = new Swiper(slider, slider.options);
    if (typeof slider.options.autoplay !== 'undefined') {
      $(slider).hover(
        function () {
          swiper.autoplay.stop();
        },
        function () {
          swiper.autoplay.start();
        },
      );
    }
  });
});
