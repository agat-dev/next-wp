// Craft Imports
import { Section, Container } from "@/components/craft";
import { HoverEffectBento } from "@/components/bento";
//import Balancer from "react-wrap-balancer";

// Components
import Link from "next/link";
import Image from "next/image";
import Marquee from "@/components/ui/marquee";
import { ReviewCard } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

// Datas
import { getAllReferences, getAllTechnos, getFeaturedMediaById } from "@/lib/wordpress";

export async function LogosReferencesVertical() {
  const references = await getAllReferences();
  const referencesWithMedia = await Promise.all(
    references.map(async (reference: any) => {
      const media = await getFeaturedMediaById(reference.featured_media);      
      return {
        ...reference,
        link: media ? media.source_url : '',
      };
    })
  );
  const refs = referencesWithMedia.map((reference: any) => ({
      name: reference.name,
      username: reference.title.rendered,
      img: reference.link || "https://avatar.vercel.sh/default",
    }));
    return (
      <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {refs.map((ref) => (
            <ReviewCard key={ref.username} {...ref} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
      </div>
    );
}

export async function LogosTechnosVertical() {
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
  const reviews = technosWithMedia.map((techno: any) => ({
      name: techno.name,
      username: `${techno.slug}`,
      img: techno.link || "https://avatar.vercel.sh/default",
    }));
    return (
      <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {reviews.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
      </div>
    );
}



// This page is using the craft.tsx component and design system
export default function Home() {
  return (
    <Section>
      <Container>
        <ExampleJsx />
      </Container>
    </Section>
  );
}

// This is just some example JS to demonstrate automatic styling from brijr/craft
const ExampleJsx = () => {


  return (
    <article className="prose-m-none">

      <HoverEffectBento
        items={[
          {
            title: "Création de sites web",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/projet",
            background: "",
            classNameLink: "lg:col-span-3 lg:row-span-2",
          },
          {
            title: "WordPress & Développement",
            description:
              "Learn how to use the components and features of this starter.",
            link: "https://agat.dev",
            background: "",
            classNameLink: "lg:col-span-2",
          },
          {
            title: "Design & Maquettes",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/services",
            background: <LogosReferencesVertical />,
            classNameLink: "lg:col-span-1 lg:row-span-2",
          },
          
          {
            title: "Design & Maquettes",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/services",
            background: "",
            classNameLink: "lg:col-span-2",
          },

      ]}
      />



    </article>
  );
};

