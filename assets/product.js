async function productAddToCart() {
  if (!document.querySelector('.js-add-to-cart-progress').classList.contains('d-none')) {
    return;
  }

  hideShoppingCartButton();
  showProgressIndicator();

  try {
    const response = await zid.store.cart.addProduct({ formId: 'product-form' });
    //console.log(response);
    if (response.status === 'success') {
      //console.log(response.data.cart);
      setCartTotalAndBadge(response.data.cart);
      fetchCart();
      showToastMessage(productToastDataTemplate.message_success);

      showGiftToast();
    } else {
      showToastMessage(response.data.message);
      //console.log('error', (response.status, response.data));
    }
  } catch (error) {
    //console.error(error);
    showToastMessage(productToastDataTemplate.message_failed);
  } finally {
    hideProgressIndicator();
    showShoppingCartButton();
  }
}

const hideShoppingCartButton = () => {
  document.querySelector('.js-shopping-cart').classList.add('d-none');
};

const showShoppingCartButton = () => {
  document.querySelector('.js-shopping-cart').classList.remove('d-none');
};

const showProgressIndicator = () => {
  document.querySelector('.js-add-to-cart-progress').classList.remove('d-none');
};

const hideProgressIndicator = () => {
  document.querySelector('.js-add-to-cart-progress').classList.add('d-none');
};

function sendProductNotifyMe() {
  if (!$('.js-send-notify-progress').hasClass('d-none')) return;

  $('.js-send-notify-progress').removeClass('d-none');
  zid.store.product
    .setAvailabilityNotificationEmail($('.js-send-notify-product-id').val(), $('.js-send-notify-email').val())
    .then(function (response) {
      if (response.status === 'success') {
        showToastMessage(productToastDataTemplate.sent_successfully);
      } else {
        showToastMessage(productToastDataTemplate.notify_me_failed);
      }
      $('.js-send-notify-progress').addClass('d-none');
    });
}

const decreaseQuantity = () => {
  const quantityElement = document.querySelector('.js-product-quantity');
  let quantity = parseInt(quantityElement.value, 10);
  if (quantity > 1) {
    quantity--;
    quantityElement.value = quantity;
    updateQuantity();
  }
};

// const increaseQuantity = () => {
//   const quantityElement = document.querySelector('.js-product-quantity');
//   let quantity = parseInt(quantityElement.value, 10);
//   quantity++;

//   if (quantity >= 100) {
//     document.querySelector('.js-increase-quantity').disabled = true;
//   }

//   const button = document.querySelector('.js-product-quantity-increase');
//   const buttonRect = button.getBoundingClientRect();
//   const xPos = buttonRect.left;
//   const yPos = buttonRect.top + buttonRect.height / 2;

//   const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
//   const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent');

//   const confettiSettings = {
//     particleCount: 10,
//     startVelocity: 30,
//     spread: 45,
//     origin: {
//       x: xPos / window.innerWidth,
//       y: yPos / window.innerHeight,
//     },
//     shapes: ['circle'],
//     colors: [primaryColor.trim(), accentColor.trim()],
//     width: buttonRect.width,
//     height: buttonRect.height,
//     particleWidth: 3,
//     particleHeight: 3,
//   };

//   confetti(confettiSettings);

//   quantityElement.value = quantity;
//   updateQuantity();
// };

const increaseQuantity = () => {
  const quantityElement = document.querySelector('.js-product-quantity');
  let quantity = parseInt(quantityElement.value, 10);
  quantity++;

  if (quantity >= 100) {
    document.querySelector('.js-increase-quantity').disabled = true;
  }

  quantityElement.value = quantity;
  updateQuantity();
};

const updateQuantity = () => {
  const quantityElement = document.querySelector('.js-product-quantity');
  let quantity = parseInt(quantityElement.value, 10);
  if (quantity < 1) {
    quantity = 1;
    quantityElement.value = quantity;
  }
  quantityElement.value = quantity;
};

const showMore = () => {
  const fullDescription = document.getElementById('full-description');
  const showMoreButton = document.getElementById('show-more-button');
  const shortenedDescription = document.getElementById('shortened-description');

  if (fullDescription && showMoreButton && shortenedDescription) {
    fullDescription.style.display = 'block';
    shortenedDescription.style.display = 'none';
    showMoreButton.style.display = 'none';

    fullDescription.style.transition = 'height 500ms ease-in-out';
    fullDescription.style.height = `${fullDescription.scrollHeight}px`;
  }
};

const addGlightboxToElements = () => {
  const productDescription = document.querySelector('.js-product-description');

  if (productDescription) {
    [...productDescription.querySelectorAll('img, iframe')].forEach((element) => {
      if (element.tagName === 'IMG') {
        element.classList.add(
          'img-fluid',
          'w-50',
          'mx-auto',
          'd-block',
          'rounded',
          'animate__animated',
          'animate__fadeIn',
        );
        element.setAttribute('loading', 'lazy');
      }

      const anchor = document.createElement('a');

      anchor.href = element.tagName === 'IMG' ? element.src : element.src;

      anchor.classList.add('glightbox-product-description');

      if (element.tagName === 'IFRAME') {
        element.setAttribute('loading', 'lazy');
        anchor.classList.add('ratio', 'ratio-16x9');
      }

      element.before(anchor);
      anchor.append(element);
    });
  }
};

addGlightboxToElements();

const showTemplateAfterDelay = (templateSelector, spinnerSelector, delay) => {
  const template = document.querySelector(templateSelector);
  const spinner = document.querySelector(spinnerSelector);
  if (template && spinner) {
    setTimeout(() => {
      spinner.style.display = 'none';
      template.style.display = 'block';
    }, delay);
  }
};

showTemplateAfterDelay('.js-product-variants-template', '.js-product-variants-spinner', 500);
showTemplateAfterDelay('.js-product-custom-input-template', '.js-product-custom-input-spinner', 500);
showTemplateAfterDelay('.js-product-gallery-template', '.js-product-gallery-spinner', 500);
showTemplateAfterDelay('.js-product-deals-template', '.js-product-deals-spinner', 500);

/**
 * Make the element with the class `js-quantity-add-buttons` fixed to the bottom of the viewport
 */
const hideAddButtonsOnFooter = () => {
  const addButtons = document.querySelector('.js-quantity-add-buttons');
  if (!addButtons) {
    return;
  }

  const footer = document.querySelector('footer');
  const footerPosition = footer.getBoundingClientRect().top;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= footerPosition) {
      addButtons.classList.add('d-none');
      addButtons.classList.add('animate__animated');
      addButtons.classList.add('animate__fadeInDown');
    } else {
      addButtons.classList.remove('d-none');
      addButtons.classList.remove('animate__animated');
      addButtons.classList.remove('animate__fadeInDown');
    }
  });
};
document.addEventListener('DOMContentLoaded', hideAddButtonsOnFooter);

/**
 * Display the number of views for the product
 */
const displayViews = () => {
  let count = document.getElementsByClassName('js-views-count')[0];
  if (!count) return;
  const phi = 1.6180339887;
  let seed = new Date().getTime();
  let viewCount = Math.abs(((seed * phi) % (phi * 10)) + 0.1);
  //console.log(viewCount);

  let countUp = new CountUp(count, viewCount, {
    duration: 10,
    easingFn: CountUp.easeOutExpo,
  });
  setInterval(() => {
    let randomNumber = Math.floor(Math.random() * 21) + 40;
    viewCount = Math.max(randomNumber, 0);
    countUp.update(viewCount);
  }, 5000);
};

document.addEventListener('DOMContentLoaded', displayViews);

/**
 * Display a countdown timer for the product
 */
const countdownTimer = (startTime) => {
  const timer = document.querySelector('.js-product-timer');
  if (timer) {
    const x = setInterval(() => {
      moment.locale(document.documentElement.lang);
      const now = moment();
      const diff = startTime.diff(now);
      const duration = moment.duration(diff);
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      if (document.documentElement.lang === 'ar') {
        timer.innerHTML = hours + ' س ' + minutes + ' د ' + seconds + ' ثانية ';
      } else {
        timer.innerHTML = hours + ' h ' + minutes + ' m ' + seconds + ' s';
      }
    }, 1000);
  }
};

if (document.querySelector('.js-product-timer') !== null) {
  let currentDate = moment();
  let startTime = currentDate.add(6, 'hours');
  countdownTimer(startTime);
}
