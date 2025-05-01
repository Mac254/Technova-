// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if (navLinks.classList.contains('nav-active')) {
            toggleMenu();
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('nav-active');
    navLinks.setAttribute('aria-expanded', hamburger.classList.contains('active'));
}

hamburger.addEventListener('click', toggleMenu);

// Keyboard navigation for hamburger
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'slide-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .service-card, .pricing-card, .case-study-card, .blog-card, .about p').forEach(el => {
    observer.observe(el);
});

// Parallax effect
const hero = document.querySelector('.hero');
function parallax() {
    let scrollPosition = window.pageYOffset;
    if (hero && hero.dataset.parallax) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
}
window.addEventListener('scroll', parallax);

// Scroll progress bar
function updateProgressBar() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.progress-bar').style.width = `${scrolled}%`;
}
window.addEventListener('scroll', updateProgressBar);

// Testimonial carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

function updateTestimonial() {
    testimonials.forEach((testimonial, index) => {
        testimonial.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    });
}

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonial();
});

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonial();
});

// Keyboard navigation for carousel
[prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// Modal contact form
const openModalBtn = document.querySelector('.open-modal');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal-close');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
});

// Keyboard navigation for modal
openModalBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModalBtn.click();
    }
});

closeModalBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeModalBtn.click();
    }
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
});

// Form validation and submission with loading spinner
const form = document.getElementById('contact-form');
const inputs = form.querySelectorAll('input, textarea');
const loadingSpinner = form.querySelector('.loading-spinner');
const submitButton = form.querySelector('button');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
        const errorMessage = input.nextElementSibling;
        errorMessage.textContent = '';

        if (!input.value.trim()) {
            errorMessage.textContent = `${input.placeholder} is required.`;
            isValid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            errorMessage.textContent = 'Please enter a valid email.';
            isValid = false;
        }
    });

    if (isValid) {
        loadingSpinner.style.display = 'block';
        submitButton.disabled = true;

        fetch('contact.php', {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            form.reset();
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        })
        .catch(error => {
            alert('Error sending message.');
        })
        .finally(() => {
            loadingSpinner.style.display = 'none';
            submitButton.disabled = false;
        });
    }
});

// Back to Top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
        backToTop.style.opacity = '1';
    } else {
        backToTop.style.opacity = '0';
        setTimeout(() => {
            backToTop.style.display = 'none';
        }, 300);
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// High Contrast Toggle
const highContrastBtn = document.getElementById('high-contrast');
let isHighContrast = false;

highContrastBtn.addEventListener('click', () => {
    isHighContrast = !isHighContrast;
    document.body.classList.toggle('high-contrast');
    highContrastBtn.setAttribute('aria-pressed', isHighContrast);
});

// Keyboard navigation for high contrast
highContrastBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        highContrastBtn.click();
    }
});

// CTA Banner dismiss
const ctaBanner = document.querySelector('.cta-banner');
const ctaClose = document.querySelector('.cta-close');

ctaClose.addEventListener('click', () => {
    ctaBanner.style.display = 'none';
});

// Keyboard navigation for CTA close
ctaClose.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ctaClose.click();
    }
});