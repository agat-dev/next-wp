// Craft Imports
import { Section, Container } from "@/components/craft";
import { HoverEffectBento } from "@/components/bento";
//import Balancer from "react-wrap-balancer";

// Components
import Marquee from "@/components/ui/marquee";
import { ReviewCardTechnos } from "@/components/ui/marquee";

// Datas
import { getAllTechnos, getFeaturedMediaById } from "@/lib/wordpress";


async function LogosTechnosVertical() {
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
      <div className="relative flex h-max-content w-full flex-row items-center justify-center overflow-hidden">
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {reviews.map((review) => (
            <ReviewCardTechnos key={review.username} {...review} />
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
            title: "Design & Maquettes",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/services",
            background: <LogosTechnosVertical />,
            classNameLink: "lg:col-span-1 lg:row-span-6",
          },
          {
            title: "Processus projet",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/services",
            background: "",
            classNameLink: "lg:col-span-2 lg:row-span-2",
          },
          {
            title: "Déjà réalisés",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/projet",
            background: "",
            classNameLink: "lg:col-span-2 lg:row-span-2",
          },
          {
            title: "Blog",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/posts",
            background: "",
            classNameLink: "lg:col-span-2 lg:row-span-2",
          },
          {
            title: "",
            description:
              "",
            link: "/reference",
            background: "",
            classNameLink: "lg:col-span-6 lg:row-span-1 items-center",
          },

      ]}
      />



    </article>
  );
};

