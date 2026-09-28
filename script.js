/* =========================================================
   Web Profil Siswa — script.js
   Isinya hanya "mesin" (behavior). SEMUA TEKS ada di index.html,
   jadi ubah tulisan langsung di index.html saja.

   Bagian yang bisa disetel ada di objek OPSI di bawah.
   ========================================================= */
const OPSI = {
  kecepatanAngka: 900, // animasi angka di hero (makin kecil makin cepat, ms)
  simpanTema: true, // ingat pilihan tema gelap/terang setelah refresh
  ambangTombolAtas: 400, // sejauh apa (px) di-scroll sampai tombol ↑ muncul
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- TEMA GELAP / TERANG ---------- */
const themeBtn = $("#themeBtn");
const temaTersimpan = OPSI.simpanTema
  ? localStorage.getItem("tema-profil")
  : null;

if (temaTersimpan === "gelap") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const gelap = document.body.classList.contains("dark");
  themeBtn.textContent = gelap ? "☀️" : "🌙";
  if (OPSI.simpanTema) {
    localStorage.setItem("tema-profil", gelap ? "gelap" : "terang");
  }
});

/* ---------- MENU MOBILE ---------- */
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");

navToggle.addEventListener("click", () => {
  const terbuka = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", terbuka);
});

// Tutup menu setelah klik salah satu link (di HP)
$$("a", navLinks).forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ---------- ANIMASI MUNCUL SAAT SCROLL ---------- */
const pengamat = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        pengamat.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

$$(".reveal").forEach((el) => pengamat.observe(el));

/* ---------- ANGKA STATISTIK (hitung naik) ---------- */
function hitungNaik(el) {
  const target = Number(el.dataset.count);
  const mulai = performance.now();

  function langkah(now) {
    const progres = Math.min((now - mulai) / OPSI.kecepatanAngka, 1);
    const halus = 1 - Math.pow(1 - progres, 3); // biar terasa halus
    el.textContent = Math.round(target * halus);
    if (progres < 1) requestAnimationFrame(langkah);
  }
  requestAnimationFrame(langkah);
}

const pengamatAngka = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        hitungNaik(entry.target);
        pengamatAngka.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

$$(".hero-stats b[data-count]").forEach((el) => pengamatAngka.observe(el));

/* ---------- BAR SKILL (isi saat terlihat) ---------- */
const pengamatSkill = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        pengamatSkill.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);

$$(".bar").forEach((bar) => pengamatSkill.observe(bar));

/* ---------- HOBI (klik untuk lihat detail) ---------- */
const tombolHobi = $$(".hobby");
const detailHobi = $("#hobbyDetail");

tombolHobi.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    tombolHobi.forEach((t) => t.classList.remove("active"));
    tombol.classList.add("active");
    detailHobi.textContent = tombol.dataset.detail;
  });
});

/* ---------- TOMBOL KE ATAS ---------- */
const toTop = $("#toTop");

window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > OPSI.ambangTombolAtas);
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
