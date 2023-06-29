document.addEventListener('DOMContentLoaded', () => {
  const loadMoreButtons = document.querySelectorAll('#attributeAccordion button[data-attribute-id]');
  loadMoreButtons.forEach((loadMoreButton) => {
    loadMoreButton.addEventListener('click', (event) => {
      event.preventDefault();

      const attributeId = loadMoreButton.getAttribute('data-attribute-id');
      const filterContainer = document.getElementById(`collapse${attributeId}`).querySelector('#filter-container');
      const filterRows = Array.from(filterContainer.getElementsByClassName('filter-row'));
      const labelsPerPage = 4;

      const hiddenRows = filterRows.filter((row) => row.classList.contains('d-none'));

      for (let i = 0; i < labelsPerPage && i < hiddenRows.length; i++) {
        hiddenRows[i].classList.remove('d-none');
      }

      loadMoreButton.style.display = filterRows.some((row) => row.classList.contains('d-none')) ? 'block' : 'none';
    });
  });
});

function setupFilterBadges() {
  function updateBadgeCount() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach((item) => {
      const checkboxes = item.querySelectorAll('input[type="checkbox"]');
      const checkedCheckboxes = item.querySelectorAll('input[type="checkbox"]:checked');
      const badge = item.querySelector('.text-secondary');
      if (badge) {
        badge.textContent = `(${checkedCheckboxes.length}/${checkboxes.length})`;
      }
      // console.log('Badge count updated:', checkedCheckboxes.length);
    });
  }

  updateBadgeCount();

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateBadgeCount);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupFilterBadges();
});

function resetFiltersAttribute() {
  const form = document.getElementById('attribute_form');

  form.reset();

  const hiddenInputs = form.querySelectorAll('input[type="hidden"]');
  hiddenInputs.forEach((input) => {
    input.value = '';
  });

  //$('#range-slider').slider('value', 9999);

  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const badge = item.querySelector('.text-secondary');
    if (badge) {
      badge.textContent = '(0/0)';
    }

    const checkboxes = item.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.removeAttribute('checked');
    });
  });

  const baseUrl = window.location.href.split('?')[0];
  history.replaceState(null, null, baseUrl);

  location.reload();

  // !todo: Fix this
  // Refresh only if the url contains a query string
  // if (window.location.href.indexOf('?') > -1) {
  //   window.location.reload();
  // }
}

document.addEventListener('DOMContentLoaded', function () {
  const attributeSearchInputs = document.querySelectorAll('[id^="attribute-search"]');
  attributeSearchInputs.forEach((input) => {
    input.addEventListener('input', handleAttributeSearch);
  });

  function handleAttributeSearch(event) {
    const searchValue = event.target.value.toLowerCase();
    const collapseId = event.target.closest('.accordion-collapse').id;
    const filterRows = document.querySelectorAll(`#${collapseId} .filter-row`);

    filterRows.forEach((filterRow) => {
      const attributeLabel = filterRow.querySelector('.attribute-label');
      const labelValue = attributeLabel.textContent.toLowerCase();

      if (labelValue.includes(searchValue)) {
        filterRow.classList.remove('d-none');
      } else {
        filterRow.classList.add('d-none');
      }
    });
  }
});
