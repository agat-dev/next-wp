"use client";
export default function ClientComparatifBlock({ options }: { options: any }) {
  return (
    <section className="py-16 px-4 bg-secondary text-secondary-foreground">
      <h2 className="text-2xl md:text-3xl font-title font-bold mb-6 text-primary">WordPress classique vs Headless + Next.js</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full bg-card rounded-xl shadow text-left">
          <thead>
            <tr>
              <th className="p-4">Critère</th>
              <th className="p-4">WordPress classique</th>
              <th className="p-4">Headless + Next.js</th>
            </tr>
          </thead>
          <tbody>
            {options.comparatif?.map((row: any, i: number) => (
              <tr key={i} className="border-t border-border">
                <td className="p-4">{row.critere}</td>
                <td className="p-4">{row.wp_classique}</td>
                <td className="p-4">{row.headless_nextjs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-center">
        <button className="bg-accent text-accent-foreground px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-accent/90 transition">{options.comparatif_cta}</button>
      </div>
    </section>
  );
}
