// Craft Imports
import { Section, Container } from "@/components/craft";
import { HoverEffectBento } from "@/components/bento";
//import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";
// Components
import Marquee from "@/components/ui/marquee";
import { ReviewCardReferences } from "@/components/ui/marquee";
import { CardStack } from "@/components/ui/card-stack";

// Datas
import { getAllReferences, getFeaturedMediaById } from "@/lib/wordpress";


async function LogosReferencesHorizontal() {
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
      <div className="relative flex h-max-content py-4 w-full flex-row items-center justify-center overflow-hidden">
        <Marquee pauseOnHover horizontal className="[--duration:40s]">
          {reviews.map((review) => (
            <ReviewCardReferences key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    );
}

async function CardStackDemo() {
  return (
    <div className="h-[24rem] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}
// Small utility to highlight the content of specific section of a testimonial content
const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        These cards are amazing, <Highlight>I want to use them</Highlight> in my
        project. Framer motion is a godsend ngl tbh fam 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <p>
        I dont like this Twitter thing,{" "}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];



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
            title: "A propos",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/projet",
            background: "",
            classNameLink: "lg:col-span-3 lg:row-span-2",
          },          
          {
            title: "Création de sites web",
            description:
              "",
            link: "https://agat.dev",
            background: "",
            classNameLink: "lg:col-span-2 lg:row-span-3",
          },            
          {
            title: "Logos technos",
            description:"",
            link: "/reference",
            background: "",
            classNameLink: "lg:col-span-1 lg:row-span-8",
          },  
          {
            title: "Dernier projet",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/projet",
            background: "",
            classNameLink: "lg:col-span-2 lg:row-span-3",
          },   
          {
            title: "",
            description:
              "",
            link: "/reference",
            background: <CardStackDemo />,
            classNameLink: "lg:col-span-2 lg:row-span-3",
          },
          {
            title: "Technos",
            description:
              "",
            link: "/reference",
            background: "",
            classNameLink: "lg:col-span-1 lg:row-span-3 items-center",
          },
          {
            title: "Processus de travail",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/posts",
            background: "",
            classNameLink: "lg:col-span-2 lg:row-span-2",
          },
          {
            title: "Blog",
            description:
              "",
            link: "/posts",
            background: "",
            classNameLink: "lg:col-span-3 lg:row-span-2 items-center",
          },
      ]}
      />

    <LogosReferencesHorizontal />

    </article>
  );
};

