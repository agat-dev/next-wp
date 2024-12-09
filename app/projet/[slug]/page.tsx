import {
  getProjetBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";

import { Section, Container, Article, Main } from "@/components/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import Link from "next/link";
import Balancer from "react-wrap-balancer";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const projet = await getProjetBySlug(params.slug);
  return {
    title: projet.title.rendered,
    description: projet.acf.description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const projet = await getProjetBySlug(params.slug);
  const featuredMedia = await getFeaturedMediaById(projet.featured_media);
  const author = await getAuthorById(projet.author);
  const date = new Date(projet.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(projet.categories[0]);

  return (
    <Section>
      <Container>
        <h1>
          <Balancer>
            <span
              dangerouslySetInnerHTML={{ __html: projet.title.rendered }}
            ></span>
          </Balancer>
        </h1>

        <div className="flex justify-between items-center gap-4 text-sm mb-4">
          <h5>
            Published {date} by{" "}
            {author.name && (
              <span>
                <a href={`/projets/?author=${author.id}`}>{author.name}</a>{" "}
              </span>
            )}
          </h5>
          <Link
            href={`/projets/?category=${category.id}`}
            className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
          >
            {category.name}
          </Link>
        </div>
        <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
          {/* eslint-disable-next-line */}
          <img
            className="w-full"
            src={featuredMedia.source_url}
            alt={projet.title.rendered}
          />
        </div>
        <Article dangerouslySetInnerHTML={{ __html: projet.acf.description }} />
      </Container>
    </Section>
  );
}
