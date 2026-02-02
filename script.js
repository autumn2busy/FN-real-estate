/* ========================================
   FlyNerd Tech - JavaScript Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCursorGlow();
    initScrollAnimations();
    initCounterAnimations();
    initNavigation();
    initFormHandler();
    initParticles();
    initTimelineProgress();
});

/* === Cursor Glow Effect === */
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');

    if (!cursorGlow) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

/* === Scroll Animations === */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.capability-card, .process-step, .work-card, .ai-feature');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

/* === Counter Animations === */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease out)
        const easeProgress = 1 - Math.pow(1 - progress, 4);

        const currentValue = Math.round(startValue + (target - startValue) * easeProgress);
        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* === Navigation === */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add background on scroll
        if (currentScrollY > 50) {
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 15, 0.8)';
        }

        // Hide/show on scroll direction (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');

            if (navLinks) {
                navLinks.classList.toggle('mobile-open');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks) {
                    navLinks.classList.remove('mobile-open');
                    mobileMenuBtn?.classList.remove('active');
                }
            }
        });
    });
}

/* === Form Handler === */
function initFormHandler() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" width="20" height="20" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="40" stroke-dashoffset="10">
                    <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success state
        submitBtn.innerHTML = `
            <span>Message Sent! ✓</span>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';

        // Reset form
        form.reset();

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });

    // Input focus effects
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

/* === Particle System === */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';

    // Styles
    particle.style.cssText += `
        position: absolute;
        background: rgba(191, 0, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        pointer-events: none;
        animation: floatParticle ${(Math.random() * 10 + 10)}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
    `;

    container.appendChild(particle);
}

// Add particle animation to stylesheet dynamically
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(particleStyle);

/* === Timeline Progress === */
function initTimelineProgress() {
    const timelineLine = document.querySelector('.timeline-progress');
    const processSection = document.querySelector('.process');

    if (!timelineLine || !processSection) return;

    function updateProgress() {
        const rect = processSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress based on section visibility
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        // Start when section enters viewport
        if (sectionTop < windowHeight && rect.bottom > 0) {
            const visiblePortion = Math.min(windowHeight - sectionTop, sectionHeight);
            const progress = (visiblePortion / sectionHeight) * 100;
            timelineLine.style.height = Math.min(Math.max(progress, 0), 100) + '%';
        }
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

/* === Text Scramble Effect (Bonus) === */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/* === Magnetic Button Effect === */
document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

/* === Typing Effect for Hero === */
function initTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;

    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.visibility = 'visible';

    let i = 0;
    function type() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 20);
        }
    }

    // Start typing when hero is visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            type();
            observer.disconnect();
        }
    });

    observer.observe(heroSubtitle);
}

/* === Parallax Effect === */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax for orbs
    document.querySelectorAll('.orb').forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Parallax for hero visual
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

/* === Reveal Animation on Scroll === */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-header, .capability-card, .process-step, .work-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(el);
});

console.log('🚀 FlyNerd Tech - Website Initialized');
console.log('✨ Freethinking Lifestyle Yearners Navigating Every Relevant Domain');
