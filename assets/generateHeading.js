const searchParams = new URLSearchParams(window.location.search);
const search = searchParams.get('search');

const productsSearchText = productsDataHeadingTemplate.products_search_text;
const productsHeading = productsDataHeadingTemplate.products_heading;

const searchResults = search ? `${productsSearchText} ${search}` : productsHeading;

const heading = document.createElement('h1');
heading.classList.add('h2');
heading.textContent = searchResults;

const pageHeading = document.querySelector('.js-page-heading');
pageHeading.appendChild(heading);
