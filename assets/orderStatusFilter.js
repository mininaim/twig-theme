function orderStatusFilter() {
  const cards = document.querySelectorAll('#ordersFiltered .col');
  const dropdown = document.querySelector('#orderStatusFilter');
  dropdown.addEventListener('change', () => {
    const selectedValue = dropdown.value;

    cards.forEach((card) => {
      if (selectedValue === 'all') {
        card.style.display = 'block';
      } else if (card.getAttribute('data-status') === selectedValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
//console.log('orderStatusFilter.js loaded');
