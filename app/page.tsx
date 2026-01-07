import { getOptions } from "@/lib/options";
import ClientHeroBlock from "@/components/client-hero-block";
import ClientExplainationBlock from "@/components/client-explaination-block";

export default async function HomePage() {
  const options = await getOptions();
  if (!options)
    return (
      <main className="p-8 text-center">
        Erreur de chargement des données WordPress.
      </main>
    );

  console.log(options);
  return (
    <>
      <ClientHeroBlock options={options} />
      <ClientExplainationBlock cards={options.explanations} /> 
    </>
  );
} 
