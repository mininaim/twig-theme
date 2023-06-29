const createFavoritesToggle = (button) => {
  const productId = button.getAttribute('data-product-id');
  let favoritesProducts = JSON.parse(localStorage.getItem('favorites')) || [];
  let isFavorited = favoritesProducts.includes(productId);
  let timeoutId = null;

  const toggleFavorites = () => {
    isFavorited = !isFavorited;
    if (isFavorited) {
      favoritesProducts.push(productId);
    } else {
      favoritesProducts = favoritesProducts.filter((item) => item !== productId);
    }
    localStorage.setItem('favorites', JSON.stringify(favoritesProducts));
  };

  const updateButton = () => {
    const rootLang = document.documentElement.lang;
    let icon = isFavorited ? 'heart' : favoritesProducts.includes(productId) ? 'bookmarks' : 'bookmark';

    let title = isFavorited ? 'Remove from Favorites' : 'Add to Favorites';
    if (rootLang === 'ar') {
      title = isFavorited ? 'أزل من المفضلة' : 'أضف إلى المفضلة';
    }
    button.innerHTML = `<i aria-hidden="true" class="fs-6 align-middle ti ti-${icon}"></i>`;
    button.setAttribute('title', title);
    button.setAttribute('aria-label', title);

    let tooltip = bootstrap.Tooltip.getInstance(button);
    if (tooltip) {
      tooltip.dispose();
    }

    tooltip = new bootstrap.Tooltip(button, {
      title: title,
    });

    // tooltip.toggle();
  };

  const toggleLoading = () => {
    button.innerHTML = `<i aria-hidden="true" class="fs-6 align-middle ti ti-loader d-inline-block animate__animated animate__rotateIn animate__infinite"></i>`;
    timeoutId = setTimeout(updateButton, 500);
  };

  button.addEventListener('click', () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    toggleFavorites();
    toggleLoading();
  });

  updateButton();
};
const favButton = document.querySelector('.js-fav-button');
if (favButton) {
  createFavoritesToggle(favButton);
}
