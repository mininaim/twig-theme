const revealElements = () => {
  if (!('IntersectionObserver' in window)) {
    return;
  }

  const elements = document.querySelectorAll('.reveal-fx');

  const observers = [];
  elements.forEach((element) => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        element.classList.add('reveal-fx--is-visible');
        observer.disconnect();
      }
    });
    observer.observe(element);
    observers.push(observer);
  });
};

window.addEventListener('load', revealElements);
