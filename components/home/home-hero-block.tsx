"use client";
import ClientGeminiBlock from "./client-gemini-block";
import Threads from "@/components/ui/threads";
import Image from "next/image";
import AnimatedScore from "@/components/ui/animated-score";
import BentoCard from "../ui/bento-card";
import VideoAutoplayLoopMuted from "@/components/ui/video-autoplay-loop-muted";
import { Video } from "lucide-react";

export default function ClientHeroBlock({ options }: { options: any }) {

  return (
    <main className="relative overflow-hidden">
      <div className="min-h-screen absolute pt-80 inset-0 h-180 z-10">
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
      <div
        className="grid grid-cols-4 grid-rows-4 gap-4 pt-[10vh] px-8"
        style={{ gridTemplateRows: '2fr 2fr' }}
      >
        {/* Ligne 1 */}
        <div className="col-span-2 row-span-1 flex flex-col justify-between h-full z-20">
          <div className="row-span-2">
            <div className="mb-1 text-2xl md:text-3xl lg:text-4xl text-white/90 font-googletexte">
              {options.hero_title}
            </div>
            <div className="mt-2 mb-6 text-3xl md:text-4xl lg:text-5xl text-white/90 font-googletitre font-medium">
              {options.hero_title_line}
            </div>
            <p className="font-googletexte text-xl text-white/80 max-w-xl">
              {options.hero_subtitle && (
                <span dangerouslySetInnerHTML={{ __html: options.hero_subtitle }} />
              )}
            </p>
          </div>
        </div>
        <div className="col-span-2 row-span-1 h-full z-20">
          <BentoCard className="h-full w-full flex items-center justify-center gap-4 rounded-xl overflow-hidden p-1 mx-auto">
            <ClientGeminiBlock />
          </BentoCard>
        </div>
        {/* Ligne 2 */}
        <div className="col-span-2 row-span-2 h-full z-20">
          <BentoCard
            className="h-full relative overflow-hidden">
            <VideoAutoplayLoopMuted src={options.video_de_demo} />
          </BentoCard>
        </div>
        <div className="col-span-1 row-span-2 h-full z-20">
          <BentoCard className="h-full z-20 p-4">
            <AnimatedScore />
          </BentoCard>
        </div>
      </div>
  




            <div className="max-w-30 sm:max-w-full flex items-center gap-6 mt-6">
              <Image
                src="/img/logo-wordpress-blanc.png"
                alt="Logo WordPress"
                width={70}
                height={40}
              />
              <Image
                src="/img/logo-nextjs-blanc.png"
                alt="Logo Next.js"
                width={170}
                height={80}
              />
            </div>
    </main> 
  );
}