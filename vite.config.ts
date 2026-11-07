import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base "/" is correct for a user site (jpillone09.github.io). For a project site, use "/repo-name/".
export default defineConfig({ base: "/", plugins: [react()] });
