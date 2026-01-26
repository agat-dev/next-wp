# Système de Gestion des Métadonnées

Ce système gère automatiquement les métadonnées SEO et les images OpenGraph pour votre site Next.js avec WordPress.

## Fichiers créés

### 1. `lib/metadata.ts` - Utilitaires de base
Fonctions pour extraire et nettoyer les métadonnées WordPress:

- **`extractFirstImageFromContent()`** - Extrait la première image du contenu HTML
- **`cleanHtmlContent()`** - Nettoie le HTML et génère une description propre
- **`getDescription()`** - Extrait la description d'un post/page (priorité: excerpt > content)
- **`getFeaturedImageUrl()`** - Récupère l'image à la une ou la première image du contenu
- **`buildMetadata()`** - Construit un objet métadonnées complet
- **`generateOpenGraphMeta()`** - Génère les données OpenGraph
- **`generateTwitterCardMeta()`** - Génère les données Twitter Card
- **`generateNextMetadata()`** - Génère le format métadonnées Next.js complet

### 2. `lib/og-metadata.ts` - Génération d'images OpenGraph
Utilitaires pour les images dynamiques et les données structurées:

- **`generateOGImageUrl()`** - Crée une URL OG avec paramètres
- **`extractOGImageParams()`** - Extrait les paramètres d'une URL OG
- **`formatTextForOGImage()`** - Formate le texte pour affichage en image
- **`generateJsonLd()`** - Génère les données JSON-LD structurées
- **`generateBreadcrumbSchema()`** - Crée le schéma de fil d'Ariane

### 3. `lib/content-metadata.ts` - Helpers pour contenu
Fonctions de haut niveau pour posts et pages:

- **`generatePostMetadata()`** - Génère les métadonnées complètes pour un post
- **`generatePageMetadata()`** - Génère les métadonnées complètes pour une page
- **`generateCollectionMetadata()`** - Métadonnées pour les collections (archives, tags, etc.)
- **`buildSitemapEntry()`** - Crée une entrée de sitemap
- **`extractKeywords()`** - Extrait les mots-clés du contenu
- **`generateRobotsMeta()`** - Génère les directives robots

### 4. `lib/metadata-examples.ts` - Exemples d'utilisation
Documentation et exemples pour l'intégration dans vos pages.

## Utilisation

### Pour les pages de posts

```tsx
import { getPostBySlug } from "@/lib/wordpress";
import { generatePostMetadata } from "@/lib/content-metadata";
import { siteConfig } from "@/site.config";
import type { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const { metadata } = await generatePostMetadata(
    post,
    siteConfig.site_domain,
    siteConfig.site_domain
  );

  return metadata;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const { jsonLd } = await generatePostMetadata(
    post,
    siteConfig.site_domain,
    siteConfig.site_domain
  );

  return (
    <>
      <Script
        id="post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Votre contenu */}
    </>
  );
}
```

### Pour les pages statiques

```tsx
import { getPageBySlug } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/content-metadata";
import { siteConfig } from "@/site.config";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  const { metadata } = await generatePageMetadata(
    page,
    siteConfig.site_domain,
    siteConfig.site_domain
  );

  return metadata;
}
```

### Pour les collections (archives)

```tsx
import { generateCollectionMetadata } from "@/lib/content-metadata";
import { siteConfig } from "@/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = generateCollectionMetadata(
  "Tous les posts",
  "Découvrez tous nos articles",
  siteConfig.site_domain,
  siteConfig.site_domain,
  "/posts"
);
```

## Ce que les métadonnées incluent

### Meta Tags standards
- `title` - Titre de la page
- `description` - Description courte (160 caractères max)
- `keywords` - Mots-clés extraits du contenu
- `robots` - Directives d'indexation

### OpenGraph (Partage social)
- `og:title` - Titre pour partage
- `og:description` - Description pour partage
- `og:image` - Image pour partage (1200x630)
- `og:type` - Type de contenu (article, website)
- `og:url` - URL canonique
- `og:publishedTime` - Date de publication
- `og:modifiedTime` - Date de modification

### Twitter Card
- `twitter:card` - Type de carte
- `twitter:title` - Titre
- `twitter:description` - Description
- `twitter:image` - Image

### JSON-LD (Données structurées)
- BlogPosting pour les posts
- WebPage pour les pages
- Auteur, dates, images
- Schéma fil d'Ariane optionnel

## Extraction d'images

Le système recherche les images dans cet ordre:

1. **Image à la une (Featured Image)** - Si définie dans WordPress
2. **Première image du contenu** - Parse le HTML et cherche la première balise `<img>`

Les images sont automatiquement optimisées au format OpenGraph (1200x630).

## Nettoyage du contenu

Les fonctions de nettoyage:
- Supprime les balises HTML
- Décode les entités HTML (`&rsquo;` → `'`)
- Efface les espaces inutiles
- Limite la longueur du texte
- Ajoute les points de suspension si nécessaire

## Exemple complet pour une page

Voir [lib/metadata-examples.ts](./metadata-examples.ts) pour des exemples détaillés copiables.

## Configuration requise

Assurez-vous que votre `site.config.ts` contient:

```typescript
export const siteConfig = {
  site_domain: "https://example.com",
  // ... autres config
};
```

## Variables d'environnement requises

```
WORDPRESS_URL=https://your-wordpress-site.com
```

## Fonctionnalités avancées

### Extraction de mots-clés
```typescript
const keywords = extractKeywords(post, ["custom", "keywords"]);
```

### Génération de fil d'Ariane
```typescript
const breadcrumbs = generateBreadcrumbSchema(
  [
    { name: "Home", url: "/" },
    { name: "Posts", url: "/posts" },
    { name: "Mon article", url: "/posts/mon-article" },
  ],
  siteConfig.site_domain
);
```

### Entrées de sitemap
```typescript
const entry = buildSitemapEntry(post, siteConfig.site_domain, "0.8");
```

## Tests

Pour tester les métadonnées générées:

1. Visitez votre page
2. Inspectez la page source (`Ctrl+U`)
3. Recherchez les balises `<meta>` et `<script type="application/ld+json">`
4. Utilisez [Open Graph Debugger](https://developers.facebook.com/tools/debug/og/object/)
5. Utilisez [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Performance

- Les métadonnées sont générées à la compilation (SSG)
- Les images OpenGraph sont servies par votre API route
- Mise en cache automatique via les tags `next/cache`
- Révalidation toutes les heures par défaut

## Dépannage

### L'image n'apparaît pas
- Vérifiez que l'image à la une est définie dans WordPress
- Vérifiez que l'URL de l'image est accessible publiquement
- Testez avec le [Facebook OG Debugger](https://developers.facebook.com/tools/debug/og/object/)

### La description est vide
- Vérifiez qu'un excerpt existe dans WordPress
- Vérifiez que le contenu n'est pas vide
- Vérifiez que le HTML est correctement structuré

### Les caractères spéciaux s'affichent mal
- Vérifiez l'encodage UTF-8 dans WordPress
- Les entités HTML sont automatiquement décodées par `decodeHtml()`

## Intégration avec le reste du site

Les fichiers de métadonnées s'intègrent avec:
- `lib/wordpress.ts` - Récupération des données WordPress
- `lib/decodeHtml.ts` - Décodage des entités HTML
- `types.d.ts` - Types TypeScript
- `site.config.ts` - Configuration du site
