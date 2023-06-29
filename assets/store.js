function showGiftToast() {
  const toastEl = document.querySelector('#giftToast');

  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl);

    toastEl.addEventListener('hidden.bs.toast', function (event) {
      event.preventDefault();
    });

    toast.show();

    setTimeout(function () {
      toast.hide();
    }, 3000);
  } else {
    console.log("Element with id 'giftToast' not found");
  }
}

// ToDo: To refactor this funtion `productCartAddToCart`
function productCartAddToCart(elm, product_id) {
  addToCart(product_id, 1, function () {
    $('.add-to-cart-progress', elm).addClass('d-none');
    if (elm) {
      var getParentDiv = $(elm).parent().parent();
    }
  });
}

function addToCart(productId) {
  zid.store.cart.addProduct({ productId }).then((response) => {
    if (response.status === 'success') {
      const rootLanguage = getRootLanguage();

      let message;
      if (rootLanguage === 'ar') {
        message = 'تمت إضافة المنتج إلى السلة';
      } else {
        message = 'Product added to cart';
      }

      showToastMessage(message);

      displayActivePaymentSessionBar(response.data);
      setCartTotalAndBadge(response.data.cart);

      showGiftToast();
    } else {
      showToastMessage('Error adding product to cart');
    }
  });
}
const getRootLanguage = () => {
  return document.documentElement.lang;
};

const showToastMessage = (message) => {
  const toast = document.querySelector('.js-toast');
  const toastBody = document.querySelector('.js-toast-message');
  toastBody.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 1500);
};

function setCartTotalAndBadge(cart) {
  setCartBadge(cart.products_count);
  //console.log('cart', cart);

  var cartTotal = getCartTotal(cart);
  if (cartTotal) {
    setCartIconTotal(cartTotal);
    //console.log('cartTotal', cartTotal);
  }
}

function setCartIconTotal(total) {
  $('.js-cart-total-price-stirng').html(total);
  //console.log('total', total);
}

function setCartBadge(badge) {
  const $cartBadge = $('.js-cart-badge');

  const $cartStatus = $('.js-cart-status');

  $cartStatus.removeClass('ti-refresh animate__animated animate__rotateIn animate__infinite');

  $cartStatus.addClass('ti-shopping-bag');

  if (badge > 0) {
    $cartBadge.html(badge).removeClass('d-none animate__animated animate__bounceInDown');
    $cartStatus.removeClass('d-none');
    let el = document.querySelector('.js-cart-total-price-fixed');
    if (el) {
      el.classList.remove('d-none');
    }
  } else {
    $cartBadge.html('0').removeClass('d-none');
    let el = document.querySelector('.js-cart-total-price-fixed');
    if (el) {
      el.classList.add('d-none');
    }
  }
}
document.addEventListener('DOMContentLoaded', function () {
  fetchCart();
});

function fetchCart() {
  if (!document.querySelector('.js-cart-is-empty')) {
    return;
  }

  $('#offcanvasCart .js-cart-spinner').removeClass('d-none');
  zid.store.cart.fetch().then(function (response) {
    if (response.status === 'success') {
      if (response.data) {
        setCartTotalAndBadge(response.data.cart);
        displayActivePaymentSessionBar(response.data.cart);
        cartOffCanvasProducts(response.data.cart);

        if (response.data.cart && response.data.cart.payment_session) {
          //console.log('payment session', response.data.cart.payment_session);
          $('.js-payment-session-bar').removeClass('d-none');
        } else {
          $('.js-payment-session-bar').addClass('d-none');
        }

        if (response.data.cart.products_count > 0) {
          document.querySelector('.js-cart-is-empty').classList.add('d-none');
        } else {
          document.querySelector('.js-cart-is-empty').classList.remove('d-none');
        }
      }
    }
  });
  $('#offcanvasCart .js-cart-spinner').addClass('d-none');
}

// ToDo: Unknow function, need to be tested and refactored
function displayActivePaymentSessionBar(cart) {
  if (cart.is_reserved) {
    $('.js-payment-session-bar').removeClass('d-none');
  }
}
function getCartTotal(cart) {
  if (cart && cart.totals && cart.totals.length > 0) {
    var cartTotalItem = cart.totals.filter(function (total) {
      return total.code === 'total';
    });
    if (cartTotalItem.length > 0) {
      return cartTotalItem[0].value_string;
    }
  }
  return null;
}

const removeFromCart = async (event, cart_product_id, product_id) => {
  event.preventDefault();
  //console.log('removeFromCart function called');

  // check if the product is still present in the cart
  const cartProductElement = document.querySelector(`#product-cart-${cart_product_id}`);
  if (!cartProductElement) {
    //console.log('Product already removed from cart');
    alert('Product already removed from cart');
    return;
  }

  const progressElement = document.querySelector(`#product-cart-${cart_product_id} .js-remove-from-cart-progress`);
  if (!progressElement) {
    //console.log('progressElement not found');
    return;
  }
  if (!progressElement.classList.contains('d-none')) {
    //console.log('progressElement already visible');
    return;
  }

  const iconElement = document.querySelector(`#product-cart-${cart_product_id} .js-remove-from-cart-icon`);
  if (!iconElement) {
    //console.log('iconElement not found');
    return;
  }

  iconElement.classList.add('d-none');
  progressElement.classList.remove('d-none');

  try {
    const response = await zid.store.cart.removeProduct(cart_product_id, product_id);
    const rootLanguage = getRootLanguage();

    if (response.status === 'success') {
      //console.log('Product removed successfully');
      const cartProductElement = document.querySelector(`#product-cart-${cart_product_id}`);

      cartProductElement.remove();

      const cartProductElements = document.querySelectorAll('[id^=product-cart-]');
      if (cartProductElements.length <= 0) {
        //console.log('No more products in cart');
        const cartProductsElement = document.querySelector('#offcanvasCart .js-cart-products');
        // !ToDo: debug this line
        //cartProductsElement.classList.add('d-none');
        const cartButtonsElement = document.querySelector('#offcanvasCart .js-cart-buttons');
        cartButtonsElement.classList.add('d-none');
        const cartIsEmptyElement = document.querySelector('#offcanvasCart .js-cart-is-empty');
        cartIsEmptyElement.classList.remove('d-none');
      }
      setCartBadge(cartProductElements.length);

      const cartSpinnerElement = document.querySelector('#offcanvasCart .js-cart-spinner');
      const cartProductsElement = document.querySelector('#offcanvasCart .js-cart-products');

      if (cartSpinnerElement) {
        cartSpinnerElement.classList.remove('d-none');
        cartProductsElement.classList.add('opacity-50');
      }

      setTimeout(() => {
        cartSpinnerElement.classList.add('d-none');
        cartProductsElement.classList.remove('opacity-50');
        fetchCart();
      }, 500);

      let message;
      if (rootLanguage === 'ar') {
        message = 'تم حذف المنتج من السلة بنجاح';
      } else {
        message = 'Product removed from cart successfully';
      }
      if (message) {
        showToastMessage(message);
      }
      // ! This line return NULL
      //console.log(response.data.message);
    } else {
      //console.log('Error removing product:' + JSON.stringify(response));
      // Todo: these lines are not working
      //console.log(response.data.message);
      let message;
      if (rootLanguage === 'ar') {
        message = 'حدث خطأ أثناء حذف المنتج من السلة';
      } else {
        message = 'An error occurred while removing product from cart';
      }

      // if (message) {
      //   showToastMessage(message);
      // }
      showToastMessage(response.data.message);
    }
  } catch (err) {
    //console.log('Error removing product:' + error);
    //alert('Error removing product:' + error);
    const message = err.message;
    if (message) {
      showToastMessage(message);
    }
  } finally {
    iconElement.classList.remove('d-none');
    progressElement.classList.add('d-none');
  }
};

const addToCartButtons = document.querySelectorAll('.js-add-to-cart');
const cartBadge = document.querySelector('.js-cart-badge');
const cartIcon = document.querySelector('.js-cart-status');
const emptyCartMessage = document.querySelector('.js-cart-is-empty');
const offcanvasCart = document.querySelector('#offcanvasCart');
const htmlElement = document.querySelector('html');

const showOffcanvasCart = () => {
  if (!offcanvasCart.classList.contains('show')) {
    new bootstrap.Offcanvas(offcanvasCart).show();
  }
};

const showEmptyCartMessage = () => {
  if (emptyCartMessage) {
    emptyCartMessage.classList.add('d-none');
  }
};

const addItemToCart = (element) => {
  element.innerHTML = `
    <span class="spinner-grow spinner-grow-sm align-middle" role="status" aria-hidden="true">
      <span class="visually-hidden">{{ locals.accessibility.spinner.label }}</span>
    </span>
  `;
  setTimeout(() => {
    if (htmlElement.lang === 'ar') {
      element.innerHTML = `

          <i class="ti ti-check align-middle fs-6" align-middle="true"></i>
          <span class="px-1">تمت الإضافة</span>

      `;
    } else {
      element.innerHTML = `

      <i class="ti ti-check align-middle fs-6" align-middle="true"></i>
          <span class="px-1">Added</span>

      `;
    }
    element.setAttribute('disabled', 'disabled');
    element.classList.add('disabled');
  }, 500);
};

const animateOffcanvasCart = () => {
  const cartOffcanvas = document.querySelector('#offcanvasCart');
  const spinnerWrapper = document.createElement('div');
  spinnerWrapper.classList.add(
    'd-flex',
    'justify-content-center',
    'align-items-center',
    'position-absolute',
    'top-50',
    'start-50',
    'translate-middle',
  );
  const spinner = document.createElement('div');
  spinner.classList.add('spinner-border', 'text-primary');
  spinner.setAttribute('role', 'status');
  spinner.setAttribute('aria-hidden', 'true');

  spinnerWrapper.appendChild(spinner);
  cartOffcanvas.appendChild(spinnerWrapper);

  setTimeout(() => {
    spinner.remove();
  }, 1500);
};

const closeOffcanvasCart = () => {
  const cartOffcanvas = document.querySelector('#offcanvasCart');
  if (cartOffcanvas.classList.contains('show')) {
    //close the offcanvas cart here
    const offcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvas);
    offcanvas.hide();
  }
};

addToCartButtons.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    // showEmptyCartMessage();
    //showOffcanvasCart();
    addItemToCart(item);
    setTimeout(fetchCart, 100);
    //animateCart();
    //setTimeout(closeOffcanvasCart, 3000);
    animateOffcanvasCart();
    //showOffcanvasCart();
    //setTimeout(closeOffcanvasCart, 4000);
  });
});

const cartOffCanvasProducts = (cart) => {
  //! ToDo: rewrite the function to be asynchronous and use await,
  //! or wrap fetchCart() in a setTimeout() to wait for the response to avoid rendering 0
  //! also to set a timeout to avoid infinite loop
  //! e.g: if (!cart || !cart.totals || !cart.totals.length) { setTimeout(fetchCart,2000) return; }
  // if (!cart || !cart.totals || !cart.totals.length) return;
  if (!cart || !cart.totals || !cart.totals.length) {
    setTimeout(fetchCart, 2000);
    return;
  }
  const LANGUAGE = document.documentElement.lang;

  const $empty = $('#offcanvasCart .js-cart-is-empty');
  const $spinner = $('#offcanvasCart .js-cart-spinner');
  const $buttons = $('#offcanvasCart .js-cart-buttons');
  const $products = $('#offcanvasCart .js-cart-products');
  $empty.addClass('d-none');
  $spinner.addClass('d-none');
  $buttons.removeClass('d-none');
  $products.html('');

  const products = cart.products.flatMap((product) => {
    if (product.hasOwnProperty('product_x') && product.hasOwnProperty('product_y')) {
      return product.product_x.concat(
        product.product_y.map((y) => ({ ...y, bundle_offer_name: y.meta.bundle_offer.name })),
      );
    }
    return product;
  });

  const REMOVE_TEXT = LANGUAGE === 'ar' ? 'حذف' : 'Remove';
  //const couponValue = cart.totals.find((total) => total.code === 'coupon').value;
  //let cartTotal = 0;
  products.forEach((product) => {
    if (product.quantity === 0) return;
    const productImageInit =
      product.images && product.images.length > 0 && product.image_url !== null
        ? product.images[0]['thumbs']['small']
        : 'https://via.placeholder.com/65x65';

    let productImage;
    if (productImageInit === 'https://media.zid.store/static/missing_image.png') {
      const placeholderText = document.documentElement.lang === 'en' ? 'Pic' : 'صورة';
      productImage = `<div><svg class="placeholder-img text-primary rounded" width="60" height="60" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${placeholderText}" preserveaspectratio="xMidYMid slice" focusable="false"> <title>${placeholderText}</title><rect width="100%" height="100%" fill="currentColor"></rect><text x="50%" y="50%" fill="#fff" dy=".3em">${placeholderText}</text></svg></div>`;
    } else {
      productImage = `<img src="${productImageInit}" class="logo-s-60 img-fluid rounded" loading="lazy" alt="${product.name}">`;
    }

    //cartTotal += product.total;
    $products.append(
      `<a id="product-cart-${product.id}"
            href="${
              product.url
            }" class="list-group-item list-group-item-action border-secondary border-opacity-10 hstack gap-3 align-self-center">
  
            <span data-action="delete" onclick="removeFromCart(event, '${product.id}', '${product.product_id}')">
                <span class="spinner-border spinner-border-sm text-primary d-none js-remove-from-cart-progress" role="status" aria-hidden="true"><span class="visually-hidden">loading..</span></span>
              <i class="ti ti-trash text-danger-emphasis fs-6 grow js-remove-from-cart-icon" aria-hidden="true"></i>
              <span class="visually-hidden">${REMOVE_TEXT}</span>
 
          </span>
  
          <!-- Product Image -->
       
              ${productImage}
  
            <div>
             <h6 class="fw-light text-dark-emphasis small">${product.name}</h6>
             
              <div class="hstack gap-1 small text-body fw-bold">
              <span>${product.quantity}</span>
              <span>x</span>
                  ${
                    product.total_before_string
                      ? `<span class="text-primary">${product.total_string}</span> <span><del>${product.total_before_string}</del></span>`
                      : `<span>${product.total_string}</span>`
                  }
          </div> 
          ${
            product.bundle_offer_name
              ? `<div class="small badge border rounded-pill text-secondary mt-2 cart-product-discount-messages">
                  <span class="prefix"></span>
                  <span class="message">
                      ${product.bundle_offer_name}
                  </span>
                  <span class="postfix"></span>
              <i class="ti ti-gift-card text-primary ms-1 fs-6 align-middle" aria-hidden="true"></i></div>`
              : ''
          }

      </div>
    </a>`,
    );
  });
  //cartTotal -= couponValue;
  //$('.js-cart-total-price-stirng').html(cartTotal);

  //console.log(cart);
};
//cartOffCanvasProducts(cart);
