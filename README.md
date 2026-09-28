# Web Profil Siswa (SMA/SMK)

Web profil sederhana tapi interaktif. HTML + CSS + JS murni — tanpa install, tanpa build tool.

## Cara buka

Klik dua kali `index.html`, atau kalau mau lewat terminal:

```powershell
Start-Process index.html
```

## Cara ubah teks — LANGSUNG DI `index.html`

Semua tulisan ada di **`index.html`**. Cari tulisannya, ganti, simpan, refresh. Selesai.

| Yang mau diubah | Cari ini di `index.html` |
| --- | --- |
| Nama pendek di hero | `Rahadian` di `.hero-name` |
| Nama panjang di navbar | `Putu Rahadian Ardhia Permana` |
| Inisial logo | `RA` di `.brand-badge` |
| Foto profil | `src="foto.jpeg"` di `<img class="avatar">` |
| Nama sekolah & jurusan | `SMK Negeri 1 Denpasar` / `RPL` |
| Statistik (umur, project) | `data-count="16"` dan tulisannya di sebelahnya |
| 3 kartu Tentang Saya | `<article class="card">` |
| Skill | angka di `.skill-val` **dan** di `style="--w: 75%"` (ubah dua-duanya) |
| Hobi | `data-detail="..."` di `<button class="hobby">` |
| Kontak | link `mailto:`, `instagram.com`, `wa.me`, `github.com` |
| Judul tab browser | `<title>` di paling atas |

Mau tambah kartu / skill / hobi / kontak? Copy satu blok yang mirip, tempel di bawahnya, ganti isinya.

## `script.js` isinya apa?

Cuma **mesin** — ganti tema, menu HP, angka naik, bar skill, klik hobi, tombol ke atas.
Gak ada teks di sana, jadi **tidak perlu dibuka** kecuali mau menyetel cepatnya:

```js
const OPSI = {
  kecepatanAngka: 900,   // animasi angka di hero (ms)
  simpanTema: true,      // ingat pilihan tema setelah refresh
  ambangTombolAtas: 400, // kapan tombol ↑ muncul (px)
};
```

## Pakai foto

1. Taruh file foto (misal `foto.jpg`) di folder yang sama dengan `index.html`.
2. Di `index.html` ganti `src="foto.jpeg"` jadi nama file fotomu.
3. Foto otomatis dipotong bulat by CSS (`.avatar`).

## Di `style.css` (paling atas, `:root`)

- `--primary` dan `--accent` — ganti 2 warna ini buat ubah seluruh tema sekaligus.
- `--maxw` — lebar maksimal halaman.
- `body.dark { ... }` — warna untuk mode gelap.

## Fitur interaktif

- 🌙 Tombol ganti tema terang/gelap (tersimpan di browser)
- 📱 Menu hamburger di layar HP
- ✨ Animasi muncul saat halaman di-scroll
- 🔢 Angka statistik menghitung naik
- 📊 Bar skill terisi otomatis saat terlihat
- 🎯 Kartu hobi bisa diklik dan detailnya berubah
- ⬆️ Tombol balik ke atas + navbar melengket di atas
- 📐 Responsif: rapi di HP, tablet, dan laptop

Tanpa library, tanpa build tool, tanpa server. Cukup 3 file: `index.html`, `style.css`, `script.js` (+ foto).

## Git

Folder ini sudah jadi repository Git. Alur biasa:

```powershell
cd c:\Code\Bootstraps
git status                    # lihat apa yang berubah
git add .                     # tandai semua perubahan
git commit -m "pesan commit"  # simpan
```

git sudah terpasang di `C:\Program Files\Git\cmd`. Kalau perintah `git` tidak dikenali,
tambahkan dulu foldernya ke PATH lewat:

```powershell
$env:Path += ";C:\Program Files\Git\cmd"
```

Repo online: [github.com/anrahadi-dotcom/Simple-Profile](https://github.com/anrahadi-dotcom/Simple-Profile)

```powershell
git push
```

Folder `Portofolio/` dan `Test 1/` sengaja tidak ikut di-commit (lihat `.gitignore`).

## Catatan

Bagian kontak cuma berisi kartu link (email, Instagram, WhatsApp, GitHub).
Kalau nanti mau ada form kirim pesan, tinggal tambahkan lagi.
