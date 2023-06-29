loadConfettiPreset(tsParticles);

let confettiContainer;
const partyBtns = document.querySelectorAll('.js-icon-confetti');
const getprimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();

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
        value: [getprimaryColor],
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
        value: 3,
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

partyBtns.forEach((partyBtn) => {
  partyBtn.addEventListener('click', () => {
    const cardElement = partyBtn.closest('.card');
    confettiContainer.addEmitter({
      position: {
        x: cardElement.offsetLeft + cardElement.offsetWidth / 2,
        y: cardElement.offsetTop + cardElement.offsetHeight / 2,
      },
      size: {
        width: cardElement.offsetWidth,
        height: cardElement.offsetHeight,
      },
      startCount: 20,
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
});
