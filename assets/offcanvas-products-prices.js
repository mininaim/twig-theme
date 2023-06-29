const inputsTab = document.getElementById('inputs-tab');

if (inputsTab) {
  // attach a click event listener to the "inputs-tab" element
  inputsTab.addEventListener('click', () => {
    const inputsTabPane = document.getElementById('inputs-tab-pane');

    if (inputsTabPane) {
      setTimeout(() => {
        inputsTabPane.querySelector('.js-price-inputs-spinner').style.display = 'none';

        // get the "js-inputs-show" element
        const jsInputsShow = inputsTabPane.querySelector('.js-price-inputs-show');
        jsInputsShow.classList.remove('d-none');
        //jsInputsShow.classList.add('d-inline-block');
      }, 1000);
    }
  });
}

async function playSound(checkboxId, audioElementId) {
  const checkbox = document.getElementById(checkboxId);

  if (!checkbox) {
    console.error('Checkbox element not found.');
    return;
  }

  if (checkbox.type !== 'checkbox') {
    console.error('Element is not a checkbox.');
    return;
  }

  if (!audioElementId) {
    console.error('Audio element ID not found.');
    return;
  }

  const audioElement = document.getElementById(audioElementId);

  if (!audioElement) {
    console.error('Audio element not found.');
    return;
  }

  const { checked } = checkbox;

  if (checked) {
    try {
      await audioElement.play();
    } catch (error) {
      console.error(error);
    }
  }
}

const checkbox = document.querySelector('#inputShowDiscounts');
checkbox.addEventListener('change', () => {
  playSound('inputShowDiscounts', 'soundChecked');
});

async function setupFilterForm() {
  try {
    // Get the filter button and the input elements
    const filterButton = document.querySelector('.js-button-filter');
    const switchInput = document.querySelector('#inputShowDiscounts');

    // Check if the elements exist on the page
    if (!filterButton || !switchInput) {
      throw new Error('One or more elements were not found on the page');
    }

    // Initialize the filter count to 0
    let filterCount = 0;
    let previousFilterCount = 0;

    // Update the filter count and button text
    const updateFilterCount = () => {
      // Check if the filter button element exists
      if (!filterButton) {
        return;
      }

      // Reset the filter button text
      filterButton.innerHTML = filterButton.innerHTML.replace(/\(\d+\)/, '');

      // Reset the filter count
      filterCount = 1;

      // Check if the switch input is checked
      if (switchInput.checked) {
        filterCount++;
      }

      // Update the filter button text with the filter count if the filter count has changed
      if (filterCount !== previousFilterCount) {
        previousFilterCount = filterCount;
        //filterButton.innerHTML = `${filterButton.innerHTML} (${filterCount || 0})`;
      }
    };

    // Add event listener to the switch input to update the filter count when it is changed
    switchInput.addEventListener('change', updateFilterCount);

    // Add event listener to update the filter count when the form is submitted
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      updateFilterCount();
      document.querySelector('form').submit();
    });

    // Update the filter count when the page loads
    updateFilterCount();
  } catch (error) {
    console.error(error);
  }
}

// Initialize the filter form when the page loads
window.addEventListener('load', setupFilterForm);
