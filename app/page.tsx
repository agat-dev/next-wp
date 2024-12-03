// Craft Imports
import { Section, Container } from "@/components/craft";
import { HoverEffectBento } from "@/components/bento";
//import Balancer from "react-wrap-balancer";

// Components
import Link from "next/link";
import Image from "next/image";


// Icons
import { File, Pen, Tag, Boxes, User, Folder } from "lucide-react";
import { GradualSpacing } from "@/components/ui/animated-text";
// import { HoverEffect } from "@/components/ui/card-hover-effect";

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
      <h1>
        <GradualSpacing/>
      </h1>

      <HoverEffectBento
        items={[
          {
            title: "Projets",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/projet",
            background: <div>Background</div>,
            classNameLink: "lg:col-span-1",
          },
          {
            title: "A propos",
            description:
              "Learn how to use the components and features of this starter.",
            link: "https://agat.dev",
            background: <div>Background</div>,
            classNameLink: "lg:col-span-2",
          },
          {
            title: "Services",
            description:
              "Learn how to use this starter and build your WordPress site with Next.js.",
            link: "/services",
            background: <div>Background</div>,
            classNameLink: "lg:col-span-2",
          },
          {
            title: "Technos",
            description:
              "Learn how to use the components and features of this starter.",
            link: "/techno",
            background: <div>Background</div>,
            classNameLink: "lg:col-span-1",
          },
          {
            title: "Blog",
            description:
              "Learn how to use the components and features of this starter.",
            link: "/posts",
            background: <div>Background</div>,
            classNameLink: "lg:col-span-3",
          },
      ]}
      />

    </article>
  );
};

