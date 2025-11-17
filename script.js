document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const heartButton = document.getElementById('heartButton');
    const noteCard = document.querySelector('.note-card');
    const floatingParticles = document.querySelector('.floating-particles');
    
    // Create particles
    function createParticles() {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = -delay + 's';
        
        // Random color
        const colors = ['#ffb6c1', '#ffc0cb', '#ffd1dc', '#ff69b4', '#ff1493'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `radial-gradient(circle, ${color}, ${color}00)`;
        
        floatingParticles.appendChild(particle);
    }
    
    // Create initial particles
    createParticles();
    
    // Confetti effect
    function triggerConfetti() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffb6c1', '#ffc0cb', '#ffd1dc', '#ff69b4', '#ff1493', '#ff85a2']
        });
        
        // Additional confetti bursts
        setTimeout(() => {
            confetti({
                particleCount: 100,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.7 },
                colors: ['#ffb6c1', '#ffc0cb', '#ffd1dc']
            });
            
            confetti({
                particleCount: 100,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.7 },
                colors: ['#ffb6c1', '#ffc0cb', '#ffd1dc']
            });
        }, 300);
    }
    
    // Heart opening animation leading to the letter page
    function openHeart() {
        if (!heartButton) return;

        // Disable button to prevent multiple clicks
        heartButton.disabled = true;

        // Add loading state
        const originalText = heartButton.innerHTML;
        heartButton.innerHTML = 'Opening... <span class="heart">💝</span>';

        // Create heart container for animation
        const heartContainer = document.createElement('div');
        heartContainer.className = 'heart-container';
        heartContainer.innerHTML = '💖';
        heartContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            font-size: 100px;
            z-index: 1000;
            pointer-events: none;
            animation: heartBeat 1s ease-out forwards;
        `;

        document.body.appendChild(heartContainer);

        // Trigger confetti after a short delay
        setTimeout(() => {
            triggerConfetti();
        }, 600);

        // Navigate to the love letter page once the animation finishes
        setTimeout(() => {
            window.location.href = 'letter.html';
        }, 1800);

        // Fallback cleanup in case navigation is interrupted
        setTimeout(() => {
            if (document.body.contains(heartContainer)) {
                heartContainer.remove();
                heartButton.disabled = false;
                heartButton.innerHTML = originalText;
            }
        }, 4000);
    }
    
    // Add click event to heart button
    heartButton.addEventListener('click', openHeart);
    
    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !heartButton.disabled) {
            e.preventDefault();
            heartButton.click();
        }
    });
    
    // Add hover effect to note card
    if (window.matchMedia('(hover: hover)').matches) {
        noteCard.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = noteCard.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            // Tilt effect
            noteCard.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.02)`;
            
            // Subtle shadow effect
            noteCard.style.boxShadow = `${-x * 10}px ${y * 10}px 30px rgba(0, 0, 0, 0.1)`;
        });
        
        // Reset on mouse leave
        noteCard.addEventListener('mouseleave', () => {
            noteCard.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
            noteCard.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // Add floating hearts in the background
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '💖';
        
        // Random position and size
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Random animation
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        heart.style.animation = `floatUp ${duration}s linear ${delay}s forwards`;
        
        document.body.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }
    
    // Create initial floating hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 1000);
    }
    
    // Continue creating floating hearts
    setInterval(createFloatingHeart, 3000);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0.1;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes heartBeat {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.95); }
        }
    `;
    document.head.appendChild(style);
});
