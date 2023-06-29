const offcanvasCountries = document.getElementById('offcanvasCountries');
const selects = offcanvasCountries.querySelectorAll('.form-select');
const buttonSave = document.querySelector('.js-button-save');

selects.forEach((select) => {
  select.addEventListener('change', () => {
    buttonSave.disabled = false;
  });
});

/**
 * Toggles the visibility and availability of destination country cities based on
 * the selected country code
 */
const toggleDistinationCountryCities = (event) => {
  const selectElement = event.target;
  const code = selectElement.value;
  const id = selectElement.dataset.countryId;

  const inputDeliveryCountries = document.querySelectorAll('.js-input-change-session-delivery-country');
  const selectCountryCities = document.querySelectorAll('.js-city-country');

  if (!inputDeliveryCountries.length || !selectCountryCities.length) {
    return;
  }

  const selectCountryCitiesIds = document.querySelectorAll(`.js-city-country-id-${code}`);

  if (!selectCountryCitiesIds.length) {
    return;
  }

  for (const inputDeliveryCountry of inputDeliveryCountries) {
    inputDeliveryCountry.value = id;
  }

  for (const selectCountryCity of selectCountryCities) {
    selectCountryCity.setAttribute('disabled', true);
    selectCountryCity.classList.add('d-none');
  }

  for (const selectCountryCitiesId of selectCountryCitiesIds) {
    selectCountryCitiesId.removeAttribute('disabled');
    selectCountryCitiesId.classList.remove('d-none');
  }
};
