loadConfettiPreset(tsParticles);

let confettiContainer;
const partyBtn = document.querySelector('.js-icon-confetti');

tsParticles
  .load('tsparticles', {
    preset: 'confetti',
    emitters: [],
    fpsLimit: 30,
    particles: {
      number: {
        value: 0,
        density: {
          enable: true,
          area: 400,
        },
      },
      color: {
        value: [
          '#FF3366',
          '#FF6699',
          '#FF99CC',
          '#FFCCFF',
          '#CC33FF',
          '#9933FF',
          '#6600CC',
          '#0000FF',
          '#00CCFF',
          '#00FFFF',
          '#00FF00',
          '#CCFF00',
          '#FFFF00',
          '#FFCC00',
          '#FF9900',
          '#FF6600',
          '#FF0000',
        ],
      },

      shape: {
        type: 'edge',
      },
      opacity: {
        value: 1,
        random: false,
        animation: {
          enable: false,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: 6,
        random: {
          enable: true,
          minimumValue: 0.1,
        },
        animation: {
          enable: false,
          speed: 40,
          minimumValue: 0.1,
          sync: false,
        },
      },
      links: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        random: false,
        straight: false,
        outMode: 'out',
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
  })
  .then((container) => (confettiContainer = container));

partyBtn.addEventListener('click', () => {
  const cardElement = partyBtn.closest('body');
  confettiContainer.addEmitter({
    position: {
      x: cardElement.offsetLeft + cardElement.offsetWidth / 2,
      y: cardElement.offsetTop + cardElement.offsetHeight / 2,
    },
    size: {
      width: cardElement.offsetWidth,
      height: cardElement.offsetHeight,
    },
    startCount: 200,
    rate: {
      delay: 0,
      quantity: 0,
    },
    life: {
      duration: 0.1,
      count: 1,
    },
  });
});
