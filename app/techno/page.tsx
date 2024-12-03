import { getAllTechnos, getFeaturedMediaById } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import Image from "next/image";
import Link from "next/link";

export default async function Techno() {
  const technos = await getAllTechnos();
  const technosWithMedia = await Promise.all(
    technos.map(async (techno: any) => {
      const media = await getFeaturedMediaById(techno.featured_media);
      
      return {
        ...techno,
        link: media ? media.source_url : '',
      };
    })
  );

  return (
    <Section>
      <Container>
        <h1>Technos</h1>

        <h2>Toutes les technos</h2>
        <div className="grid">
          {technosWithMedia.map((techno: any) => (
            <div key={techno.id}>
              <Link href={`techno/${techno.slug}`}>
                {techno.title.rendered}
              </Link>
              <Image 
                className="h-full w-full object-cover"
                src={techno.link}
                alt={techno.title.rendered}
                width={400}
                height={200}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
