"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

export function GradualSpacing() {
  const text = "Développons votre impact";
  const gradual = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="flex space-x-1 justify-left">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={gradual}
            transition={{ duration: 0.2, delay: i * 0.1 }}
            className={clsx(
            "text-center font-display font-bold drop-shadow-sm",
            "text-2xl md:text-3xl lg:text-3xl xl:text-4xl",
            "tracking-[-0.01em]",
            "md:leading-[1rem] lg:leading-[1.5rem] xl:leading-[2rem]"
          )}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}