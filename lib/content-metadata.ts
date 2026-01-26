/**
 * Content metadata helpers
 * Provides reusable functions for generating metadata for pages and posts
 */

import type { Post, Page } from "./wordpress.d";
import { getFeaturedMediaById, getAuthorById, getCategoryById } from "./wordpress";
import {
  buildMetadata,
  generateNextMetadata,
  getDescription,
  getFeaturedImageUrl,
} from "./metadata";
import { generateJsonLd, generateOGImageUrl } from "./og-metadata";

/**
 * Generate metadata for a post
 * Fetches all necessary WordPress data and returns Next.js metadata
 */
export async function generatePostMetadata(
  post: Post,
  siteUrl: string,
  baseUrl: string
) {
  let featuredMediaData = null;
  let author = null;
  let category = null;

  // Fetch featured media if available
  if (post.featured_media) {
    try {
      featuredMediaData = await getFeaturedMediaById(post.featured_media);
    } catch {
      // Featured media not found, continue
    }
  }

  // Fetch author info if available
  if (post.author) {
    try {
      author = await getAuthorById(post.author);
    } catch {
      // Author not found, continue
    }
  }

  // Fetch primary category if available
  if (post.categories && post.categories.length > 0) {
    try {
      category = await getCategoryById(post.categories[0]);
    } catch {
      // Category not found, continue
    }
  }

  const postUrl = `/posts/${post.slug}`;
  const metadata = await buildMetadata(post, postUrl, featuredMediaData || undefined);

  // Generate OG image URL
  const ogImageUrl = generateOGImageUrl(baseUrl, {
    title: post.title.rendered,
    description: getDescription(post),
    image: metadata?.image,
    author: author?.name,
    category: category?.name,
  });

  // Generate JSON-LD structured data
  const jsonLd = generateJsonLd("BlogPosting", {
    title: post.title.rendered,
    description: getDescription(post),
    image: metadata?.image,
    url: `${siteUrl}${postUrl}`,
    author: author?.name,
    datePublished: post.date,
    dateModified: post.modified,
    siteUrl,
    siteName: "Next Impact Hub",
  });

  return {
    metadata: await generateNextMetadata(post, postUrl, siteUrl, featuredMediaData || undefined),
    ogImageUrl: ogImageUrl.toString(),
    jsonLd,
    description: getDescription(post),
    image: metadata?.image,
    author,
    category,
  };
}

/**
 * Generate metadata for a page
 * Fetches all necessary WordPress data and returns Next.js metadata
 */
export async function generatePageMetadata(
  page: Page,
  siteUrl: string,
  baseUrl: string
) {
  let featuredMediaData = null;
  let author = null;

  // Fetch featured media if available
  if (page.featured_media) {
    try {
      featuredMediaData = await getFeaturedMediaById(page.featured_media);
    } catch {
      // Featured media not found, continue
    }
  }

  // Fetch author info if available
  if (page.author) {
    try {
      author = await getAuthorById(page.author);
    } catch {
      // Author not found, continue
    }
  }

  const pageUrl = `/${page.slug}`;
  const metadata = await buildMetadata(page, pageUrl, featuredMediaData || undefined);

  // Generate OG image URL
  const ogImageUrl = generateOGImageUrl(baseUrl, {
    title: page.title.rendered,
    description: getDescription(page),
    image: metadata.image,
    author: author?.name,
  });

  // Generate JSON-LD structured data
  const jsonLd = generateJsonLd("WebPage", {
    title: page.title.rendered,
    description: getDescription(page),
    image: metadata.image,
    url: `${siteUrl}${pageUrl}`,
    author: author?.name,
    datePublished: page.date,
    dateModified: page.modified,
    siteUrl,
    siteName: "Next Impact Hub",
  });

  return {
    metadata: await generateNextMetadata(page, pageUrl, siteUrl, featuredMediaData || undefined),
    ogImageUrl: ogImageUrl.toString(),
    jsonLd,
    description: getDescription(page),
    image: metadata.image,
    author,
  };
}

/**
 * Generate metadata for a collection (posts, categories, tags, etc.)
 */
export function generateCollectionMetadata(
  title: string,
  description: string,
  siteUrl: string,
  baseUrl: string,
  urlPath: string,
  image?: string
) {
  const ogImageUrl = generateOGImageUrl(baseUrl, {
    title,
    description,
    image,
  });

  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
    },
    openGraph: {
      title,
      description,
      type: "website" as const,
      url: `${siteUrl}${urlPath}`,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    ogImageUrl: ogImageUrl.toString(),
  };
}

/**
 * Build sitemap entry from post or page
 */
export function buildSitemapEntry(
  content: Post | Page,
  siteUrl: string,
  priority: "1.0" | "0.8" | "0.6" | "0.4" = "0.8"
) {
  const urlPath = "categories" in content ? `posts/${content.slug}` : content.slug;

  return {
    url: `${siteUrl}/${urlPath}`,
    lastModified: new Date(content.modified),
    priority: parseFloat(priority),
    changeFrequency: "weekly" as const,
  };
}

/**
 * Extract keywords from content for meta tags
 */
export function extractKeywords(
  content: Post | Page,
  additionalKeywords: string[] = []
): string {
  const keywords = new Set<string>();

  // Add title words (avoid very short words)
  const titleWords = content.title.rendered
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3);

  titleWords.slice(0, 5).forEach((word) => keywords.add(word));

  // Add additional keywords if provided
  additionalKeywords.forEach((kw) => keywords.add(kw));

  return Array.from(keywords).join(", ");
}

/**
 * Generate robots meta directive
 */
export function generateRobotsMeta(
  index: boolean = true,
  follow: boolean = true,
  snippet: boolean = true,
  imageIndex: boolean = true
): string {
  const directives = [];

  directives.push(index ? "index" : "noindex");
  directives.push(follow ? "follow" : "nofollow");

  if (!snippet) directives.push("nosnippet");
  if (!imageIndex) directives.push("noimageindex");

  return directives.join(", ");
}
