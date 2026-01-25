import { getOptions } from "@/lib/options";
import ClientHeroBlock from "@/components/client-hero-block";
import ClientExplainationBlock from "@/components/client-explaination-block";
import ClientComparatifBlock from "@/components/client-comparatif-block";

export default async function HomePage() {
  const options = await getOptions();
  if (!options)
    return (
      <main className="p-8 text-center">
        Erreur de chargement des données WordPress.
      </main>
    );

    console.warn("Options récupérées pour la page d'accueil :", options);

  // Transformer les données comparatif au format attendu par le composant
  const comparatifFormatted = {
    title: "WordPress Classique vs Headless Next.js",
    headers: ["Critère", "WordPress Classique", "Headless Next.js"],
    rows: (options.comparatif_table && Array.isArray(options.comparatif_table))
      ? options.comparatif_table.map((row: any) => [
          row.critere || "",
          row.wordpress_classique || "",
          row.headless_nextjs || "",
        ])
      : [],
  };
          console.warn("Données formatées pour le comparatif :", comparatifFormatted);

  return (
    <>
      <ClientHeroBlock options={options} />
      <ClientExplainationBlock cards={options.explanations} /> 
      <ClientComparatifBlock comparatif={comparatifFormatted} />
    </>
  );
} 
