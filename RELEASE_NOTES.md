# 🎉 DinoCode v1.0.0 - Initial Release

<div align="center">

![DinoCode Banner](https://img.shields.io/badge/DinoCode--AI-v1.0.0-00FF00?style=for-the-badge&logo=whatsapp&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

**🤖 Bot WhatsApp Multi-Device yang Powerful, Cantik, dan Mudah Dikustomisasi!**

[📖 Documentation](#-quick-start) • [🐛 Report Bug](../../issues) • [💡 Request Feature](../../issues)

</div>

---

## 🌟 Highlights

<table>
<tr>
<td width="50%">

### 🔌 Modular Plugin System
Setiap fitur adalah plugin terpisah. Tambah, hapus, atau modifikasi fitur dengan mudah tanpa sentuh kode inti.

</td>
<td width="50%">

### 📱 Pairing Code Support
Login tanpa scan QR Code! Cukup masukkan nomor WhatsApp dan kode pairing.

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Premium UI Design
Menu dengan unicode box drawing, verified badge, dan tampilan yang profesional.

</td>
<td width="50%">

### 🛡️ Anti-Crash System
Error tidak akan menghentikan bot. Bot tetap jalan dan error dicatat untuk review.

</td>
</tr>
</table>

---

## ✨ What's New in v1.0.0

### 🚀 Core Features

| Feature | Description |
|---------|-------------|
| **WhatsApp Multi-Device** | Koneksi stabil menggunakan Baileys library |
| **Pairing Code** | Login tanpa QR Code, cukup masukkan kode |
| **Auto Reconnect** | Otomatis menyambung ulang jika terputus |
| **Graceful Shutdown** | Data tersimpan aman saat bot dimatikan |
| **Dev Mode** | Hot reload plugin tanpa restart bot |

### 🎨 UI/UX Enhancements

| Feature | Description |
|---------|-------------|
| **Futuristic Console** | Logger dengan ASCII art dan warna keren |
| **Box-Style Logs** | Log terstruktur dengan unicode box drawing |
| **Premium Menu** | Menu dengan verified badge dan status broadcast |
| **Detailed Ping** | Info CPU, memory, dan system lengkap |
| **Rich Runtime** | Statistik dan performance metrics |

### 🔌 Plugins Included

<details>
<summary><b>📂 Main Category (5 plugins)</b></summary>

| Plugin | Alias | Description |
|--------|-------|-------------|
| `menu` | - | Menu utama dengan UI premium |
| `infobot` | `info` | Informasi lengkap bot |
| `ping` | `p`, `speed` | Response time + system info |
| `runtime` | `uptime`, `rt` | Uptime dengan metrics |
| `owner` | `creator` | Kontak owner |

</details>

<details>
<summary><b>👑 Owner Category (4 plugins)</b></summary>

| Plugin | Description |
|--------|-------------|
| `broadcast` | Kirim pesan ke semua user |
| `listowner` | Daftar owner |
| `listprem` | Daftar premium user |
| `setmode` | Ubah mode bot |

</details>

<details>
<summary><b>🛠️ Utility Category (2 plugins)</b></summary>

| Plugin | Alias | Description |
|--------|-------|-------------|
| `sticker` | `s`, `stiker` | Buat sticker dari gambar/video |
| `profile` | `me` | Lihat profil user |

</details>

<details>
<summary><b>🎮 Fun Category (2 plugins)</b></summary>

| Plugin | Description |
|--------|-------------|
| `dice` | Lempar dadu |
| `flip` | Lempar koin |

</details>

### 📚 Libraries & Utilities

| Library | Description |
|---------|-------------|
| `serialize.js` | 50+ message properties untuk handling pesan |
| `sockHelper.js` | Helper untuk kirim sticker, file, kontak |
| `exif.js` | Handle metadata sticker (packname, author) |
| `colors.js` | Custom futuristic console logger |
| `database.js` | JSON database untuk users, groups, stats |

---

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/username/dinocode-md.git
cd dinocode-md

# Install dependencies
npm install

# Configure
# Edit config.js - ganti nomor owner!

# Run
npm start
```

---

## 🔧 Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | 18.0.0+ |
| NPM | 8.0.0+ |
| RAM | 512MB+ |

---

## 📸 Screenshots

<details>
<summary><b>🖥️ Console Output</b></summary>

```
╔══════════════════════════════════════════════════════════════╗
║    ██████╗ ██╗   ██╗██████╗ ██╗███╗   ██╗     █████╗ ██╗   ║
║   ██╔═══██╗██║   ██║██╔══██╗██║████╗  ██║    ██╔══██╗██║   ║
║   ██║   ██║██║   ██║██████╔╝██║██╔██╗ ██║    ███████║██║   ║
║   ╚██████╔╝╚██████╔╝██║  ██║██║██║ ╚████║    ██║  ██║██║   ║
╚══════════════════════════════════════════════════════════════╝

╭─────────────────────────────────────────────╮
│ ⚡ COMMAND EXECUTED
│ ├─ Cmd: .menu
│ ├─ User: John
│ ├─ Type: GRP
│ └─ Time: 14:30:30
╰─────────────────────────────────────────────╯
```

</details>

---

## 📋 Full Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed changes.

---

## 🙏 Credits

- **[@rexxhayanasi/elaina-baileys](https://github.com/rexxhayanasi/elaina-baileys)** - WhatsApp Multi-Device Library
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image Processing
- **[FFmpeg](https://ffmpeg.org/)** - Video Processing

---

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by DinoCode Team**

⭐ Star this repo if you find it useful!

</div>
