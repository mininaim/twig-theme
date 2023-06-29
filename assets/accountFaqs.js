zid.store.page
  .fetchFaq()
  .then((response) => {
    const faqs = response.data.storeFaqs
      .slice(0, Math.max(10, response.data.storeFaqs.length))
      .sort(() => 0.5 - Math.random());

    if (faqs.length > 0) {
      document.querySelector('.js-faqs-container').setAttribute('data-faqs', 'true');
      document.querySelector('.js-faqs-container').classList.remove('d-none');
    }

    const faqsList = document.querySelector('.js-faqs-list');
    faqsList.innerHTML = '';

    const htmlLang = document.querySelector('html').getAttribute('lang');

    let noQuestionsMessage;
    switch (htmlLang) {
      case 'en':
        noQuestionsMessage = 'No questions were found.';
        break;
      default:
        noQuestionsMessage = 'لا توجد أسئلة شائعة حتى الآن.';
        isRtl = true;
    }

    if (faqs.length === 0) {
      faqsList.innerHTML = `<p>${noQuestionsMessage}</p>`;
    } else {
      for (const faq of faqs) {
        const faqItem = document.createElement('a');
        faqItem.classList.add(
          'list-group-item',
          'list-group-item-action',
          'link-secondary',
          'd-flex',
          'justify-content-between',
          'align-items-center',
        );
        faqItem.setAttribute('href', `/faqs#heading${faq.id}`);
        faqItem.innerHTML = `
          <span>
            <i class="ti ti-bookmark align-middle fs-5" aria-hidden="true"></i>
            <span class="px-1">${faq.question}</span>
          </span>
          <i class="ti ti-external-link fs-6" aria-hidden="true"></i>
        `;
        faqsList.appendChild(faqItem);
      }
    }

    if (response.status !== 'success') {
      faqsList.innerHTML = '<p>An error occurred while fetching the FAQs.</p>';
    }
  })

  .catch((error) => {
    console.error(error);
  });
