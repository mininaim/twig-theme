const GroupSearchFilter = (InputGroupSearchFilter, ordersFiltered) => {
  const input = document.getElementById(InputGroupSearchFilter);
  const cardContainer = document.getElementById(ordersFiltered);

  const cards = cardContainer.getElementsByClassName('col');

  const pagination = document.querySelector('[role="pagination"]');

  const gridColsRange = document.getElementById('grid-cols-range');

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  input.addEventListener('input', () => {
    if (pagination) {
      pagination.style.display = 'none';
    }
    if (input.value === '' && gridColsRange && gridColsRange.hasAttribute('disabled')) {
      gridColsRange.removeAttribute('disabled');
    }
  });

  input.addEventListener('focus', () => {
    if (input.value === '' && pagination) {
      pagination.style.display = '';
    }
  });

  input.addEventListener(
    'input',
    debounce(() => {
      const filter = input.value.toUpperCase();

      if (filter === '') {
        for (const card of cards) {
          card.style.display = '';
        }

        document.getElementById('noResults').style.display = 'none';
        if (pagination) {
          pagination.style.display = '';
        }
      } else {
        let noResults = true;

        for (const card of cards) {
          const title = card.querySelector('.card');

          if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            card.style.display = '';
            noResults = false;
          } else {
            card.style.display = 'none';
          }

          if (noResults) {
            document.getElementById('noResults').style.display = '';
            if (gridColsRange) {
              gridColsRange.setAttribute('disabled', '');
            }
            if (pagination) {
              pagination.style.display = 'none';
            }
          } else {
            document.getElementById('noResults').style.display = 'none';

            if (pagination) {
              pagination.style.display = input.value !== '' ? 'none' : '';
            }
            if (gridColsRange) {
              gridColsRange.removeAttribute('disabled');
            }
          }
        }
      }
    }, 350),
  );
};
