﻿/* =========================================================
   Portofolio - Custom JavaScript
   Fitur: typing effect, scroll progress, reveal on scroll,
   navbar aktif + shrink, filter proyek, counter angka,
   animasi skill bar, validasi form + toast, dark/light mode,
   back-to-top, smooth scroll, tahun otomatis.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initTyping();
  initScrollProgress();
  initNavbar();
  initReveal();
  initSkillBars();
  initCounters();
  initProjectFilter();
  initContactForm();
  initTheme();
  initBackToTop();
  initSmoothScroll();
  initTooltips();
});

/* ---------- 1. Tahun di footer ---------- */
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- 2. Typing effect ---------- */
function initTyping() {
  const el = document.getElementById("typed");
  if (!el) return;

  const words = ["Front-End Developer", "UI Designer", "JavaScript Enthusiast", "Freelancer"];
  const typeSpeed = 90;
  const eraseSpeed = 45;
  const holdTime = 1400;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = words[wordIndex];

    if (!deleting) {
      el.textContent = current.substring(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(tick, holdTime);
      }
      return setTimeout(tick, typeSpeed);
    }

    el.textContent = current.substring(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(tick, eraseSpeed);
  }

  tick();
}

/* ---------- 3. Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + "%";
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- 4. Navbar: shrink + highlight aktif ---------- */
function initNavbar() {
  const nav = document.getElementById("mainNav");
  const links = document.querySelectorAll("#mainNav .nav-link");
  const sections = [...document.querySelectorAll("section[id], header[id]")];

  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (!sections.length || !links.length) return;

  // Scrollspy manual: cari section terakhir yang sudah melewati garis navbar.
  // (Lebih andal daripada beberapa IntersectionObserver yang saling menimpa.)
  let ticking = false;

  const setActive = () => {
    const line = window.scrollY + 120;
    let current = sections[0];

    sections.forEach((sec) => {
      if (sec.offsetTop <= line) current = sec;
    });

    // Kalau sudah mentok bawah, aktifkan section terakhir
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      current = sections[sections.length - 1];
    }

    links.forEach((link) =>
      link.classList.toggle("active", link.getAttribute("href") === "#" + current.id)
    );
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActive();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  setActive();

  // Tutup menu mobile setelah klik link
  document.querySelectorAll("#navMenu .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu && menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
}

/* ---------- 5. Reveal on scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add("visible"), i * 90);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => io.observe(el));
}

/* ---------- 6. Animasi skill bar ---------- */
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar");
  if (!bars.length) return;

  const animate = (bar) => {
    bar.style.transition = "width 1.3s cubic-bezier(0.22, 1, 0.36, 1)";
    bar.style.width = (bar.dataset.width || 0) + "%";
  };

  if (!("IntersectionObserver" in window)) {
    bars.forEach(animate);
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => io.observe(bar));
}

/* ---------- 7. Counter angka ---------- */
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const run = (el) => {
    const target = parseInt(el.dataset.target || "0", 10);
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + "+";
    };

    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(run);
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => io.observe(el));
}

/* ---------- 8. Filter proyek ---------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".project-item");
  const empty = document.getElementById("noResult");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("active", "btn-primary");
        b.classList.add("btn-outline-secondary");
      });
      btn.classList.add("active", "btn-primary");
      btn.classList.remove("btn-outline-secondary");

      const filter = btn.dataset.filter;
      let shown = 0;

      items.forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("hide", !match);
        if (match) {
          shown++;
          item.classList.add("visible");
          item.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
          );
        }
      });

      if (empty) empty.classList.toggle("d-none", shown > 0);
    });
  });
}

/* ---------- 9. Validasi form kontak ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      showFormAlert("Periksa kembali data yang diisi.", "danger");
      return;
    }

    const btn = form.querySelector("button[type='submit']");
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';

    // Simulasi pengiriman (ganti dengan fetch ke backend/API)
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = original;
      form.reset();
      form.classList.remove("was-validated");
      showToast("Pesan berhasil dikirim! Terima kasih 🙌");
      showFormAlert("Pesan terkirim.", "success");
    }, 1400);
  });
}

function showFormAlert(text, type) {
  const alert = document.getElementById("formAlert");
  if (!alert) return;
  alert.className = "small text-" + type;
  alert.textContent = text;
}

function showToast(message) {
  const toastEl = document.getElementById("liveToast");
  const body = document.getElementById("toastBody");
  if (!toastEl) return;
  if (body) body.textContent = message;
  bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 }).show();
}

/* ---------- 10. Dark / light mode ---------- */
function initTheme() {
  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  if (!btn) return;

  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);

  btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    if (icon) {
      icon.className = theme === "dark" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
    }
  }
}

/* ---------- 11. Back to top ---------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  const onScroll = () => btn.classList.toggle("show", window.scrollY > 400);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- 12. Smooth scroll (fallback browser lama) ---------- */
function initSmoothScroll() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", id);
    });
  });
}

/* ---------- 13. Tooltip Bootstrap (opsional) ---------- */
function initTooltips() {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
    bootstrap.Tooltip.getOrCreateInstance(el);
  });
}
