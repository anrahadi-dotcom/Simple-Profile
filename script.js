/* =========================================================
   Web Profil Siswa — script.js

   SEMUA TEKS & DATA DIUBAH DI OBJEK "PENGATURAN" DI BAWAH.
   Ubah nilainya, simpan (Ctrl+S), lalu refresh halaman.
   ========================================================= */
const PENGATURAN = {

  // --- Identitas ---
  inisial: "RA",                       // 2 huruf di logo navbar
  nama: "Putu Rahadian Ardhia Permana", // nama lengkap (navbar & judul tab)
  namaPendek: "Rahadian",               // nama di bagian hero
  sekolah: "SMK Negeri 1 Denpasar",
  jurusan: "RPL",

  // Deskripsi singkat di bagian paling atas
  deskripsi:
    "Saya sedang mempelajari HTML CSS JS di SMK 1 Denpasar, Saya juga dibantu belajar JS " +
    "di Timedoor, Dan target saya untuk kedepannya adalah supaya menjadi front-end Dev yang " +
    "paham segala perubahan dan mampu beradapasi di lingkup web programming, cita-cita saya " +
    "adalah untuk bekerja di luar negeri.",

  // Foto profil: taruh file "foto.jpg" satu folder dengan index.html,
  // lalu tulis "foto.jpg" di bawah. Kosongkan ("") kalau mau pakai inisial.
  foto: "foto.jpeg",

  // --- Statistik di hero ---
  statistik: [
    { angka: 16, label: "Umur" },
    { angka: 4, label: "Project" },
    { angka: 2,  label: "Tahun Ngoding" },
  ],

  // --- Tentang saya (boleh tambah / kurangi isinya) ---
  tentang: [
    {
      icon: "🎓",
      judul: "Sekolah",
      isi: "SMK Negeri 1 Denpasar, kelas XI RPL.",
    },
    {
      icon: "💻",
      judul: "Fokus Belajar",
      isi: "Belajar HTML, CSS, JavaScript, dan dasar backend. Suka bikin tampilan web yang rapi. Dan mulai senang mengikuti lomba",
    },
    {
      icon: "🌱",
      judul: "Yang Lagi Dikejar",
      isi: "Ikut PKL di perusahaan IT, bikin portofolio yang bagus, dan lulus dengan nilai memuaskan.",
    },
  ],

  // --- Skill (persen 0-100) ---
  skill: [
    { nama: "HTML & CSS",    persen: 75 },
    { nama: "JavaScript",    persen: 35 },
    { nama: "PHP / Laravel", persen: 10 },
    { nama: "Desain UI",     persen: 80 },
  ],

  // --- Hobi (klik kartunya buat lihat detail) ---
  hobi: [
    { nama: "⚽ Futsal",        detail: "Main futsal tiap Sabtu sore bareng teman sekelas." },
    { nama: "🥋 Taekwondo",     detail: "Suka nendang nendang saat tidak ada kerjaan" },
    { nama: "🤼  MMA", detail: "Selain suka nendang saya juga suka mukul dan banting, of course dengan padsworks dan teman sparring" },
    { nama: "🎮 Ngegame",    detail: "Senang memainkan beberapa game cth: Minecraft saya suka membuat modpack untuk mengasah imajinasi saya" },
  ],

  // --- Kontak (link + teks yang tampil) ---
  kontak: [
    { icon: "✉️", judul: "Email",     teks: "anrahadi02@gmail.com",       link: "mailto:anrahadi02@gmail.com" },
    { icon: "📸", judul: "Instagram", teks: "@ptrahhdiann",          link: "https://instagram.com/ptrahhdiann" },
    { icon: "💬", judul: "WhatsApp",  teks: "0817-7930-5092",         link: "https://wa.me/6281779305092" },
    { icon: "🐙", judul: "GitHub",    teks: "@anrahadi-dotcom",          link: "https://github.com/anrahadi-dotcom" },
  ],

  // --- Lain-lain ---
  kecepatanAngka: 900,   // animasi angka hero (makin kecil makin cepat, ms)
  simpanTema: true,      // ingat pilihan tema gelap/terang setelah refresh
};

/* =========================================================
   Di bawah ini mesinnya — tidak perlu diubah.
   ========================================================= */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- JUDUL HALAMAN ---------- */
document.title = `Profil ${PENGATURAN.nama}`;

/* ---------- ISIKAN TEKS DARI PENGATURAN ---------- */
$(".brand-name").textContent = PENGATURAN.nama;
$(".hero-name").textContent = PENGATURAN.namaPendek || PENGATURAN.nama;
$(".hero-role").innerHTML =
  `Siswa <strong>${PENGATURAN.sekolah}</strong> — ` +
  `Jurusan <strong>${PENGATURAN.jurusan}</strong>`;
$(".hero-desc").textContent = PENGATURAN.deskripsi;
$(".footer-text").textContent =
  "Dibuat sendiri pakai HTML, CSS & JavaScript.";

// Statistik hero
$(".hero-stats").innerHTML = PENGATURAN.statistik
  .map((s) => `<li><b data-count="${s.angka}">0</b><span>${s.label}</span></li>`)
  .join("");

// Kartu "Tentang Saya"
$(".cards").innerHTML = PENGATURAN.tentang
  .map((t) => `
    <article class="card reveal">
      <div class="card-icon">${t.icon}</div>
      <h3>${t.judul}</h3>
      <p>${t.isi}</p>
    </article>`)
  .join("");

// Bar skill
$(".skills").innerHTML = PENGATURAN.skill
  .map((s) => {
    const p = Math.max(0, Math.min(100, Number(s.persen) || 0));
    return `
      <div class="skill reveal">
        <div class="skill-head"><span class="skill-name">${s.nama}</span><span class="skill-val">${p}%</span></div>
        <div class="bar"><i style="--w: ${p}%"></i></div>
      </div>`;
  })
  .join("");

// Tombol hobi
$("#hobbyList").innerHTML = PENGATURAN.hobi
  .map((h, i) =>
    `<button class="hobby${i === 0 ? " active" : ""}" data-detail="${h.detail}">${h.nama}</button>`)
  .join("");
$("#hobbyDetail").textContent = PENGATURAN.hobi[0]?.detail || "";

// Kartu kontak
$(".contact-grid").innerHTML = PENGATURAN.kontak
  .map((k) => `
    <a class="contact-card reveal" href="${k.link}" target="_blank" rel="noopener">
      <span class="contact-icon">${k.icon}</span>
      <b>${k.judul}</b>
      <small><span class="contact-info">${k.teks}</span></small>
    </a>`)
  .join("");

/* ---------- LOGO NAVBAR ---------- */
$(".brand-badge").textContent = PENGATURAN.inisial;

/* ---------- FOTO PROFIL ---------- */
const avatar = $("#avatar");
if (PENGATURAN.foto) {
  avatar.style.backgroundImage = `url("${PENGATURAN.foto}")`;
  avatar.textContent = "";
  $(".avatar-hint").style.display = "none";
} else {
  avatar.textContent = (PENGATURAN.nama.trim().charAt(0) || "A").toUpperCase();
}

/* ---------- TEMA GELAP / TERANG ---------- */
const themeBtn = $("#themeBtn");
const temaTersimpan = PENGATURAN.simpanTema ? localStorage.getItem("tema-profil") : null;

if (temaTersimpan === "gelap") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const gelap = document.body.classList.contains("dark");
  themeBtn.textContent = gelap ? "☀️" : "🌙";
  if (PENGATURAN.simpanTema) {
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
navLinks.querySelectorAll("a").forEach((link) => {
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
const statistik = $$(".hero-stats b[data-count]");

function hitungNaik(el) {
  const target = Number(el.dataset.count);
  const mulai = performance.now();

  function langkah(now) {
    const progres = Math.min((now - mulai) / PENGATURAN.kecepatanAngka, 1);
    // easing biar terasa halus
    const halus = 1 - Math.pow(1 - progres, 3);
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

statistik.forEach((el) => pengamatAngka.observe(el));

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

    // animasi kecil biar terasa hidup
    detailHobi.style.opacity = 0;
    detailHobi.style.transform = "translateY(8px)";
    requestAnimationFrame(() => {
      detailHobi.style.transition = "opacity .3s, transform .3s";
      detailHobi.style.opacity = 1;
      detailHobi.style.transform = "none";
    });
  });
});

/* ---------- TOMBOL KE ATAS ---------- */
const toTop = $("#toTop");

window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 400);
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
