const initProgressBar = ({ progress = document.querySelector('#progress') } = {}) => {
  if (progress) {
    const url = window.location.pathname;
    if (url !== '/') {
      const bar = new ProgressBar.Line('#progress', {
        strokeWidth: 0.5,
        easing: 'easeInOut',
        duration: 2000,
        color: getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
        trailColor: 'bg-light-subtle',
        trailWidth: 0,
        svgStyle: { width: '100%', height: '3px' },
      });
      bar.animate(2.0);
      progress.classList.toggle('d-none');
    }
  }
};

initProgressBar();
