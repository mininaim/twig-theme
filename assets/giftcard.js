document.addEventListener('DOMContentLoaded', function () {
  const customCardsTemplates = Array.from(custom_cards_templates);
  //console.log(customCardsTemplates);
  const resetButton = document.getElementById('resetButton');
  if (resetButton) {
    resetButton.addEventListener('click', function () {
      const form = document.querySelector('.needs-validation');
      if (form) {
        const senderNameInput = document.getElementById('senderName');
        const receiverNameInput = document.getElementById('receiverName');
        const inputFields = form.querySelectorAll('input:not([type="radio"]), textarea');

        inputFields.forEach((input) => {
          if (input !== senderNameInput && input !== receiverNameInput) {
            input.value = '';
          }
        });

        const remainingCount = document.querySelector('.js-text-remaining-count');
        if (remainingCount) {
          const maxLength = parseInt(remainingCount.dataset.maxlength) || 200;
          remainingCount.textContent = maxLength;
        }

        const radioButtons = form.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radioButton) => {
          radioButton.checked = false;
        });

        const labels = form.querySelectorAll('.card-design label');
        labels.forEach((label) => {
          label.classList.remove('active');
        });

        const defaultCardTemplate = custom_cards_templates[0].file;
        updateCardPreview(defaultCardTemplate);

        const firstRadioButton = form.querySelector('.card-design input[type="radio"]');
        if (firstRadioButton) {
          firstRadioButton.checked = true;
          const firstLabel = form.querySelector('.card-design label[for="' + firstRadioButton.id + '"]');
          if (firstLabel) {
            firstLabel.classList.add('active');
          }
        }
      }
    });
  }

  // Retrieve form elements
  const senderNameInput = document.getElementById('senderName');
  const receiverNameInput = document.getElementById('receiverName');
  const mediaLinkInput = document.getElementById('mediaLink');
  const giftMessageInput = document.getElementById('giftMessage');
  const emojiPickerBtnHeart = document.getElementById('emojiPickerBtnHeart');
  const emojiPickerBtnSmile = document.getElementById('emojiPickerBtnSmile');
  const emojiPickerBtnCool = document.getElementById('emojiPickerBtnCool');
  const emojiPickerBtnGift = document.getElementById('emojiPickerBtnGift');

  const cardPreview = document.querySelector('.js-card-preview');

  // Initialize Twemoji
  if (giftMessageInput) {
    twemoji.parse(giftMessageInput, {
      folder: 'svg',
      ext: '.svg',
      className: 'emoji',
    });
  }

  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group d-flex flex-lg-wrap justify-content-lg-center overflow-auto animated slideIn';
  btnGroup.setAttribute('style', 'max-width: 100vw;');

  btnGroup.setAttribute('role', 'group');
  btnGroup.setAttribute('aria-label', 'Basic radio toggle button group');

  customCardsTemplates.forEach((cardTemplate, index) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.className = 'btn-check';
    input.name = 'btnradio';
    input.value = cardTemplate.file;
    input.id = `btnradio-${index}`;
    input.autocomplete = 'off';

    const label = document.createElement('label');
    label.className = 'd-flex flex-column align-items-center !flex-fill btn btn-outline-primary';
    label.setAttribute('for', `btnradio-${index}`);
    label.textContent = cardTemplate.name;

    const icon = document.createElement('img');
    icon.src = cardTemplate.file;
    icon.alt = cardTemplate.name;
    icon.className = 'rounded-circle border border-primary-subtle shadow border-opacity-25 m-2 object-fit-cover';
    icon.style.width = '60px';
    icon.style.height = '60px';

    label.prepend(icon);

    // If user didn't select any card, select the first one and add 'active' class to it
    if (index === 0 && !selected_card_template) {
      input.checked = true;
      // console.log(input.id + ' checked status: ' + input.checked);
      label.classList.add('active');
      updateCardPreview(cardTemplate.file);
    } else if (selected_card_template && cardTemplate.file === selected_card_template.file) {
      input.checked = true;
      // console.log(input.id + ' checked status next: ' + input.checked);
      label.classList.add('active');
      updateCardPreview(cardTemplate.file);
    }

    // Add event listener to update card preview on radio button change
    input.addEventListener('change', function () {
      updateCardPreview(cardTemplate.file);

      // Remove the 'active' class from all labels
      customCardsTemplates.forEach((card, i) => {
        const label = document.querySelector(`label[for="btnradio-${i}"]`);
        label.classList.remove('active');
      });

      // Add the 'active' class to the selected label
      label.classList.add('active');
    });

    btnGroup.appendChild(input);
    btnGroup.appendChild(label);
  });

  const cardsTemplate = document.getElementById(hasCardDesign === 1 ? 'cardsTemplate' : 'cardsTemplateNoCard');
  cardsTemplate.appendChild(btnGroup);

  // Update card preview function
  function updateCardPreview(imageUrl) {
    const senderName = senderNameInput.value;
    const receiverName = receiverNameInput.value;
    const mediaLink = mediaLinkInput ? mediaLinkInput.value : '';
    const giftMessage = giftMessageInput ? giftMessageInput.value : '';

    const lang = document.documentElement.lang;

    // Language-specific translations
    const translations = {
      en: {
        senderLabel: 'Sender',
        receiverLabel: 'Receiver',
        mediaLabel: 'Video/Audio',
        messageLabel: 'Message',
        placeholderText: 'No custom card design',
      },
      ar: {
        senderLabel: 'المرسل',
        receiverLabel: 'المستلم',
        mediaLabel: 'فيديو/صوت',
        messageLabel: 'الرسالة',
        placeholderText: 'لا يوجد تصميم مخصص للبطاقة',
      },
    };

    const translation = translations[lang] || translations.en;

    // Create the card preview HTML
    const placeholderText = translation.placeholderText;
    const placeholderSvg = `<svg class="placeholder-img img-fluid rounded w-100 logo-100 text-primary" width="320" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${placeholderText}" preserveaspectratio="xMidYMid slice" focusable="false"><title>${placeholderText}</title><rect width="100%" height="100%" fill="currentColor"></rect><text x="50%" y="50%" fill="#fff" dy=".3em">${placeholderText}</text></svg>`;

    const imageContent = hasCardDesign
      ? `<img src="${imageUrl}" class="position-relative !grow css-envelope-image" alt="">`
      : placeholderSvg;

    const mediaLinkPlatforms = {
      youtube: 'ti-brand-youtube',
      tiktok: 'ti-brand-tiktok',
      instagram: 'ti-brand-instagram',
      snapchat: 'ti-brand-snapchat',
      facebook: 'ti-brand-facebook',
      mp4: 'ti-volume',
    };

    const getPlatformIcon = (platform) => {
      if (platform in mediaLinkPlatforms) {
        return `<i class="ti ${mediaLinkPlatforms[platform]} align-middle px-1" aria-hidden="true"></i>`;
      }
      return '<i class="ti ti-world align-middle px-1" aria-hidden="true"></i>';
    };

    const extractPlatformFromLink = (link) => {
      if (link.includes('youtube.com')) {
        return 'youtube';
      } else if (link.includes('tiktok.com')) {
        return 'tiktok';
      } else if (link.includes('instagram.com')) {
        return 'instagram';
      } else if (link.includes('snapchat.com')) {
        return 'snapchat';
      } else if (link.includes('facebook.com')) {
        return 'facebook';
      } else if (link.endsWith('.mp4')) {
        return 'mp4';
      }
      return null;
    };

    const platform = extractPlatformFromLink(mediaLink);
    const mediaLinkContent = `
      <div class="list-group-item d-flex justify-content-start align-items-start gap-2">
      <span class="badge bg-primary text-primary bg-opacity-10 rounded-pill">
      ${getPlatformIcon(platform)} 
      ${translation.mediaLabel}</span>
      
      <a class="text-body-secondary small text-${
        document.documentElement.lang === 'ar' ? 'end' : 'start'
      } text-truncate ${
      document.documentElement.lang === 'ar' ? 'ltr' : ''
    }" href="${mediaLink}" target="_blank" rel="noopener noreferrer">
        ${mediaLink}
      </a>
    </div>
  `;

    const cardHTML = `
      <div class="card-body rounded css-envelope">
        <div class="css-envelope-flap"></div>
        <div class="p-2 position-relative" data-tilt data-tilt-scale="1.1">
          ${imageContent}
          <div class="list-group mt-3">
            <div class="list-group-item d-flex justify-content-start align-items-start gap-2">
            <span class="badge bg-primary text-primary bg-opacity-10 rounded-pill">
            <i class="ti ti-user-down align-middle px-1" aria-hidden="true"></i>
            ${translation.senderLabel}</span> <span class="text-body-secondary small">${senderName}</span></div>
            <div class="list-group-item d-flex justify-content-start align-items-start gap-2">
            <span class="badge bg-primary text-primary bg-opacity-10 rounded-pill">
            <i class="ti ti-user-pin align-middle px-1" aria-hidden="true"></i> ${
              translation.receiverLabel
            }</span> <span class="text-body-secondary small">${receiverName}</span></div>
            ${mediaLink ? mediaLinkContent : ''}
            ${
              giftMessage
                ? `<div class="list-group-item d-flex justify-content-start align-items-start gap-2 overflow-auto" style="max-height: 260px">
                <span class="badge bg-primary text-primary bg-opacity-10 rounded-pill">
      <i class="ti ti-message-dots align-middle px-1" aria-hidden="true"></i> ${translation.messageLabel}</span>
      <span class="text-body-secondary small">${giftMessage}</span></div>`
                : ''
            }
          </div>
        </div>
      </div>
    `;

    // Update the card preview with the generated HTML
    cardPreview.innerHTML = cardHTML;

    // add a check first
    if (giftMessage && cardPreview.contains(giftMessageInput)) {
      twemoji.parse(cardPreview, {
        folder: 'svg',
        ext: '.svg',
        className: 'emoji',
      });
    }
  }

  // Handle emoji selection from the emoji picker
  const insertEmoji = (emoji) => {
    const textarea = giftMessageInput;
    const range = textarea.selectionStart;
    const oldValue = textarea.value;

    const newValue = `${oldValue.substring(0, range)}${emoji} ${oldValue.substring(range)}`;

    textarea.value = newValue;

    const newRange = range + emoji.length + 1;
    textarea.setSelectionRange(newRange, newRange);

    textarea.dispatchEvent(new Event('input'));

    textarea.focus();
  };

  if (giftMessageInput) {
    emojiPickerBtnHeart.addEventListener('click', function () {
      insertEmoji('❤️');
    });
  }

  if (giftMessageInput) {
    emojiPickerBtnSmile.addEventListener('click', function () {
      insertEmoji('😀');
    });
  }

  if (giftMessageInput) {
    emojiPickerBtnCool.addEventListener('click', function () {
      insertEmoji('😍');
    });
  }

  if (giftMessageInput) {
    emojiPickerBtnGift.addEventListener('click', function () {
      insertEmoji('🎉');
    });
  }

  // Add event listeners to update card preview on input change
  senderNameInput.addEventListener(
    'input',
    throttle(function () {
      const selectedImage = document.querySelector('input[name="btnradio"]:checked').value;
      updateCardPreview(selectedImage);
    }, 300),
  );

  receiverNameInput.addEventListener(
    'input',
    throttle(function () {
      const selectedImage = document.querySelector('input[name="btnradio"]:checked').value;
      updateCardPreview(selectedImage);
    }, 300),
  );

  if (mediaLinkInput) {
    mediaLinkInput.addEventListener(
      'input',
      throttle(function () {
        const selectedImage = document.querySelector('input[name="btnradio"]:checked').value;
        updateCardPreview(selectedImage);
      }, 300),
    );
  }

  if (giftMessageInput) {
    giftMessageInput.addEventListener(
      'input',
      throttle(function () {
        const selectedImage = document.querySelector('input[name="btnradio"]:checked').value;
        updateCardPreview(selectedImage);
      }, 300),
    );
  }
});

function limitTextarea() {
  const textarea = document.getElementById('giftMessage');
  const maxLength = 200;
  const remainingCount = document.querySelector('.js-text-remaining-count');

  textarea.addEventListener('input', function () {
    const currentLength = textarea.value.length;
    const remainingLength = maxLength - currentLength;

    remainingCount.textContent = remainingLength;

    if (remainingLength < 0) {
      textarea.value = textarea.value.slice(0, maxLength);
      remainingCount.textContent = 0;
    }
  });
}

// Call the function to enable character limit
if (document.getElementById('giftMessage')) {
  limitTextarea();
}

function validateGiftMessage() {
  const giftMessageTextarea = document.getElementById('giftMessage');
  const giftMessageValue = giftMessageTextarea.value;
  const sanitizedValue = escapeHtml(giftMessageValue);
  giftMessageTextarea.value = sanitizedValue;
}

function escapeHtml(html) {
  const textArea = document.createElement('textarea');
  textArea.textContent = html;
  return textArea.innerHTML;
}

const giftMessageTextarea = document.getElementById('giftMessage');
if (giftMessageTextarea) {
  giftMessageTextarea.addEventListener('input', validateGiftMessage);
}

function validateURL(input) {
  const value = input.value.trim();
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  if (value === '' || urlPattern.test(value)) {
    input.setCustomValidity('');
  } else {
    input.setCustomValidity('Please enter a valid URL starting with http:// or https://');
  }
}

// Cache frequently accessed DOM elements
const senderNameInput = document.getElementById('senderName');
const receiverNameInput = document.getElementById('receiverName');
const mediaLinkInput = document.getElementById('mediaLink');
const giftMessageInput = document.getElementById('giftMessage');
//const cardDesignInput = document.querySelector('.card-design input[type="radio"]:checked');
//const cardDesignInput = document.querySelector('.card-design .btn-check[name="btnradio"]:checked');

//const cardDesignInput = document.querySelector('.btn-group input[type="radio"]:checked');
//console.log(cardDesignInput);

const form = document.querySelector('form.needs-validation');

const saveButton = document.getElementById('saveButton');
if (saveButton) {
  saveButton.addEventListener('click', saveFormCard);
}

function saveFormCard(event) {
  event.preventDefault();
  event.stopPropagation();

  if (!senderNameInput.value.trim()) {
    senderNameInput.classList.add('is-invalid');
    senderNameInput.nextElementSibling.style.display = 'block';
    return;
  } else {
    senderNameInput.classList.remove('is-invalid');
    senderNameInput.nextElementSibling.style.display = 'none';
  }

  if (!receiverNameInput.value.trim()) {
    receiverNameInput.classList.add('is-invalid');
    receiverNameInput.nextElementSibling.style.display = 'block';
    return;
  } else {
    receiverNameInput.classList.remove('is-invalid');
    receiverNameInput.nextElementSibling.style.display = 'none';
  }

  // Add your additional validation logic here if needed

  // If all required fields are filled, submit the form
  if (form.checkValidity()) {
    const activeLabel = document.querySelector('.card-design .btn-group label.active');

    let cardDesign = null;

    if (activeLabel) {
      // Get the id of the related radio input from the for attribute of the label
      const radioId = activeLabel.getAttribute('for');

      // Use the id to get the radio input
      const activeRadioInput = document.getElementById(radioId);

      // Get the value and id from the radio input
      const value = activeRadioInput.value;

      // get the text from the label
      const name = activeLabel.textContent;

      cardDesign = {
        name: name || '',
        file: value || '',
      };
    }

    const payload = {
      sender_name: senderNameInput.value.trim(),
      receiver_name: receiverNameInput.value.trim(),
      media_link: mediaLinkInput ? mediaLinkInput.value.trim() : '',
      gift_message:
        giftMessageInput && giftMessageInput.value.trim() !== ''
          ? decodeURIComponent(giftMessageInput.value.trim())
          : null,
      card_design: cardDesign ? JSON.stringify(cardDesign) : null,
    };

    // Submit the form data
    submitGiftCard(payload);
  } else {
    //console.log('Form validation failed.');

    // Report validation errors
    form.reportValidity();
  }

  form.classList.add('was-validated');
}

// Throttle utility function
function throttle(func, delay) {
  let timeoutId;
  return function () {
    if (!timeoutId) {
      timeoutId = setTimeout(function () {
        func();
        timeoutId = null;
      }, delay);
    }
  };
}

const showToast = (message) => {
  const toast = document.querySelector('.js-toast');
  // console.log('toast', toast);
  const toastBody = document.querySelector('.js-toast-message');
  //console.log('toastBody', toastBody);

  toastBody.textContent = message;

  // add z-index !important to toast
  toast.style.setProperty('z-index', '9999', 'important');

  // add class show to toast
  toast.classList.add('show');

  //toast.classList.remove('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
};

async function submitGiftCard(payload) {
  try {
    const response = await zid.store.cart.submitGiftCard({ giftInfo: payload });
    if (response.status === 'success') {
      let message = form_locales.success;

      //console.log('About to call showToast');
      showToast(message);

      window.location.reload();
    } else {
      const errorMessage = `${form_locales.sorry}\n${response.data.message}`;
      //console.error(errorMessage);
      showToast(errorMessage);
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const deleteButton = document.getElementById('deleteCardDesign');
  if (deleteButton) {
    deleteButton.addEventListener('click', removeGiftCard);
  }
});

async function removeGiftCard() {
  try {
    const response = await zid.store.cart.removeGiftCard();
    if (response.status === 'success') {
      let message;
      if (document.documentElement.lang === 'ar') {
        message = 'تم حذف الإهداء بنجاح';
      } else {
        message = 'Gift has been deleted successfully';
      }
      //alert(message);
      showToast(message);
      window.location.reload();
    } else {
      if (response.data && response.data.message) {
        alert(`${form_locales.sorry}\n${response.data.message}`);
      } else {
        alert(`${form_locales.sorry}\nAn error occurred while removing the Gift Card`);
      }
    }
  } catch (err) {
    console.error(err);
    alert(`${form_locales.sorry}\nAn error occurred while removing the Gift Card`);
  }
}

const showContentAfterDelay = (offcanvasSelector, spinnerSelector, contentSelector, delay) => {
  const offcanvas = document.querySelector(offcanvasSelector);
  const spinner = offcanvas.querySelector(spinnerSelector);
  const content = offcanvas.querySelector(contentSelector);
  if (offcanvas && spinner && content) {
    offcanvas.addEventListener('shown.bs.offcanvas', function () {
      setTimeout(() => {
        spinner.style.display = 'none';
        content.removeAttribute('hidden');
      }, delay);
    });
  }
};

showContentAfterDelay('#offcanvasGiftCard', '.js-cart-gift-card-spinner', '.js-cart-gift-card-template', 1000);
showContentAfterDelay(
  '#offcanvasGiftCard',
  '.js-cart-gift-card-footer-spinner',
  '.js-cart-gift-card-footer-template',
  1000,
);

/*
 * Initializes a Bootstrap popover on the element with id
 */

// window.onload = function () {
//   const popoverTriggerEl = document.querySelector('#js-gift-card-popover');

//   if (popoverTriggerEl) {
//     const popover = new bootstrap.Popover(popoverTriggerEl);
//     let isPopoverHovered = false;

//     popoverTriggerEl.addEventListener('mouseenter', () => {
//       popover.show();
//     });

//     popoverTriggerEl.addEventListener('mouseleave', () => {
//       setTimeout(() => {
//         if (!isPopoverHovered) {
//           popover.hide();
//         }
//       }, 300);
//     });

//     document.addEventListener('shown.bs.popover', () => {
//       const popoverEl = document.querySelector('.popover');
//       if (popoverEl) {
//         popoverEl.addEventListener('mouseenter', () => {
//           isPopoverHovered = true;
//         });

//         popoverEl.addEventListener('mouseleave', () => {
//           isPopoverHovered = false;
//           popover.hide();
//         });
//       }
//     });

//     document.addEventListener('hide.bs.popover', () => {
//       isPopoverHovered = false;
//     });

//     setTimeout(() => {
//       popover.show();
//     }, 3000);
//   } else {
//     //console.log("Element not found");
//   }
// };

// (function () {
//   const listenButton = document.getElementById('listenButton');
//   const recordButton = document.getElementById('recordButton');
//   const giftMessageTextarea = document.getElementById('giftMessage');
//   let isRecording = false;
//   let recordedText = '';

//   if (listenButton && recordButton && giftMessageTextarea) {
//     listenButton.addEventListener('click', function () {
//       if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
//         const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

//         const rootLanguage = document.documentElement.lang || 'en-US';

//         recognition.lang = rootLanguage;

//         recognition.onresult = function (event) {
//           const result = event.results[event.resultIndex];
//           const spokenText = result[0].transcript;

//           giftMessageTextarea.value = spokenText;
//           convertTextToSpeech(spokenText);
//         };

//         recognition.start();
//       } else {
//         console.error('Speech recognition is not supported in this browser');
//       }
//     });

//     recordButton.addEventListener('click', function () {
//       if (!isRecording) {
//         isRecording = true;
//         recordedText = '';

//         recordButton.classList.add('vibrate');
//       } else {
//         isRecording = false;

//         recordButton.classList.remove('vibrate');

//         giftMessageTextarea.value = recordedText;
//         convertTextToSpeech(recordedText);
//       }
//     });

//     recordButton.addEventListener('transitionend', function () {
//       if (isRecording) {
//         recordButton.classList.add('vibrate');
//       }
//     });

//     listenButton.addEventListener('click', function () {
//       if (!isRecording) {
//       }
//     });
//   }

//   function convertTextToSpeech(text) {
//     if ('speechSynthesis' in window) {
//       const speechUtterance = new SpeechSynthesisUtterance(text);

//       const rootLanguage = document.documentElement.lang || 'en-US';

//       speechUtterance.lang = rootLanguage;

//       speechSynthesis.speak(speechUtterance);
//     } else {
//       console.error('Speech synthesis is not supported in this browser');
//     }
//   }
// })();
