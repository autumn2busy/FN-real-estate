/* ========================================
   FlyNerd Tech - Enterprise Interactions
   Clean, Refined, Professional
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initFormHandler();
    initSmoothScroll();
});

/* === Navigation === */
function initNavigation() {
    const nav = document.getElementById('nav');
    let lastScrollY = window.scrollY;

    function updateNav() {
        const currentScrollY = window.scrollY;

        // Add scrolled class
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // Mobile menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            if (navLinks) {
                navLinks.classList.toggle('mobile-open');
            }
        });
    }
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
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.section-header, .capability-card, .process-step, .work-card, .ai-feature, .stack-item'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
}

/* === Counter Animations === */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(target * easeProgress);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* === Form Handler === */
function initFormHandler() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;

        // Loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success state
        submitBtn.innerHTML = '<span>Message Sent ✓</span>';
        submitBtn.style.background = '#2d5a3d';

        form.reset();

        // Reset after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.style.opacity = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

/* === Smooth Scroll === */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* === Subtle Hover Effects === */
document.querySelectorAll('.capability-card, .work-card, .stack-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

/* === Parallax on AI Circle === */
const aiCircle = document.querySelector('.ai-circle');
if (aiCircle) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rect = aiCircle.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.05;
            const yPos = -(scrolled * speed);
            aiCircle.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
        }
    }, { passive: true });
}

console.log('FlyNerd Tech — Enterprise AI Solutions');
