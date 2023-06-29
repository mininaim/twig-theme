const triggerButtons = document.querySelectorAll('button[data-id]');

triggerButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const modal = document.getElementById('modalAllCities');
    const modalBody = modal.querySelector('.modal-body');
    const spinner = modalBody.querySelector('.js-spinner-cities');
    spinner.classList.remove('d-none');

    setTimeout(function () {
      spinner.classList.add('d-none');
      const citiesDataElement = modalBody.querySelector('.js-data-cities');
      citiesDataElement.innerHTML = '';
      const dataElement = document.querySelector(`[data-cities="${button.dataset.id}"]`);
      const clonedElement = dataElement.cloneNode(true);
      clonedElement.removeAttribute('hidden');
      citiesDataElement.innerHTML = '';
      citiesDataElement.appendChild(clonedElement);
    }, 500);

    modal.classList.add('show');

    modal.addEventListener('hidden.bs.modal', function () {
      const citiesDataElement = modal.querySelector('.js-data-cities');
      citiesDataElement.innerHTML = '';
      const searchInput = document.getElementById('searchInput');
      searchInput.value = '';
      filterList();
    });
  });
});

const filterList = () => {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();

  const listItems = document.getElementsByClassName('list-group-item');

  if (searchValue === '') {
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].style.display = '';
      listItems[i].innerHTML = listItems[i].textContent;
    }
  } else {
    for (let i = 0; i < listItems.length; i++) {
      const itemText = listItems[i].textContent.toLowerCase();

      if (itemText.includes(searchValue)) {
        listItems[i].innerHTML = itemText.replace(
          searchValue,
          '<span class="text-danger fw-bold">' + searchValue + '</span>',
        );
      } else {
        listItems[i].style.display = 'none';
      }
    }
  }
};

const toggle = (callback) => {
  const showElementAfterDelay = (templateSelector, spinnerSelector, delay, cb) => {
    toggleSpinner(true);

    const template = document.querySelector(templateSelector);
    const spinner = document.querySelector(spinnerSelector);
    if (template && spinner) {
      setTimeout(() => {
        spinner.style.display = 'none';
        template.style.display = 'block';

        toggleSpinner(false);
        cb();
      }, delay);
    }
  };

  document.querySelectorAll('.collapse').forEach((collapseDiv) => {
    const isCollapsed = !collapseDiv.classList.contains('show');
    collapseDiv.classList.toggle('show', isCollapsed);

    const spinnerSelector = `.js-spinner-${collapseDiv.id}`;
    const templateSelector = `.js-data-${collapseDiv.id}`;
    showElementAfterDelay(templateSelector, spinnerSelector, 500, () => {
      callback(collapseDiv);
    });
  });
};

const toggleSpinner = (isVisible) => {
  const spinner = document.querySelector('.js-toggle .spinner-border');
  if (spinner) {
    spinner.classList.toggle('d-none', !isVisible);
  }
};

const callback = (collapseDiv) => {
  const icon = collapseDiv.classList.contains('show') ? 'ti-stack-pop' : 'ti-stack-push';
  const text = collapseDiv.classList.contains('show')
    ? shippingDataTemplate.shipping_and_payment_tools_collapse
    : shippingDataTemplate.shipping_and_payment_tools_expand;
  jsToggle.innerHTML = `
    <i class="ti ${icon} fs-6 align-middle" aria-hidden="true"></i>
    <span class="px-1">${text}</span>
    <span class="spinner-border spinner-border-sm text-light-subtle ml-2 d-none" role="status" aria-hidden="true"></span>
  `;
};

const jsToggle = document.querySelector('.js-toggle');
if (jsToggle) {
  jsToggle.addEventListener('click', () => {
    toggle(callback);
  });
}

const elementIds = ['collapseTablePayment', 'collapseTableBanks', 'collapseTable'];

const runCode = () => {
  const showElementAfterDelay = (templateSelector, spinnerSelector, delay) => {
    const template = document.querySelector(templateSelector);
    const spinner = document.querySelector(spinnerSelector);
    if (template && spinner) {
      setTimeout(() => {
        spinner.style.display = 'none';
        template.style.display = 'block';
      }, delay);
    }
  };

  const handleCollapseClick = (event) => {
    const targetId = event.currentTarget.getAttribute('data-bs-target');
    const templateSelector = `.js-data-${targetId.slice(1)}`;
    const spinnerSelector = `.js-spinner-${targetId.slice(1)}`;
    showElementAfterDelay(templateSelector, spinnerSelector, 500);
  };

  document.querySelectorAll('[data-bs-target]').forEach((collapseElement) => {
    collapseElement.addEventListener('click', handleCollapseClick);
  });
};

if (elementIds.some((id) => document.getElementById(id))) {
  runCode();
}

const exportData = () => {
  document.getElementById('js-btn-export').innerHTML =
    '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> <span class="px-1">' +
    shippingDataTemplate.data_exporting +
    '</span>';
  document.getElementById('js-btn-export').setAttribute('disabled', true);

  const storeName = shippingDataTemplate.data_file_title;
  const table = document.getElementById('js-banks-data');
  const rows = [...table.rows];
  let rowData = '';
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].cells;
    rowData += cells[1].innerHTML + '\n';
    rowData += cells[2].innerHTML + '\n';
    rowData += cells[3].innerHTML + '\n';

    const imgElement = cells[4].getElementsByTagName('img')[0];
    if (imgElement) {
      const bank = imgElement.getAttribute('data-bs-title');
      const bankName = bank.match(/<small>(.*?)<\/small>/s)?.[1]?.trim() || '';
      rowData += bankName + '\n';
    }

    if (i !== rows.length - 1) rowData += '-----------------\n';
  }
  const blob = new Blob([rowData], { type: 'text/plain;charset=utf-8' });

  saveAs(blob, storeName + '.txt');
  setTimeout(() => {
    document.getElementById('js-btn-export').classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
      document.getElementById('js-btn-export').remove();
    }, 1000);
  }, 500);
};

// Shipping Sortable table

const sortTable = (tableId) => {
  if (tableId && document.getElementById(tableId)) {
    const table = document.getElementById(tableId);
    const sortableColumns = table.querySelectorAll('.sortable-column');
    new Tablesort(table, { th: sortableColumns });
  }
};

sortTable('js-shipping-sortable');
