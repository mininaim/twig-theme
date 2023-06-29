const scriptElement = document.getElementById('dataTemplateProductReview');
const template = scriptElement.innerHTML;

const data = {};
const regex = /data-product-id="(.*)" data-success-message="(.*)"/;
const match = regex.exec(template);

if (match) {
  data.productId = match[1];
  data.successMessage = match[2];
}

const output = Mustache.render(template, data);

const productIdElement = document.getElementById('product-id');
if (productIdElement) {
  productIdElement.textContent = data.productId;
}

const successMessageElement = document.getElementById('success-message');
if (successMessageElement) {
  successMessageElement.textContent = data.successMessage;
}

async function submitReview() {
  if (!document.querySelector('.js-add-review-progress').classList.contains('d-none')) {
    return;
  }

  try {
    document.querySelector('.js-add-review-progress').classList.remove('d-none');
    const response = await zid.store.product.addReview(
      data.productId,
      document.querySelector('.js-input-review-comment').value,
      document.querySelector('#selected_rating').value,
      document.querySelector('#is_review_customer_anonymous').checked,
    );

    let message;
    if (response.status === 'success') {
      message = data.successMessage;
    } else {
      message = response.data.message;
    }

    const toast = document.querySelector('.js-toast');
    const toastBody = document.querySelector('.js-toast-message');

    toastBody.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  } catch (error) {
    console.error(error);
  } finally {
    document.querySelector('.js-add-review-progress').classList.add('d-none');
    const modalElement = document.querySelector('#addReviewModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('textarea.js-input-review-comment');
  const remainingCountElement = document.querySelector('.js-review-remaining-count');
  const submitButton = document.querySelector('.js-btn-submit-review');

  if (textarea && remainingCountElement && submitButton) {
    textarea.addEventListener('input', (event) => {
      const remainingCount = textarea.maxLength - event.target.value.length;
      remainingCountElement.innerHTML = remainingCount;

      submitButton.disabled = remainingCount < 0 || event.target.value.trim() === '';
    });
  }
});
