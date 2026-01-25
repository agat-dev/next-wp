/**
 * API route helpers for metadata
 * Provides utilities for creating metadata API endpoints
 */

import type {
  MetadataBundle,
  MetadataApiResponse,
  ContentMetadataBundle,
} from "./metadata-types";

/**
 * Create a successful metadata API response
 */
export function createMetadataResponse(data: MetadataBundle): MetadataApiResponse {
  return {
    success: true,
    data,
    cache: {
      hit: false,
      ttl: 3600,
    },
  };
}

/**
 * Create an error metadata API response
 */
export function createMetadataErrorResponse(
  error: string,
  statusCode: number = 500
): {
  response: MetadataApiResponse;
  statusCode: number;
} {
  return {
    response: {
      success: false,
      error,
    },
    statusCode,
  };
}

/**
 * Generate cache key for metadata
 */
export function generateMetadataCacheKey(slug: string, type: "post" | "page"): string {
  return `metadata:${type}:${slug}`;
}

/**
 * Parse query parameters from URL
 */
export function parseMetadataQueryParams(searchParams: Record<string, string | string[]>) {
  return {
    slug: Array.isArray(searchParams.slug)
      ? searchParams.slug[0]
      : searchParams.slug || "",
    type: (Array.isArray(searchParams.type)
      ? searchParams.type[0]
      : searchParams.type) as "post" | "page" | undefined,
    format: (Array.isArray(searchParams.format)
      ? searchParams.format[0]
      : searchParams.format) as "json" | "xml" | undefined,
  };
}

/**
 * Build metadata response headers
 */
export function buildMetadataHeaders() {
  return {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=3600, s-maxage=3600",
    "X-Content-Type-Options": "nosniff",
  };
}

/**
 * Validate metadata bundle
 */
export function validateMetadataBundle(data: any): data is MetadataBundle {
  return (
    typeof data === "object" &&
    typeof data.title === "string" &&
    typeof data.description === "string" &&
    typeof data.url === "string" &&
    data.openGraph &&
    data.twitter &&
    data.jsonLd
  );
}

/**
 * Sanitize metadata for output
 */
export function sanitizeMetadata(metadata: MetadataBundle): MetadataBundle {
  return {
    ...metadata,
    title: sanitizeString(metadata.title),
    description: sanitizeString(metadata.description),
    image: metadata.image ? sanitizeString(metadata.image) : undefined,
    openGraph: {
      ...metadata.openGraph,
      title: sanitizeString(metadata.openGraph.title),
      description: sanitizeString(metadata.openGraph.description),
    },
    twitter: {
      ...metadata.twitter,
      title: sanitizeString(metadata.twitter.title),
      description: sanitizeString(metadata.twitter.description),
    },
  };
}

/**
 * Sanitize individual string
 */
function sanitizeString(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

/**
 * Format metadata for XML sitemap
 */
export function formatMetadataForSitemap(
  metadata: ContentMetadataBundle,
  baseUrl: string
) {
  const url = `${baseUrl}/${metadata.slug}`;
  const loc = url;
  const lastmod = new Date(metadata.modifiedDate).toISOString().split("T")[0];
  const priority = metadata.status === "publish" ? "0.8" : "0.5";
  const changefreq = "weekly";

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

/**
 * Format metadata as RSS item
 */
export function formatMetadataForRSS(
  metadata: ContentMetadataBundle,
  baseUrl: string
) {
  const url = `${baseUrl}/${metadata.slug}`;

  return `  <item>
    <title>${sanitizeString(metadata.title)}</title>
    <description>${sanitizeString(metadata.description)}</description>
    <link>${url}</link>
    <guid>${url}</guid>
    <pubDate>${new Date(metadata.publishedDate).toUTCString()}</pubDate>
    ${metadata.image ? `<image url="${metadata.image.url}" />` : ""}
  </item>`;
}

/**
 * Generate metadata analytics event
 */
export function trackMetadataGeneration(
  slug: string,
  type: "post" | "page",
  duration: number
) {
  return {
    event: "metadata_generated",
    slug,
    type,
    duration,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create metadata API endpoint response
 */
export async function createMetadataEndpointResponse(
  callback: () => Promise<MetadataBundle>
): Promise<Response> {
  try {
    const metadata = await callback();

    if (!validateMetadataBundle(metadata)) {
      const error = createMetadataErrorResponse("Invalid metadata structure", 500);
      return new Response(JSON.stringify(error.response), {
        status: error.statusCode,
        headers: buildMetadataHeaders(),
      });
    }

    const sanitized = sanitizeMetadata(metadata);
    const response = createMetadataResponse(sanitized);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: buildMetadataHeaders(),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorResponse = createMetadataErrorResponse(errorMessage);

    return new Response(JSON.stringify(errorResponse.response), {
      status: errorResponse.statusCode,
      headers: buildMetadataHeaders(),
    });
  }
}

/**
 * Memoize metadata generation (for development/debugging)
 */
const metadataCache = new Map<string, { data: MetadataBundle; timestamp: number }>();

export function getCachedMetadata(key: string): MetadataBundle | null {
  const cached = metadataCache.get(key);

  if (!cached) {
    return null;
  }

  // Check if cache is still valid (1 hour)
  if (Date.now() - cached.timestamp > 3600000) {
    metadataCache.delete(key);
    return null;
  }

  return cached.data;
}

export function setCachedMetadata(key: string, data: MetadataBundle): void {
  metadataCache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearMetadataCache(): void {
  metadataCache.clear();
}
