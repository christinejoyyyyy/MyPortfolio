// ========== TYPING EFFECT USING TYPED.JS ==========
const typed = new Typed(".auto-type",{
  strings: ["an Aspiring Developer", "a Designer", "a Project Manager", "an Athlete"],
  typeSpeed: 100,
  backSpeed: 150,
  loop: true
})

function openResume() {
  window.open('/assets/Christine_Joy_Cleofe_Resume.pdf', '_blank');
}


// ========== SCROLL ANIMATIONS JavaScript ========== 
document.addEventListener('DOMContentLoaded', function() {

    // ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ========== 
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } 
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .fade-in-down, .scale-in, .timeline-item'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    // ========== PROGRESS BAR ========== 
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // ========== NAVBAR HIDE/SHOW ON SCROLL ========== 
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('nav-hidden');
            navbar.classList.remove('nav-visible');
        } else {
            navbar.classList.add('nav-visible');
            navbar.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop;
    });


    // ========== SMOOTH SCROLL FOR NAVIGATION LINKS ========== 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ========== SCROLL TRIGGERED ANIMATIONS ========== 
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');
    
    scrollTriggers.forEach(trigger => {
        observer.observe(trigger);
    });

    // ========== STAGGERED TIMELINE ANIMATIONS ========== 
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200); 
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // ========== TYPING EFFECT ENHANCEMENT ========== 
    function enhancedTypingEffect(element, text, speed = 100) {
        element.textContent = '';
        element.style.borderRight = '2px solid rgb(210, 83, 128)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' 
                        ? '2px solid rgb(210, 83, 128)' 
                        : 'none';
                }, 530);
            }
        };
        
        typeWriter();
    }

    // ========== PAGE LOADER ========== 
    window.addEventListener('load', () => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // ========== SCROLL TO TOP BUTTON ========== 
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: rgb(210, 83, 128);
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(210, 83, 128, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== MOUSE CURSOR TRAIL EFFECT ========== 
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(210, 83, 128, 0.3);
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }
});

// ========== UTILITY FUNCTIONS ========== 

function triggerAnimation(elementSelector, animationType = 'fade-in') {
    const element = document.querySelector(elementSelector);
    if (element) {
        element.classList.add(animationType, 'animate');
    }
}

function resetAnimations() {
    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(el => {
        el.classList.remove('animate');
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
