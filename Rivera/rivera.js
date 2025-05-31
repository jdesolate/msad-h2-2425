// script.js
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const cardData = [
         {
            id: 1,
            title: 'About Me',
            content: '<h4><strong><i>Weird/Fun facts</i></strong></h4><ul><li>I have lived in Luzon, Visayas and Mindanao</li><li>born in Manila</li><li>I have once stayed awake for almost 72 hours</li><li>coffee enjoyer</li><li>immune to caffeine</li></ul>',
            content2: '<h4><strong><i>Hobbies</i></strong></h4><ul><li>listening to music!</li><li>singing!(tho im not good at it)</li><li>reading novels/sangas</li><li>watching anime/movies/TV shows!</li><li>playing ames!</li><li>playing the bass!</li></ul>'
        },
        {   id: 2,
            title: 'Educational Background',
            content: '<h4>Schools Attended</h4><ul><li><strong>Elementary</strong>:Lahug Elementary School<p>(2011-2017)</p></li><li> <b>High School</b>:University of Cebu <p>(2017-2023)</p></li><li><b>College</b>: Cebu Institute of Technology- University<p>(2023-present)</p></li></ul>',
            content2:''
        },
        { id: 3, title: 'Projects & Portfolio', content: '<h4>Past Projects</h4><ul><li>Console based bookmark Management System<p>My first project ever made in college <br>(coded in C#)<br><a href="https://github.com/Packhat25/bookmark-management-system" target="_blank" class="URLlink" >Click here to visit!</a></p></li><li>NoteWorthy<p>A windows application of the console based bookmark management system<br><a href="https://github.com/Packhat25/NoteWorthy" target="_blank" class="URLlink" >Click here to visit!</a></p></li>' }
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
            return 300; // Adjusted for smaller screens (increased)
        } else if (vw < 768) {
            return 500; // Adjusted for medium screens (increased)
        } else if (vw < 1024) {
            return 700; // Adjusted for larger tablets/small laptops (increased)
        } else {
            return 900; // Adjusted for desktops (increased)
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
                ${data.title ? `<div class="card-title">${data.title}</div>` : ''}
                 <div class="content-container"> <div class="card-content">${data.content}</div>${data.content2 ? `<div class="card-content">${data.content2}</div>` : ''}
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