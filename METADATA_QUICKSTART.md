# Guide de Démarrage Rapide - Métadonnées

## Installation rapide en 3 étapes

### 1️⃣ Intégration dans vos pages de posts

Remplacez le contenu de `app/posts/[slug]/page.tsx` par:

```tsx
import { getPostBySlug, getAllPostSlugs } from "@/lib/wordpress";
import { generatePostMetadata } from "@/lib/content-metadata";
import { siteConfig } from "@/site.config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const { metadata } = await generatePostMetadata(
    post,
    siteConfig.site_domain,
    siteConfig.site_domain
  );
  return metadata;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

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
      <article>
        <h1>{post.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </>
  );
}
```

### 2️⃣ Intégration dans vos pages statiques

Remplacez le contenu de `app/[slug]/page.tsx` par:

```tsx
import { getPageBySlug, getAllPages } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/content-metadata";
import { siteConfig } from "@/site.config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};

  const { metadata } = await generatePageMetadata(
    page,
    siteConfig.site_domain,
    siteConfig.site_domain
  );
  return metadata;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const { jsonLd } = await generatePageMetadata(
    page,
    siteConfig.site_domain,
    siteConfig.site_domain
  );

  return (
    <>
      <Script
        id="page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <h1>{page.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </div>
    </>
  );
}
```

### 3️⃣ Intégration dans vos archives (posts, tags, catégories)

Remplacez le contenu de `app/posts/page.tsx` par:

```tsx
import { getAllPosts } from "@/lib/wordpress";
import { generateCollectionMetadata } from "@/lib/content-metadata";
import { siteConfig } from "@/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = generateCollectionMetadata(
  "Tous les articles",
  "Découvrez nos derniers articles et insights",
  siteConfig.site_domain,
  siteConfig.site_domain,
  "/posts"
);

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1>Tous les articles</h1>
      <div className="grid">
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title.rendered}</h2>
            <p>{post.excerpt.rendered}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## ✅ Vérification de l'installation

### 1. Dans votre terminal:

```bash
npm run build
```

Vérifiez qu'il n'y a pas d'erreurs TypeScript.

### 2. Visitez une page et inspectez le code source (Ctrl+U):

Vous devriez voir:

```html
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    ...
  }
</script>
```

### 3. Testez avec les outils externes:

- **Facebook**: https://developers.facebook.com/tools/debug/og/object/
- **Twitter**: https://cards-dev.twitter.com/validator
- **Google**: https://search.google.com/test/rich-results

## 🎯 Utilité pratique

### Récupération automatique:

✅ **Titre** - Du titre WordPress
✅ **Description** - De l'extrait ou du contenu (160 caractères max)
✅ **Image** - Image à la une ou première image du contenu
✅ **Auteur** - Récupéré depuis WordPress
✅ **Dates** - Publication et modification
✅ **Catégories/Tags** - Inclus dans les métadonnées

### Génération automatique:

✅ **OpenGraph** - Pour les réseaux sociaux
✅ **Twitter Card** - Pour Twitter/X
✅ **JSON-LD** - Pour les moteurs de recherche
✅ **Sitemap** - Facilement extensible
✅ **Robots directives** - Indexation/suivi

## 📝 Personnalisation

### Personnaliser les limites de texte

Éditez `lib/metadata-config.ts`:

```typescript
export const metadataConfig = {
  limits: {
    titleMax: 60,
    descriptionMax: 160,  // Changez ici
    excerptMax: 200,
    keywordsMax: 5,
  },
  // ...
};
```

### Ajouter une image par défaut

Placez une image `public/img/default-og-image.png` et mettez à jour:

```typescript
export const metadataConfig = {
  og: {
    defaultImage: "/img/default-og-image.png",
    // ...
  },
};
```

### Personnaliser l'organisation

Éditez `lib/metadata-config.ts`:

```typescript
export const metadataConfig = {
  organization: {
    name: "Votre Nom",
    logo: "/img/your-logo.png",
    description: "Votre description",
    url: "https://votre-site.com",
  },
  // ...
};
```

## 🔧 Dépannage

### Les métadonnées n'apparaissent pas

1. Vérifiez que `generateMetadata()` est utilisée dans votre page
2. Vérifiez que les données WordPress sont récupérées correctement
3. Vérifiez qu'il n'y a pas d'erreurs dans les logs de build

```bash
npm run build -- --debug
```

### L'image n'apparaît pas

1. Vérifiez que l'image à la une est définie dans WordPress
2. Vérifiez que l'URL est accessible publiquement
3. Testez avec le débogueur Facebook OG

### Les caractères spéciaux s'affichent mal

Vérifiez que `site.config.ts` a le bon domaine avec le bon protocole (https).

## 📚 Documentation complète

Pour une documentation détaillée, consulter [METADATA_GUIDE.md](./METADATA_GUIDE.md)

## 🚀 Prochaines étapes

Une fois l'installation effectuée:

1. ✅ Testez les métadonnées sur une page
2. ✅ Vérifiez avec les outils externes (Facebook, Twitter, Google)
3. ✅ Personnalisez la configuration si nécessaire
4. ✅ Déployez et vérifiez en production

Vous avez maintenant un système complet de gestion des métadonnées! 🎉
