"use client";
import ClientGrokBlock from "@/components/client-grok-block";
import Threads from "@/components/ui/threads";


export default function ClientHeroBlock({ options }: { options: any }) {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute pt-80 inset-0 h-200 z-10">
        <Threads
          color={[1, 1, 1]}
          amplitude={1.1}
          distance={0.5}
          enableMouseInteraction={true}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(180deg, #012030 60%, #333333 100%)`,
        }}
      />
      {/* Hero */}
      <section
        className="md:w-8xl mx-auto relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{ paddingTop: 'var(--nav-height, 64px)' }}
      >
        <h1 className="text-4xl md:text-5xl text-card font-title font-light mb-12">
          {options.hero_title}
        </h1>
        <p
          className="text-2xl text-white font-normal max-w-3xl mx-auto mb-12"
          dangerouslySetInnerHTML={{ __html: options.hero_subtitle }}
        />
        <div className="h-full">
          <ClientGrokBlock />
        </div>
      </section>
    </main>
  );
}