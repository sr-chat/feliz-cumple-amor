document.addEventListener('DOMContentLoaded', () => {
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const letterWrapper = document.getElementById('letterWrapper');
  const openBtn = document.getElementById('openBtn');
  const openBtnAction = document.getElementById('openBtnAction');
  
  const cakeContainer = document.getElementById('cakeContainer');
  const flame = document.getElementById('flame');
  const cakeHint = document.getElementById('cakeHint');
  
  const confettiBtn = document.getElementById('confettiBtn');
  const goodnightBtn = document.getElementById('goodnightBtn');
  const loveBtn = document.getElementById('loveBtn');
  
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const musicToggle = document.getElementById('musicToggle');
  const floatingBg = document.getElementById('floatingBg');
  const bgMusic = document.getElementById('bgMusic');

  let candleBlown = false;

  // Fondo animado
  const particleIcons = ['🌸', '💖', '✨', '🎂', '🎈', '🍰', '💕', '🌷', '⭐️'];
  
  function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-item';
    particle.textContent = particleIcons[Math.floor(Math.random() * particleIcons.length)];
    
    const leftPos = Math.random() * 100;
    const duration = 6 + Math.random() * 6;
    const size = 18 + Math.random() * 16;
    
    particle.style.left = `${leftPos}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.fontSize = `${size}px`;
    
    floatingBg.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingParticle, i * 400);
  }
  setInterval(createFloatingParticle, 1200);

  // Reproductor de música
  function startMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.75;
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
      musicToggle.querySelector('.music-text').textContent = 'Pausar ⏸️';
    }).catch(() => {
      // Si el navegador requiere interacción adicional
    });
  }

  function pauseMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    musicToggle.classList.remove('playing');
    musicToggle.querySelector('.music-text').textContent = 'Música 🎵';
  }

  function toggleMusic() {
    if (!bgMusic) return;
    if (bgMusic.paused) {
      startMusic();
    } else {
      pauseMusic();
    }
  }

  musicToggle.addEventListener('click', toggleMusic);

  // Abrir carta
  function openLetter() {
    triggerBigConfetti();
    startMusic();

    envelopeWrapper.classList.add('fade-out');
    setTimeout(() => {
      envelopeWrapper.style.display = 'none';
      letterWrapper.classList.remove('hidden');
    }, 500);
  }

  openBtn.addEventListener('click', openLetter);
  openBtnAction.addEventListener('click', openLetter);

  // Efecto confeti
  function triggerBigConfetti() {
    if (typeof confetti !== 'function') return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ffffff']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#f43f5e', '#fda4af', '#ffd166']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#f43f5e', '#fda4af', '#ffd166']
      });
    }, 250);
  }

  confettiBtn.addEventListener('click', triggerBigConfetti);

  // Pastel
  cakeContainer.addEventListener('click', () => {
    if (!candleBlown) {
      flame.classList.add('blown-out');
      candleBlown = true;
      cakeHint.textContent = '✨ ¡Deseo pedido con éxito! 💖 ✨';
      cakeHint.style.background = 'rgba(245, 158, 11, 0.2)';
      cakeHint.style.color = '#d97706';

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 },
          shapes: ['star', 'circle'],
          colors: ['#f59e0b', '#ffd166', '#f43f5e', '#ffffff']
        });
      }
    } else {
      flame.classList.remove('blown-out');
      candleBlown = false;
      cakeHint.textContent = '✨ ¡Toca el pastel para soplar la velita! ✨';
      cakeHint.style.background = 'rgba(253, 164, 175, 0.25)';
      cakeHint.style.color = 'var(--primary)';
    }
  });

  // Botón Te adoro
  loveBtn.addEventListener('click', () => {
    const rect = loveBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top;

    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.textContent = ['💖', '💕', '❤️', '🥰', '✨'][Math.floor(Math.random() * 5)];
      heart.style.position = 'fixed';
      heart.style.left = `${btnCenterX + (Math.random() * 80 - 40)}px`;
      heart.style.top = `${btnCenterY}px`;
      heart.style.fontSize = `${20 + Math.random() * 14}px`;
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '999';
      heart.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${(Math.random() - 0.5) * 130}px, -${110 + Math.random() * 130}px) scale(1.4)`;
        heart.style.opacity = '0';
      });

      setTimeout(() => heart.remove(), 1200);
    }
  });

  // Modal buenas noches
  goodnightBtn.addEventListener('click', () => {
    modalBackdrop.classList.remove('hidden');
  });

  modalCloseBtn.addEventListener('click', () => {
    modalBackdrop.classList.add('hidden');
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.add('hidden');
    }
  });
});
