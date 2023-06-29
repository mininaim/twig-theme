const handleAccordion = (headingId) => {
  const collapseId = headingId.replace('heading', '');

  const h2 = document.querySelector(`h2#${headingId}`);

  const accordionButton = h2 ? h2.querySelector('button.accordion-button') : null;

  if (accordionButton) {
    accordionButton.classList.remove('collapsed');
    accordionButton.setAttribute('aria-expanded', 'true');
  }

  const element = document.querySelector(`#collapse${collapseId}`);

  if (element !== null) {
    element.classList.add('show');
    element.classList.add('bg-primary', 'bg-opacity-10', 'animate__animated', 'animate__fadeIn');

    setTimeout(() => {
      element.classList.remove('bg-primary', 'bg-opacity-10', 'animate__animated', 'animate__fadeIn');
    }, 2000);
  }
};

const handleAccordions = () => {
  let headingIds = location.hash === '' ? [] : location.hash.substr(1).split('#');

  for (const headingId of headingIds) {
    handleAccordion(headingId);
  }
};

window.addEventListener('load', handleAccordions);
