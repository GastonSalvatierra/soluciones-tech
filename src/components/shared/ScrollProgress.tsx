"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent/30 via-accent to-accent/60 shadow-[0_0_16px_rgba(0,255,241,0.55)]"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}