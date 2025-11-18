document.addEventListener('DOMContentLoaded', () => {
    const floatingParticles = document.querySelector('.floating-particles');
    const envelope = document.getElementById('envelope');
    const letterPanel = document.querySelector('.letter-panel');
    const replayButton = document.getElementById('replayMagic');
    const continueButton = document.getElementById('continueButton');

    function createParticles() {
        if (!floatingParticles) return;
        const total = 26;
        for (let i = 0; i < total; i++) {
            floatingParticles.appendChild(makeParticle());
        }
    }

    function makeParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 4 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        const duration = Math.random() * 18 + 12;
        const delay = Math.random() * 6;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;
        const hues = ['#ffb6c1', '#ffc0cb', '#ffd1dc', '#fcd5ce'];
        const color = hues[Math.floor(Math.random() * hues.length)];
        particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
        return particle;
    }

    function triggerConfettiBurst() {
        confetti({
            particleCount: 140,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff85a2', '#ffc0cb', '#ffd1dc', '#fff5f8']
        });
        setTimeout(() => {
            confetti({
                particleCount: 90,
                angle: 55,
                spread: 65,
                origin: { x: 0, y: 0.7 },
                colors: ['#ff85a2', '#ffc0cb', '#ffd1dc']
            });
            confetti({
                particleCount: 90,
                angle: 125,
                spread: 65,
                origin: { x: 1, y: 0.7 },
                colors: ['#ff85a2', '#ffc0cb', '#ffd1dc']
            });
        }, 250);
    }

    let isAnimating = false;

    function openEnvelope(playConfetti = true) {
        if (!envelope || isAnimating || envelope.classList.contains('open')) return;
        isAnimating = true;
        envelope.classList.add('open');
        envelope.setAttribute('aria-pressed', 'true');

        setTimeout(() => {
            letterPanel?.classList.add('revealed');
        }, 450);

        if (playConfetti) {
            triggerConfettiBurst();
        }

        setTimeout(() => {
            isAnimating = false;
        }, 1200);
    }

    function resetEnvelope() {
        if (!envelope) return;
        envelope.classList.remove('open');
        envelope.setAttribute('aria-pressed', 'false');
        letterPanel?.classList.remove('revealed');
        // Trigger reflow so animations replay
        void envelope.offsetWidth;
        void letterPanel?.offsetWidth;
        isAnimating = false;
    }

    envelope?.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            openEnvelope(true);
        }
    });

    envelope?.addEventListener('keydown', (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !envelope.classList.contains('open')) {
            event.preventDefault();
            openEnvelope(true);
        }
    });

    replayButton?.addEventListener('click', () => {
        resetEnvelope();
        setTimeout(() => openEnvelope(true), 300);
    });

    continueButton?.addEventListener('click', () => {
        continueButton.classList.add('cta-pressed');
        triggerConfettiBurst();
        setTimeout(() => continueButton.classList.remove('cta-pressed'), 600);
    });

    // Automatically create ambience
    createParticles();
});
