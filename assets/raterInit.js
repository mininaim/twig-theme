const raterElement = document.querySelector('#js-product-rater');
const selectedRating = document.querySelector('#selected_rating');

let reverse = false;
const rootLang = document.documentElement.lang;

if (rootLang === 'ar') {
  reverse = true;
}

if (raterElement) {
  selectedRating.value = 4;
  raterJs({
    starSize: 20,
    reverse: reverse,
    rating: 4,
    element: raterElement,
    rateCallback(rating, done) {
      this.setRating(rating);
      done();
    },
    onHover(currentIndex, currentRating) {
      document.querySelector('.js-live-rating').textContent = currentIndex;
      selectedRating.value = currentIndex;
    },
    onLeave(currentIndex, currentRating) {
      document.querySelector('.js-live-rating').textContent = currentRating;
      selectedRating.value = currentRating;
    },
  });
}
