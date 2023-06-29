const initializeSimpleBar = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    const simplebar = new SimpleBar(element, {
      autoHide: true,
      scrollbarMinSize: 50,
      scrollbarMaxSize: 50,
    });
  }
};

//initializeSimpleBar('[data-simplebar]');
initializeSimpleBar('.js-scrollable-element');
