// ===================== DİL AYARI + SAYAC =====================
document.addEventListener("DOMContentLoaded", function () {
  // ===================== DİL AYARI =====================
  if (typeof lang === "undefined") {
    console.error("lang.js bulunamadı.");
  } else {
    function setLanguage(langCode) {
      if (!lang[langCode]) return;

      // Normal metinler
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var key = el.getAttribute("data-i18n");
        var value = lang[langCode][key];
        if (typeof value === "undefined") return;
        el.textContent = value;
      });

      // Placeholder'lar
      document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
        var key = el.getAttribute("data-i18n-ph");
        var value = lang[langCode][key];
        if (typeof value === "undefined") return;
        el.placeholder = value;
      });

      // Dil butonlarına active sınıfı
      document.querySelectorAll(".lang-switch button").forEach(function (btn) {
        const btnLang =
          btn.getAttribute("data-lang") ||
          (btn.id === "lang-tr"
            ? "tr"
            : btn.id === "lang-en"
            ? "en"
            : null);

        btn.classList.toggle("active", btnLang === langCode);
      });

      try {
        localStorage.setItem("lang", langCode);
      } catch (e) {
        console.warn("localStorage yazılamadı:", e);
      }
    }

    // Dil butonu tıklama
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        let code = btn.getAttribute("data-lang");

        // data-lang yoksa id'den anla
        if (!code) {
          if (btn.id === "lang-tr") code = "tr";
          else if (btn.id === "lang-en") code = "en";
        }

        if (!code) return;
        setLanguage(code);
      });
    });

    // Sayfa açılışında son seçilen dili yükle
    var saved = "tr";
    try {
      saved = localStorage.getItem("lang") || "tr";
    } catch (e) {
      saved = "tr";
    }
    setLanguage(saved);
  }

  // ===================== SAYAC ANİMASYONU =====================
  const statsSection = document.querySelector(".stats-area");

  if (!statsSection) {
    // Bu sayfada sayaç yoksa devam etmeye gerek yok
    return;
  }

  function animateCounters() {
    const counters = document.querySelectorAll(".count");

    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let value = 0;
      const speed = target / 300; // hız

      const updateCount = () => {
        if (value < target) {
          value += speed;
          counter.textContent = Math.floor(value);
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;

          // Sonundaki işaretleri ekleyelim
          if (target === 40 || target === 100 || target === 50000) {
            counter.textContent += "+";
          }
          if (target === 100 && counter.textContent.includes("100")) {
            counter.textContent = "%100";
          }
        }
      };

      updateCount();
    });
  }

  // Bölüm ekrana gelince başlat
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            obs.disconnect(); // bir kere çalışsın
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsSection);
  } else {
    // Eski tarayıcıysa direkt başlat
    animateCounters();
  }
});
