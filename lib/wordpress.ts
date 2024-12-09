// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from "query-string";

import {
  Post,
  Projet,
  Techno,
  Category,
  Annee,
  Reference,
  Tag,
  Page,
  Author,
  FeaturedMedia,
} from "./wordpress.d";

// WordPress Config

const baseUrl = process.env.WORDPRESS_URL;

function getUrl(path: string, query?: Record<string, any>) {
  const params = query ? querystring.stringify(query) : null;

  return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

// WordPress Functions

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
}): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", {
    author: filterParams?.author,
    tags: filterParams?.tag,
    categories: filterParams?.category,
  });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostById(id: number): Promise<Post> {
  const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
  const response = await fetch(url);
  const post: Post = await response.json();
  return post;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const url = getUrl("/wp-json/wp/v2/posts", { slug });
  const response = await fetch(url);
  const post: Post[] = await response.json();
  return post[0];
}

/* Ajouts projets */
export async function getAllProjets(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
}): Promise<Projet[]> {
  const url = getUrl("/wp-json/wp/v2/projet", {
    author: filterParams?.author,
    tags: filterParams?.tag,
    categories: filterParams?.category,
  });
  const response = await fetch(url);
  const projets: Projet[] = await response.json();
  return projets;
}

export async function getProjetById(id: number): Promise<Projet> {
  const url = getUrl(`/wp-json/wp/v2/projet/${id}`);
  const response = await fetch(url);
  const projet: Projet = await response.json();
  return projet;
}

export async function getProjetBySlug(slug: string): Promise<Projet> {
  const url = getUrl("/wp-json/wp/v2/projet", { slug });
  const response = await fetch(url);
  const projet: Projet[] = await response.json();
  return projet[0];
}

/* end ajout projets */

/* Ajouts technos */

export async function getAllTechnos(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
}): Promise<Techno[]> {
  const url = getUrl("/wp-json/wp/v2/techno", {
    author: filterParams?.author,
    tags: filterParams?.tag,
    categories: filterParams?.category,
  });
  const response = await fetch(url);
  const technos: Techno[] = await response.json();
  return technos;
}

export async function getTechnoById(id: number): Promise<Techno> {
  const url = getUrl(`/wp-json/wp/v2/techno/${id}`);
  const response = await fetch(url);
  const techno: Techno = await response.json();
  return techno;
}

export async function getTechnoBySlug(slug: string): Promise<Techno> {
  const url = getUrl("/wp-json/wp/v2/techno", { slug });
  const response = await fetch(url);
  const techno: Techno[] = await response.json();
  return techno[0];
}
/* end ajout technos */

export async function getAllCategories(): Promise<Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories");
  const response = await fetch(url);
  const categories: Category[] = await response.json();
  return categories;
}



export async function getCategoryById(id: number): Promise<Category> {
  const url = getUrl(`/wp-json/wp/v2/categories/${id}`);
  const response = await fetch(url);
  const category: Category = await response.json();
  return category;
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const url = getUrl("/wp-json/wp/v2/categories", { slug });
  const response = await fetch(url);
  const category: Category[] = await response.json();
  return category[0];
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { categories: categoryId });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByTag(tagId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tagId });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

/* ajout projets */

export async function getAllAnnees(): Promise<Annee[]> {
  const url = getUrl("/wp-json/wp/v2/annee");
  const response = await fetch(url);
  const annees: Annee[] = await response.json();
  return annees;
}


export async function getAnneeById(id: number): Promise<Annee> {
  const url = getUrl(`/wp-json/wp/v2/annee/${id}`);
  const response = await fetch(url);
  const annee: Annee = await response.json();
  return annee;
}

export async function getAnneeBySlug(slug: string): Promise<Annee> {
  const url = getUrl("/wp-json/wp/v2/annee", { slug });
  const response = await fetch(url);
  const annee: Annee[] = await response.json();
  return annee[0];
}

export async function getProjetByAnnee(anneeId: number): Promise<Projet[]> {
  const url = getUrl("/wp-json/wp/v2/projet", { annee: anneeId });
  const response = await fetch(url);
  const projets: Projet[] = await response.json();
  return projets;
}


export async function getProjetByCategory(categoryId: number): Promise<Projet[]> {
  const url = getUrl("/wp-json/wp/v2/projet", { categories: categoryId });
  const response = await fetch(url);
  const projets: Projet[] = await response.json();
  return projets;
}

export async function getProjetsByTag(tagId: number): Promise<Projet[]> {
  const url = getUrl("/wp-json/wp/v2/projet", { tags: tagId });
  const response = await fetch(url);
  const projets: Projet[] = await response.json();
  return projets;
}

/* end ajout projets */

/* ajout technos */

export async function getTechnosByCategory(categoryId: number): Promise<Techno[]> {
  const url = getUrl("/wp-json/wp/v2/techno", { categories: categoryId });
  const response = await fetch(url);
  const technos: Techno[] = await response.json();
  return technos;
}

export async function getTechnosByTag(tagId: number): Promise<Techno[]> {
  const url = getUrl("/wp-json/wp/v2/techno", { tags: tagId });
  const response = await fetch(url);
  const technos: Techno[] = await response.json();
  return technos;
}

/* end ajout projets */

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", { post: postId });
  const response = await fetch(url);
  const tags: Tag[] = await response.json();
  return tags;
}

export async function getAllTags(): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags");
  const response = await fetch(url);
  const tags: Tag[] = await response.json();
  return tags;
}

export async function getTagById(id: number): Promise<Tag> {
  const url = getUrl(`/wp-json/wp/v2/tags/${id}`);
  const response = await fetch(url);
  const tag: Tag = await response.json();
  return tag;
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  const url = getUrl("/wp-json/wp/v2/tags", { slug });
  const response = await fetch(url);
  const tag: Tag[] = await response.json();
  return tag[0];
}

export async function getAllPages(): Promise<Page[]> {
  const url = getUrl("/wp-json/wp/v2/pages");
  const response = await fetch(url);
  const pages: Page[] = await response.json();
  return pages;
}

export async function getPageById(id: number): Promise<Page> {
  const url = getUrl(`/wp-json/wp/v2/pages/${id}`);
  const response = await fetch(url);
  const page: Page = await response.json();
  return page;
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/pages", { slug });
  const response = await fetch(url);
  const page: Page[] = await response.json();
  return page[0];
}

export async function getAllAuthors(): Promise<Author[]> {
  const url = getUrl("/wp-json/wp/v2/users");
  const response = await fetch(url);
  const authors: Author[] = await response.json();
  return authors;
}

export async function getAuthorById(id: number): Promise<Author> {
  const url = getUrl(`/wp-json/wp/v2/users/${id}`);
  const response = await fetch(url);
  const author: Author = await response.json();
  return author;
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  const url = getUrl("/wp-json/wp/v2/users", { slug });
  const response = await fetch(url);
  const author: Author[] = await response.json();
  return author[0];
}

export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { author: authorId });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByAuthorSlug(
  authorSlug: string
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { author: author.id });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByCategorySlug(
  categorySlug: string
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  const url = getUrl("/wp-json/wp/v2/posts", { categories: category.id });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tag.id });
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  return posts;
}

/* ajout projets */

export async function getProjetsByCategorySlug(
  categorySlug: string
): Promise<Projet[]> {
  const category = await getCategoryBySlug(categorySlug);
  const url = getUrl("/wp-json/wp/v2/projet", { categories: category.id });
  const response = await fetch(url);
  const projets: Projet[] = await response.json();
  return projets;
}

export async function getProjetsByTagSlug(tagSlug: string): Promise<Projet[]> {
  const tag = await getTagBySlug(tagSlug);
  const url = getUrl("/wp-json/wp/v2/projet", { tags: tag.id });
  const response = await fetch(url);
  const projets: Projet[] = await response.json();
  return projets;
}

/* end ajout projets */

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  const url = getUrl(`/wp-json/wp/v2/media/${id}`);
  const response = await fetch(url);
  const featuredMedia: FeaturedMedia = await response.json();
  return featuredMedia;
}


/* ajout récup logos clients */

export async function getAllReferences(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
}): Promise<Reference[]> {
  const url = getUrl("/wp-json/wp/v2/reference", {
    author: filterParams?.author,
    tags: filterParams?.tag,
    categories: filterParams?.category,
  });
  const response = await fetch(url);
  const references: Reference[] = await response.json();
  return references;
}

/* end ajout récup clients */