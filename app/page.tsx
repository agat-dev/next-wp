import { getOptions } from "@/lib/options";
import ClientHeroBlock from "@/components/client-hero-block";
import ClientQuizBlock from "@/components/client-quiz-block";
import ClientComparatifBlock from "@/components/client-comparatif-block";
import ClientAboutBlock from "@/components/client-about-block";
import ClientArticlesBlock from "@/components/client-articles-block";

export default async function HomePage() {
  const options = await getOptions();
  if (!options)
    return (
      <main className="p-8 text-center">
        Erreur de chargement des données WordPress.
      </main>
    );

  return (
    <>
      <ClientHeroBlock options={options} />
    </>
  );
}
