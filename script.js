document.addEventListener('DOMContentLoaded', function() {
    // Debounce function for performance optimization
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        if (scrollTop === 0) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animated name typing effect
    const animatedName = document.getElementById('animated-name');
    const nameText = animatedName.textContent;
    animatedName.textContent = '';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < nameText.length) {
            animatedName.textContent += nameText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing animation when the page loads
    window.addEventListener('load', typeWriter);

    // Experience details toggle
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            const isActive = details.classList.contains('active');
            
            // Close all other active details
            document.querySelectorAll('.experience-details.active').forEach(detail => {
                if (detail !== details) {
                    detail.classList.remove('active');
                    detail.previousElementSibling.textContent = 'View Details';
                }
            });
            
            // Toggle current details
            details.classList.toggle('active');
            button.textContent = isActive ? 'View Details' : 'Hide Details';
        });
    });

    // Project modals
    document.querySelectorAll('.project-btn').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.parentElement.querySelector('.project-modal');
            modal.classList.add('active');
            
            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
    });

    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.project-modal').classList.remove('active');
        });
    });

    // Skills animation
    const skills = document.querySelectorAll('.skill');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.skill-bar');
                const level = entry.target.dataset.level;
                skillBar.style.setProperty('--level', level);
            }
        });
    }, observerOptions);

    skills.forEach(skill => observer.observe(skill));

    // Form submission
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add your form submission logic here
        // For now, we'll just show a success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = '#2ecc71';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            contactForm.reset();
        }, 3000);
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.5
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.offsetLeft < window.innerWidth / 2 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.5s ease';
        timelineObserver.observe(item);
    });

    // Set initial active nav link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('nav').offsetHeight;
        let currentActive = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                const id = section.getAttribute('id');
                currentActive = document.querySelector(`nav a[href="#${id}"]`);
            }
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });

        if (currentActive) {
            currentActive.classList.add('active');
        }
    }

    window.addEventListener('scroll', debounce(setActiveNavLink));
    setActiveNavLink(); // Set initial active link
});