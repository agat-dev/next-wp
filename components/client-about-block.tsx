"use client";
export default function ClientAboutBlock({ options }: { options: any }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[var(--color-bg)] text-[var(--color-text)]">
      <h2 className="text-3xl font-bold tracking-tight text-[var(--color-accent)] sm:text-4xl md:text-5xl">
        {options.about_title}
      </h2>
      <div className="flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto">
        <div className="flex-1">
            <p className="mt-4 max-w-xl text-lg text-[var(--color-info)]">{options.about_text}</p>
          <a href="/a-propos" className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded font-semibold hover:bg-primary/90 transition">{options.about_cta}</a>
        </div>
        <div className="flex-1 flex justify-center">
          {options.about_image ? (
            <img src={options.about_image} alt="Qui sommes-nous" className="w-48 h-48 object-cover rounded-full shadow-lg" />
          ) : (
            <div className="w-48 h-48 bg-secondary rounded-full shadow-lg" />
          )}
        </div>
      </div>
    </section>
  );
}
