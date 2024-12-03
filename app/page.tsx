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



      <p>
        This is <a href="https://github.com/9d8dev/next-wp">next-wp</a>, created
        as a way to build WordPress sites with Next.js at rapid speed. This
        starter is designed with <a href="https://ui.shadcn.com">shadcn/ui</a>,{" "}
        <a href="https://github.com/brijr/craft">brijr/craft</a>, and Tailwind
        CSS. Use <a href="https://components.bridger.to">brijr/components</a> to
        build your site with prebuilt components. The data fetching and
        typesafety is handled in <code>lib/WordPress.ts</code> and{" "}
        <code>lib/WordPress.d.ts</code>. Questions? Email 9d8dev@gmail.com
      </p>
      <div className="grid md:grid-cols-3 gap-4 mt-6 not-prose">
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts">
          <Pen size={32} />
          <span>
            Posts{" "}
            <span className="block text-sm text-muted-foreground">
              All posts from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/pages">
          <File size={32} />
          <span>
            Pages{" "}
            <span className="block text-sm text-muted-foreground">
              Custom pages from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/authors">
          <User size={32} />
          <span>
            Authors{" "}
            <span className="block text-sm text-muted-foreground">
              List of the authors from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/projet">
          <Tag size={32} />
          <span>
            Projets{" "}
              <span className="block text-sm text-muted-foreground">
              Projects from agat.dev 
              </span>
            </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/categories">
          <Boxes size={32} />
          <span>
            Categories{" "}
            <span className="block text-sm text-muted-foreground">
              Categories from your WordPress
            </span>
          </span>
        </Link>
        <a
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="https://github.com/9d8dev/next-wp">
          <Folder size={32} />
          <span>
            Documentation{" "}
            <span className="block text-sm text-muted-foreground">
              How to use `next-wp`
            </span>
          </span>
        </a>
      </div>
    </article>
  );
};

