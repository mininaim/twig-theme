const jsDropdown = document.querySelector('.js-profile-dropdown');
const jsDropdownMenu = document.querySelector('.js-profile-dropdown .dropdown-menu');

if (jsDropdown) {
  jsDropdown.addEventListener('mouseover', () => {
    jsDropdownMenu.style.display = 'block';
  });

  jsDropdown.addEventListener('mouseout', () => {
    jsDropdownMenu.style.display = 'none';
  });
}

const jsMenuDropdown = document.querySelectorAll('.js-menu-dropdown');

jsMenuDropdown.forEach((el) => {
  const jsMenuDropdownMenu = el.querySelector('.dropdown-menu');

  el.addEventListener('mouseover', () => {
    jsMenuDropdownMenu.style.display = 'block';
  });

  el.addEventListener('mouseout', () => {
    jsMenuDropdownMenu.style.display = 'none';
  });
});

const href = document.querySelectorAll('.js-menu-dropdown a');

href.forEach((el) => {
  el.addEventListener('click', (e) => {
    const href = el.getAttribute('href');
    window.location.href = href;
  });
});

const elements = [
  { key: 'languageShipping', className: 'js-language-shipping', animation: 'tada' },
  { key: 'historyActivity', className: 'js-history-activity', animation: 'tada' },
  { key: 'profileAccount', className: 'js-profile-account', animation: 'tada' },
];

elements.forEach(({ key, className, animation }) => {
  const element = document.querySelector(`.${className}`);
  if (element) {
    if (localStorage.getItem(key) !== 'true') {
      element.classList.add('animate__animated', `animate__${animation}`, 'animate__slow');
      localStorage.setItem(key, 'true');
    } else {
      element.classList.remove('animate__animated', `animate__${animation}`, 'animate__slow');
    }
  }
});
