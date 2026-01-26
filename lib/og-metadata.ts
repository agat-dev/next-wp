/**
 * OpenGraph image generation utilities
 * Provides functions to generate dynamic OG images with content data
 */

export interface OGImageParams {
  title: string;
  description?: string;
  image?: string;
  author?: string;
  category?: string;
}

/**
 * Generate OpenGraph image URL with parameters
 * Can be used in metadata API endpoints or as dynamic image source
 */
export function generateOGImageUrl(
  baseUrl: string,
  params: OGImageParams
): URL {
  const url = new URL(`${baseUrl}/api/og`);

  url.searchParams.append("title", params.title);

  if (params.description) {
    url.searchParams.append("description", params.description);
  }

  if (params.image) {
    url.searchParams.append("image", params.image);
  }

  if (params.author) {
    url.searchParams.append("author", params.author);
  }

  if (params.category) {
    url.searchParams.append("category", params.category);
  }

  return url;
}

/**
 * Extract query parameters from OG image URL
 */
export function extractOGImageParams(url: string): OGImageParams {
  const urlObj = new URL(url);

  return {
    title: urlObj.searchParams.get("title") || "",
    description: urlObj.searchParams.get("description") || undefined,
    image: urlObj.searchParams.get("image") || undefined,
    author: urlObj.searchParams.get("author") || undefined,
    category: urlObj.searchParams.get("category") || undefined,
  };
}

/**
 * Format text for OG image display
 * Truncates and wraps long text appropriately
 */
export function formatTextForOGImage(
  text: string,
  maxChars: number = 100,
  maxLines: number = 3
): string {
  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, " ");

  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim();

  // Truncate if too long
  if (text.length > maxChars) {
    text = text.substring(0, maxChars).trim() + "...";
  }

  return text;
}

/**
 * Generate structured data (JSON-LD) for SEO
 */
export function generateJsonLd(
  type: "Article" | "BlogPosting" | "WebPage" | "NewsArticle",
  data: {
    title: string;
    description: string;
    image?: string;
    url: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    siteUrl: string;
    siteName: string;
  }
) {
  const baseJsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": type,
    headline: data.title,
    description: data.description,
    url: data.url,
  };

  if (data.image) {
    baseJsonLd.image = {
      "@type": "ImageObject",
      url: data.image,
    };
  }

  if (data.author) {
    baseJsonLd.author = {
      "@type": "Person",
      name: data.author,
    };
  }

  if (data.datePublished) {
    baseJsonLd.datePublished = data.datePublished;
  }

  if (data.dateModified) {
    baseJsonLd.dateModified = data.dateModified;
  }

  baseJsonLd.publisher = {
    "@type": "Organization",
    name: data.siteName,
    logo: {
      "@type": "ImageObject",
      url: `${data.siteUrl}/logo.png`,
    },
  };

  return baseJsonLd;
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  baseUrl: string
) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };

  return breadcrumbList;
}

/**
 * Escape text for JSON-LD
 */
export function escapeJsonLdText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");
}
