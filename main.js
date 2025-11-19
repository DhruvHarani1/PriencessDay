import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Landing Page Transition ---
  const enterBtn = document.getElementById('enter-world-btn');
  const landing = document.getElementById('landing');
  const mainWorld = document.getElementById('main-world');

  enterBtn.addEventListener('click', () => {
    // Play whisper sound if available (optional)
    landing.style.transform = 'translateY(-100%)';
    landing.style.transition = 'transform 1s ease-in-out';
    setTimeout(() => {
      landing.classList.add('hidden');
      mainWorld.classList.remove('hidden');
      startNoteTyping();
    }, 1000);
  });

  // --- 2. Confetti System ---
  function spawnConfetti(x, y, type) {
    const colors = ['#ffb7b2', '#c4a1ff', '#e0ffff', '#ffd700'];
    const shapes = ['🍔', '🍦', '☕', '🍓', '✨', '💗'];
    const content = type === 'mix' ? shapes[Math.floor(Math.random() * shapes.length)] : type;
    
    for (let i = 0; i < 20; i++) {
      const el = document.createElement('div');
      el.classList.add('confetti-piece');
      el.innerText = content;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.fontSize = (Math.random() * 20 + 10) + 'px';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      el.animate([
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${tx}px, ${ty + 200}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: 1500,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      }).onfinish = () => el.remove();
    }
  }

  // Food Card Interactions
  document.querySelectorAll('.food-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const type = card.getAttribute('data-type');
      const icon = card.querySelector('.food-icon').innerText;
      const rect = card.getBoundingClientRect();
      spawnConfetti(rect.left + rect.width/2, rect.top + rect.height/2, icon);
    });
  });

  // --- 3. Shopping Simulator Mini-Game ---
  const gameArea = document.getElementById('game-area');
  const player = document.getElementById('player-avatar');
  const scoreBoard = document.getElementById('score-board');
  const startScreen = document.getElementById('start-screen');
  const winScreen = document.getElementById('win-screen');
  const startBtn = document.getElementById('start-game-btn');
  
  let gameActive = false;
  let score = 0;
  let playerX = 50; // Percentage
  let dropInterval;

  // Player Movement
  gameArea.addEventListener('mousemove', (e) => {
    if (!gameActive) return;
    const rect = gameArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    playerX = (x / rect.width) * 100;
    if (playerX < 5) playerX = 5;
    if (playerX > 95) playerX = 95;
    player.style.left = playerX + '%';
  });

  startBtn.addEventListener('click', startGame);

  function startGame() {
    gameActive = true;
    score = 0;
    scoreBoard.innerText = "Score: 0";
    startScreen.classList.add('hidden');
    winScreen.classList.add('hidden');
    
    dropInterval = setInterval(spawnItem, 800);
  }

  function spawnItem() {
    if (!gameActive) return;
    const items = ['👗', '👠', '👜', '🍦', '☕'];
    const item = document.createElement('div');
    item.classList.add('falling-item');
    item.innerText = items[Math.floor(Math.random() * items.length)];
    item.style.left = (Math.random() * 90 + 5) + '%';
    item.style.top = '0';
    gameArea.appendChild(item);

    // Fall animation logic manually to check collision
    let top = 0;
    const fall = setInterval(() => {
      if (!gameActive) {
        clearInterval(fall);
        item.remove();
        return;
      }
      top += 2;
      item.style.top = top + '%';

      // Collision Check
      if (top > 85 && top < 95) {
        const itemLeft = parseFloat(item.style.left);
        if (Math.abs(itemLeft - playerX) < 10) {
          score++;
          scoreBoard.innerText = "Score: " + score;
          item.remove();
          clearInterval(fall);
          spawnConfetti(gameArea.getBoundingClientRect().left + (itemLeft/100 * gameArea.offsetWidth), gameArea.getBoundingClientRect().top + (top/100 * gameArea.offsetHeight), '✨');
          
          if (score >= 10) winGame();
        }
      }

      if (top > 100) {
        item.remove();
        clearInterval(fall);
      }
    }, 20);
  }

  function winGame() {
    gameActive = false;
    clearInterval(dropInterval);
    winScreen.classList.remove('hidden');
    spawnConfetti(window.innerWidth/2, window.innerHeight/2, 'mix');
  }

  // --- 4. Eyes Department Tabs ---
  const tabs = document.querySelectorAll('.office-tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
  });

  document.getElementById('ask-manufacturer-btn').addEventListener('click', () => {
    document.getElementById('manufacturer-msg').classList.remove('hidden');
  });

  // --- 5. Emoji Wall ---
  document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const emoji = btn.getAttribute('data-emoji');
      const rect = btn.getBoundingClientRect();
      spawnConfetti(rect.left + rect.width/2, rect.top + rect.height/2, emoji);
      
      if (emoji === '😊') {
        document.body.style.filter = 'brightness(1.2)';
        setTimeout(() => document.body.style.filter = 'brightness(1)', 500);
      }
      if (emoji === '🙈') {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(255, 183, 178, 0.5)';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '5000';
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 500);
      }
    });
  });

  // --- 6. ha hoo Portal ---
  let keyHistory = [];
  const secretCode = "hahoo";
  
  document.addEventListener('keydown', (e) => {
    keyHistory.push(e.key.toLowerCase());
    if (keyHistory.length > secretCode.length) keyHistory.shift();
    
    if (keyHistory.join('') === secretCode || keyHistory.join('').includes(secretCode)) {
      document.getElementById('ha-hoo-modal').classList.remove('hidden');
      spawnConfetti(window.innerWidth/2, window.innerHeight/2, 'mix');
      keyHistory = []; // Reset
    }
  });

  document.getElementById('close-hahoo').addEventListener('click', () => {
    document.getElementById('ha-hoo-modal').classList.add('hidden');
  });

  // --- 7. Personal Note Typing ---
  function startNoteTyping() {
    const noteText = "Trisha, this space is built on all the tiny things you like — burgers, ice cream, coffee, reels, photos, shopping, cute vibes, your emojis… and yes, your eyes 🙈✨ Just a small reminder that someone remembers everything.";
    const noteEl = document.getElementById('typing-note');
    let i = 0;
    
    function type() {
      if (i < noteText.length) {
        noteEl.innerHTML += noteText.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    }
    // Start when scrolled into view? Or just after a delay
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && noteEl.innerHTML === "") {
        type();
      }
    });
    observer.observe(document.getElementById('note'));
  }

  // --- 8. Easter Eggs ---
  // Polaroid Shake
  document.querySelectorAll('.polaroid').forEach(p => {
    p.addEventListener('click', () => {
      p.style.animation = 'bounce 0.5s';
      setTimeout(() => p.style.animation = '', 500);
      alert(p.getAttribute('data-msg'));
    });
  });

  // Typing "Trisha"
  let nameHistory = [];
  const nameCode = "trisha";
  document.addEventListener('keydown', (e) => {
    nameHistory.push(e.key.toLowerCase());
    if (nameHistory.length > nameCode.length) nameHistory.shift();
    if (nameHistory.join('') === nameCode) {
      spawnConfetti(window.innerWidth/2, window.innerHeight/2, '💗');
    }
  });

});
