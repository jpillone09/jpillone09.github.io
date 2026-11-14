import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App";
import "./styles.css";
createRoot(document.getElementById("root")!).render(<MotionConfig reducedMotion="user"><App /></MotionConfig>); // honours the visitor's reduced-motion setting
