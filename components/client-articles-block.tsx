"use client";
export default function ClientArticlesBlock({ options }: { options: any }) {
  return (
    <section className="py-16 px-4 bg-secondary text-secondary-foreground">
      <h2 className="text-2xl md:text-3xl font-title font-bold mb-6 text-primary">Articles & Guides récents</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {options.articles?.map((art: any, i: number) => (
          <div key={i} className="bg-card rounded-xl shadow p-6 flex flex-col">
            <h3 className="font-title text-lg font-bold mb-2">{art.title}</h3>
            <p className="mb-4">{art.excerpt}</p>
            <a href={art.url} className="mt-auto text-accent font-semibold hover:underline">Lire l’article</a>
          </div>
        ))}
      </div>
    </section>
  );
}
