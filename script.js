document.addEventListener('DOMContentLoaded', () => {
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const letterWrapper = document.getElementById('letterWrapper');
  const openBtn = document.getElementById('openBtn');
  const openBtnAction = document.getElementById('openBtnAction');
  
  const cakeContainer = document.getElementById('cakeContainer');
  const flame = document.getElementById('flame');
  const cakeHint = document.getElementById('cakeHint');
  
  const confettiBtn = document.getElementById('confettiBtn');
  const loveBtn = document.getElementById('loveBtn');
  
  const secretBtn = document.getElementById('secretBtn');
  const reasonsBtn = document.getElementById('reasonsBtn');
  const promisesBtn = document.getElementById('promisesBtn');
  
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCardContent = document.getElementById('modalCardContent');
  const musicToggle = document.getElementById('musicToggle');
  const floatingBg = document.getElementById('floatingBg');
  const bgMusic = document.getElementById('bgMusic');

  let candleBlown = false;

  // Fondo de partículas flotantes
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

  // Reproductor de música (volumen suave)
  function startMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.22;
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
      musicToggle.querySelector('.music-text').textContent = 'Pausar ⏸️';
    }).catch(() => {});
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

  // Confeti
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
      cakeHint.textContent = '✨ ¡Deseo pedido mi amor! 💖 ✨';
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

  // Botón Te adoro (Lluvia de corazones garantizada)
  loveBtn.addEventListener('click', () => {
    const rect = loveBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top;

    const heartEmojis = ['💖', '💕', '❤️', '🥰', '✨', '🌹'];
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('span');
      heart.className = 'heart-burst';
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      
      const dx = (Math.random() - 0.5) * 180;
      const dy = -(90 + Math.random() * 120);
      const rot = (Math.random() - 0.5) * 60;
      
      heart.style.left = `${btnCenterX - 14}px`;
      heart.style.top = `${btnCenterY - 14}px`;
      heart.style.fontSize = `${24 + Math.random() * 14}px`;
      heart.style.setProperty('--dx', `${dx}px`);
      heart.style.setProperty('--dy', `${dy}px`);
      heart.style.setProperty('--rot', `${rot}deg`);
      
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1250);
    }
  });

  // MODALES INTERACTIVOS (Opciones 1, 2 y 3)

  // 1. Mensajito Secreto
  secretBtn.addEventListener('click', () => {
    modalCardContent.innerHTML = `
      <div class="modal-icon">💌✨</div>
      <h3>Un deseo para ti mi amor</h3>
      <div class="modal-desc">
        Para este nuevo año de vida, solo te deseo cosas buenas. Deseo que cumplas cada meta y sueño que tengas en mente, que nunca pierdas esa forma tan linda que tienes de ser y que siempre te sientas querida y tranquila. Sabes que aquí voy a estar contigo para apoyarte, escucharte y acompañarte en todo. Te mereces ser muy feliz hoy y todos los días de tu vida, mi cielo ❤️
      </div>
      <button class="modal-close-btn" id="modalCloseBtn">Guardar en el corazón ❤️</button>
    `;
    setupCloseModal();
    modalBackdrop.classList.remove('hidden');
  });

  // 2. Razones por las que te quiero (Interactivo)
  const reasonsList = [
    "Por cómo me alegras el día con cualquier mensaje tuyo.",
    "Por tus ocurrencias y por hacerme reír siempre.",
    "Por ser tan linda y atenta conmigo en todo momento.",
    "Por la confianza tan bonita que tenemos para hablar de lo que sea.",
    "Porque simplemente siendo tú, haces que todo sea mucho mejor."
  ];
  let currentReasonIdx = 0;

  reasonsBtn.addEventListener('click', () => {
    currentReasonIdx = 0;
    renderReasonModal();
    modalBackdrop.classList.remove('hidden');
  });

  function renderReasonModal() {
    modalCardContent.innerHTML = `
      <div class="modal-icon">⭐💖</div>
      <h3>Cosas que me encantan de ti</h3>
      <div class="reason-card">
        <span class="reason-counter">Razón ${currentReasonIdx + 1} de ${reasonsList.length}</span>
        <p class="reason-text">"${reasonsList[currentReasonIdx]}"</p>
      </div>
      <button class="reason-next-btn" id="nextReasonBtn">Ver otra razón ✨ ➡️</button>
      <div>
        <button class="modal-close-btn" id="modalCloseBtn">Cerrar ❤️</button>
      </div>
    `;

    document.getElementById('nextReasonBtn').addEventListener('click', () => {
      currentReasonIdx = (currentReasonIdx + 1) % reasonsList.length;
      renderReasonModal();
    });

    setupCloseModal();
  }

  // 3. Mis Promesas
  promisesBtn.addEventListener('click', () => {
    modalCardContent.innerHTML = `
      <div class="modal-icon">📜✨</div>
      <h3>Mis promesas para ti en tu día</h3>
      <div class="promise-list">
        <div class="promise-item">
          <span class="p-icon">🌸</span>
          <p><strong>Estar siempre para ti:</strong> Prometo escucharte siempre que lo necesites y ser tu apoyo incondicional en las buenas y en las malas.</p>
        </div>
        <div class="promise-item">
          <span class="p-icon">🤍</span>
          <p><strong>Cuidar lo que tenemos:</strong> Prometo valorar cada momento juntos y recordarte siempre lo especial e importante que eres para mí.</p>
        </div>
        <div class="promise-item">
          <span class="p-icon">✨</span>
          <p><strong>Hacerte sonreír:</strong> Prometo dar siempre lo mejor de mí para sacarte una sonrisa, incluso en los días más pesados.</p>
        </div>
      </div>
      <button class="modal-close-btn" id="modalCloseBtn">Prometido mi cielo ❤️</button>
    `;
    setupCloseModal();
    modalBackdrop.classList.remove('hidden');
  });

  function setupCloseModal() {
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modalBackdrop.classList.add('hidden');
      });
    }
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.add('hidden');
    }
  });
});
