document.addEventListener('DOMContentLoaded', () => {
    const scroller = document.getElementById('scroller');
    if (!scroller) return;

    // 1. DUPLICATE IMAGES (for seamless looping)
    const images = Array.from(scroller.children);
    images.forEach(img => {
        scroller.appendChild(img.cloneNode(true)); // Exact duplicates
    });

    const scrollWrapper = scroller.parentElement;
    let scrollPos = 0;
    const scrollSpeed = 0.7; // Adjust speed (pixels per frame)
    const contentHeight = scroller.offsetHeight / 2; // Original height (before duplication)

    function animate() {
        scrollPos += scrollSpeed;

        // When we've scrolled one full loop, reset position **without cutting**
        if (scrollPos >= contentHeight) {
            scrollPos -= contentHeight; // Seamless reset (no visual jump)
        }

        scrollWrapper.style.transform = `translateY(-${scrollPos}px)`;
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
});