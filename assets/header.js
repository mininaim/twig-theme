const appendVisitedPages = (elementId) => {
  const element = document.getElementById(elementId);
  const historyContainer = document.querySelector('.js-history');
  const visitedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];

  if (!element) return;

  historyContainer.classList.toggle('d-block', visitedPages.length === 0);

  if (visitedPages.length === 0) {
    const htmlLang = document.querySelector('html').getAttribute('lang');

    const noItemsTexts = {
      en: 'Start browsing our products',
      ar: 'إبدأ بتصفح منتجاتنا',
    };
    const noItemsText = noItemsTexts[htmlLang] || noItemsTexts['en'];

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="text-dark rounded-0 !rounded-3 !mb-3 dropdown-header d-flex justify-content-between align-items-center">						
          <div class="flex-grow-1 text-secondary-emphasis">
                      <i class='ti ti-scan-eye align-middle fs-6' aria-hidden="true"></i>
                      <span class="px-1">${noItemsText}</span>
          </div> 
      </div>
    `;
    element.appendChild(li);
    return;
  }

  const htmlLang = document.querySelector('html').getAttribute('lang');

  const headingTexts = {
    en: 'Recently Visited Products',
    ar: 'منتجات زرتها حديثا',
  };

  const headingText = headingTexts[htmlLang] || headingTexts['en'];

  const liHeader = document.createElement('li');
  liHeader.innerHTML = `
      <div class="text-dark rounded-0 !rounded-3 !mb-3 dropdown-header d-flex justify-content-between align-items-center">						
          <div class="flex-grow-1 text-secondary">
  
                      <i class="ti ti-history align-middle" aria-hidden="true"></i> 
                      <strong class="text-capitalize fw-bold mb-0">${headingText}</strong>
                                  
  
          </div> 
      </div>
  
  `;

  const fragment = document.createDocumentFragment();

  for (const page of visitedPages) {
    let truncatedTitle = page.title;
    if (page.title.length > 30) {
      let index = 30;
      while (index < page.title.length && page.title[index] !== ' ') {
        index++;
      }
      truncatedTitle = index !== page.title.length ? page.title.substring(0, index) + '...' : page.title;
    }

    const li = document.createElement('li');
    li.innerHTML = `<a class="dropdown-item py-2 !rounded" href="${page.url}"><i class="ti ti-link align-middle" aria-hidden="true"></i><span class="px-1">${truncatedTitle}</span></a>`;
    fragment.appendChild(li);
  }

  element.appendChild(fragment);

  const divider = document.createElement('li');
  divider.innerHTML = '<hr class="dropdown-divider border-secondary border-opacity-10">';
  element.appendChild(divider);

  const clearHistoryButton = document.createElement('button');

  const buttonTexts = {
    en: 'Clear All',

    ar: 'حذف الكل',
  };

  const buttonText = buttonTexts[htmlLang] || buttonTexts['en'];
  clearHistoryButton.textContent = buttonText;

  clearHistoryButton.classList.add('dropdown-item', 'py-2', 'text-primary');

  clearHistoryButton.setAttribute('type', 'button');

  const icon = document.createElement('i');
  icon.classList.add('ti', 'ti-trash', 'align-middle', 'me-1');

  icon.setAttribute('aria-hidden', 'true');
  clearHistoryButton.prepend(icon);

  clearHistoryButton.addEventListener('click', () => {
    localStorage.removeItem('visitedPages');
    window.location.reload();
  });

  const li = document.createElement('li');
  li.appendChild(clearHistoryButton);
  element.appendChild(li);
};
appendVisitedPages('visited-pages');

const displayGreeting = () => {
  const date = new Date();
  // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  const dayOfWeek = date.getDay();
  let greeting;
  let dayOfWeekGreeting;
  let icon;
  let timeOfDay;

  if (date.getHours() < 12) {
    greeting = `{{locals.greeting_morning}}`;
    icon = '<i class="ti ti-sunrise align-middle fs-6 text-warning"></i>';
    timeOfDay = 'start';
  } else if (date.getHours() < 18) {
    greeting = `{{locals.greeting_afternoon}}`;
    icon = '<i class="ti ti-sun-high align-middle fs-6 text-secondary-subtle"></i>';
    timeOfDay = 'middle';
  } else {
    greeting = `{{locals.greeting_evening}}`;
    icon = '<i class="ti ti-moon align-middle fs-6 text-dark-subtle"></i>';
    timeOfDay = 'end';
  }

  switch (dayOfWeek) {
    case 0:
      dayOfWeekGreeting = `{{locals.day_sunday}}`;
      break;
    case 1:
      dayOfWeekGreeting = `{{locals.day_monday}}`;
      break;
    case 2:
      dayOfWeekGreeting = `{{locals.day_tuesday}}`;
      break;
    case 3:
      dayOfWeekGreeting = `{{locals.day_wednesday}}`;
      break;
    case 4:
      dayOfWeekGreeting = `{{locals.day_thursday}}`;
      break;
    case 5:
      dayOfWeekGreeting = `{{locals.day_friday}}`;
      break;
    case 6:
      dayOfWeekGreeting = `{{locals.day_saturday}}`;
      break;
  }

  let dayGreeting;
  if (timeOfDay === 'start') {
    //dayGreeting = `{{locals.daytime.start}} ${dayOfWeekGreeting} {{locals.greeting_morning_text}}`;
    dayGreeting = navbarGreetingDataTemplate.greeting_morning;
  } else if (timeOfDay === 'middle') {
    //dayGreeting = `{{locals.daytime.middle}} ${dayOfWeekGreeting} {{locals.greeting_afternoon_text}}`;
    dayGreeting = navbarGreetingDataTemplate.greeting_afternoon;
  } else {
    //dayGreeting = `{{locals.daytime.end}} ${dayOfWeekGreeting} {{locals.greeting_evening_text}}`;
    dayGreeting = navbarGreetingDataTemplate.greeting_evening;
  }

  const greetingElements = document.querySelectorAll('.js-user-greeting');
  // greetingElement.innerHTML = icon + ' ' + greeting + ', ' + dayGreeting;
  if (greetingElements.length > 0) {
    greetingElements.forEach((element) => {
      element.innerHTML = icon + ' ' + dayGreeting;
    });
  }
};
displayGreeting();
setInterval(displayGreeting, 3600000);
