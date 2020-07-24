document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.querySelector(".carousel");
    const btnNext = carousel.querySelector(".btnCarouselNxt");
    const btnPrev = carousel.querySelector(".btnCarouselPrev");
    const slides = carousel.querySelectorAll(".carouselElement");
    let current = 0;

    function nextSlide() {
        for (const el of slides) {
            el.classList.remove("carouselElementActive");
        }
        current++;
        if (current >= slides.length) {
            current = 0;
        }
        slides[current].classList.add("carouselElementActive")
    }

    function prevSlide() {
        for (const el of slides) {
            el.classList.remove("carouselElementActive");
        }
        current--;
        if (current < 0) {
            current = slides.length - 1;
        }
        slides[current].classList.add("carouselElementActive")
    }

    btnPrev.addEventListener("click", () => {
        prevSlide();
    });
    btnNext.addEventListener("click", () => {
        nextSlide();
    });

});