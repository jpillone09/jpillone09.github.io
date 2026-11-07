// EDIT ME. Anything in [brackets] is a placeholder.
export const links = {
  github: "https://github.com/jpillone09",
  linkedin: "https://www.linkedin.com/in/jpillone09",
  facebook: "https://www.facebook.com/johnmurphy.pillone.7",
  email: "jpillone09@gmail.com",
};
export interface Project { id: string; name: string; category: string; summary: string; tech: string[]; role: string; repo?: string; demo?: string; shots?: { src: string; caption: string }[]; features?: string[] }
// To add screenshots: put images in public/projects/<id>/ and list them, e.g. shots: [{ src: "/projects/artifact/1.jpg", caption: "Welcome screen" }].
// To set links: replace repo / demo with the real URLs.
export const projects: Project[] = [
  { id: "artifact", name: "ArtiFact", category: "Augmented Reality", summary: "A gamified augmented reality system for image identification at the National Museum of Fine Arts.", tech: ["ORB", "RANSAC", "Homography", "JavaScript", "CSS", "HTML"],
    features: ["AR artwork recognition with an info card", "Quiz with lives", "Sliding-piece puzzle", "Museum map with clues", "Passport with 10 collectible badges", "Downloadable certificate"],
    shots: [{ src: "/projects/artifact/1.jpg", caption: "Welcome screen" }, { src: "/projects/artifact/2.jpg", caption: "AR artwork recognition" }, { src: "/projects/artifact/3.jpg", caption: "Quiz" }, { src: "/projects/artifact/4.jpg", caption: "Puzzle" }, { src: "/projects/artifact/5.jpg", caption: "Museum map" }, { src: "/projects/artifact/6.jpg", caption: "Passport badges" }, { src: "/projects/artifact/7.jpg", caption: "Certificate" }],
    role: "Contributed for mainly the frontend development and UI design. Designed the user interface and implemented the visual elements.", repo: "https://github.com/yawnydoki/artifact-nmfa" },
  { id: "twotickets", name: "TwoTickets", category: "Web Application", summary: "A private, couples-oriented movie tracking and reviewing web app inspired by Letterboxd.", tech: ["TMDB API", "TypeScript", "CSS", "VITE"],
    features: ["Shared watchlist for two", "Half-star ratings and spoiler-safe reviews", "Diary of everything you watch", "Discover trending movies by mood", "Invite code to link with your partner", "Personal and shared stats"],
    shots: [{ src: "/projects/twotickets/1.jpg", caption: "Landing page" }, { src: "/projects/twotickets/2.jpg", caption: "Home" }, { src: "/projects/twotickets/3.jpg", caption: "Discover" }],
    role: "Directed and tested the build of a couples’ movie tracker, working with an AI coding assistant (Claude) to write the code. I wrote the specs, set up Supabase and TMDB, tested with multiple accounts, and reported and verified bug fixes.", repo: "https://github.com/jpillone09/TwoTickets" },
  { id: "portfolio", name: "My Portfolio", category: "Web Development", summary: "This portfolio: a pastel desktop-style personal OS with draggable windows, a dock, light and dark modes and small desktop widgets.", tech: ["React", "TypeScript", "Vite", "Framer Motion"],
    features: ["Draggable, minimizable and maximizable windows", "Light and dark themes", "Calendar and GitHub contribution garden widgets", "Project explorer with screenshots"],
    shots: [{ src: "/projects/portfolio/1.jpg", caption: "Desktop" }, { src: "/projects/portfolio/2.jpg", caption: "Apps open in windows" }],
    role: "Developed the entire portfolio website from scratch. Using React, TypeScript, and Vite. Inspired by Mac OS and a pastel-like aesthetic.", repo: "https://github.com/jpillone09/jpillone09.github.io", demo: "https://jpillone09.github.io" },
];
export const education = { school: "Far Eastern University Alabang", degree: "Bachelor of Science in Computer Science", spec: "Specialization in Software Engineering", grad: "Expected graduation: 2027" };
export const skills: Record<string, string[]> = {
  "Technical Skills": ["HTML", "CSS", "JavaScript", "Python", "Java", "SQL", "SAP S/4 HANA", "Microsoft Suite", "AI-Assisted Development"],
  "General Skills": ["Video Production & Editing", "Graphic Design", "UI/UX"],
  "Soft Skills": ["Optimistic", "Adaptability", "Hard-Working", "Modest", "Communication", "Team Collaboration"],
  "Hobbies & Interests": ["Game Development", "Web Development", "Video Editing", "Culinary Arts"],
};
export const certs = ["Certiport IT Specialist – Java", "Certiport IT Specialist – Python", "Cisco Networking Specialist", "Certificate of Excellence – Design Thinking"];
export const note = { title: "Currently", items: ["Studying Software Engineering", "Building this portfolio", "[Add what you're learning]"] };
export const githubUser = "jpillone09";