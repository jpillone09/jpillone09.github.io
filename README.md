# Murphy's Desktop Portfolio

## Run on Windows (PowerShell / CMD / VS Code terminal)
1. Install Node.js LTS from https://nodejs.org
2. `npm install`
3. `npm run dev` and open http://localhost:5173
4. `npm run build` for production

## Edit your content
Everything lives in `src/data/content.ts`: links, email, projects, skills, certifications.
Anything in [brackets] is a placeholder. Your portrait is `public/murphy.png`.

## Add project screenshots and links
1. Put images in `public/projects/<project-id>/` (e.g. `public/projects/artifact/1.jpg`).
2. In `src/data/content.ts`, set `shots: [{ src: "/projects/artifact/1.jpg", caption: "Welcome screen" }]`, `repo: "https://github.com/jpillone09/<repo>"` and optionally `demo: "https://..."`.

## Deploy to GitHub Pages
See the steps in `.github/workflows/deploy.yml`: push to `main`, then set Settings > Pages > Source to "GitHub Actions".

## CV, sounds, certificate links
- Replace `public/Murphy_CV.pdf` with your own CV (keep the file name).
- Paste certificate links into `certs` in `src/data/content.ts`.
- Sounds are generated in code (`src/lib/sound.ts`); visitors can mute with the speaker icon.

## Search (Spotlight)
Press **Ctrl+K** (**Cmd+K** on Mac) or click the magnifier in the top bar. It finds apps, projects (by name, category or tech), skills, certifications, links and a few actions (theme, sound, download CV). Arrow keys move, Enter opens, Esc closes.
To make something else searchable, add a line to `searchItems()` in `src/App.tsx`. Items marked `idle: true` also show before you type.

## Resizing windows
Drag any edge or corner of a window. Minimum size is 320 x 220 and windows stay inside the screen. Maximize still fills the screen, and double-clicking the title bar still toggles it. Resizing is turned off on phones (width 760px or less), where windows are full-width.

