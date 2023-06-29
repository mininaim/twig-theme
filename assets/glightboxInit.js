if ($('.glightbox').length > 0) {
  const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: false,
    autoplayVideos: false,
    closeEffect: 'fade',
    skin: 'clean',
    draggable: true,
    preload: true,
    zoomable: true,
    openEffect: 'fade',
  });
  if (lightbox) {
    lightbox.on('open', () => {});
    lightbox.on('close', () => {});
  }
}
if ($('.glightbox-product-description').length > 0) {
  const lightbox = GLightbox({
    selector: '.glightbox-product-description',
    touchNavigation: true,
    loop: false,
    autoplayVideos: true,
    closeEffect: 'fade',
    skin: 'clean',
    draggable: true,
    preload: true,
  });
  if (lightbox) {
    lightbox.on('open', () => {});
    lightbox.on('close', () => {});
  }
}
