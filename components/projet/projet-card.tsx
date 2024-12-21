
import Link from "next/link";
import Image from "next/image";

import { Projet } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import {
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getAnneeById,
} from "@/lib/wordpress";

export default async function ProjetCard({ projet }: { projet: Projet }) {
  const media = await getFeaturedMediaById(projet.acf.screen); 
  const mediaUrl = media.source_url;
  const category = await getCategoryById(projet.categories[0]);
  const annee = await getAnneeById(projet.annee[0]);

  return (
    <Link
      href={`/projet/${projet.slug}`}
      className={cn(
        "border p-4 bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-8",
        "hover:bg-accent/75 transition-all"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="h-48 w-full overflow-hidden relative rounded-md border flex items-center justify-center">
          <Image src={mediaUrl} alt={projet.title.rendered} layout="fill" objectFit="cover" />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: projet.title.rendered }}
          className="text-xl text-primary font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
        ></div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html:
              //post.excerpt.rendered.split(" ").slice(0, 12).join(" ").trim() +
              "...",
          }}
        ></div>
      </div>

      <div className="flex flex-col gap-4">
        <hr />
        <div className="flex justify-between items-center text-xs">
          <p>{category.name} | {annee.name}</p>
        </div>
      </div>
    </Link>
  );
}


