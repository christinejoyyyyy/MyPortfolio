const hamburger = document.querySelector(".hamburger");
const cancel = document.querySelector(".cancel");
const dropdown = document.querySelector(".dropdown");
const navLinks = document.querySelector(".nav-container .links");

hamburger.addEventListener("click", () => {
  dropdown.style.transform = "translateY(0)";
  hamburger.style.display = "none";
  cancel.style.display = "block";
});

cancel.addEventListener("click", () => {
  dropdown.style.transform = "translateY(-500px)";
  hamburger.style.display = "block";
  cancel.style.display = "none";
});

function handleResize() {
  if (window.innerWidth > 900) {
    dropdown.style.transform = "translateY(-500px)"; 
    navLinks.style.display = "flex";
    hamburger.style.display = "none";
    cancel.style.display = "none";
  } else {
    navLinks.style.display = "none";
    hamburger.style.display = "block";
    cancel.style.display = "none";
  }
}

window.addEventListener("resize", handleResize);
handleResize(); 

window.addEventListener("scroll", function(){
  const nav = document.querySelector("nav");
  window.scrollY > 0 ? nav.classList.add("scrolled") : nav.classList.remove("scrolled");
})

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

    // Observe all elements with animation classes
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
            // Scrolling down & past 100px
            navbar.classList.add('nav-hidden');
            navbar.classList.remove('nav-visible');
        } else {
            // Scrolling up
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
                }, index * 200); // 200ms delay between each item
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
                // Blinking cursor effect
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

    // Hide cursor trail on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }
});

// ========== UTILITY FUNCTIONS ========== 

// Function to manually trigger animations
function triggerAnimation(elementSelector, animationType = 'fade-in') {
    const element = document.querySelector(elementSelector);
    if (element) {
        element.classList.add(animationType, 'animate');
    }
}

// Function to reset animations
function resetAnimations() {
    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(el => {
        el.classList.remove('animate');
    });
}

// Debounce function for performance
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


const cardList = document.querySelector(".card-list");
const cards = document.querySelectorAll(".card-item");
const pagination = document.querySelector(".slider-pagination");
const sliderWrapper = document.querySelector(".slider-wrapper");

let currentIndex = 0; // start at 2nd card
const totalSlides = cards.length;

// Touch/swipe variables
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let isDragging = false;
let startTime = 0;
let hasScrolled = false;

// Scroll throttling
let scrollTimeout = null;

// Create bullets
for (let i = 0; i < totalSlides; i++) {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  if (i === currentIndex) bullet.classList.add("active");
  bullet.addEventListener("click", () => goToSlide(i));
  pagination.appendChild(bullet);
}

function updateActiveCard() {
  cards.forEach((card, i) => {
    card.classList.toggle("active", i === currentIndex);
  });

  document.querySelectorAll(".bullet").forEach((b, i) => {
    b.classList.toggle("active", i === currentIndex);
  });

  const offset =
    -(currentIndex * (cards[0].offsetWidth + 24)) +
    (cardList.offsetWidth / 2 - cards[0].offsetWidth / 2);

  cardList.style.transform = `translateX(${offset}px)`;
}

function goToSlide(index) {
  if (index < 0) index = 0;
  if (index >= totalSlides) index = totalSlides - 1;
  
  currentIndex = index;
  updateActiveCard();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

// Touch Events
function handleTouchStart(e) {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
  startTime = Date.now();
  isDragging = true;
  hasScrolled = false;
  
  // Disable smooth transitions during drag
  cardList.style.transition = 'none';
}

function handleTouchMove(e) {
  if (!isDragging) return;
  
  const touch = e.touches[0];
  currentX = touch.clientX;
  currentY = touch.clientY;
  
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;
  
  // If user has moved more than 10px, consider it a scroll
  if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
    hasScrolled = true;
  }
  
  // If horizontal movement is greater than vertical, prevent scrolling
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    e.preventDefault();
  }
}

function handleTouchEnd(e) {
  if (!isDragging) return;
  
  isDragging = false;
  const endTime = Date.now();
  const deltaTime = endTime - startTime;
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;
  
  // Re-enable smooth transitions
  cardList.style.transition = 'transform 0.6s ease-in-out';
  
  // Determine if this was a horizontal swipe
  const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
  const minSwipeDistance = 50;
  const maxSwipeTime = 300;
  
  if (isHorizontalSwipe && Math.abs(deltaX) > minSwipeDistance) {
    if (deltaX > 0) {
      // Swiped right - go to previous slide
      prevSlide();
    } else {
      // Swiped left - go to next slide
      nextSlide();
    }
  }
  
  // Reset values
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
}

// Mouse Events (for desktop drag)
function handleMouseDown(e) {
  startX = e.clientX;
  startY = e.clientY;
  startTime = Date.now();
  isDragging = true;
  hasScrolled = false;
  
  cardList.style.transition = 'none';
  cardList.style.cursor = 'grabbing';
  
  // Prevent text selection
  e.preventDefault();
}

function handleMouseMove(e) {
  if (!isDragging) return;
  
  currentX = e.clientX;
  currentY = e.clientY;
  
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;
  
  // If user has moved more than 5px, consider it a scroll
  if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
    hasScrolled = true;
  }
}

function handleMouseUp(e) {
  if (!isDragging) return;
  
  isDragging = false;
  const deltaX = currentX - startX;
  const minSwipeDistance = 50;
  
  cardList.style.transition = 'transform 0.6s ease-in-out';
  cardList.style.cursor = 'grab';
  
  if (Math.abs(deltaX) > minSwipeDistance) {
    if (deltaX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  } else {
    // Snap back to current position
    updateActiveCard();
  }
  
  startX = 0;
  currentX = 0;
}

// Wheel/Scroll Events
function handleWheel(e) {
  // Only handle horizontal scrolling in the slider area
  if (!sliderWrapper.contains(e.target)) return;
  
  // Clear any existing scroll timeout
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  // Throttle scroll events to prevent too rapid sliding
  scrollTimeout = setTimeout(() => {
    const deltaY = e.deltaY;
    const deltaX = e.deltaX;
    
    // Handle both vertical scroll (converted to horizontal) and horizontal scroll
    const scrollDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
    
    if (scrollDelta > 0) {
      nextSlide();
    } else if (scrollDelta < 0) {
      prevSlide();
    }
  }, 50); // 50ms throttle
  
  e.preventDefault();
}

// Keyboard Events
function handleKeyDown(e) {
  if (!sliderWrapper.contains(document.activeElement) && 
      document.activeElement !== sliderWrapper) return;
  
  switch(e.key) {
    case 'ArrowLeft':
      prevSlide();
      e.preventDefault();
      break;
    case 'ArrowRight':
      nextSlide();
      e.preventDefault();
      break;
  }
}

// Event Listeners
// Touch events
sliderWrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
sliderWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
sliderWrapper.addEventListener('touchend', handleTouchEnd);

// Mouse events
sliderWrapper.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

// Wheel events
sliderWrapper.addEventListener('wheel', handleWheel, { passive: false });

// Keyboard events
document.addEventListener('keydown', handleKeyDown);
sliderWrapper.addEventListener('focus', () => sliderWrapper.style.outline = 'none');

// Make slider focusable for keyboard navigation
sliderWrapper.setAttribute('tabindex', '0');
sliderWrapper.style.cursor = 'grab';

// Prevent context menu on long press (mobile)
sliderWrapper.addEventListener('contextmenu', (e) => {
  if (isDragging) e.preventDefault();
});

// Handle mouse leave to reset dragging state
sliderWrapper.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    cardList.style.transition = 'transform 0.6s ease-in-out';
    cardList.style.cursor = 'grab';
    updateActiveCard();
  }
});

// Prevent card clicks during scrolling/dragging
function handleCardClick(e) {
  // If user scrolled/dragged, prevent the click
  if (hasScrolled) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  
  // If click target is not the arrow button, prevent navigation
  const isArrowButton = e.target.closest('.card-btn');
  if (!isArrowButton) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}

// Add click prevention to all card links
cards.forEach(card => {
  const cardLink = card.querySelector('.card-link');
  if (cardLink) {
    cardLink.addEventListener('click', handleCardClick);
  }
});

// Initialize
updateActiveCard();

// Optional: Auto-resize handling
window.addEventListener('resize', () => {
  updateActiveCard();
});


/*projects*/ 
class ProjectsSlider {
            constructor() {
                this.currentSlide = 0;
                this.totalSlides = 3;
                this.track = document.getElementById('projectsTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                
                this.init();
            }
            
            init() {
                this.updateSlider();
                this.bindEvents();
                this.animateOnLoad();
            }
            
            bindEvents() {
                if (this.prevBtn) {
                    this.prevBtn.addEventListener('click', () => this.previousSlide());
                }
                
                if (this.nextBtn) {
                    this.nextBtn.addEventListener('click', () => this.nextSlide());
                }
            }
            
            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateSlider();
            }
            
            previousSlide() {
                this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.updateSlider();
            }
            
            goToSlide(index) {
                this.currentSlide = index;
                this.updateSlider();
            }
            
            updateSlider() {
                if (this.track) {
                    const translateX = -this.currentSlide * 100;
                    this.track.style.transform = `translateX(${translateX}%)`;
                }
                
                // Update navigation buttons
                if (this.prevBtn) {
                    this.prevBtn.disabled = this.currentSlide === 0;
                }
                if (this.nextBtn) {
                    this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
                }
            }
            
            animateOnLoad() {
                const fadeElements = document.querySelectorAll('.fade-in');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                        }
                    });
                }, { threshold: 0.1 });
                
                fadeElements.forEach(el => observer.observe(el));
            }
        }
        
        // Initialize the slider when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new ProjectsSlider();
        });

function githubEieLink(){
    window.open('https://github.com/christinejoyyyyy/MyPortfolio');

}