document.addEventListener('DOMContentLoaded', () => {
    /**
     * Duplicates all child elements of a given scroller element.
     * This is typically used to create content for an "infinite" scroll effect.
     * @param {HTMLElement} scrollerElement - The element whose children will be duplicated.
     */
    function duplicateChildItems(scrollerElement) {
        if (!scrollerElement || typeof scrollerElement.children === 'undefined') {
            console.warn('Scroller element is invalid or has no children property:', scrollerElement);
            return;
        }
        // Convert HTMLCollection to Array to safely iterate and append
        const items = Array.from(scrollerElement.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            scrollerElement.appendChild(clone);
        });
    }

    // --- Initialize First Scroller ---
    const scroller1 = document.getElementById('scroller');

    if (!scroller1) {
        console.error('Element with ID "scroller" not found. Animation cannot start.');
        return;
    }
    duplicateChildItems(scroller1);

    // --- Initialize Second Scroller (Cloned from the first scroller's structure) ---
    const originalWrapper = document.querySelector('.scroll-wrapper');
    if (!originalWrapper) {
        console.error('Element with class ".scroll-wrapper" not found. This is needed to clone the scroller structure.');
        return;
    }

    if (!originalWrapper.contains(scroller1) && originalWrapper.querySelector('.sm-bg') !== scroller1) {
         console.warn('The #scroller element is not within the .scroll-wrapper that is being cloned. Cloned scroller might not be set up as expected.');
    }

    const scrollContainer = document.querySelector('.scroll');
    if (!scrollContainer) {
        console.error('Element with class ".scroll" (main container for scrollers) not found.');
        return;
    }

    const cloneWrapper = originalWrapper.cloneNode(true); // Deep clone the wrapper
    const scroller2 = cloneWrapper.querySelector('.sm-bg'); 

    if (!scroller2) {
        console.error('Could not find element with class ".sm-bg" in the cloned wrapper. Second scroller cannot be initialized.');
        return;
    }
    scroller2.id = 'scroller2'; 
    scrollContainer.appendChild(cloneWrapper);
    duplicateChildItems(scroller2);

    // --- Shared Animation Logic ---
    const scrollDistance = scroller1.offsetHeight; // The total height the scroller will move
    let isTargetTop = true; // Determines if the next animation target is the top or bottom

    const transitionDurationSeconds = 15; // Duration of the CSS transition

    // Apply CSS transitions for smooth, eased movement
    scroller1.style.transition = `transform ${transitionDurationSeconds}s ease-in-out`;
    scroller2.style.transition = `transform ${transitionDurationSeconds}s ease-in-out`;

    // Ensure initial position is set (scrollers start at their original position)
    scroller1.style.transform = 'translateY(0px)';
    scroller2.style.transform = 'translateY(0px)';

    /**
     * Triggers the next step of the CSS-based animation.
     * It sets the target transform, and CSS handles the animation.
     */
    function triggerNextAnimationStep() {
        let targetY;

        if (isTargetTop) {
            // Next target is to scroll up (negative Y translation)
            targetY = -scrollDistance;
        } else {
            // Next target is to scroll back down to the original position
            targetY = 0;
        }

        const transformValue = `translateY(${targetY}px)`;
        scroller1.style.transform = transformValue;
        scroller2.style.transform = transformValue; // Animate both scrollers simultaneously

        // Toggle the target for the subsequent animation
        isTargetTop = !isTargetTop;
    }

    // Listen for the 'transitionend' event on the first scroller.
    // When its CSS transition completes, trigger the next animation step.
    scroller1.addEventListener('transitionend', () => {
        triggerNextAnimationStep();
    });

    // Start the animation loop if conditions are met
    if (scroller1.children.length > 0 && scroller2.children.length > 0 && scrollDistance > 0) {
        // A small delay before the first animation starts.
        // This helps ensure that the initial styles and event listeners are fully processed.
        setTimeout(() => {
            triggerNextAnimationStep();
        }, 50); // Start the first animation step after a brief pause
    } else {
        // Log warnings if animation cannot start
        if (scrollDistance <= 0) {
            console.warn(`Scroller element (#scroller) has an offsetHeight of ${scrollDistance}px. Animation requires a positive height to scroll.`);
        }
        if (scroller1.children.length === 0) {
            console.warn('Scroller #scroller has no child items to animate.');
        }
        if (scroller2.children.length === 0) {
            console.warn('Cloned scroller (scroller2) has no child items to animate.');
        }
        console.warn('Animation not started due to missing content or zero scroll distance.');
    }
});
