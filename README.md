# Tabdar

**A simple and practical Chrome extension to organize, save, and restore browser tabs.**

Tabdar helps you manage browser tab clutter by allowing you to save multiple tabs into named collections and restore them whenever you need them.

Instead of keeping dozens of tabs open, organize your browsing sessions into collections and get back to your work with ease.

## ✨ Features

- **View Open Tabs** — See currently open browser tabs.
- **Select Multiple Tabs** — Select individual tabs or select all tabs at once.
- **Save Collections** — Save selected tabs into named collections with optional descriptions.
- **Persistent Storage** — Keep your collections saved locally using Chrome Storage API.
- **Restore Tabs** — Reopen all tabs from a saved collection.
- **Tab Validation** — Only HTTP and HTTPS URLs are eligible for saving.

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Chrome Extensions API (Manifest V3)
- Chrome Storage API

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Google Chrome

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd tabdar
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Build the project:

   ```bash
   npm run build
   ```

### Load the Extension in Chrome

1. Open `chrome://extensions/` in Chrome.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the generated `dist` directory.
5. Pin Tabdar to your Chrome toolbar.

## 📁 Project Status

Tabdar is currently under active development.

The initial Popup experience includes tab selection, collection creation, local persistence, and tab restoration.

A full Dashboard experience is planned for future development.

## 🗺️ Roadmap

- [x] View open browser tabs
- [x] Select individual and multiple tabs
- [x] Save tabs into named collections
- [x] Persist collections using Chrome Storage
- [x] Restore saved tabs
- [ ] Complete tab validation and feedback UX
- [ ] Build the full Dashboard interface
- [ ] Manage and organize saved collections
- [ ] Improve collection management experience
- [ ] Add duplicate tab detection

## 📌 Project Goals

Tabdar aims to make browser tab management simpler, more organized, and less distracting.

---

**Built with ❤️ for a better browsing experience.**