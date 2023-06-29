const qrCode = () => {
  const qrCode = document.getElementById('qrCode');
  if (!qrCode) return;

  qrCode.addEventListener('click', () => {
    const qr = new QRious({
      element: document.getElementById('qrCode'),
      value: window.location.href,
      size: '200',
      level: 'M',
      padding: null,
      mime: 'image/png',
      foreground: getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
    });

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('fade');
    modal.setAttribute('id', 'qrCodeModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'qrCodeModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    let downloadText = '';
    if (document.documentElement.lang === 'en') {
      downloadText = 'Download Image';
      qrCodeText = 'QR Code';
    } else {
      downloadText = 'تحميل الصورة';
      qrCodeText = 'رمز QR';
    }
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0">
          <div class="modal-header border-secondary border-opacity-10">
            <h5 class="modal-title" id="qrCodeModalLabel">${qrCodeText}</h5>

            <button type="button" class="btn-none p-0 text-body-emphasis grow" data-bs-dismiss="modal" aria-label="Close">
              <i class="ti ti-x align-middle fs-5" aria-hidden="true"></i>
            </button>
            </div>
 
          <div class="modal-body d-flex justify-content-center animate__animated animate__fadeIn">
            <img src="${qr.toDataURL()}" alt="${qrCodeText}" class="rounded bg-primary p-1 css-mode-toggle"> 
          </div>
          <div class="modal-footer border-secondary border-opacity-10 my-0 bg-secondary-subtle">


          <button type="button" class="btn btn-primary mx-auto animate__animated animate__fadeIn animate__slow js-qrcode-download">
           <i class="ti ti-download align-middle" aria-hidden="true"></i> 
            <span class="px-1">${downloadText}</span>
          </button>
          </div>

        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const qrCodeModal = new bootstrap.Modal(modal);
    qrCodeModal.show();

    modal.addEventListener('hidden.bs.modal', () => {
      modal.remove();
    });

    if (qrCode.src) {
      qrCode.src = qr.toDataURL();
      //console.log('QR code generated');
    }

    const download = () => {
      const link = document.createElement('a');
      const domain = window.location.href.split('/')[2];
      link.download = `${domain}-qr-${Date.now()}.png`;
      link.href = qr.toDataURL();
      link.click();

      if (navigator.share) {
        navigator.share({
          title: 'QR Code',
          text: 'QR Code',
          url: qr.toDataURL(),
        });

        return;
      }
    };

    const downloadBtn = document.querySelector('.js-qrcode-download');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        download();
      });
    }
  });
};

qrCode();
