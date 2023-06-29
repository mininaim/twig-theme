const color = document.querySelectorAll("input[name='themeColor']");
if (color) {
  color.forEach((c) => {
    c.addEventListener('change', function () {
      const colorHex = this.getAttribute('data-color');
      const setThemeOptions = { color: colorHex, hex: colorHex };
      localStorage.setItem('themeOptions', JSON.stringify(setThemeOptions));
      window.location.reload();
    });
  });

  let storedOptions = JSON.parse(localStorage.getItem('themeOptions'));
  if (storedOptions) {
    let getColor = storedOptions.color || '#8661a3';
    let getTextColor = storedOptions.textColor || 'var(--bs-dark)';
    let rgb = getColor
      .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));
    let r = rgb[0],
      g = rgb[1],
      b = rgb[2];
    const pad = (hex) => (hex.length === 1 ? '0' + hex : hex);
    const tint = (color, tint) => {
      let red = Math.round((parseInt(color.substring(1, 3), 16) * (100 + tint)) / 100);
      let green = Math.round((parseInt(color.substring(3, 5), 16) * (100 + tint)) / 100);
      let blue = Math.round((parseInt(color.substring(5, 7), 16) * (100 + tint)) / 100);
      if (tint === 0) return [red, green, blue];
      red += Math.round(tint * (255 - red));
      green += Math.round(tint * (255 - green));
      blue += Math.round(tint * (255 - blue));
      red = red.toString(16);
      green = green.toString(16);
      blue = blue.toString(16);
      return '#' + pad(red) + pad(green) + pad(blue);
    };
    const shade = (color, shade) => {
      let red = Math.round((parseInt(color.substring(1, 3), 16) * (100 - shade)) / 100);
      let green = Math.round((parseInt(color.substring(3, 5), 16) * (100 - shade)) / 100);
      let blue = Math.round((parseInt(color.substring(5, 7), 16) * (100 - shade)) / 100);
      red = Math.round((1 - shade) * red);
      green = Math.round((1 - shade) * green);
      blue = Math.round((1 - shade) * blue);
      red = red.toString(16);
      green = green.toString(16);
      blue = blue.toString(16);
      return '#' + pad(red) + pad(green) + pad(blue);
    };
    let tinted = tint(getColor, 0.1);
    let shaded = shade(getColor, 0.1);
    let rgbaColor = `rgba(${r}, ${g}, ${b}, .9)`;
    document.documentElement.style.setProperty('--primary', getColor);
    document.documentElement.style.setProperty('--primary-rgb', rgbaColor);
    document.documentElement.style.setProperty('--primary-tint', tinted);
    document.documentElement.style.setProperty('--primary-shade', shaded);
    document.documentElement.style.setProperty('--text-color', getTextColor);
  }
}
