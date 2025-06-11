document.addEventListener('DOMContentLoaded', () => {
    // Profile picture upload functionality
    const profilePic = document.querySelector('.profile-pic');
    const profileImage = document.getElementById('profile-image');

    if (profilePic) {
        profilePic.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        profileImage.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
    }

    // Tab Navigation System
    const tabs = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentTabIndex = 0;

    function setActiveTab(index) {
        // Remove active class from all tabs and panes
        tabs.forEach(tab => tab.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to current tab and pane
        tabs[index].classList.add('active');
        tabPanes[index].classList.add('active');

        // Update current index and navigation buttons
        currentTabIndex = index;
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentTabIndex === 0;
            nextBtn.disabled = currentTabIndex === tabs.length - 1;
        }
    }

    // Initialize buttons state
    updateNavigationButtons();

    // Tab click handlers
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            setActiveTab(index);
        });
    });

    // Navigation button handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentTabIndex > 0) {
                setActiveTab(currentTabIndex - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentTabIndex < tabs.length - 1) {
                setActiveTab(currentTabIndex + 1);
            }
        });
    }

    // Add animation to hobby/skill items on hover
    const items = document.querySelectorAll('.hobby');
    items.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseout', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Add smooth scroll for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to skills on hover
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseover', () => {
            skill.style.transform = 'translateY(-5px)';
        });
        
        skill.addEventListener('mouseout', () => {
            skill.style.transform = 'translateY(0)';
        });
    });
}); 