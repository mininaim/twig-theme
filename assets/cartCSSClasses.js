(() => {
  const showTemplateAfterDelay = (templateSelector, spinnerSelector, delay) => {
    const template = document.querySelector(templateSelector);
    const spinner = document.querySelector(spinnerSelector);
    if (template && spinner) {
      setTimeout(() => {
        spinner.hidden = true;
        template.hidden = false;

        // Get all elements with the specified class name
        const items = document.querySelectorAll('.js-cart-items .cart-product-row-wrapper');
        //console.log(items);

        // Iterate over each element
        items.forEach((item, i) => {
          // Add multiple CSS classes to the element
          item.classList.add('list-group-item', 'border', 'mb-3', 'card-product', 'rounded');

          // Hide the item if it is the ninth or later in the list
          if (i >= 8) {
            item.style.display = 'none';
          }
        });

        // Show the "load more" button if there are more than 8 items in the list
        const loadMoreButton = document.getElementById('js-load-more-button');
        if (items.length > 8) {
          loadMoreButton.classList.remove('d-none');

          // Add a click event listener to the "load more" button
          let index = 8;
          loadMoreButton.addEventListener('click', () => {
            // Show the next 10 items in the list
            for (let i = index; i < index + 10; i++) {
              if (i < items.length) {
                items[i].classList.add('animate__animated', 'animate__fadeIn');
                items[i].style.display = 'block';
              }
            }
            index += 10;

            // Hide the "load more" button if all items have been shown
            if (index >= items.length) {
              loadMoreButton.classList.remove('d-none', 'd-flex', 'flex-wrap', 'align-items-center');
              loadMoreButton.style.display = 'none';

              // Make the "js-checkout-button" element sticky
              const checkoutButton = document.querySelector('.js-checkout-button-hidden');
              const hero = document.querySelector('.js-checkout-button');

              const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
              };

              const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    // Element is visible in the viewport
                    checkoutButton.classList.add('d-none');
                    checkoutButton.classList.remove('animate__animated', 'animate__fadeIn', 'animate__slower');
                  } else {
                    // Element is not visible in the viewport
                    checkoutButton.classList.remove('d-none');
                    checkoutButton.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower');
                  }
                });
              }, options);

              observer.observe(hero);

              //console.log(checkoutButton);
            }

            setTimeout(() => {
              // Remove the "animate__animated" and "animate__fadeIn" classes
              items.forEach((item) => {
                item.classList.remove('animate__animated', 'animate__fadeIn');
              });
              scroll.animateScroll(document.body.scrollHeight, {
                speed: 1000,
                easing: 'easeInOutQuint',
                speedAsDuration: true,
              });
            }, 1000);
          });
        } else {
          // Hide the "load more" button
          loadMoreButton.classList.add('d-none');
        }
      }, delay);
    }
  };

  showTemplateAfterDelay('.js-cart-products-list-template', '.js-cart-products-list-spinner', 1000);
})();

(function () {
  // Get all elements with the specified class name
  const checkboxes = document.querySelectorAll('.js-section-cart-totals .list-group-item');

  // Iterate over each element
  checkboxes.forEach((checkbox, i) => {
    //checkbox.classList.add('aos-init');
    // Set the data-aos attribute to "fade-up"
    //checkbox.setAttribute('data-aos', 'fade-up');
    // Set the data-aos-delay attribute to a value based on the element's position in the list
    //checkbox.setAttribute('data-aos-delay', i * 50);
    // Set the data-aos-once attribute to "true"
    //checkbox.setAttribute('data-aos-once', 'true');
  });
})();

(() => {
  // Get all elements with the specified class name
  const checkboxes = document.querySelectorAll('.js-section-cart-totals .list-group-item');

  // Iterate over each element
  checkboxes.forEach((checkbox) => {
    // Set the data-aos-anchor attribute to ".js-cart-sidebar"
    //checkbox.setAttribute('data-aos-anchor', '.js-cart-sidebar');

    // Get the element with the specified class name and remove the "d-none" class from it
    document.querySelector('.js-cart-sidebar').classList.remove('d-none');
  });
})();

(() => {
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

  const errorMessages = document.querySelectorAll('.cart-product-error-messages span');
  for (const errorMessage of errorMessages) {
    errorMessage.classList.add('small');
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
    icon.classList.add('ti', 'ti-trash-filled', 'align-middle');
    icon.setAttribute('aria-hidden', 'true');

    const span = document.createElement('span');
    span.classList.add('visually-hidden');
    span.innerHTML = 'Delete';
    icon.parentNode.appendChild(span);

    // Get the link element within the current element and add multiple classes to it
    const link = del.querySelector('a');
    link.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  }

  const rows = document.querySelectorAll('.cart-product-row');

  // Add multiple classes to all elements with the 'cart-product-row' class
  for (const row of rows) {
    row.classList.add('row', 'flex-wrap', 'flex-sm-row', 'align-items-start', 'align-items-md-center', 'g-3');
  }

  const discountMessages = document.querySelectorAll('.cart-product-discount-messages');

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
})();
