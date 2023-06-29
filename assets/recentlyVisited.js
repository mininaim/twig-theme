const saveLastPages = () => {
  let visitedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];

  const currentUrl = new URL(window.location.href);

  let title = '';

  if (currentUrl.pathname.indexOf('/products/') !== -1) {
    const parts = currentUrl.pathname.split('/products/');

    title = parts[1];
  } else {
    title = currentUrl.pathname;
  }

  title = decodeURIComponent(title);
  title = title.replace(/-/g, ' ');

  const existingPage = visitedPages.find((page) => page.url === currentUrl.pathname);

  if (existingPage) {
    visitedPages = visitedPages.filter((page) => page.url !== currentUrl.pathname);
  }

  visitedPages.unshift({ url: currentUrl.pathname, title });

  visitedPages = visitedPages.slice(0, 6);

  localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
};

saveLastPages();
