import {
  getAllProjets,
  getAllAuthors,
  getAllTags,
  getAllCategories,
  getAllAnnees,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container } from "@/components/craft";
import ProjetCard from "@/components/projet/projet-card";
import FilterPosts from "./filter";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { author, tag, category, annee, page: pageParam } = searchParams;
  const posts = await getAllProjets({ author, tag, category, annee });
  const authors = await getAllAuthors();
  const tags = await getAllTags();
  const categories = await getAllCategories();
  const annees = await getAllAnnees();
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <Section>
      <Container>
        <h1>Projets</h1>
        <FilterPosts
          authors={authors}
          tags={tags}
          categories={categories}
          annees={annees}
          selectedAuthor={author}
          selectedTag={tag}
          selectedCategory={category}
          selectedAnnee={annee ? parseInt(annee, 10) : undefined}
        />

        {paginatedPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 z-0">
            {paginatedPosts.map((projet: any) => (
              <ProjetCard key={projet.id} projet={projet} />
            ))}
          </div>
        ) : (
          <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
            <p>No Results Found</p>
          </div>
        )}

        <div className="mt-8 not-prose"> 
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={page === 1 ? "pointer-events-none text-muted" : ""}
                  href={`/projet?page=${Math.max(page - 1, 1)}${
                    category ? `&category=${category}` : ""
                  }${author ? `&author=${author}` : ""}${annee ? `&annee=${annee}` : ""}${
                    tag ? `&tag=${tag}` : ""
                  }`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`/projet?page=${page}`}>
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={
                    page === totalPages ? "pointer-events-none text-muted" : ""
                  }
                  href={`/projet?page=${Math.min(page + 1, totalPages)}${
                    category ? `&category=${category}` : ""
                  }${author ? `&author=${author}` : ""}${annee ? `&annee=${annee}` : ""}${
                    tag ? `&tag=${tag}` : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Container>
    </Section>
  );
}
