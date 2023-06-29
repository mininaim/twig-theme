const toggleCookieBanner = (show) => {
  localStorage.setItem('checkIsCookieAccepted', show ? 'no' : 'yes');
  let cookieBanner = document.getElementById('cookies');
  cookieBanner.style.display = show ? 'block' : 'none';
};

const InitCookieBanner = () => {
  let isCookieAccepted = localStorage.getItem('checkIsCookieAccepted');
  if (!isCookieAccepted) {
    localStorage.setItem('checkIsCookieAccepted', 'no');
    toggleCookieBanner(true);
  }
};
window.onload = InitCookieBanner();
window.setGetCookies = () => toggleCookieBanner(false);
