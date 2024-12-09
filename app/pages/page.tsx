import { getAllPages } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import Link from "next/link";
import NotionFormIframe from "@/components/ui/notion-form";
import NotionModelsIframe from "@/components/ui/notion-models";

export default async function Page() {
  const pages = await getAllPages();

  return (
    <Section>
      <Container>
        <h1>Pages</h1>

        <h2>All Pages</h2>
        <div className="grid">
          {pages.map((page: any) => (
            <Link key={page.id} href={`pages/${page.slug}`}>
              {page.title.rendered}
            </Link>
          ))}
        </div>
        <NotionModelsIframe/>
        <NotionFormIframe />
      </Container>
    </Section>
  );
}
