# Web Profil Siswa (SMA/SMK)

Web profil sederhana tapi interaktif. HTML + CSS + JS murni — tanpa install, tanpa build tool.

## Cara buka

Klik dua kali `index.html`, atau kalau mau lewat terminal:

```powershell
Start-Process index.html
```

## Cara ubah teks — CUKUP 1 TEMPAT

Buka **`script.js`**, lihat objek `PENGATURAN` di baris paling atas.
Semua isi web diambil dari situ. Ubah nilainya → simpan → refresh browser.

```js
const PENGATURAN = {
  inisial: "AR",                     // 2 huruf di logo pojok kiri atas
  nama: "Ganti Nama Kamu",           // dipakai di navbar, hero, footer, dan judul tab
  sekolah: "SMK Negeri 1 Ganti Ini",
  jurusan: "RPL",
  deskripsi: "Tulis cerita singkat tentang kamu di sini.",
  foto: "",                          // isi "foto.jpg" kalau mau pakai foto

  statistik: [
    { angka: 17, label: "Umur" },
    { angka: 12, label: "Project" },
    { angka: 3,  label: "Tahun Ngoding" },
  ],

  tentang: [ { icon: "🎓", judul: "Sekolah", isi: "..." } ],
  skill:   [ { nama: "HTML & CSS", persen: 90 } ],
  hobi:    [ { nama: "⚽ Futsal", detail: "Main futsal tiap Sabtu." } ],
  kontak:  [ { icon: "✉️", judul: "Email", teks: "...", link: "mailto:..." } ],
};
```

- **Mau tambah / kurangi** kartu, skill, hobi, atau kontak? Cukup tambah atau hapus satu baris di daftarnya.
- **Persen skill** tulis angka 0–100 saja, panjang bar-nya mengikuti otomatis.
- **Hobi** otomatis jadi tombol yang bisa diklik (yang pertama aktif duluan).
- **Kontak** otomatis jadi kartu yang bisa diklik sesuai `link`.

### Pakai foto

1. Taruh file foto (misal `foto.jpg`) di folder yang sama dengan `index.html`.
2. Di `script.js` ganti `foto: ""` jadi `foto: "foto.jpg"`.
3. Kalau dikosongkan, yang tampil adalah huruf pertama dari `nama` kamu.

### `index.html`

Biasanya tidak perlu disentuh. Isinya cuma kerangka; teksnya diisi oleh `script.js`.
Kalau mau, boleh hapus komentar `<!-- -->` di dalamnya.

### Di `style.css` (paling atas, `:root`)

- `--primary` dan `--accent` — ganti 2 warna ini buat ubah seluruh tema sekaligus.
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

## Catatan

Bagian kontak cuma berisi kartu link (email, Instagram, WhatsApp, GitHub).
Kalau nanti mau ada form kirim pesan, tinggal tambahkan lagi.
