const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

mobileBtn.addEventListener("click", () => {
    mobileBtn.classList.toggle("active");
    mobileNav.classList.toggle("show");
});
