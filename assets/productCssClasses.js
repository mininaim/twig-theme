(() => {
  // Select all custom checkbox inputs and add the form-check-input class
  const checkboxInputs = document.querySelectorAll('.js-custom-fields .custom-checkbox-input');
  checkboxInputs.forEach((checkbox) => {
    checkbox.classList.add('form-check-input');
  });

  // Select all custom checkbox labels and add the form-check-label and d-inline-block classes
  const checkboxLabels = document.querySelectorAll('.js-custom-fields .custom-checkbox-label');
  checkboxLabels.forEach((label) => {
    label.classList.add('form-check-label', 'd-inline-block', 'text-secondary');
  });

  // Remove the text-color-primary class from all elements
  const textColorPrimaryElements = document.querySelectorAll('.js-custom-fields .text-color-primary');
  textColorPrimaryElements.forEach((element) => {
    element.removeAttribute('class');
  });

  // Add the form-check class to form groups that contain a checkbox container
  const formGroups = document.querySelectorAll('.js-custom-fields .form-group');
  formGroups.forEach((formGroup) => {
    if (formGroup.querySelector('.checkbox-container')) {
      formGroup.classList.add('form-check');
    }
  });

  // Add the my-3 and border-top classes to custom field separators
  const customFieldSeparators = document.querySelectorAll('.js-custom-fields .custom-field-separator');
  customFieldSeparators.forEach((separator) => {
    separator.classList.add('my-3', 'border-top');
  });

  // Remove the id attribute from the element with id "product-custom-user-input-fields"
  // const elements = document.querySelectorAll('.js-custom-fields #product-custom-user-input-fields');
  // elements.forEach((element) => {
  //   element.removeAttribute('id');
  // });

  const dropdownFields = document.querySelectorAll('#product-custom-user-dropdown-fields .form-group');
  dropdownFields.forEach((field) => {
    field.classList.add('text-secondary');
  });

  const userOptionFields = document.querySelectorAll('#product-custom-user-option-fields label');
  userOptionFields.forEach((field) => {
    field.classList.add('text-secondary');
  });

  // Add the form-label class to input labels
  const inputLabels = document.querySelectorAll('.js-custom-fields .input-label');
  inputLabels.forEach((label) => {
    label.classList.add('form-label', 'text-secondary');
  });

  const inputElements = document.querySelectorAll('.js-custom-fields input[data-type="DATE"]');
  inputElements.forEach((inputElement) => {
    inputElement.removeAttribute('readonly');
    inputElement.setAttribute('type', 'date');
    inputElement.setAttribute('placeholder', 'Select a date');

    // Set the date format to "YYYY-MM-DD"
    const date = new Date().toISOString().split('T')[0];
    inputElement.value = date;
  });

  const timeInputs = document.querySelectorAll('.js-custom-fields input[data-type="TIME"]');
  timeInputs.forEach((inputElement) => {
    inputElement.removeAttribute('readonly');
    inputElement.setAttribute('type', 'time');
    inputElement.setAttribute('placeholder', 'Select a time');
  });
})();

(() => {
  // Add the row and g-2 classes to the element with id "product-variants-options"
  const variantsOptions = document.querySelectorAll('.js-custom-variants #product-variants-options');
  variantsOptions.forEach((element) => {
    element.classList.add('row', 'g-2');
  });

  // Remove the form-group class and add the col-md class to form groups
  const formGroups = document.querySelectorAll('.js-custom-variants .form-group');
  formGroups.forEach((formGroup) => {
    formGroup.classList.remove('form-group');
    formGroup.classList.add('col-md');
  });

  // Add the form-floating class to all div elements within col-md elements
  const colMdDivs = document.querySelectorAll('.js-custom-variants .col-md div');
  colMdDivs.forEach((div) => {
    div.classList.add('form-floating');
  });

  // Add the form-select class to all select elements
  const selects = document.querySelectorAll('.js-custom-variants select');
  selects.forEach((select) => {
    select.classList.add('form-select');
  });

  // Move labels within form-floating elements to be the last child of the element
  const floatingForms = document.querySelectorAll('.js-custom-variants .form-floating');
  floatingForms.forEach((form) => {
    const label = form.querySelector('label');
    label.classList.add('text-secondary-emphasis');
    form.appendChild(label);
  });
})();
