# 🌍 Tiny Planet

## 👥 Team Members

| Name | Register Number |
|---|---|
| Nivriti Muthuvairavan | 2024503005 |
| Sana Tasneem Azimudin | 2024503007 |
| Yashika V | 2024503008 |

---

Tiny Planet is a cozy, map-driven disaster preparedness game built with **React, Vite, TypeScript, Zustand, and TailwindCSS**.

It blends playful animation with real-world skills, helping players learn gentle preparedness strategies without fear.

---

## ✨ Features

- Animated **starry start screen** with fade-in/out transitions
- **Start Game button** that smoothly transitions into gameplay
- Map-based interactions with avatars, NPCs, and scenario triggers
- **Toast notifications** for feedback and hints
- Built with a modern stack:
  - React + Vite
  - Zustand for state management
  - Framer Motion for animations
  - TailwindCSS for styling
  - Radix UI + Lucide icons for accessible components

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18)
- npm (>= 9)

### Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/<your-username>/Tiny-Planet.git
cd Tiny-Planet
npm install
```

### Development

Run the local dev server:

```bash
npm run dev
```

Open [http://localhost:5173/#/](http://localhost:5173/#/) in your browser.

### Production Build

Create a production build:

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

---

## 🌐 Deployment (GitHub Pages)

This project is configured for GitHub Pages with Vite:

1. Ensure `vite.config.ts` has:

   ```ts
   export default defineConfig({
     base: "/Tiny-Planet/",
   });
   ```

2. Build and deploy:

   ```bash
   npm run build
   npm run deploy
   ```

3. Your app will be live at:

   ```text
   https://<your-username>.github.io/Tiny-Planet/#/
   ```

---

## 📂 Project Structure

```text
src/
 ├─ components/     # UI components
 ├─ hooks/          # Custom hooks (toast, etc.)
 ├─ store/          # Zustand game store
 ├─ pages/          # StartScreen, Index, etc.
 └─ main.tsx        # Entry point

public/
 └─ 404.html        # SPA fallback for GitHub Pages
```

---

## 🛠️ Scripts

- `npm run dev` → Start local dev server
- `npm run build` → Build for production
- `npm run preview` → Preview production build
- `npm run deploy` → Deploy to GitHub Pages (`gh-pages` branch)

---
