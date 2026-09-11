/* -------------------------
   PROJECT CARD SCROLL ANİMASYONU
------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    const projectCards = document.querySelectorAll(".project-card");
    if (!projectCards.length) return;

    const projectObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    // Yukarı çıkınca tekrar animasyon oynayabilsin
                    entry.target.classList.remove("show");
                }
            });
        },
        {
            threshold: 0.25, // kartın %25'i görünce tetikle
        }
    );

    projectCards.forEach((card) => projectObserver.observe(card));
});


// ABOUT LİSTE POPUP ANİMASYONU
const aboutItems = document.querySelectorAll(".about-list li");

if (aboutItems.length > 0) {
    const aboutObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in");
                } else {
                    entry.target.classList.remove("animate-in");
                }
            });
        },
        {
            threshold: 0.25,
        }
    );

    aboutItems.forEach((item) => aboutObserver.observe(item));
}
