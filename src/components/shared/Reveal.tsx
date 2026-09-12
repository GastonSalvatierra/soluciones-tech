"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  blur?: boolean;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = true,
}: RevealProps) {
  const x = direction === "left" ? -36 : direction === "right" ? 36 : 0;
  const y = direction === "up" ? 40 : 0;

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}