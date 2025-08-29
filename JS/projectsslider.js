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
        
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsSlider();
});

// Onclick open github link
function githubEieLink(){
    window.open('https://github.com/christinejoyyyyy/MyPortfolio');

}