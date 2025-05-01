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
}

hamburger.addEventListener('click', toggleMenu);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'slide-in', 'slide-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .service-card, .pricing-card, .testimonial-card, .blog-card, .about p').forEach(el => {
    observer.observe(el);
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