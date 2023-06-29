if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(assetsPathForServiceWorker + 'service-worker.js')
      .then((registration) => {
        registration.update();
        //console.log('Service worker registered: ', registration);
        return registration;
      })
      .catch((error) => {
        //console.log('Service worker registration failed: ', error);
      });
  });
}
