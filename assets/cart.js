// ? We rewrite the old `addDeleteProgressImage` function, and rename it to `displayLoadingSpinner`
// ToDo: remove the jQuery dependency
// ToDo: to rewrite the cartProductRemove() function, since getattribute function has been depreciated and recommended to use dataset property
$(document).on('click', '.cart-product-delete a', function (event) {
  displayLoadingSpinner();
  var _this = $(this);
  _this.find('.icon-delete').addClass('d-none');
  _this.find('.prefix').removeClass('d-none');
  cartProductRemove(_this);
});

function displayLoadingSpinner() {
  $('.cart-product-delete a .prefix').addClass('d-none');
  $('.cart-product-delete a .prefix').html(
    '<span class="js-delete-product-progress spinner-border spinner-border-sm text-primary align-middle" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></span>',
  );
}

// ToDo: to use ths async function for addDeleteProgressImage() and maybe to rename it to something more meaningful
/*
async function displayLoadingSpinner() {
  const deleteLinks = document.querySelectorAll('.cart-product-delete a');

  for (const link of deleteLinks) {
    link.querySelector('.prefix').classList.add('d-none');
    link.querySelector('.prefix').innerHTML =
      '<span class="js-delete-product-progress spinner-border spinner-border-sm text-primary align-middle" role="status" aria-hidden="true"><span class="visually-hidden">Loading...</span></span>';
  }
}
*/

async function sendCoupon() {
  const couponApplyProgressIndicator = document.querySelector('.js-apply-coupon-progress');
  const couponApplyButton = document.querySelector('.js-apply-coupon-icon');

  if (!couponApplyProgressIndicator.classList.contains('d-none')) {
    return;
  }

  hideShowElement(couponApplyButton, false);
  hideShowElement(couponApplyProgressIndicator, true);

  try {
    const response = await zid.store.cart.redeemCoupon(document.querySelector('#couponCode').value);

    if (response.status === 'success') {
      showToastMessage(couponDataTemplate.coupon_applied_successfully);

      let scrollY = sessionStorage.getItem('scrollY');

      if (scrollY) {
        window.onbeforeunload = function () {
          sessionStorage.setItem('scrollY', window.scrollY);
        };
        window.addEventListener('load', function () {
          window.scrollTo(0, scrollY);
        });
      } else {
        window.onbeforeunload = function () {
          sessionStorage.setItem('scrollY', 0);
        };
      }

      window.location.reload();
      confetti.load();
    } else {
      showToastMessage(response.data.message);
    }
  } catch (error) {
    console.error(error);
    showToastMessage(couponDataTemplate.coupon_message);
  } finally {
    hideShowElement(couponApplyProgressIndicator, false);
    hideShowElement(couponApplyButton, true);
  }
}
async function deleteCoupon() {
  const deleteCouponProgressIndicator = document.querySelector('.js-delete-coupon-progress');
  const deleteCouponButton = document.querySelector('.js-delete-coupon-icon');

  if (!deleteCouponProgressIndicator.classList.contains('d-none')) {
    return;
  }

  hideShowElement(deleteCouponButton, false);
  hideShowElement(deleteCouponProgressIndicator, true);

  try {
    const response = await zid.store.cart.removeCoupon();
    if (response.status === 'success') {
      showToastMessage(couponDataTemplate.coupon_removed_successfully);
      let scrollY = sessionStorage.getItem('scrollY');

      if (scrollY) {
        window.onbeforeunload = function () {
          sessionStorage.setItem('scrollY', window.scrollY);
        };
        window.addEventListener('load', function () {
          window.scrollTo(0, scrollY);
        });
      } else {
        window.onbeforeunload = function () {
          sessionStorage.setItem('scrollY', 0);
        };
      }

      window.location.reload();
    } else {
      showToastMessage(response.data.message);
    }
  } catch (error) {
    console.error(error);
    showToastMessage(couponDataTemplate.coupon_message);
  } finally {
    hideShowElement(deleteCouponProgressIndicator, false);
    hideShowElement(deleteCouponButton, true);
  }
}

const hideShowElement = (element, shouldShow) => {
  element.classList.toggle('d-none', !shouldShow);
};

function cartProductsHtmlChanged(html, cart) {
  if (cart.products_count <= 0) {
    $('.js-cart-products').html('');
    $('.js-cart-buttons').html('');
    $('.js-cart-empty-section').removeClass('d-none');
    $('.js-section-cart-products').addClass('d-none');
    setCartTotalAndBadge(cart);
    fetchCart();
    return;
  } else {
    $('.js-section-cart-products').removeClass('d-none');
    $('.js-cart-empty-section').addClass('d-none');
  }

  if (localStorage.getItem('InjectedCssClasses')) {
    let InjectedCssClasses = JSON.parse(localStorage.getItem('InjectedCssClasses'));
    $('.js-cart-items').html(html);
    $('.js-cart-items .cart-product-row-wrapper').addClass(InjectedCssClasses);
  } else {
    $('.js-cart-items').html(html);
    $('.js-cart-items .cart-product-row-wrapper').addClass('list-group-item border mb-3 card-product rounded');
  }

  $('.js-cart-items').html(html);
  const loadMoreButton = document.getElementById('js-load-more-button');

  loadMoreButton.classList.add('d-none');

  // temporary fix for cart product row styles, will be removed in the future and save classes in local storage
  $('.js-cart-items .cart-product-row-wrapper').addClass('list-group-item border mb-3 card-product rounded');

  const cartItems = document.querySelectorAll('.js-cart-items .cart-product-quantity-dropdown');

  // Remove the 'form-group' class from all dropdowns in the cart
  for (const item of cartItems) {
    item.classList.remove('form-group');
  }

  // Add the 'form-floating' class to all divs within the cart dropdowns
  const divs = document.querySelectorAll('.cart-product-quantity-dropdown div');
  for (const div of divs) {
    div.classList.add('form-floating');
  }

  // Add the 'form-select' and 'form-select-sm' classes to all selects within the cart dropdowns
  // and set the id attribute to 'floatingSelect-<index>'
  const selects = document.querySelectorAll('.cart-product-quantity-dropdown select');
  for (let i = 0; i < selects.length; i++) {
    const select = selects[i];
    select.classList.add('form-select', 'form-select-sm');
    select.setAttribute('id', `floatingSelect-${i}`);
  }

  const dropdowns = document.querySelectorAll('.cart-product-quantity-dropdown .form-floating');

  // Append the label element to the form-floating div
  for (const dropdown of dropdowns) {
    const label = dropdown.querySelector('label');
    dropdown.appendChild(label);
  }

  // Set the innerHTML of all labels within form-floating divs to 'الكمية'
  const quantityText = document.documentElement.lang === 'en' ? 'Quantity' : 'الكمية';
  const labels = document.querySelectorAll('.cart-product-quantity-dropdown .form-floating label');
  for (const label of labels) {
    label.innerHTML = quantityText;
    label.classList.add('form-label', 'px-2');
  }
  // Remove the '0' option from all dropdowns in the cart
  const options = document.querySelectorAll('.cart-product-quantity-dropdown .form-floating select option');
  for (const option of options) {
    if (option.value === '0') {
      option.remove();
    }
  }

  // Set the 'for' attribute of all labels within form-floating divs to 'floatingSelect-<index>'
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    label.setAttribute('for', `floatingSelect-${i}`);
  }

  const totals = document.querySelectorAll('.totals');

  // Add the 'd-flex' and 'gap-1' classes to all elements with the 'totals' class
  for (const total of totals) {
    total.classList.add('d-flex', 'gap-1');
  }

  // Add the 'fw-bold', 'fs-6', and 'text-dark-emphasis' classes to all elements with the 'cart-product-total-price' class
  const prices = document.querySelectorAll('.cart-product-total-price');
  for (const price of prices) {
    price.classList.add('fw-bold', 'fs-6', 'text-dark-emphasis');
  }

  // Create a new 'small' element and set its innerHTML to the innerHTML of the current element
  // then clear the innerHTML of the current element and append the new 'small' element to it
  const beforePrices = document.querySelectorAll('.cart-product-total-before-price');
  for (const beforePrice of beforePrices) {
    const small = document.createElement('small');
    small.innerHTML = beforePrice.innerHTML;
    beforePrice.innerHTML = '';
    beforePrice.appendChild(small);
  }

  const pricesEach = document.querySelectorAll('.cart-product-price-each');

  // Add the 'd-flex' and 'gap-1' classes to all elements with the 'cart-product-price-each' class
  for (const price of pricesEach) {
    price.classList.add('d-flex', 'gap-1');

    // Get all span elements within the current element
    const spans = price.querySelectorAll('span');

    // Add the 'text-muted' and 'small' classes to the third span element
    spans[2].classList.add('text-muted', 'small');

    // Add the 'text-muted' and 'small' classes to the second span element
    price.querySelectorAll('span')[1].classList.add('text-muted', 'small');
  }

  const pricess = document.querySelectorAll('.cart-product-prices');

  // Add multiple classes to all elements with the 'cart-product-prices' class
  for (const price of pricess) {
    price.classList.add(
      'order-2',
      'order-sm-0',
      'px-2',
      'p-sm-0',
      'col-8',
      'col-sm-12',
      'col-lg',
      'd-grid',
      'd-lg-grid',
      'justify-content-md-center',
      'justify-content-lg-start',
      'order-sm-1',
      'd-sm-flex',
      'justify-content-sm-between',
      'align-items-sm-center',
      'gap-sm-3',
      'gap-lg-0',
    );
  }

  const erros = document.querySelectorAll('.cart-product-error-messages');
  for (const error of erros) {
    error.classList.add('small', 'alert', 'alert-warning', 'p-1', 'mt-2', 'mb-0');
  }

  const summaries = document.querySelectorAll('.custom-options-summary');
  for (const summary of summaries) {
    summary.classList.add('small', 'd-flex', 'flex-wrap', 'gap-1', 'p-0', 'mt-0', 'mb-0', 'text-secondary-emphasis');
  }
  const customFieldRows = document.querySelectorAll('.custom-options-summary .custom-field-row');
  for (const customFieldRow of customFieldRows) {
    customFieldRow.classList.add('small');
  }
  const checkCircles = document.querySelectorAll('.custom-options-summary .icon-check-circle');
  for (const checkCircle of checkCircles) {
    checkCircle.classList.remove('icon-check-circle');
    checkCircle.classList.add('ti', 'ti-check');
  }
  const cartProductNonTaxable = document.querySelectorAll('.cart-product-message-not-taxable');
  for (const cartProductNonTaxableElement of cartProductNonTaxable) {
    cartProductNonTaxableElement.classList.add('small', 'text-danger-emphasis');
  }

  const actions = document.querySelectorAll('.cart-products-action');

  // Add the 'col-4', 'col-sm-4', 'col-lg-2', 'order-2', and 'order-sm-1' classes to all elements with the 'cart-products-action' class
  for (const action of actions) {
    action.classList.add('col-12', 'col-sm-4', 'col-lg-2', 'order-2', 'order-sm-1');
  }

  const details = document.querySelectorAll('.cart-product-col-details');

  // Add multiple classes to all elements with the 'cart-product-col-details' class
  for (const detail of details) {
    detail.classList.add(
      'col-9',
      'col-sm-8',
      'col-lg-5',
      'order-sm-1',
      'mt-4',
      'mt-sm-3',
      'mt-lg-0',
      'pt-0',
      'pt-sm-0',
      'mb-0',
      'mb-lg-0',
      'text-start',
      'text-sm-start',
    );

    // Get the h1 element within the current element and create a new h6 element
    // Set the innerHTML of the new h6 element to the innerHTML of the h1 element
    // Replace the h1 element with the new h6 element
    const h1 = detail.querySelector('h1');
    const h6 = document.createElement('h6');
    h6.innerHTML = h1.innerHTML;
    h1.parentNode.replaceChild(h6, h1);
    h6.classList.add('mb-0');

    // Remove the 'cart-product-image-link' class and add the 'link-primary' class to the link element within the current element
    const link = detail.querySelector('.cart-product-image-link');
    link.classList.remove('cart-product-image-link');
    link.classList.add('link-primary', 'fw-bold');
  }

  const imgs = document.querySelectorAll('.cart-product-col-img');

  // Add multiple classes to all elements with the 'cart-product-col-img' class
  for (const img of imgs) {
    img.classList.add('col-3', 'col-sm-4', 'col-lg-1', 'mt-4', 'mt-lg-3');

    // Get the img element within the current element and add multiple classes to it
    const image = img.querySelector('img');
    image.classList.add('img-fluid', 'rounded', 'w-100', 'logo-100');
    image.setAttribute('loading', 'lazy');
  }

  const deletes = document.querySelectorAll('.cart-product-delete');

  // Add multiple classes to all elements with the 'cart-product-delete' class
  for (const del of deletes) {
    del.classList.add(
      'col-12',
      'my-2',
      'mt-sm-3',
      'mb-sm-0',
      'col-sm-12',
      'col-lg-1',
      'd-grid',
      'justify-content-start',
      'justify-content-sm-center',
      'order-4',
      'order-sm-4',
      'order-lg-0',
    );

    // Get the icon element within the current element and add multiple classes to it
    const icon = del.querySelector('.icon-delete');
    icon.classList.add('ti', 'ti-trash', 'fs-5', 'align-middle');
    icon.setAttribute('aria-hidden', 'true');

    const span = document.createElement('span');
    span.classList.add('visually-hidden');
    span.innerHTML = 'Delete';
    icon.parentNode.appendChild(span);

    // Get the link element within the current element and add multiple classes to it
    const link = del.querySelector('a');
    link.classList.add('btn', 'btn-link', 'link-secondary', 'btn-sm', 'border-0', 'grow', 'px-0');
  }

  const rows = document.querySelectorAll('.cart-product-row');

  // Add multiple classes to all elements with the 'cart-product-row' class
  for (const row of rows) {
    row.classList.add('row', 'flex-wrap', 'flex-sm-row', 'align-items-start', 'align-items-md-center', 'g-3');
  }

  const discountMessages = document.querySelectorAll(
    '.template_for_cart_products_list .cart-product-discount-messages',
  );

  // Add multiple classes to all elements with the 'cart-product-discount-messages' class and add an icon element
  for (const message of discountMessages) {
    // Create an icon element and add multiple classes to it
    const icon = document.createElement('i');
    icon.classList.add('ti', 'ti-gift-card', 'text-primary', 'ms-1', 'fs-6', 'align-middle');
    icon.setAttribute('aria-hidden', 'true');

    message.classList.add('small', 'badge', 'border', 'rounded-pill', 'text-secondary');
    message.appendChild(icon);
  }

  const links = document.querySelectorAll('.cart-product-image-link');

  // Replace the img element within each link with a placeholder svg element
  for (const link of links) {
    // Get the img element within the current link
    const img = link.querySelector('img');

    // Check if the img element has a source of 'https://media.zid.store/static/missing_image.png'
    // If it does, create a placeholder svg element and replace the img element with it
    if (img.src === 'https://media.zid.store/static/missing_image.png') {
      const placeholderText = document.documentElement.lang === 'en' ? 'Pic' : 'صورة';
      const placeholderSvg = `<svg class="placeholder-img img-fluid rounded w-100 logo-100 text-primary" width="235" height="235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${placeholderText}" preserveaspectratio="xMidYMid slice" focusable="false"> <title>${placeholderText}</title><rect width="100%" height="100%" fill="currentColor"></rect><text x="50%" y="50%" fill="#fff" dy=".3em">${placeholderText}</text></svg>`;
      img.outerHTML = placeholderSvg;
    }
  }

  // Check if the cart object exists and has a "totals" property
  if (cart && cart.totals) {
    const strCartTotals = cart.totals
      .map((cartTotal) => {
        const totalStyle = cartTotal.code === 'total' ? 'fw-bold text-primary' : '';
        // Return the string representation of the cartTotal in the form of an HTML "li" element
        return `<li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="me-auto">
                              <span>${cartTotal.title}</span>
                          </div>
                          <span class="${totalStyle}">${cartTotal.value_string}</span>
                      </li>`;
      })
      .join('');
    // Get the first element in the document with a class of "js-section-cart-totals"
    const cartTotalsEl = document.querySelector('.js-section-cart-totals');
    if (cartTotalsEl) {
      // Set the element's inner HTML
      cartTotalsEl.innerHTML = strCartTotals;

      // Get all elements with the "fw-bold text-primary" class
      const animatedElements = document.querySelectorAll('.fw-bold.text-primary');
      // Add the "animated" and "flipInX" classes to each element
      animatedElements.forEach((el) => {
        el.classList.add('animate__animated', 'animate__flipInX');
      });

      // Remove the animation classes from each element after 5 seconds
      setTimeout(() => {
        animatedElements.forEach((el) => {
          el.classList.remove('animate__animated', 'animate__flipInX');
        });
      }, 5000);
    }
  }
  //Update progress bar on change
  // Function to update the progress bar dynamically
  function updateProgressBar() {
    const freeShippingRuleSection = document.querySelector('.js-free-shipping-rule-section');
    const freeShippingRuleSectionMessage = document.querySelector('.js-free-shipping-rule-section-message');
    const freeShippingRuleProgress = document.querySelector('.js-free-shipping-rule-progress');

    if (cart.fee_shipping_discount_rules) {
      freeShippingRuleSection.classList.remove('d-none');
      freeShippingRuleSectionMessage.textContent = cart.fee_shipping_discount_rules.conditions_subtotal.status.message;

      const progressWidth = cart.fee_shipping_discount_rules.conditions_subtotal.products_subtotal_percentage_from_min;
      freeShippingRuleProgress.style.width = `${progressWidth}%`;

      if (progressWidth <= 100) {
        freeShippingRuleProgress.style.height = '20px';
        if (cart.fee_shipping_discount_rules.conditions_subtotal.status.code === 'applied') {
          freeShippingRuleProgress.textContent = '';
        } else {
          freeShippingRuleProgress.innerHTML = `<span>${progressWidth}%</span>`;
        }
      } else {
        freeShippingRuleProgress.style.height = '2px';
        freeShippingRuleProgress.textContent = '';
      }
    } else {
      freeShippingRuleSection.classList.add('d-none');
    }
  }

  // Call the function to update the progress bar initially
  updateProgressBar();

  // Upadte cart total badge in header
  setCartTotalAndBadge(cart);
  fetchCart();

  // add delete progress icon
  // ToDo: we should rewrite this and use a better naming convention
  displayLoadingSpinner();
}
