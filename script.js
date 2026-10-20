/* ==========================================================================
   FELIZ CUMPLEAÑOS A MI AMOR EMI - INTERACTIVIDAD
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos DOM
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

  // Estado
  let candleBlown = false;
  let isPlayingMusic = false;
  let audioCtx = null;
  let musicInterval = null;

  // ==========================================================================
  // 1. FONDO DE PARTÍCULAS FLOTANTES
  // ==========================================================================
  const particleIcons = ['🌸', '💖', '✨', '🎂', '🎈', '🍰', '💕', '🌷', '⭐️'];
  
  function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-item';
    particle.textContent = particleIcons[Math.floor(Math.random() * particleIcons.length)];
    
    // Posición y duración aleatoria
    const leftPos = Math.random() * 100;
    const duration = 6 + Math.random() * 6; // 6s a 12s
    const size = 18 + Math.random() * 16;   // 18px a 34px
    
    particle.style.left = `${leftPos}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.fontSize = `${size}px`;
    
    floatingBg.appendChild(particle);
    
    // Limpieza después de terminar la animación
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  // Generar partículas iniciales y periódicas
  for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingParticle, i * 400);
  }
  setInterval(createFloatingParticle, 1200);

  // ==========================================================================
  // 2. ABRIR EL SOBRE Y REVELAR LA CARTA
  // ==========================================================================
  function openLetter() {
    // Confeti de bienvenida
    triggerBigConfetti();

    // Animación de salida del sobre
    envelopeWrapper.classList.add('fade-out');

    setTimeout(() => {
      envelopeWrapper.style.display = 'none';
      letterWrapper.classList.remove('hidden');
      
      // Iniciar suavemente la cajita de música si no estaba sonando
      if (!isPlayingMusic) {
        toggleMusic();
      }
    }, 500);
  }

  openBtn.addEventListener('click', openLetter);
  openBtnAction.addEventListener('click', openLetter);

  // ==========================================================================
  // 3. EFECTOS DE CONFETI
  // ==========================================================================
  function triggerBigConfetti() {
    if (typeof confetti !== 'function') return;

    // Disparo central
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#ffffff']
    });

    // Cañones laterales
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

  confettiBtn.addEventListener('click', () => {
    triggerBigConfetti();
  });

  // ==========================================================================
  // 4. SOPLAR LA VELITA DEL PASTEL
  // ==========================================================================
  cakeContainer.addEventListener('click', () => {
    if (!candleBlown) {
      // Apagar velita
      flame.classList.add('blown-out');
      candleBlown = true;
      cakeHint.textContent = '✨ ¡Deseo pedido con éxito! 💖 ✨';
      cakeHint.style.background = 'rgba(245, 158, 11, 0.2)';
      cakeHint.style.color = '#d97706';

      // Confeti de estrellas doradas
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 },
          shapes: ['star', 'circle'],
          colors: ['#f59e0b', '#ffd166', '#f43f5e', '#ffffff']
        });
      }
      playSparkleSound();
    } else {
      // Volver a encender
      flame.classList.remove('blown-out');
      candleBlown = false;
      cakeHint.textContent = '✨ ¡Toca el pastel para soplar la velita! ✨';
      cakeHint.style.background = 'rgba(253, 164, 175, 0.25)';
      cakeHint.style.color = 'var(--primary)';
    }
  });

  // ==========================================================================
  // 5. BOTÓN MANDAR AMORCITO (LLUVIA DE CORAZONES)
  // ==========================================================================
  loveBtn.addEventListener('click', (e) => {
    const rect = loveBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top;

    for (let i = 0; i < 7; i++) {
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
        heart.style.transform = `translate(${(Math.random() - 0.5) * 120}px, -${100 + Math.random() * 120}px) scale(1.4)`;
        heart.style.opacity = '0';
      });

      setTimeout(() => heart.remove(), 1200);
    }
  });

  // ==========================================================================
  // 6. MODAL: LAS BUENAS NOCHES
  // ==========================================================================
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

  // ==========================================================================
  // 7. SINTETIZADOR DE MÚSICA AMBIENTAL (Cajita de música con Web Audio API)
  // ==========================================================================
  const notes = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99
  };

  const melody = [
    { note: 'C4', dur: 0.35 }, { note: 'C4', dur: 0.25 }, { note: 'D4', dur: 0.6 },
    { note: 'C4', dur: 0.6 },  { note: 'F4', dur: 0.6 },  { note: 'E4', dur: 1.1 },
    
    { note: 'C4', dur: 0.35 }, { note: 'C4', dur: 0.25 }, { note: 'D4', dur: 0.6 },
    { note: 'C4', dur: 0.6 },  { note: 'G4', dur: 0.6 },  { note: 'F4', dur: 1.1 },
    
    { note: 'C4', dur: 0.35 }, { note: 'C4', dur: 0.25 }, { note: 'C5', dur: 0.6 },
    { note: 'A4', dur: 0.6 },  { note: 'F4', dur: 0.6 },  { note: 'E4', dur: 0.6 }, { note: 'D4', dur: 0.9 },
    
    { note: 'A#4' in notes ? 'A#4' : 'A4', dur: 0.35 }, { note: 'A#4' in notes ? 'A#4' : 'A4', dur: 0.25 },
    { note: 'A4', dur: 0.6 },  { note: 'F4', dur: 0.6 },  { note: 'G4', dur: 0.6 },  { note: 'F4', dur: 1.3 }
  ];

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq, duration, type = 'sine', gainVal = 0.15) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playSparkleSound() {
    initAudio();
    if (!audioCtx) return;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.4, 'triangle', 0.1), i * 80);
    });
  }

  function startMusicLoop() {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    let noteIdx = 0;
    function playNextNote() {
      if (!isPlayingMusic) return;
      const item = melody[noteIdx];
      const freq = notes[item.note] || 440;
      
      playTone(freq, item.dur * 1.5, 'sine', 0.16);
      playTone(freq * 2, item.dur * 0.8, 'triangle', 0.04);

      noteIdx = (noteIdx + 1) % melody.length;
      musicInterval = setTimeout(playNextNote, item.dur * 650);
    }

    playNextNote();
  }

  function stopMusicLoop() {
    if (musicInterval) {
      clearTimeout(musicInterval);
      musicInterval = null;
    }
  }

  function toggleMusic() {
    initAudio();
    if (isPlayingMusic) {
      stopMusicLoop();
      isPlayingMusic = false;
      musicToggle.classList.remove('playing');
      musicToggle.querySelector('.music-text').textContent = 'Música';
    } else {
      isPlayingMusic = true;
      musicToggle.classList.add('playing');
      musicToggle.querySelector('.music-text').textContent = 'Sonando 🎶';
      startMusicLoop();
    }
  }

  musicToggle.addEventListener('click', toggleMusic);
});
