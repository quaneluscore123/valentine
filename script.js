const messages = [
    "Xì xì",
    "Chậc chậc",
    "Hong",
    "Hong hoài",
    "Miệng nói hong mà lại làm",
    "Chúc valentine vui vẻ vậy thôi hẹ",
];

let currentMessageIndex = 0;
let isPlaying = false;

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    startCountdown();
});

document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.8) {
        createHeartAtCursor(e.clientX, e.clientY);
    }
});

function createHeartAtCursor(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    
    document.body.appendChild(heart);

    let opacity = 1;
    let yPos = y;
    
    const interval = setInterval(() => {
        yPos -= 2;
        opacity -= 0.02;
        heart.style.opacity = opacity;
        heart.style.top = yPos + 'px';
        
        if (opacity <= 0) {
            clearInterval(interval);
            heart.remove();
        }
    }, 30);
}

function generateHearts() {
    const container = document.body;
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createHeartAtCursor(x, y);
        }, i * 50);
    }
}

function changeMessage() {
    const messageElement = document.querySelector('.love-message');
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    messageElement.innerHTML = messages[currentMessageIndex].split('<br>').join('<br>');
    
    messageElement.style.animation = 'none';
    setTimeout(() => {
        messageElement.style.animation = 'slideUp 0.5s ease-out';
    }, 10);
}

function playMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = event.target;
    
    if (isPlaying) {
        audio.pause();
        btn.innerHTML = '🎵 Phát Nhạc';
        isPlaying = false;
    } else {
        audio.play().catch(err => {
            console.log('Cannot play audio:', err);
            alert('Vui lòng cho phép trình duyệt phát âm thanh');
        });
        btn.innerHTML = '⏸️ Dừng Nhạc';
        isPlaying = true;
    }
}

function createParticles() {
    const snowContainer = document.getElementById('snow');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = '💕';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = -10 + 'px';
        particle.style.fontSize = (Math.random() * 15 + 10) + 'px';
        particle.style.animation = `fall ${(Math.random() * 10 + 10)}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.width = 'auto';
        particle.style.height = 'auto';
        particle.style.background = 'none';
        
        snowContainer.appendChild(particle);
    }
}

function startCountdown() {
    const countdownInterval = setInterval(() => {
        const today = new Date();
        let targetDate = new Date(today.getFullYear(), 1, 14);
        
        if (today > targetDate) {
            targetDate = new Date(today.getFullYear() + 1, 1, 14);
        }
        
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance <= 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-section h2').innerHTML = '💕 Happy Valentine\'s Day! 💕';
        }
    }, 1000);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'h' || e.key === 'H') {
        generateHearts();
    }
    if (e.key === 'm' || e.key === 'M') {
        changeMessage();
    }
});

function createConfetti() {
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random() * 60 + 330}, 100%, 50%)`;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '999';
        
        document.body.appendChild(confetti);
        
        let x = Math.random() * 100 - 50;
        let y = Math.random() * window.innerHeight;
        let speed = Math.random() * 3 + 2;
        let angle = Math.random() * Math.PI * 2;
        
        const updateConfetti = () => {
            x += Math.cos(angle) * speed;
            y += speed;
            angle += 0.05;
            
            confetti.style.left = x + '%';
            confetti.style.top = y + 'px';
            
            if (y > window.innerHeight) {
                confetti.remove();
            } else {
                requestAnimationFrame(updateConfetti);
            }
        };
        
        updateConfetti();
    }
}

document.addEventListener('dblclick', function() {
    createConfetti();
});

let loveSequence = '';
document.addEventListener('keypress', function(e) {
    loveSequence += e.key.toLowerCase();
    
    if (loveSequence.includes('love')) {
        generateHearts();
        createConfetti();
        loveSequence = '';
    }
    
    if (loveSequence.length > 5) {
        loveSequence = loveSequence.slice(-5);
    }
});