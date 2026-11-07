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
