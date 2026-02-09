"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScaleInWhenVisible({
  children,
  className,
  delay = 0,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
