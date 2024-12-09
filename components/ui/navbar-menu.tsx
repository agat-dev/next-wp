"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-100% left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full shadow-lg dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-8 px-4 py-3 "
    >
      {children}
    </nav>
  );
};




export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-5 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>

        <MenuItem setActive={setActive} active={active} item="Votre besoin">
          <div className="flex flex-col space-y-4 text-sm">      
              <HoveredLink href="/pages/votre-creation">Créer une vitrine</HoveredLink> 
              <HoveredLink href="/pages/votre-creation">Créer une site d\'information</HoveredLink> 
              <HoveredLink href="/web-dev">Gérer une communauté</HoveredLink>                
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Nos services">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Site vitrine"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Portail d\'information"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Plateforme avec membres"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Audit & Optimisation"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        


        <MenuItem setActive={setActive} active={active} item="Nos réalisations">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/projet">Projets</HoveredLink>
            <HoveredLink href="/individual">Témoignages</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Votre projet">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/seo">Méthode</HoveredLink>
            <HoveredLink href="/web-dev">Technos</HoveredLink>                      
            <HoveredLink href="/web-dev">Docs & Ressources</HoveredLink>    
          </div>
        </MenuItem>


        <MenuItem setActive={setActive} active={active} item="Plus">
          <div className="flex flex-col space-y-4 text-sm">              
            <HoveredLink href="/web-dev">A propos</HoveredLink>                     
            <HoveredLink href="/posts">Blog</HoveredLink>               
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
