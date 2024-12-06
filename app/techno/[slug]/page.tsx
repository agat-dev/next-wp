import { getProjetBySlug } from "@/lib/wordpress";
import { Section, Container, Main } from "@/components/craft";
import { Metadata } from "next";

import BackButton from "@/components/back";

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

export default async function Projet({ params }: { params: { slug: string } }) {
  const projet = await getProjetBySlug(params.slug);

  return (
    <Section>
      <Container>
        <BackButton />
        <h1 className="pt-12">{projet.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: projet.acf.description }} />
      </Container>
    </Section>
  );
}
