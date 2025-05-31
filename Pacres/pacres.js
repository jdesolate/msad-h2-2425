// Theme toggle functionality
        function toggleTheme() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);

            // Change cover photo based on theme
            const coverImg = document.getElementById('coverImg');
            if (coverImg) {
                coverImg.src = newTheme === 'dark' ? 'images/cover-dark.gif' : 'images/cover-light.gif';
            }

            // Store theme preference
            const themeData = { theme: newTheme, timestamp: Date.now() };
            try {
                // Using a simple object to store theme state instead of localStorage
                window.themeState = themeData;
            } catch (e) {
                console.log('Theme preference cannot be saved');
            }
        }

        // Load saved theme or default to light
        function loadTheme() {
            try {
                let theme = 'dark';
                if (window.themeState && window.themeState.theme) {
                    theme = window.themeState.theme;
                }
                document.body.setAttribute('data-theme', theme);

                // Set cover photo on load
                const coverImg = document.getElementById('coverImg');
                if (coverImg) {
                    coverImg.src = theme === 'dark' ? 'images/cover-dark.gif' : 'images/cover-light.gif';
                }
            } catch (e) {
                document.body.setAttribute('data-theme', 'dark');
            }
        }

        // Profile picture change functionality
        function changeProfilePicture() {
            const images = [
                'images/profile1.jpg',
                'images/profile2.jpg',
                'images/profile3.jpg',
            ];
            
            const profileImg = document.getElementById('profileImg');
            const currentSrc = profileImg.src;
            // Find index by checking if src ends with the image path
            const currentIndex = images.findIndex(img => currentSrc.endsWith(img));
            const nextIndex = currentIndex === -1 ? 1 : (currentIndex + 1) % images.length;

            profileImg.style.transform = 'scale(0.8)';
            setTimeout(() => {
                profileImg.src = images[nextIndex];
                profileImg.style.transform = 'scale(1)';
            }, 200);
        }

        // Load profile picture immediately when page loads
        function initializeProfilePicture() {
            const profileImg = document.getElementById('profileImg');
            // Try to load external image first, fallback to SVG if it fails
            const externalImages = [
                'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
            ];
            
            const testImg = new Image();
            testImg.onload = function() {
                profileImg.src = externalImages[0];
            };
            testImg.onerror = function() {
                // Keep the SVG fallback that's already set
                console.log('Using SVG fallback for profile picture');
            };
            testImg.src = externalImages[0];
        }

        // Smooth scrolling for internal links
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

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Interactive hover effects for project cards
        document.querySelectorAll('.project-item, .course-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
        });

        // Load theme and initialize profile picture on page load
        loadTheme();
        initializeProfilePicture();

        // Add typing effect to profile title
        function typeEffect() {
            const titles = ['Computer Engineer Sophomore', 'AI and ML Enthusiast', 'Problem Solver', 'Tech Innovator'];
            let titleIndex = 0;
            let charIndex = 0;
            const titleElement = document.querySelector('.profile-title');
            
            function type() {
                if (charIndex < titles[titleIndex].length) {
                    titleElement.textContent = titles[titleIndex].substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(type, 100);
                } else {
                    setTimeout(erase, 2000);
                }
            }
            
            function erase() {
                if (charIndex > 0) {
                    titleElement.textContent = titles[titleIndex].substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(erase, 50);
                } else {
                    titleIndex = (titleIndex + 1) % titles.length;
                    setTimeout(type, 500);
                }
            }
            
            type();
        }

        // Start typing effect after page load
        setTimeout(typeEffect, 2000);
        window.addEventListener('DOMContentLoaded', loadTheme);