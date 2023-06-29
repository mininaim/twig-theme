let getTextColor = storeColorTextPrimaryBg;
if ('undefined' != typeof Storage) {
  let t = JSON.parse(localStorage.getItem('themeOptions'));
  if (t) {
    let e = t.color,
      r = storeColorTextPrimaryBg;
    ('' != e && '#ffffff' != e && '#fff' != e && '#FFFFFF' != e && '#FFF' != e) || (e = '#8661a3'),
      ('' != r && '#ffffff' != r && '#fff' != r && '#FFFFFF' != r && '#FFF' != r) || (r = 'var(--bs-dark)');
    let o = e
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (t, e, r, o) => '#' + e + e + r + r + o + o)
        .substring(1)
        .match(/.{2}/g)
        .map((t) => parseInt(t, 16)),
      n = o[0],
      s = o[1],
      l = o[2],
      $ = (t) => (1 === t.length ? '0' + t : t),
      _ = (t, e) => {
        let r = Math.round((parseInt(t.substring(1, 3), 16) * (100 - e)) / 100),
          o = Math.round((parseInt(t.substring(3, 5), 16) * (100 - e)) / 100),
          n = Math.round((parseInt(t.substring(5, 7), 16) * (100 - e)) / 100);
        return (
          (r = Math.round((1 - e) * r)),
          (o = Math.round((1 - e) * o)),
          (n = Math.round((1 - e) * n)),
          (r = r.toString(16)),
          (o = o.toString(16)),
          (n = n.toString(16)),
          '#' + $(r) + $(o) + $(n)
        );
      },
      i = ((t, e) => {
        let r = Math.round((parseInt(t.substring(1, 3), 16) * (100 + e)) / 100),
          o = Math.round((parseInt(t.substring(3, 5), 16) * (100 + e)) / 100),
          n = Math.round((parseInt(t.substring(5, 7), 16) * (100 + e)) / 100);
        return 0 === e
          ? [r, o, n]
          : ((r += Math.round(e * (255 - r))),
            (o += Math.round(e * (255 - o))),
            (n += Math.round(e * (255 - n))),
            (r = r.toString(16)),
            (o = o.toString(16)),
            (n = n.toString(16)),
            '#' + $(r) + $(o) + $(n));
      })(e, 0.1),
      a = _(e, 0.1),
      g = (t, e, r) => `${t} ${e} ${r}`,
      c = (t, e, r, o) => `${t}, ${e}, ${r}`;
    document.documentElement.style.setProperty('--color-primary', e),
      document.documentElement.style.setProperty('--color-accent', a),
      document.documentElement.style.setProperty('--color-primary-rgba', g(n, s, l, 1)),
      document.documentElement.style.setProperty('--bs-primary-rgb', c(n, s, l)),
      document.documentElement.style.setProperty('--text-color-primary-bg', r);
    let d = document.createElement('style');
    (d.type = 'text/css'),
      (d.innerHTML = `.accordion { --bs-accordion-btn-active-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23${e.substring(
        1,
      )}'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E") !important; }`),
      document.getElementsByTagName('head')[0].appendChild(d);
    let m = document.createElement('style');
    (m.type = 'text/css'),
      (m.innerHTML = `.form-switch .form-check-input:focus {background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23${i.substring(
        1,
      )}'/%3e%3c/svg%3e") !important;}`),
      document.getElementsByTagName('head')[0].appendChild(m);
    let u = { color: t.color, hex: t.hex };
    localStorage.setItem('themeOptions', JSON.stringify(u));
  } else {
    let f = storeColorTextPrimaryText;
    ('' != f && '#ffffff' != f && '#fff' != f && '#FFFFFF' != f && '#FFF' != f) || (f = '#8661a3'),
      ('' != getTextColor &&
        '#ffffff' != getTextColor &&
        '#fff' != getTextColor &&
        '#FFFFFF' != getTextColor &&
        '#FFF' != getTextColor) ||
        (getTextColor = 'var(--bs-dark)');
    let p = f
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (t, e, r, o) => '#' + e + e + r + r + o + o)
        .substring(1)
        .match(/.{2}/g)
        .map((t) => parseInt(t, 16)),
      y = p[0],
      b = p[1],
      F = p[2],
      x = (t) => (1 === t.length ? '0' + t : t),
      h = (t, e) => {
        let r = Math.round((parseInt(t.substring(1, 3), 16) * (100 - e)) / 100),
          o = Math.round((parseInt(t.substring(3, 5), 16) * (100 - e)) / 100),
          n = Math.round((parseInt(t.substring(5, 7), 16) * (100 - e)) / 100);
        return (
          (r = Math.round((1 - e) * r)),
          (o = Math.round((1 - e) * o)),
          (n = Math.round((1 - e) * n)),
          (r = r.toString(16)),
          (o = o.toString(16)),
          (n = n.toString(16)),
          '#' + x(r) + x(o) + x(n)
        );
      },
      v = ((t, e) => {
        let r = Math.round((parseInt(t.substring(1, 3), 16) * (100 + e)) / 100),
          o = Math.round((parseInt(t.substring(3, 5), 16) * (100 + e)) / 100),
          n = Math.round((parseInt(t.substring(5, 7), 16) * (100 + e)) / 100);
        return 0 === e
          ? [r, o, n]
          : ((r += Math.round(e * (255 - r))),
            (o += Math.round(e * (255 - o))),
            (n += Math.round(e * (255 - n))),
            (r = r.toString(16)),
            (o = o.toString(16)),
            (n = n.toString(16)),
            '#' + x(r) + x(o) + x(n));
      })(f, 0.1),
      E = h(f, 0.1),
      w = (t, e, r) => `${t} ${e} ${r}`,
      C = (t, e, r, o) => `${t}, ${e}, ${r}`;
    document.documentElement.style.setProperty('--color-primary', f),
      document.documentElement.style.setProperty('--color-accent', E),
      document.documentElement.style.setProperty('--color-primary-rgba', w(y, b, F, 1)),
      document.documentElement.style.setProperty('--bs-primary-rgb', C(y, b, F)),
      document.documentElement.style.setProperty('--text-color-primary-bg', getTextColor);
    let T = document.createElement('style');
    (T.type = 'text/css'),
      (T.innerHTML = `.accordion { --bs-accordion-btn-active-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23${f.substring(
        1,
      )}'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E") !important; }`),
      document.getElementsByTagName('head')[0].appendChild(T);
    let S = document.createElement('style');
    (S.type = 'text/css'),
      (S.innerHTML = `.form-switch .form-check-input:focus {background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23${v.substring(
        1,
      )}'/%3e%3c/svg%3e") !important;}`),
      document.getElementsByTagName('head')[0].appendChild(S);
  }
} else {
  alert('Sorry!, the localStorage is not supported in your browser.');
}
