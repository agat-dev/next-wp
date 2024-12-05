// Craft Imports
import { Section, Container } from "@/components/craft";
import { HoverEffectBento } from "@/components/bento";
//import Balancer from "react-wrap-balancer";

// Components
import Marquee from "@/components/ui/marquee";
import { ReviewCardReferences } from "@/components/ui/marquee";

// Datas
import { getAllReferences, getFeaturedMediaById } from "@/lib/wordpress";


async function LogosReferencesVertical() {
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
  const reviews = referencesWithMedia.map((reference: any) => ({
      name: reference.name,
      username: `${reference.slug}`,
      img: reference.link || "https://avatar.vercel.sh/default",
    }));
    return (
      <div className="relative flex h-max-content w-full flex-row items-center justify-center overflow-hidden">
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {reviews.map((review) => (
            <ReviewCardReferences key={review.username} {...review} />
          ))}
        </Marquee>
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
            classNameLink: "lg:col-span-3 lg:row-span-3",
          },
          {
            title: "WordPress & Développement",
            description:
              "Learn how to use the components and features of this starter.",
            link: "https://agat.dev",
            background: "",
            classNameLink: "lg:col-span-2 lg:row-span-2",
          },
          {
            title: "Logos technos",
            description:"",
            link: "/reference",
            background: <LogosReferencesVertical />,
            classNameLink: "lg:col-span-1 lg:row-span-7",
          },
          {
            title: "Projets réalisés",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/projet",
            background: "",
            classNameLink: "lg:col-span-2 lg:row-span-3",
          },
          {
            title: "Processus de travail",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/projet",
            background: "",
            classNameLink: "lg:col-span-2 lg:row-span-3",
          },
          {
            title: "Blog",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/posts",
            background: "",
            classNameLink: "lg:col-span-3 lg:row-span-2",
          },
          {
            title: "Technos",
            description:
              "",
            link: "/techno",
            background: "",
            classNameLink: "lg:col-span-2 lg:row-span-2 items-center",
          },
          {
            title: "Footer",
            description:
              "",
            link: "/reference",
            background: "",
            classNameLink: "lg:col-span-4 lg:row-span-1 items-center",
          },

      ]}
      />



    </article>
  );
};

