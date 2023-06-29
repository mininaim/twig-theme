const confetti = {
  load: async () => {
    await loadConfettiPreset(tsParticles);
    await tsParticles
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
          life: {
            duration: {
              value: 0,
            },
          },
          number: {
            value: 200,
            max: 0,
            density: {
              enable: true,
            },
          },
          move: {
            gravity: {
              enable: false,
            },
            decay: 0,
            direction: 'bottom',
            speed: 2,
            outModes: {
              default: 'out',
              left: 'out',
              right: 'out',
              bottom: 'out',
              top: 'out',
            },
          },
        },

        emitters: [],
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'repulse',
            },
          },
        },
        preset: 'confetti',
      })
      .then((container) => {
        confettiContainer = container;
        confettiContainer.addEmitter({
          position: {
            x: 0,
            y: 0,
          },
          size: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
          startCount: 600,
          rate: {
            delay: 0,
            quantity: 0,
          },
          life: {
            duration: 0.1,
            count: 1,
          },
        });

        setTimeout(() => {
          confettiContainer.destroy();
        }, 3000);
      });
  },
};
//confetti.load();
