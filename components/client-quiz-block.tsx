"use client";
export default function ClientQuizBlock({ options }: { options: any }) {
  return (
    <section id="quiz" className="py-16 px-4 bg-background text-foreground">
      <h2 className="text-2xl md:text-3xl font-title font-bold mb-6 text-primary">Quiz express</h2>
      <div className="bg-card rounded-xl shadow p-6 max-w-2xl mx-auto">
        <p className="mb-4">Répondez à 3 questions pour savoir si votre site vous freine.</p>
        {/* Quiz dynamique */}
        {options.quiz?.questions?.map((q: any, i: number) => (
          <div key={i} className="mb-4 text-left">
            <div className="font-semibold mb-2">{q.question}</div>
            <div className="flex gap-2 flex-wrap">
              {q.options.map((opt: string, j: number) => (
                <button key={j} className="bg-secondary text-secondary-foreground px-3 py-1 rounded border border-border hover:bg-primary/10 transition" type="button">{opt}</button>
              ))}
            </div>
          </div>
        ))}
        <button className="mt-4 bg-accent text-accent-foreground px-6 py-2 rounded font-semibold hover:bg-accent/90 transition">{options.quiz?.cta || "Voir les solutions adaptées"}</button>
      </div>
    </section>
  );
}
