document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-charcoal/95', 'py-4', 'shadow-xl');
                navbar.classList.remove('py-6');
            } else {
                navbar.classList.remove('bg-charcoal/95', 'py-4', 'shadow-xl');
                navbar.classList.add('py-6');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
        });
    }

    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Fade-in on Scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once it's visible, we can stop observing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- Countdown Timer (60 days from now) ---
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 60);

    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            if (document.getElementById('countdown-container')) {
                document.getElementById('countdown-container').innerHTML = "<div class='text-gold text-2xl uppercase tracking-widest'>Our Project is Live!</div>";
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const dEl = document.getElementById('days');
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (dEl) dEl.innerText = String(days).padStart(2, '0');
        if (hEl) hEl.innerText = String(hours).padStart(2, '0');
        if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
        if (sEl) sEl.innerText = String(seconds).padStart(2, '0');
    }

    if (document.getElementById('days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const content = question.nextElementSibling;
            const icon = question.querySelector('svg');

            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('svg');
                    if (otherContent) otherContent.classList.add('hidden');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current item
            const isActive = item.classList.contains('active');
            if (isActive) {
                item.classList.remove('active');
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('active');
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // --- Stats Counter (Fast version) ---
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50; // speed
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.innerText = target + (entry.target.innerText.includes('%') ? '%' : '+');
                        clearInterval(timer);
                    } else {
                        entry.target.innerText = Math.floor(current) + (entry.target.innerText.includes('%') ? '%' : '+');
                    }
                }, 30);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // --- Progress Rings Animation ---
    const rings = document.querySelectorAll('.progress-ring-fill');
    const ringObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ring = entry.target;
                const percent = ring.getAttribute('data-percent');
                const radius = ring.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (percent / 100) * circumference;
                ring.style.strokeDasharray = `${circumference} ${circumference}`;
                ring.style.strokeDashoffset = offset;
                ringObserver.unobserve(ring);
            }
        });
    }, { threshold: 0.5 });

    rings.forEach(ring => ringObserver.observe(ring));

    // --- Testimonials Slider ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot-nav');
    let currentSlide = 0;

    function showSlide(index) {
        if (slides.length === 0) return;
        
        slides.forEach((slide, i) => {
            slide.classList.add('hidden');
            slide.classList.remove('opacity-100');
            dots[i].classList.remove('active');
        });

        slides[index].classList.remove('hidden');
        setTimeout(() => slides[index].classList.add('opacity-100'), 20);
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        showSlide(0);
        setInterval(nextSlide, 4000);

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
            });
        });
    }
});
