// ========== EXPERIENCE TIMELINE FUNCTIONALITY ========== 
document.addEventListener('DOMContentLoaded', function() {
    
    const experiences = [
        {
            company: "The SmartBridge",
            logo: "/assets/images/smartbridge-logo.jpg",
            logoType: "image",
            title: "Salesforce Intern",
            duration: "March 2025 - May 2025",
            achievements: [
                "Completed core Trailhead modules and hands-on training in Salesforce CRM, Data Modeling, Declarative Automation, Apex, Visualforce, and Lightning Web Components (LWC)",
                "Developed a capstone project implementing end-to-end Salesforce solutions including custom data models, automated workflows, and Apex triggers to improve customer service and inventory management. ",
                "Earned multiple Trailhead Superbadges demonstrating applied expertise in flows, process automation, approval processes, and developer best practices.",
            ]
        },
        {
            company: "Accenture Academy Technology",
            logo: "/assets/images/accenture-logo.png",
            logoType: "image",
            title: " AWS Cloud Curriculum Intern",
            duration: "October 2024 - March 2025",
            achievements: [
                "Completed AWS Academy’s full curriculum on Cloud Foundations, Development, Operations, and Architecture",
                "Configured and launched EC2 instances, S3 buckets, IAM roles, and Lambda functions as part of lab-based, scenario-driven exercises simulating real AWS deployments.",
            ]
        },
        
        
    ];

    let currentIndex = 0;

    // Initialize timeline only if elements exist
    function initializeTimeline() {
        const progressDots = document.getElementById('progressDots');
        const timelineTabs = document.getElementById('timelineTabs');
        
        if (!progressDots || !timelineTabs) {
            console.log('Timeline elements not found');
            return;
        }
        
        createProgressDots();
        updateTimeline();
        updateNavigationButtons();
        addTabClickHandlers();
    }

    function createProgressDots() {
        const progressDots = document.getElementById('progressDots');
        if (!progressDots) return;
        
        progressDots.innerHTML = '';
        
        experiences.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `progress-dot ${index === currentIndex ? 'active' : ''}`;
            dot.onclick = () => goToExperience(index);
            progressDots.appendChild(dot);
        });
    }

    function updateTimeline() {
        const tabs = document.querySelectorAll('.timeline-tab');
        const progressBar = document.getElementById('progressBar'); // Fixed ID
        const progressDots = document.querySelectorAll('.progress-dot');
        
        // Update active tab
        tabs.forEach((tab, index) => {
            tab.classList.toggle('active', index === currentIndex);
        });
        
        // Update progress bar
        if (progressBar) {
            const progressPercentage = ((currentIndex + 1) / experiences.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
        
        // Update progress dots
        progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update experience details
        updateExperienceDetails();
        
        // Update tabs position for mobile
        updateTabsPosition();
    }

    function updateTabsPosition() {
    const timelineTabs = document.getElementById('timelineTabs');
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    if (!timelineTabs || !timelineWrapper) return;
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile: Show one tab at a time, perfectly centered
        const tabWidth = 200; // Tab width + margins (180px + 20px total margin)
        const wrapperWidth = timelineWrapper.offsetWidth;
        
        // Calculate translation to center the current tab
        const translateX = -(currentIndex * tabWidth) + (wrapperWidth / 2) - (tabWidth / 2);
        timelineTabs.style.transform = `translateX(${translateX}px)`;
    } else {
        // Desktop: Smart positioning logic (unchanged)
        const tabWidth = 270;
        const wrapperWidth = timelineWrapper.offsetWidth;
        const totalTabsWidth = experiences.length * tabWidth;
        
        let translateX = 0;
        
        if (totalTabsWidth > wrapperWidth) {
            const maxTranslate = -(totalTabsWidth - wrapperWidth);
            const idealTranslate = -(currentIndex * tabWidth) + (wrapperWidth / 2) - (tabWidth / 2);
            translateX = Math.max(maxTranslate, Math.min(0, idealTranslate));
            
            const visibleTabs = Math.floor(wrapperWidth / tabWidth);
            
            if (currentIndex <= Math.floor(visibleTabs / 2)) {
                translateX = 0;
            } else if (currentIndex >= experiences.length - Math.ceil(visibleTabs / 2)) {
                translateX = maxTranslate;
            }
        }
        
        timelineTabs.style.transform = `translateX(${translateX}px)`;
    }
}

    function updateExperienceDetails() {
        const detailsContainer = document.getElementById('experienceDetails');
        if (!detailsContainer) return;
        
        const experience = experiences[currentIndex];
        
        detailsContainer.classList.remove('show');
        
        setTimeout(() => {
            // Generate logo HTML based on type
            let logoHTML = '';
            if (experience.logoType === 'image') {
                logoHTML = `<img src="${experience.logo}" alt="${experience.company} logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <i class="fas fa-building" style="display: none;"></i>`;
            } else {
                logoHTML = `<i class="${experience.logo}"></i>`;
            }
            
            detailsContainer.innerHTML = `
                <div class="details-header">
                    <div class="company-logo ${experience.logoType === 'icon' ? 'icon-only' : ''}">
                        ${logoHTML}
                    </div>
                    <div>
                        <h2 class="job-title">${experience.title}</h2>
                        <p class="company-name">${experience.company}</p>
                    </div>
                </div>
                
                <ul class="achievements">
                    ${experience.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            `;
            detailsContainer.classList.add('show');
        }, 250);
    }

    function navigateTimeline(direction) {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < experiences.length) {
            currentIndex = newIndex;
            updateTimeline();
            updateNavigationButtons();
        }
    }

    function goToExperience(index) {
        currentIndex = index;
        updateTimeline();
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === experiences.length - 1;
    }

    function addTabClickHandlers() {
        const tabs = document.querySelectorAll('.timeline-tab');
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => goToExperience(index));
        });
    }

    // Make functions global so they can be called from HTML onclick
    window.navigateTimeline = navigateTimeline;
    window.goToExperience = goToExperience;

    // Handle window resize
    window.addEventListener('resize', updateTabsPosition);

    // Initialize timeline when DOM is ready
    setTimeout(() => {
        initializeTimeline();
    }, 100); // Small delay to ensure all elements are rendered
});