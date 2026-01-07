"use client";
import Threads from "@/components/ui/threads";

export default function ClientPageHeaderBlock({ pages }: { pages: any }) {
  return (
    <main className="h-200 relative overflow-hidden">
      <div className="absolute inset-0 h-180 z-10">
        <Threads
          color={[239 / 255, 242 / 255, 167 / 255]} // #F0F2A7
          amplitude={1.1}
          distance={0.5}
          enableMouseInteraction={false}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-linear-to-b from-(--color-header) via-(--color-header) to-(--color-bg)"
      />
      {/* Hero */}
      <section className="md:w-8xl mx-auto relative z-10 h-64 flex flex-col items-center justify-center px-8 text-center pt-(--nav-height,64px) text-(--color-text)">
        <h1 className="text-4xl md:text-5xl font-heading mb-12 text-(--color-text-secondary)/80">
          {pages.title.rendered}
        </h1>
        <div className="h-full">

        </div>
      </section>
    </main>
  );
}
