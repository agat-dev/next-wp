"use client";
import ClientGrokBlock from "@/components/client-grok-block";
import Threads from "@/components/ui/threads";


export default function ClientHeroBlock({ options }: { options: any }) {
  return (
    <main className="h-200 relative overflow-hidden">
      <div className="absolute pt-80 inset-0 h-180 z-10">
        <Threads
          color={[239/255, 242/255, 167/255]} // #F0F2A7
          amplitude={1.1}
          distance={0.5}
          enableMouseInteraction={true}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-linear-to-b from-(--color-header) via-(--color-header) to-(--color-bg)"
      />
      {/* Hero */}
      <section
        className="md:w-8xl mx-auto relative z-10 flex flex-col items-center justify-center px-8 text-center pt-(--nav-height,64px) text-(--color-text)"
      >
          <h1 className="text-4xl md:text-5xl font-title mb-12 text-(--color-text-secondary)/80">
            {options.hero_title}
          </h1>
          <p
            className="text-2xl font-normal max-w-3xl mx-auto mb-12 text-(--color-info)"
          >
            {options.hero_subtitle && (
              <span dangerouslySetInnerHTML={{ __html: options.hero_subtitle }} />
            )}
          </p>
        <div className="h-full">
          <ClientGrokBlock />
        </div>
      </section>
    </main>
  );
}