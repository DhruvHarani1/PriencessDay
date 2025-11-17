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
    
    // Heart opening animation
    function openHeart() {
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
        
        // Add to body
        document.body.appendChild(heartContainer);
        
        // Trigger confetti after a short delay
        setTimeout(() => {
            triggerConfetti();
            
            // Create message overlay
            const message = document.createElement('div');
            message.className = 'message-overlay';
            message.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 999;
                opacity: 0;
                animation: fadeIn 0.5s ease-out forwards;
                backdrop-filter: blur(5px);
            `;
            
            message.innerHTML = `
                <div class="message-content" style="
                    background: white;
                    padding: 30px;
                    border-radius: 16px;
                    max-width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 182, 193, 0.5);
                ">
                    <h2 style="
                        color: #ff69b4;
                        margin-bottom: 20px;
                        font-size: 28px;
                    ">You're My Princess! 👑</h2>
                    <div style="
                        margin-bottom: 25px;
                        line-height: 1.6;
                        color: #4a3a40;
                    ">
                        <p style="margin-bottom: 15px;">On this special day, I want you to know how much you mean to me. You light up my world with your smile and bring joy to everyone around you.</p>
                        <p style="margin-bottom: 15px;">You deserve all the love and happiness in the world, today and always.</p>
                        <p style="margin: 25px 0;">With all my love,</p>
                        <p style="font-weight: 600; color: #ff69b4;">Your Secret Admirer</p>
                    </div>
                    <button class="close-button" style="
                        background: linear-gradient(45deg, #ff69b4, #ff8ab3);
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        font-size: 16px;
                        font-weight: 600;
                        border-radius: 50px;
                        cursor: pointer;
                        margin-top: 10px;
                        box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
                        transition: all 0.3s ease;
                    ">Close ❤️</button>
                </div>
            `;
            
            // Add message to body
            document.body.appendChild(message);
            
            // Add close button event
            const closeButton = message.querySelector('.close-button');
            closeButton.addEventListener('click', () => {
                // Fade out message and heart
                message.style.animation = 'fadeOut 0.5s forwards';
                heartContainer.style.animation = 'fadeOut 0.5s forwards';
                
                // Remove elements after animation
                setTimeout(() => {
                    message.remove();
                    heartContainer.remove();
                    heartButton.disabled = false;
                    heartButton.innerHTML = originalText;
                }, 500);
            });
            
            // Add keydown event to close with Escape key
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    closeButton.click();
                }
            };
            
            document.addEventListener('keydown', handleKeyDown);
            
            // Clean up event listener when message is closed
            message.addEventListener('animationend', function handler() {
                if (message.style.animationName === 'fadeOut') {
                    document.removeEventListener('keydown', handleKeyDown);
                    message.removeEventListener('animationend', handler);
                }
            });
            
        }, 1000);
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
