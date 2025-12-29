# Premium Website Template

A production-quality, premium Next.js template designed for construction, architecture, and high-end service businesses. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Reskin Guide

This template is designed to be completely rebranded by editing a few key files.

### 1. Content & Images (Single Source of Truth)

Edit `content/site.ts`. This file contains:

- Business Name & Details
- Navigation Links
- All Text Copy
- Image Paths

**To Rebrand:** Simply update the strings in `siteConfig`.

### 2. Colors & Typography

Edit `app/globals.css` and `tailwind.config.ts`.

- **Colors:** Update the CSS variables in `app/globals.css` (e.g., `--accent`, `--background`, `--foreground`).
- **Fonts:** `app/layout.tsx` loads the font (Manrope). You can swap this for another Google Font.

### 3. Images

Place your images in `public/images/`. Update the paths in `content/site.ts`.

## 📁 Project Structure

- `/app`: Pages and Layouts (Home, About, Services, Contact)
- `/components`: Reusable UI components
  - `/nav`: Navigation & Mobile Menu
  - `/sections`: Page sections (Hero, Features, Grids)
  - `/ui`: Low-level primitives (Button, Container, Reveal)
- `/content`: `site.ts` (Configuration file)
- `/public`: Static assets

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS Variables
- **Typscript:** Strict Mode
- **Animation:** Framer Motion
- **Icons:** Lucide React
