# Michael Bryan Mandey - Developer Portfolio

## 1. Project Overview
- **Project Name**: Michael Bryan Mandey - Developer Portfolio
- **Purpose**: A personal portfolio website to showcase web development projects, skills, educational background, certificates, and resume.
- **Main Features**: 
  - Dynamic WebGL "Pixel Blast" interactive background.
  - Custom cursor glow and trailing ring effects.
  - Project slider and certificate galleries.
  - Multi-page routing covering Home, About, Portfolio, Skills, Education, Certificates, and Contact.
- **Target Users**: Recruiters, clients, and fellow developers.
- **Technologies Used**: HTML5, CSS3, JavaScript (Vanilla WebGL & DOM Manipulation).

## 2. Tech Stack
- **HTML5**: For structure and semantic markup.
- **CSS3 (Vanilla)**: For styling, custom animations, responsive layouts, and theming. No utility frameworks like Tailwind were used to maintain maximum control over the bespoke animations.
- **JavaScript (Vanilla)**: For interactions, sliders, dynamic backgrounds, and custom cursor logic.
- **WebGL**: For the custom pixel blast background effect (`pixelblast.js`).
- **Vercel**: For deployment and static hosting (via `vercel.json`).

## 3. Libraries

**External Resources via CDN**
- **Font Awesome 6.5.1**: Used for icons across the UI.
- **Google Fonts**: Uses `Syne`, `DM Sans`, `DM Mono`, and `Poppins` for typography.

## 4. Project Structure
```text
project/
│
├── assets/
│   ├── certificates/      # Certificate images/PDFs
│   ├── css/               # Modular CSS files (dock.css, shared.css)
│   ├── images/            # Project images and personal photos
│   ├── js/                # Modular JavaScript (dock.js, mobile-nav.js, pixelblast.js, etc.)
│   └── resume/            # Resume documents
│
├── about.html             # About me page
├── certificates.html      # Certificates showcase page
├── contact.html           # Contact information page
├── education.html         # Education history page
├── index.html             # Main landing page
├── portfolio.html         # Projects showcase page
├── resume.html            # Resume view page
├── skills.html            # Technical skills page
├── style.css              # Legacy/additional styles
├── vercel.json            # Vercel deployment configuration
└── README.md              # Project documentation
```

**Folder Responsibilities**:
- `assets/css/`: Contains the global styles, layout tokens, and specific component styles like the Mac-like dock (`dock.css`).
- `assets/js/`: Contains the logic for the interactive elements (WebGL backgrounds, custom cursors, responsive nav).
- `Root directory`: Contains all the HTML entry points for the multi-page application.

## 5. Routing
- **Routing System**: Multi-Page Application (MPA) using native browser navigation between HTML files.
- **Public Routes**: `/` (index.html), `/about.html`, `/portfolio.html`, `/skills.html`, `/education.html`, `/certificates.html`, `/contact.html`, `/resume.html`.
- **Protected Routes**: *Not detected in this project.*
- **Dynamic Routes**: *Not detected in this project.*

## 6. Components
While this is a vanilla HTML project without a component framework, reusable UI patterns are achieved via shared CSS classes (`shared.css`):
- **`.glow-cursor`**: A dynamic yellow glow that follows the user's mouse.
- **`.nav-pill` / Navigation Dock**: The bottom MacOS-style dock navigation.
- **`.school-card` / `.proj-card`**: Reusable card layouts for displaying lists of education and projects.
- **Focus Sliders**: JavaScript-driven slider for projects and certificates (`project-slider.js` and `makeFocusSlider` in `index.html`).

## 7. State Management
- **State Management**: Vanilla JavaScript DOM manipulation. State (like current slider index, cursor position, active navigation link) is kept in local JS variables and directly applied to DOM element styles/classes.

## 8. Folder Responsibilities
- **`assets/js`**: Core logic layer. Handles WebGL canvas rendering, slider interactions, and global UI effects like the cursor.
- **`assets/css`**: Core presentation layer. Defines CSS variables, layout systems, and animations.
- **`assets/images`**: Static asset storage for raster graphics.
- 
## 9. Build Process
- **Development**: Edit HTML/CSS/JS directly. Use a live server extension (like VSCode Live Server) for hot-reloading.
- **Production Build**: No bundling or transpilation step is required.
- **Deployment**: Configured for Vercel via `vercel.json` which serves the root directory statically.

## 10. Performance
- **Lazy loading**: *Not detected.* (Improvement opportunity for images).
- **Code splitting**: Native MPA inherently splits HTML/CSS per page, but JS/CSS assets could be optimized.
- **Memoization / Suspense**: *Not applicable (Vanilla JS).*
- **Image optimization**: Static images; no automated optimization pipeline detected.

## 11. Code Quality
- **ESLint / Prettier**: *Not detected in this project.*
- **TypeScript**: *Not detected in this project.*
- **Organization**: Clean separation of HTML, CSS, and JS. The `assets/` structure is logical and scalable for a static site.

## 12. Improvements
- **Architecture**: Migrate to a framework like Next.js, Vite (React/Vue), or Astro. This would allow creating true reusable components (e.g., `<Navbar />`, `<Footer />`) instead of duplicating HTML across 8 pages.
- **Performance**: Compress raster images (use WebP/AVIF format) and add `loading="lazy"` to `<img>` tags below the fold.
- **Maintainability**: Add Prettier for consistent code formatting and consider implementing a bundler to minify CSS and JS files.
- **Accessibility (a11y)**: Add `aria-labels` to icon-only buttons, ensure adequate contrast, and allow pausing the WebGL animations for users with reduced motion preferences.

---

### Features
- 🚀 **Zero-Dependency Frontend**: Lightning fast, built entirely without heavy UI frameworks.
- 🎨 **WebGL Animations**: Custom shader-based interactive background.
- 🖱️ **Fluid Interactions**: Custom trailing cursor and hover states.
- 📱 **Fully Responsive**: Adapts seamlessly from desktop to mobile screens.

### Usage
Simply navigate through the site using the bottom dock or mobile menu. Interactive elements like the project slider and WebGL background respond to mouse/touch inputs.

### Author
**Michael Bryan Mandey**
- GitHub: [Your GitHub]
- LinkedIn: [Your LinkedIn]

### Acknowledgements
- Font Awesome for icons.
- Google Fonts for typography.
