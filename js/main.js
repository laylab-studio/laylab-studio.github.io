// NinjaTech AI - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.slide-up, .slide-right, .fade-in').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Add visible class to trigger animations
    document.addEventListener('scroll', function() {
        document.querySelectorAll('.slide-up, .slide-right, .fade-in').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    });
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }
    
    // Mobile menu toggle (for responsive design)
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    if (window.innerWidth <= 768) {
        header.appendChild(mobileMenuToggle);
        
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Header scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.add('header-hidden');
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }
        
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add CSS for these new classes
    const style = document.createElement('style');
    style.textContent = `
        .header-hidden {
            transform: translateY(-100%);
        }
        
        .header-scrolled {
            background-color: rgba(10, 10, 20, 0.95);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        .mobile-menu-toggle {
            display: none;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: rgba(255, 0, 102, 0.1);
                color: var(--accent-color);
                font-size: 20px;
                cursor: pointer;
                position: absolute;
                right: 20px;
                top: 20px;
                z-index: 1001;
                transition: all 0.3s ease;
            }
            
            .mobile-menu-toggle.active {
                background-color: var(--accent-color);
                color: white;
            }
            
            nav {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background-color: rgba(10, 10, 20, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                z-index: 1000;
            }
            
            nav.active {
                transform: translateX(0);
            }
            
            nav ul {
                flex-direction: column;
                align-items: center;
            }
            
            nav ul li {
                margin: 15px 0;
            }
            
            nav ul li a {
                font-size: 24px;
            }
        }
        
        .visible {
            opacity: 1 !important;
            transform: translateY(0) translateX(0) !important;
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .slide-up {
            transform: translateY(50px);
        }
        
        .slide-right {
            transform: translateX(-50px);
        }
        
        .fade-in {
            opacity: 0;
        }
    `;
    
    document.head.appendChild(style);
});