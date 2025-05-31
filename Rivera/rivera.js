// script.js
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const cardData = [
        {
            id: 1,
            title: 'About Me',
            content: '<h4><strong><i>Weird/Fun facts</i></strong></h4><ul><li>Reading</li><li>Hiking</li><li>Coding</li></ul>',
            content2: '<h4><strong><i>Favorite Foods</i></strong></h4><ul><li>Pizza</li><li>Sushi</li><li>Tacos</li></ul>'
        },
        { id: 2, title: 'Skills & Expertise', content: '<h4>Technical Skills:</h4><ul><li>JavaScript (ES6+)</li><li>HTML5 & CSS3 (including Flexbox, Grid)</li><li>React.js (Basic)</li><li>Python (Intermediate)</li><li>Node.js (Basic)</li><li>SQL (PostgreSQL, MySQL)</li></ul><h4>Soft Skills:</h4><ul><li>Problem-Solving</li><li>Team Collaboration</li><li>Communication</li><li>Adaptability</li><li>Time Management</li></ul>This section allows for detailed lists to highlight specific proficiencies.' },
        { id: 3, title: 'Projects & Portfolio', content: '<p>Explore my latest creations, which showcase my abilities in various domains.</p><ul><li><strong>Project Alpha:</strong> A web application built with [Technologies Used]. <a href="#" target="_blank">View Project</a></li><li><strong>Project Beta:</strong> A data analysis tool developed in Python. <a href="#" target="_blank">View Code</a></li><li><strong>Project Gamma:</strong> Mobile-first design for an e-commerce site. <a href="#" target="_blank">View Design</a></li></ul><p>Each project entry can include descriptions, links, and relevant technologies, allowing for a rich display of work.</p>' }
    ];

    const numCards = cardData.length;
    const angle = 360 / numCards;

    let currentRotation = 0;
    let carouselTranslateZ;

    /**
     * Dynamically determines the radius based on viewport width.
     * These values are crucial and adjusted for the larger card sizes.
     */
    function getCarouselRadius() {
        const vw = window.innerWidth;
        if (vw < 480) {
            return 400; // Increased for very small mobile screens
        } else if (vw < 768) {
            return 650; // Increased for tablets/smaller desktops
        } else if (vw < 1024) {
            return 900; // Increased for medium screens
        } else {
            return 1200; // **GREATLY INCREASED FOR LARGE DESKTOPS**
        }
    }

    function initializeCarousel() {
        carousel.innerHTML = '';
        const currentRadius = getCarouselRadius();
        carouselTranslateZ = currentRadius / Math.tan(Math.PI / numCards);

        cardData.forEach((data, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-title">${data.title}</div>
                <div class="content-container">
                    <div class="card-content">${data.content}</div>
                    <div class ="card-content">${data.content2}</div>
                </div>
            `;
            const rotateY = index * angle;
            card.style.transform = `rotateY(${rotateY}deg) translateZ(${carouselTranslateZ}px)`;
            carousel.appendChild(card);
        });

        carousel.style.transform = `translateZ(-${carouselTranslateZ}px) rotateY(${currentRotation}deg)`;
    }

    function rotateNext() {
        currentRotation -= angle;
        const currentRadius = getCarouselRadius();
        carouselTranslateZ = currentRadius / Math.tan(Math.PI / numCards);
        carousel.style.transform = `translateZ(-${carouselTranslateZ}px) rotateY(${currentRotation}deg)`;
    }

    function rotatePrev() {
        currentRotation += angle;
        const currentRadius = getCarouselRadius();
        carouselTranslateZ = currentRadius / Math.tan(Math.PI / numCards);
        carousel.style.transform = `translateZ(-${carouselTranslateZ}px) rotateY(${currentRotation}deg)`;
    }

    nextBtn.addEventListener('click', rotateNext);
    prevBtn.addEventListener('click', rotatePrev);

    initializeCarousel();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initializeCarousel();
        }, 100);
    });
});