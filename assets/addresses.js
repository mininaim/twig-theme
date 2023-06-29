const deleteAddress = async (e) => {
  const addressId = e.getAttribute('data-id');
  if (!addressId) return;

  const addressCard = document.getElementById(`js-address-${addressId}`);
  const spinner = document.getElementById(`js-spinner-${addressId}`);
  const card = addressCard.querySelector('.card');

  showSpinner(spinner, card);

  try {
    const response = await zid.store.customer.deleteAddress(addressId);
    if (response.status === 'success') {
      //console.log(response);
      const toastTemplate = document.querySelector('#dataTemplateAddress').innerHTML;
      const data = { addresses_deleted: '{{ locals.addresses_deleted }}' };
      const toastMessage = Mustache.render(toastTemplate, data);
      displayToast(toastMessage);
      location.reload();
    } else {
      hideSpinner(spinner, card);
    }
  } catch (error) {
    //console.log(error);
  }
};

const showSpinner = (spinner, card) => {
  spinner.classList.remove('d-none');
  card.classList.add('bg-primary-subtle');
};

const hideSpinner = (spinner, card) => {
  spinner.classList.add('d-none');
  card.classList.remove('bg-primary-subtle');
};

const displayToast = (message) => {
  const toast = document.querySelector('.js-toast');
  const toastBody = document.querySelector('.js-toast-message');

  toastBody.innerHTML = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 1500);
};
