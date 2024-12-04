"use client";

import {ReactNode, useState, useEffect} from 'react'

export default function Loading() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)
  }, [])
  
  return mounted && <div>Run on client only</div>
 }

// import { ReactNode, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";



const BentoCard = ({
  name,
  className,
  background,
  description,
}: {
  name: string;
  className: string;
  background: ReactNode;
  description: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300">
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-sm text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:opacity-100",
      )}
    >
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300" />
  </div>
);

export const HoverEffectBento = ({
    items,
    className,
  }: {
    items: {
      title: string;
      description: string;
      link: string;
      background: ReactNode;
      classNameLink?: string;
    }[];
    className?: string;
  }) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
    return (
      <div
        className={cn(
          "grid w-full auto-rows-[16rem] grid-cols-6",
          className
        )}
      >
        {items.map((item, idx) => (
            <Link
            href={item?.link}
            key={item?.link}
            className={cn("relative p-2 col-span-3", item.classNameLink)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            >
            <AnimatePresence>
              {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-24 w-full h-full bg-agatmediumpink/[0.1] dark:agatmediumpink/[0.2] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                opacity: 1,
                transition: { duration: 0.15 },
                }}
                exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0.2 },
                }}
              />
              )}
            </AnimatePresence>
            <BentoCard
              name={item.title}
              className='h-full'
              background={item.background}
              description={item.description}
            />
            </Link>
        ))}
      </div>
    );
  };
  


export { BentoCard };
