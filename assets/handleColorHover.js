function handleColorHover() {
  var labels = document.querySelectorAll('#js-colors label');
  var originalColor = document.querySelector('html').getAttribute('data-bs-theme');
  var root = document.documentElement;
  for (var i = 0; i < labels.length; i++) {
    labels[i].addEventListener('mouseover', function () {
      var color = this.previousElementSibling.getAttribute('data-color');
      root.style.setProperty('--color-primary', color);
      root.style.setProperty('--color-accent', color);
      root.style.setProperty('--color-primary-rgba', color);
      root.style.setProperty('--bs-primary-rgb', color);
    });
    labels[i].addEventListener('mouseout', function () {
      root.style.setProperty('--color-primary', originalColor);
      root.style.setProperty('--color-accent', originalColor);
      root.style.setProperty('--color-primary-rgba', originalColor);
      root.style.setProperty('--bs-primary-rgb', originalColor);
    });
  }
}

window.onload = handleColorHover;
