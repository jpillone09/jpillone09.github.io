import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { play } from "../lib/sound";

export function Boot({ onDone }: { onDone: () => void }) {
  const done = useRef(onDone); done.current = onDone;
  useEffect(() => { play("boot"); const t = setTimeout(() => done.current(), 2600); return () => clearTimeout(t); }, []);
  const skip = () => { play("open"); done.current(); };
  return (
    <motion.div className="boot" exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.5 }} onClick={skip} onKeyDown={skip} role="status" aria-label="Starting Murphy OS" tabIndex={0}>
      <motion.img src="/murphy.png" alt="" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} />
      <h1>Murphy OS</h1>
      <div className="bootbar"><motion.i initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.2, ease: "easeInOut" }} /></div>
      <p>Starting up… <small>click to skip</small></p>
    </motion.div>
  );
}
