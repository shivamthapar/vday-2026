// Heart Confetti Animation

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 15 + 10;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.opacity = 1;
        this.color = this.getRandomColor();
        this.type = Math.random() > 0.3 ? 'heart' : 'circle';
    }

    getRandomColor() {
        const colors = [
            '#ff6b9d',
            '#ff8fab',
            '#c9184a',
            '#ff4d6d',
            '#ff758f',
            '#ffb3c1',
            '#e63946',
            '#f72585'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Add slight wobble
        this.speedX += (Math.random() - 0.5) * 0.1;

        // Fade out near bottom
        if (this.y > canvas.height - 100) {
            this.opacity -= 0.02;
        }

        // Reset if off screen or faded
        if (this.y > canvas.height || this.opacity <= 0) {
            this.reset();
        }
    }

    drawHeart(x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.beginPath();

        // Heart shape
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);

        // Left curve
        ctx.bezierCurveTo(
            0, 0,
            -size / 2, 0,
            -size / 2, topCurveHeight
        );

        // Left bottom curve
        ctx.bezierCurveTo(
            -size / 2, size * 0.6,
            0, size * 0.8,
            0, size
        );

        // Right bottom curve
        ctx.bezierCurveTo(
            0, size * 0.8,
            size / 2, size * 0.6,
            size / 2, topCurveHeight
        );

        // Right curve
        ctx.bezierCurveTo(
            size / 2, 0,
            0, 0,
            0, topCurveHeight
        );

        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.restore();
    }

    draw() {
        if (this.type === 'heart') {
            this.drawHeart(this.x, this.y, this.size);
        } else {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
}

function createParticles() {
    for (let i = 0; i < 100; i++) {
        const particle = new Particle();
        particle.y = Math.random() * canvas.height;
        particles.push(particle);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    animationId = requestAnimationFrame(animate);
}

function startConfetti() {
    resizeCanvas();
    particles = [];
    createParticles();

    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    animate();

    // Stop after 10 seconds
    setTimeout(() => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }, 10000);
}

// Handle resize
window.addEventListener('resize', resizeCanvas);

// Initialize canvas size
resizeCanvas();
