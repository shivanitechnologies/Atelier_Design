# ATELIER — Interior Design Studio
> **Spaces with Soul. Designed with Intention.**

A premium, responsive, multi-page luxury architectural interior design studio website crafted with **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript**. Designed with the editorial elegance of high-end architectural magazines, featuring tactile materiality, spacious layouts, subtle animations, and sophisticated neutral chromatics.

---

## 1. Visual Identity & Brand Design

- **Brand Name**: ATELIER
- **Monogram**: Custom Minimalist Architectural Monogram (`assets/logo/favicon.svg`, `logo.svg`, `logo-light.svg`)
- **Tagline**: *Spaces with Soul. Designed with Intention.*
- **Color Palette (Strict 2-Color Architecture Palette)**:
  - **Primary**: Burnished Bronze Gold (`#B89058`, light `#DFC594`, dark `#966F38`) — used for all hero accents, active states, buttons, badges, hairline borders, and monograms.
  - **Secondary**: Architectural Obsidian Noir (`#121212`, card `#222222`) / Warm Alabaster Silk (`#F8F7F4`) — used for deep contrast, typography, and clean canvas backgrounds.
  - **Light Mode**: Warm Alabaster background (`#F8F7F4`), deep obsidian typography (`#121212`), burnished bronze gold buttons & accents (`#B89058`).
  - **Dark Mode**: Architectural obsidian background (`#121212`), warm alabaster typography (`#F8F7F4`), burnished bronze gold buttons & accents (`#B89058`).
- **Typography Stack**:
  - **Headings & Editorial Quotes**: *Cormorant Garamond* (Editorial Display Serif with Light and Italic variants)
  - **Monumental Architectural Numbers & Monograms**: *Cinzel* (High-fashion classical serif)
  - **Micro-labels, Navigation & Body**: *Plus Jakarta Sans* (Clean geometric sans-serif with letter-spacing tracking)

---

## 2. Complete 15-Page Sitemap

| # | Page File | Title | Description |
|---|---|---|---|
| 01 | `index.html` | Home Page 1 (Classic) | Full-width architectural hero, studio intro, services, portfolio, statistics, testimonials, philosophy, and consultation CTA. |
| 02 | `home-2.html` | Home Page 2 (Premium) | Editorial asymmetric split-screen layout, "Where Living Becomes Art", materials & craftsmanship library, signature projects. |
| 03 | `about.html` | About Us | Brand story, mission, vision, founder letter & signature from Elena Vance, team members, studio statistics, philosophy. |
| 04 | `services.html` | Services Overview | 3 primary disciplines (Residential, Office, Modular Kitchen) + 6 specialized services (Renovation, Lighting, Styling, Space Planning). |
| 05 | `service-details.html` | Service Details | In-depth discipline showcase with interactive tab switcher, project metrics, specifications, benefits, gallery, and FAQ accordion. |
| 06 | `portfolio.html` | Portfolio Archive | Curated 9+ project gallery with dynamic category filtering (All, Residential, Office, Modular Kitchen, Renovation) and Lightbox modal. |
| 07 | `process.html` | Design Process | 5-stage architectural workflow: Discovery, Concept Development, Technical Planning, Execution, and Final Styling & Handover. |
| 08 | `blog.html` | The Journal | Architectural essays, live search filter, category tags, featured article spotlight, and pagination UI. |
| 09 | `blog-details.html` | Blog Details | In-depth editorial article, pull quotes, image breakdowns, social sharing links with clipboard copy, and interactive comment system. |
| 10 | `contact.html` | Contact Us & Consultation | Studio address, phone, hours, interactive map placeholder, and complete 8-field consultation form with client-side validation & modal feedback. |
| 11 | `pricing.html` | Design Packages | 3 pricing tiers (Essentials, Popular/Complete, Signature/Bespoke), feature comparison table, and consultation triggers. |
| 12 | `login.html` | Client Portal Login | Minimal luxury login card, logo monogram, password visibility toggle, remember me, forgot password prompt, social sign-ins, and demo credentials filler. |
| 13 | `register.html` | Register | Separate registration page with full name, email, password & confirmation with visibility toggle, and terms validation. |
| 14 | `404.html` | 404 Error Page | Architectural 404 typography, error message, return home CTA, and quick links. |
| 15 | `coming-soon.html` | Coming Soon / Maintenance | Full-screen background, digital curation notice, live real-time countdown timer, and private invitation subscription form. |

---

## 3. Key Frontend Functionality

All interactive features are implemented in vanilla JavaScript and function client-side:

1. **Light / Dark Theme Switcher**:
   - Toggles between Warm Ivory and Charcoal themes.
   - Automatically saves and reads client preference in `localStorage` (`atelier-theme`).
   - Dynamically swaps sun/moon icons.
2. **RTL (Right-to-Left) Layout Support**:
   - Header control toggles `dir="rtl"` / `dir="ltr"` on `<html>`.
   - Persists state in `localStorage` (`atelier-rtl`).
   - Mirroring rules for text alignment, margins, and directional icons.
3. **Interactive Portfolio Category Filter**:
   - Filters projects dynamically by category (All, Residential, Office, Modular Kitchen, Renovation) with smooth CSS transitions.
4. **Architectural Lightbox Modal**:
   - Accessible lightbox modal showing high-res imagery, project title, metadata, and description.
   - Next/Previous controls, keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`), and backdrop click-to-close.
5. **Live Blog Search**:
   - Real-time client-side search filtering across titles, excerpts, and category tags.
6. **Form Validation & Toast Notification System**:
   - Comprehensive validation for Consultation Form, Login, Registration, Comments, and Newsletter forms.
   - Animated toast notification engine (`window.showToast(message, type)`).
   - Password reveal/hide toggle buttons.
7. **Service Discipline Interactive Switcher**:
   - `service-details.html` supports instant switching between Residential, Office, and Modular Kitchen with URL parameter handling (`?service=office`).
8. **Live Countdown Timer**:
   - `coming-soon.html` calculates and renders live days, hours, minutes, and seconds until studio re-curation.

---

## 4. Directory Structure

```
atelier-interior-studio/
├── index.html                  # Home 01 (Classic Landing Page)
├── home-2.html                 # Home 02 (Premium Asymmetric Page)
├── about.html                  # Studio Heritage & Team
├── services.html               # Service Disciplines Overview
├── service-details.html        # Detailed Service Deep-Dive
├── portfolio.html              # Portfolio Gallery & Lightbox
├── process.html                # 5-Stage Architectural Workflow
├── blog.html                   # The Journal Listing & Search
├── blog-details.html           # Full Editorial Article & Comments
├── contact.html                # Consultation Form & Locations
├── pricing.html                # Design Packages & Comparison
├── login.html                  # Client Portal Login
├── register.html               # Client Portal Registration
├── 404.html                    # Error Page
├── coming-soon.html            # Maintenance & Live Countdown
│
├── assets/
│   ├── css/
│   │   ├── styles.css          # Design system tokens, fonts, transitions & lightbox
│   │   └── responsive.css      # RTL mirrors, mobile breakpoint overrides, print styles
│   ├── js/
│   │   ├── app.js              # Header scroll, mobile drawer, toasts, observer, Lucide
│   │   ├── theme.js            # Light/Dark mode & RTL state management
│   │   ├── gallery.js          # Portfolio filtering & Lightbox modal
│   │   └── forms.js            # Validation, password visibility, modal confirmations
│   └── logo/
│       ├── logo.svg            # Dark monogram logotype for light backgrounds
│       ├── logo-light.svg      # Light monogram logotype for dark backgrounds
│       └── favicon.svg         # Architectural monogram favicon
│
└── README.md                   # Documentation & Setup Guide
```

---

## 5. Getting Started

1. Clone or extract the repository files to any folder.
2. Double-click `index.html` to open directly in any modern web browser (Chrome, Safari, Edge, Firefox).
3. Alternatively, run a local development server:
   ```bash
   # Using Python 3:
   python -m http.server 8000

   # Or using Node.js npx:
   npx serve .
   ```
4. Access `http://localhost:8000` to preview the full 16-page website.

---

## 6. Accessibility & SEO Compliance

- Semantic HTML5 landmark elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
- Descriptive alt text on all high-resolution architectural photography.
- Contrast compliance between Olive `#777B63` and Warm Ivory `#F7F5F0` / Charcoal `#181917`.
- Screen-reader labels (`aria-label`) on all interactive buttons, icon buttons, and navigation drawers.
- Keyboard accessible navigation and modal interactions.
- Respect for `@media (prefers-reduced-motion: reduce)` to disable intense transitions for sensitive users.
- Open Graph tags and meta descriptions on all pages.

---

&copy; 2026 ATELIER Interior Design Studio. All rights reserved.

# Atelier_Design
#   A t e l i e r _ D e s i g n  
 