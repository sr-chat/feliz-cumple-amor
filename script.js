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

  // Botón Te adoro (Lluvia de corazones)
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

  // 1. Mensajito Secreto
  secretBtn.addEventListener('click', () => {
    modalCardContent.innerHTML = `
      <div class="modal-icon">💌✨</div>
      <h3>Un deseo para ti mi amor</h3>
      <div class="modal-desc">
        Para este nuevo año de vida, solo te deseo cosas buenas amor. Deseo que cumplas cada meta y sueño que tengas en mente, que nunca pierdas esa forma tan linda de ser y que recuerdes que eres hermosa tal y como eres. Tú ya sabes que estás en mi corazón y en mi mente, y que pase lo que pase, aquí voy a estar contigo siempre. Te mereces ser muy feliz hoy y todos los días de tu vida, mi cielo ❤️
      </div>
      <button class="modal-close-btn" id="modalCloseBtn">Guardar en el corazón ❤️</button>
    `;
    setupCloseModal();
    modalBackdrop.classList.remove('hidden');
  });

  // 2. Por qué te quiero (Razones reales interactivas)
  const reasonsList = [
    "Porque simplemente me haces sentir muy bonito cada vez que hablamos.",
    "Porque me encanta escucharte, saber de ti y ver todas tus ocurrencias.",
    "Porque me gusta que seas tan atrevida, aventada y linda conmigo.",
    "Porque me fascina verte en tus fotos y videos, eres hermosa en serio.",
    "Porque me gusta estar contigo, sentirte cerca y cuidarte."
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
          <span class="p-icon">🤍</span>
          <p><strong>Aquí voy a estar siempre:</strong> Prometo no dejarte sola y estar aquí para ti cada vez que me necesites.</p>
        </div>
        <div class="promise-item">
          <span class="p-icon">🫂</span>
          <p><strong>Abrazos y besos:</strong> Prometo darte todos los abrazos y besos que quieras.</p>
        </div>
        <div class="promise-item">
          <span class="p-icon">🌸</span>
          <p><strong>Cuidarte y escucharte:</strong> Prometo escucharte, apoyarte y cuidarte siempre que pueda.</p>
        </div>
        <div class="promise-item">
          <span class="p-icon">✨</span>
          <p><strong>Arreglar todo hablando:</strong> Prometo nunca cerrarme y siempre hablar las cosas contigo con el corazón.</p>
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
