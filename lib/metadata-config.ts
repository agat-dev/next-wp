/**
 * Metadata configuration
 * Centralized configuration for metadata generation
 */

export const metadataConfig = {
  // Image settings
  og: {
    imageWidth: 1200,
    imageHeight: 630,
    imageQuality: 85,
    defaultImage: "/img/default-og-image.png",
  },

  // Text limits
  limits: {
    titleMax: 60,
    descriptionMax: 160,
    excerptMax: 200,
    keywordsMax: 5,
  },

  // SEO settings
  seo: {
    enableIndex: true,
    enableFollow: true,
    enableSnippet: true,
    enableImageIndex: true,
    changeFrequency: "weekly" as const,
  },

  // Sitemap priorities
  sitemap: {
    homepage: 1.0,
    post: 0.8,
    page: 0.7,
    archive: 0.6,
    tag: 0.5,
    category: 0.6,
  },

  // Cache settings
  cache: {
    ttl: 3600, // 1 hour in seconds
    revalidateTag: "wordpress-metadata",
  },

  // Social media handles (optional)
  social: {
    twitter: "@yourhandle",
    facebook: "yourpage",
    instagram: "yourprofile",
  },

  // Organization info for JSON-LD
  organization: {
    name: "Next Impact Hub",
    logo: "/img/logo.png",
    description:
      "A modern platform combining WordPress and Next.js for optimal performance",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  },
};

/**
 * Get metadata config value with fallback
 */
export function getMetadataConfig<K extends keyof typeof metadataConfig>(
  key: K
): typeof metadataConfig[K] {
  return metadataConfig[key];
}

/**
 * Override metadata config values (useful for testing or runtime changes)
 */
export function overrideMetadataConfig<K extends keyof typeof metadataConfig>(
  key: K,
  value: Partial<typeof metadataConfig[K]>
): void {
  Object.assign(metadataConfig[key], value);
}

/**
 * Metadata templates for different content types
 */
export const metadataTemplates = {
  post: {
    robots: "index, follow, max-snippet:-1, max-image-preview:large",
    type: "article" as const,
  },
  page: {
    robots: "index, follow",
    type: "website" as const,
  },
  archive: {
    robots: "index, follow, noarchive",
    type: "website" as const,
  },
  draft: {
    robots: "noindex, nofollow",
    type: "website" as const,
  },
};

/**
 * Get template for content type
 */
export function getMetadataTemplate(
  status: "publish" | "draft" | "pending",
  type: "post" | "page" | "archive"
): (typeof metadataTemplates)[keyof typeof metadataTemplates] {
  if (status !== "publish") {
    return metadataTemplates.draft;
  }

  if (type === "archive") {
    return metadataTemplates.archive;
  }

  return metadataTemplates[type];
}
