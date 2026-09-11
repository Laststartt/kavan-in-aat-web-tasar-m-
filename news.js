/* =====================
     HABER SLIDER
===================== */

document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".news-slide");
    const prevBtn = document.querySelector(".news-arrow.prev");
    const nextBtn = document.querySelector(".news-arrow.next");
    const pagination = document.querySelector(".news-pagination");

    let index = 0;

    /* -------- Pagi Dots Oluştur -------- */
    slides.forEach((_, i) => {
        let dot = document.createElement("span");
        dot.textContent = i + 1;

        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => goTo(i));

        pagination.appendChild(dot);
    });

    /* -------- Pagination Güncelle -------- */
    function updatePagination() {
        pagination.querySelectorAll("span").forEach((el, i) => {
            el.classList.toggle("active", i === index);
        });
    }

    /* -------- Slide Değiştir -------- */
    function goTo(i) {
        slides.forEach(sl => sl.classList.remove("active"));

        index = (i + slides.length) % slides.length;

        slides[index].classList.add("active");

        updatePagination();
    }

    /* -------- İleri - Geri -------- */
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    /* -------- Otomatik Kaydırma -------- */
    setInterval(next, 7000);
});
