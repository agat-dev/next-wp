"use client";
export default function ClientArticlesBlock({ options }: { options: any }) {
  return (
    <section className="py-16 px-4 bg-[var(--color-bg-alt)] text-[var(--color-text)]">
      <h2 className="text-2xl md:text-3xl font-title font-bold mb-6 text-[var(--color-accent)]">Articles & Guides récents</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {options.articles?.map((art: any, i: number) => (
          <div key={i} className="bg-[var(--color-bg)] rounded-xl shadow p-6 flex flex-col">
            <h3 className="font-title text-lg font-bold mb-2 text-[var(--color-text)]">{art.title}</h3>
            <p className="mb-4 text-[var(--color-info)]">{art.excerpt}</p>
            <a href={art.url} className="mt-auto text-[var(--color-accent)] font-semibold hover:underline">Lire l’article</a>
          </div>
        ))}
      </div>
    </section>
  );
}
