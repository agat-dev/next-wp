"use client";
import ClientGeminiBlock from "@/components/home/client-gemini-block";
import Threads from "@/components/ui/threads";
import Image from "next/image";

export default function ClientHeroBlock({ options }: { options: any }) {

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute pt-80 inset-0 h-180 z-10">
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
      <div className="container flex flex-col lg:flex-row justify-between lg:justify-evenly items-center gap-12 lg:gap-24 pt-[10vh]">
          {/* Text Content */}
          <div className="flex flex-col lg:col-span-7 z-20">
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
          </div>

          {/* Hero Image */}
          <div className="relative lg:col-span-5 z-20">
            <div className="relative rounded-xl overflow-hidden aspect-square  mx-auto">
              {/* Placeholder for profile image - replace with actual image */}
              <div className="bg-linear-to-br from-brand-400/80 to-brand-600/80 w-md h-full flex items-center justify-center">
                <Image
                  src={options.hero_bg_image} // Replace with your image path
                  alt="Profile"
                  className="bg-white object-cover w-full h-full rounded-xl"
                  width={500} // Adjust width as needed
                  height={500} // Adjust height as needed
                />
              </div>
              {/* Floating badges */}
              <div className="absolute left-6 top-6 bg-white py-2 px-4 rounded-full shadow-lg flex items-center gap-2 animate-float">
                <span className="h-3 w-3 bg-coral rounded-full"></span>
                <span className="text-sm font-medium text-black">
                  Disponible
                </span>
              </div>
              <div className="absolute right-0 bottom-24 bg-white sm:-mr-12 pr-8 sm:pr-16 py-2 px-4 rounded-full shadow-lg animate-float-delayed z-50 border border-gray-200">
                <span className="text-sm font-medium text-black">
                  8+ ans d&rsquo;expérience
                </span>
              </div>


            </div>
          </div>
      </div>


      <section
        className="md:w-8xl md:-mt-28 xl:-mt-20 mx-auto relative flex flex-col items-center justify-center px-2 sm:px-8 text-center pt-(--nav-height,64px) text-(--color-text) z-30"
      >
        <div className="h-full">
          <ClientGeminiBlock />
        </div>
      </section>
    </main>
  );
}