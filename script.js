// toggle navbar
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// smooth scroll buat ke data target
document.querySelectorAll("[data-target]").forEach(element => {
    element.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("data-target");
        const section = document.getElementById(targetId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// hamburger
const hamburgerMenu = document.getElementById("hamburgerMenu");
const navLinks = document.getElementById("navLinks");

hamburgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Intersection observer for fade-in visibility
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { root: null, rootMargin: "0px", threshold: 0.1 });

document.querySelectorAll(".container, .card, .experience-item, .gallery-item, .faq-item, .contact-form, .contact-info")
    .forEach(element => fadeObserver.observe(element));


// Touch gesture for slider (swipe left/right)
let touchStartX = 0;
let touchStartY = 0;

if (sliderContainer) {
    sliderContainer.addEventListener("touchstart", e => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        stopAutoPlay();
    }, { passive: true });

    sliderContainer.addEventListener("touchend", e => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
            if (diffX > 0) nextSlide();
            else prevSlide();
        }
        startAutoPlay();
    }, { passive: true });
}

