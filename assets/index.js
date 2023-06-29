const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
tooltipTriggerList.forEach((tooltipTriggerEl) => {
  tooltipTriggerEl.addEventListener('click', () => {
    tooltipList.forEach((tooltip) => tooltip.hide());
  });
});

// const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
// popoverTriggerList.forEach((popoverTriggerEl) => {
//   const popover = new bootstrap.Popover(popoverTriggerEl);

//   popoverTriggerEl.addEventListener('mouseenter', () => {
//     popover.show();
//   });

//   popoverTriggerEl.addEventListener('mouseleave', () => {
//     popover.hide();
//   });

//   document.addEventListener('click', (event) => {
//     if (event.target !== popoverTriggerEl && !popoverTriggerEl.contains(event.target)) {
//       popover.hide();
//     }
//   });
// });

const couponCode = document.getElementById('couponCode');
const applyCoupon = document.getElementById('applyCoupon');
if (couponCode) {
  couponCode.addEventListener('keyup', () => {
    applyCoupon.disabled = couponCode.value.length === 0;
  });
}

const EmailNotification = document.getElementById('EmailNotification');
const ApplyEmailNotification = document.getElementById('ApplyEmailNotification');
if (EmailNotification) {
  EmailNotification.addEventListener('keyup', () => {
    ApplyEmailNotification.disabled = !EmailNotification.value.includes('@') || EmailNotification.value.length === 0;
  });
}

let scroll = new SmoothScroll('[data-scroll]', {
  speed: 1000,
  speedAsDuration: true,
  easing: 'easeOutQuad',
  offset: 100,
  updateURL: false,
});

!(() => {
  const navbar = document.querySelector('.navbar-sticky');
  if (navbar) {
    const height = navbar.offsetHeight;
    window.addEventListener('scroll', (event) => {
      if (navbar.classList.contains('position-absolute')) {
        event.currentTarget.pageYOffset > 1000
          ? navbar.classList.add('fixed-top')
          : navbar.classList.remove('fixed-top');
      } else {
        event.currentTarget.pageYOffset > 500
          ? ((document.body.style.paddingTop = `${height}px`), navbar.classList.add('fixed-top'))
          : ((document.body.style.paddingTop = ''), navbar.classList.remove('fixed-top'));
      }
    });
  }
})();

const wrapper = document.querySelector('.svg-animated svg');
if (wrapper) {
  setTimeout(() => wrapper.classList.add('active'), 500);
}

ScrollReveal().reveal('.js-anime-widget', {
  delay: 300,
  duration: 500,
  reset: false,
  setInterval: 200,
  mobile: false,
  useDelay: 'once',
});

let navbar = document.getElementById('navbar');
let stickyOffset = document.querySelector('.sticky-offset');

if (stickyOffset) {
  let isNavbarStacked = false;
  let observerNav = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'class') {
        let attributeValue = mutation.target.getAttribute('class');
        if (attributeValue.includes('navbar-stuck')) {
          isNavbarStacked = true;
          stickyOffset.style.top = '100px';
        } else {
          isNavbarStacked = false;
          stickyOffset.style.top = '20px';
        }
      }
    });
  });
  observerNav.observe(navbar, {
    attributes: true,
  });
}

// $(function () {
//   AOS.init();
//   AOS.refresh();
// });

const images = Array.from(document.querySelectorAll('.js-card-top .js-loaded-image'));
const spinners = Array.from(document.querySelectorAll('.js-card-top .js-loaded-spinner'));

const showImages = () => {
  for (const spinner of spinners) {
    spinner.classList.add('d-none', 'animate__animated', 'animate__fadeOut');
  }

  for (const image of images) {
    image.classList.remove('d-none');
    image.classList.add('animate__animated', 'animate__fadeIn');
  }

  setTimeout(() => {
    for (const spinner of spinners) {
      spinner.classList.remove('animate__animated', 'animate__fadeOut');
    }

    for (const image of images) {
      image.classList.remove('animate__animated', 'animate__fadeIn');
    }
  }, 1000);
};

window.addEventListener('load', async () => {
  if (images.length > 0) {
    await imagesLoaded(images);
    showImages();
  }
});

// ToDo: Fix the code to run before the page is loaded
window.addEventListener('load', async () => {
  const bundleOfferProductTags = document.querySelectorAll('.bundle-offer-product-tag');
  //console.log(bundleOfferProductTags);
  if (bundleOfferProductTags.length > 0) {
    const svgCode = `
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:1rem">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 004.875-4.875V12m6.375 5.25a4.875 4.875 0 01-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 013.182 3.182zM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 113.182-3.182z" />
      </svg>
    `;
    bundleOfferProductTags.forEach((tag) => {
      tag.insertAdjacentHTML('afterbegin', svgCode);
    });
  }
});

const printDefaultTheme = () => {
  const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
  console.log('%c🛒 Perfect Theme - v 1.0', `color: ${currentColor}; font-size: 1rem; font-weight: bold;`);
};
printDefaultTheme();
