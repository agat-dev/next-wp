"use client";
import ClientGrokBlock from "@/components/client-grok-block";
import Threads from "@/components/ui/threads";
import { motion, useTransform, useScroll } from "framer-motion";


export default function ClientHeroBlock({ options }: { options: any }) {
  const { scrollY } = useScroll();
  const grokSectionY = useTransform(scrollY, [0, 600], [0, 0]);
  const grokSectionScale = useTransform(scrollY, [0, 600], [0.8, 1]);
  const grokSectionWidth = useTransform(scrollY, [0, 600], ["100%", "195%"]);
  const grokSectionPadding = useTransform(scrollY, [0, 600], ["1.5rem", "0.5rem"]);


  return (
    <main className="h-260 relative overflow-hidden">
      <div className="absolute mt-40 inset-0 h-170 z-10">
        <Threads
          color={[239/255, 242/255, 167/255]} // #F0F2A7
          amplitude={0.9}
          distance={0.7}
          enableMouseInteraction={true}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-linear-to-b from-(--color-header) via-(--color-header) to-(--color-bg)"
      />
      {/* Hero */}
      <section
        className="md:w-8xl mt-24 mx-auto relative z-10 flex flex-col items-center justify-center px-8 text-center pt-(--nav-height,64px) text-(--color-text)"
      >
          <h1 className="text-4xl md:text-5xl font-title mb-12 text-white/90">
            {options.hero_title}
          </h1>
          <p
            className="text-2xl font-normal max-w-3xl mx-auto text-(--color-text-secondary)/80"
          >
            {options.hero_subtitle && (
              <span dangerouslySetInnerHTML={{ __html: options.hero_subtitle }} />
            )}
          </p>
        <div className="h-full">
          <motion.div 
            id="grok-search-form" 
            className="flex flex-col gap-4 mx-auto pb-12"
            style={{ 
              y: grokSectionY, 
              scale: grokSectionScale,
              width: grokSectionWidth,
              paddingLeft: grokSectionPadding,
              paddingRight: grokSectionPadding
            }}
          >
          <ClientGrokBlock />
          </motion.div>
        </div>
      </section>
    </main>
  );
}