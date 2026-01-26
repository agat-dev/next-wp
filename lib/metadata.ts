/**
 * Metadata utilities for WordPress content
 * Handles extracting and generating metadata for SEO and social sharing
 */

import type { Post, Page, FeaturedMedia } from "./wordpress.d";
import { getFeaturedMediaById } from "./wordpress";
import { decodeHtml } from "./decodeHtml";

export interface MetadataContent {
  title: string;
  description: string;
  image?: string;
  type?: "article" | "website";
  url?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

/**
 * Extract first image from HTML content
 * Searches for img tags and returns the first src URL found
 */
export function extractFirstImageFromContent(htmlContent: string): string | null {
  if (!htmlContent) return null;

  const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
  const match = htmlContent.match(imgRegex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

/**
 * Clean HTML content and generate a description
 * Removes HTML tags and limits the length
 */
export function cleanHtmlContent(htmlContent: string, maxLength: number = 200): string {
  if (!htmlContent) return "";

  // Decode HTML entities
  let text = decodeHtml(htmlContent);

  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, " ");

  // Remove extra whitespace
  text = text.replace(/\s+/g, " ").trim();

  // Limit length and add ellipsis if needed
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + "...";
  }

  return text;
}

/**
 * Extract description from Post or Page
 * Prioritizes excerpt over content
 */
export function getDescription(content: Post | Page, maxLength: number = 160): string {
  // Use excerpt if available and not empty
  if (content.excerpt?.rendered && content.excerpt.rendered.trim()) {
    return cleanHtmlContent(content.excerpt.rendered, maxLength);
  }

  // Fallback to content
  if (content.content?.rendered) {
    return cleanHtmlContent(content.content.rendered, maxLength);
  }

  return "";
}

/**
 * Get featured image URL from a Post or Page
 * First checks for featured_media, then tries to extract from content
 */
export async function getFeaturedImageUrl(
  content: Post | Page,
  featuredMediaData?: FeaturedMedia
): Promise<string | null> {
  // If featured_media is set and we have the data, use it
  if (content.featured_media && featuredMediaData) {
    return featuredMediaData.source_url;
  }

  // Try to extract first image from content
  const firstImage = extractFirstImageFromContent(content.content.rendered);
  if (firstImage) {
    return firstImage;
  }

  // Fallback to default logo
  return "/img/logo-bleu.png";
}

/**
 * Build complete metadata object for a Post or Page
 */
export async function buildMetadata(
  content: Post | Page,
  url: string,
  featuredMediaData?: FeaturedMedia
): Promise<MetadataContent> {
  const title = content.title.rendered;
  const description = getDescription(content);
  const image = await getFeaturedImageUrl(content, featuredMediaData);
  const type = "featured_media" in content ? "article" : "website";
  const publishedDate = content.date;
  const modifiedDate = content.modified;

  return {
    title,
    description,
    image: image || undefined,
    type: type as "article" | "website",
    url,
    publishedDate,
    modifiedDate,
  };
}

/**
 * Generate OpenGraph object for metadata
 * Can be used with Next.js Metadata API
 */
export function generateOpenGraphMeta(metadata: MetadataContent) {
  const og: any = {
    title: metadata.title,
    description: metadata.description,
    type: metadata.type || "website",
    url: metadata.url,
  };

  if (metadata.image) {
    og.images = [
      {
        url: metadata.image,
        width: 1200,
        height: 630,
        alt: metadata.title,
      },
    ];
  }

  if (metadata.publishedDate) {
    og.publishedTime = metadata.publishedDate;
  }

  if (metadata.modifiedDate) {
    og.modifiedTime = metadata.modifiedDate;
  }

  if (metadata.author) {
    og.authors = [metadata.author];
  }

  return og;
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterCardMeta(metadata: MetadataContent) {
  return {
    card: "summary_large_image",
    title: metadata.title,
    description: metadata.description,
    image: metadata.image,
  };
}

/**
 * Generate complete Next.js Metadata object for a Post or Page
 * Works with dynamic metadata generation
 */
export async function generateNextMetadata(
  content: Post | Page,
  url: string,
  siteUrl: string,
  featuredMediaData?: FeaturedMedia
) {
  const metadata = await buildMetadata(content, url, featuredMediaData);

  const fullUrl = `${siteUrl}${url}`;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: url,
    },
    openGraph: generateOpenGraphMeta({
      ...metadata,
      url: fullUrl,
    }),
    twitter: generateTwitterCardMeta({
      ...metadata,
      url: fullUrl,
    }),
  };
}
