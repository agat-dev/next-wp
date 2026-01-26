/**
 * Extended types for metadata
 * Adds useful properties to WordPress types for metadata generation
 */

import type { Post, Page, FeaturedMedia } from "./wordpress.d";

/**
 * Post with metadata information
 */
export interface PostWithMetadata extends Post {
  featuredMedia?: FeaturedMedia;
  metaDescription?: string;
  metaImage?: string;
  metaKeywords?: string[];
}

/**
 * Page with metadata information
 */
export interface PageWithMetadata extends Page {
  featuredMedia?: FeaturedMedia;
  metaDescription?: string;
  metaImage?: string;
  metaKeywords?: string[];
}

/**
 * Metadata for social sharing
 */
export interface SocialMetadata {
  title: string;
  description: string;
  image?: string;
  url: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

/**
 * OpenGraph metadata object
 */
export interface OpenGraphMetadata {
  title: string;
  description: string;
  type: "website" | "article" | "blog" | "profile";
  url: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
    type?: string;
  }>;
  locale?: string;
  siteTitle?: string;
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

/**
 * Twitter Card metadata object
 */
export interface TwitterCardMetadata {
  card: "summary" | "summary_large_image" | "player" | "app";
  site?: string;
  creator?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  player?: string;
  playerWidth?: number;
  playerHeight?: number;
  playerStream?: string;
}

/**
 * JSON-LD Schema metadata
 */
export interface JsonLdMetadata {
  "@context": string;
  "@type": string;
  "@id"?: string;
  name: string;
  description: string;
  image?: string | { "@type": string; url: string };
  url: string;
  author?: { "@type": string; name: string };
  datePublished?: string;
  dateModified?: string;
  publisher?: {
    "@type": string;
    name: string;
    logo?: {
      "@type": string;
      url: string;
    };
  };
  mainEntity?: {
    "@type": string;
  };
  [key: string]: unknown;
}

/**
 * Breadcrumb item for breadcrumb schema
 */
export interface BreadcrumbItem {
  position: number;
  name: string;
  item: string;
}

/**
 * Complete metadata bundle
 */
export interface MetadataBundle {
  title: string;
  description: string;
  image?: string;
  url: string;
  type: "post" | "page" | "archive";
  robots?: string;
  openGraph: OpenGraphMetadata;
  twitter: TwitterCardMetadata;
  jsonLd: JsonLdMetadata;
  keywords?: string[];
  canonical?: string;
  alternates?: {
    languages?: Record<string, string>;
    canonical?: string;
  };
}

/**
 * API response for metadata endpoint
 */
export interface MetadataApiResponse {
  success: boolean;
  data?: MetadataBundle;
  error?: string;
  cache?: {
    hit: boolean;
    ttl?: number;
  };
}

/**
 * Image metadata from featured media
 */
export interface ImageMetadata {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  caption?: string;
  mimeType?: string;
  sizes?: Record<
    string,
    {
      url: string;
      width: number;
      height: number;
    }
  >;
}

/**
 * Author metadata for JSON-LD
 */
export interface AuthorMetadata {
  name: string;
  url: string;
  image?: string;
  description?: string;
}

/**
 * Content metadata bundle (used internally)
 */
export interface ContentMetadataBundle {
  slug: string;
  title: string;
  description: string;
  content: string;
  excerpt?: string;
  image?: ImageMetadata;
  author?: AuthorMetadata;
  publishedDate: string;
  modifiedDate: string;
  status: "publish" | "draft" | "pending";
  categories?: Array<{ name: string; slug: string }>;
  tags?: Array<{ name: string; slug: string }>;
}
