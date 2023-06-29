const createSlider = (sliderId, minValue, maxValue) => {
  const slider = document.querySelector(`#${sliderId}`);
  if (!slider) {
    return;
  }

  const htmlElement = document.querySelector('html');

  const isRtl = htmlElement.getAttribute('dir') === 'rtl';

  const urlParams = new URLSearchParams(window.location.search);
  const fromPrice = urlParams.get('from_price');
  const toPrice = urlParams.get('to_price');

  noUiSlider.create(slider, {
    start: [fromPrice || 0, toPrice || 9999],
    connect: true,
    range: {
      min: minValue,
      max: maxValue,
    },

    tooltips: new Array(2).fill(wNumb({ decimals: 0 })),
    direction: isRtl ? 'rtl' : 'ltr',
    animate: true,
  });

  slider.noUiSlider.on('update', (values) => {
    const [productMin, productMax] = [document.querySelector('#productMin'), document.querySelector('#productMax')];

    const [minValue, maxValue] = values.map((value) => parseFloat(value).toFixed(0));

    productMin.value = minValue;
    productMax.value = maxValue;
  });

  document.querySelector('#productMin').addEventListener('input', (event) => {
    const value = event.target.value;

    slider.noUiSlider.set([value, null]);
  });

  document.querySelector('#productMax').addEventListener('input', (event) => {
    const value = event.target.value;

    slider.noUiSlider.set([null, value]);
  });
};

createSlider('range-slider', 0, 10000);
