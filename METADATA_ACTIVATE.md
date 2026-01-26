# 🚀 Démarrage et déploiement des métadonnées

## ✅ Avant de commencer

Assurez-vous que vous avez:

- [ ] Node.js et npm installés
- [ ] Projet Next.js fonctionnel
- [ ] WordPress connecté (WORDPRESS_URL configuré dans `.env.local`)
- [ ] Fichier `site.config.ts` avec `site_domain` correct
- [ ] Les fichiers `lib/wordpress.ts` et `lib/decodeHtml.ts` existants

## 📦 Fichiers inclus

✅ Tous les fichiers de métadonnées sont créés:

```
lib/
├── metadata.ts              ✅
├── og-metadata.ts          ✅
├── content-metadata.ts     ✅
├── metadata-types.ts       ✅
├── metadata-config.ts      ✅
├── metadata-api-helpers.ts ✅
└── metadata-examples.ts    ✅
```

Documentation:
```
├── METADATA_INDEX.md                    ✅
├── METADATA_QUICKSTART.md              ✅
├── METADATA_GUIDE.md                    ✅
├── METADATA_FILES_SUMMARY.md            ✅
├── METADATA_INTEGRATION_CHECKLIST.md   ✅
├── METADATA_CREATION_COMPLETE.md        ✅
├── lib/README_METADATA.md              ✅
└── METADATA_ACTIVATE.md (ce fichier)    ✅
```

## 🎯 Plan d'activation (3 étapes)

### Étape 1: Validation locale (10 min)

1. **Vérifiez que tous les fichiers sont présents:**
```bash
ls lib/metadata-*.ts
# Doit afficher: metadata.ts, og-metadata.ts, content-metadata.ts, 
# metadata-types.ts, metadata-config.ts, metadata-api-helpers.ts, metadata-examples.ts
```

2. **Lancez le build local:**
```bash
npm run build
# Doit pas avoir d'erreurs TypeScript
```

3. **Testez une page localement:**
```bash
npm run dev
# Visitez http://localhost:3000/posts/[un-post]
# Inspectez la source (Ctrl+U) et cherchez <meta name="description"
```

### Étape 2: Intégration dans les pages (15 min)

#### 2.1 Intégrez dans les posts

Ouvrez `app/posts/[slug]/page.tsx` et remplacez la fonction `generateMetadata`:

```tsx
import { generatePostMetadata } from "@/lib/content-metadata";
import { siteConfig } from "@/site.config";
import Script from "next/script";

export async function generateMetadata({ params }) {
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

export default async function PostPage({ params }) {
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

#### 2.2 Intégrez dans les pages statiques

Ouvrez `app/[slug]/page.tsx` et remplacez:

```tsx
import { generatePageMetadata } from "@/lib/content-metadata";
import { siteConfig } from "@/site.config";
import Script from "next/script";

export async function generateMetadata({ params }) {
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

export default async function Page({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  
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
      {/* Votre contenu */}
    </>
  );
}
```

#### 2.3 Intégrez dans les archives

Ouvrez `app/posts/page.tsx` et remplacez:

```tsx
import { generateCollectionMetadata } from "@/lib/content-metadata";
import { siteConfig } from "@/site.config";

export const metadata = generateCollectionMetadata(
  "Tous les articles",
  "Découvrez tous nos articles et insights",
  siteConfig.site_domain,
  siteConfig.site_domain,
  "/posts"
);

export default async function PostsPage() {
  // Votre contenu
}
```

### Étape 3: Vérification finale (15 min)

#### 3.1 Build et test local

```bash
npm run build
# Doit pas avoir d'erreurs

npm run dev
# Visitez une page et inspectez le source
```

#### 3.2 Vérifiez les métadonnées

Inspectez la page (Ctrl+U) et cherchez:

```html
<!-- Meta tags -->
<meta name="description" content="...">
<meta name="robots" content="...">

<!-- OpenGraph -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:type" content="...">
<meta property="og:url" content="...">

<!-- Twitter Card -->
<meta name="twitter:card" content="...">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">

<!-- JSON-LD -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    ...
  }
</script>
```

#### 3.3 Testez avec les outils externes

**Facebook OG Debugger:**
1. Allez sur https://developers.facebook.com/tools/debug/og/object/
2. Entrez l'URL de votre page (locale avec ngrok ou production)
3. Vérifiez que le titre, la description et l'image s'affichent

**Twitter Card Validator:**
1. Allez sur https://cards-dev.twitter.com/validator
2. Entrez l'URL
3. Vérifiez que l'aperçu s'affiche correctement

**Google Rich Results:**
1. Allez sur https://search.google.com/test/rich-results
2. Collez l'URL
3. Vérifiez que le schéma est reconnu

**Schema.org Validator:**
1. Allez sur https://validator.schema.org/
2. Collez l'URL
3. Vérifiez qu'il n'y a pas d'erreurs

## 🔧 Configuration (optionnel)

Personnalisez `lib/metadata-config.ts`:

```typescript
export const metadataConfig = {
  // Limites de texte
  limits: {
    titleMax: 60,           // Changez ici pour titles
    descriptionMax: 160,    // Changez ici pour descriptions
    excerptMax: 200,        // Changez ici pour excerpts
  },

  // Images OpenGraph
  og: {
    imageWidth: 1200,       // Largeur recommandée
    imageHeight: 630,       // Hauteur recommandée
    defaultImage: "/img/default-og-image.png",
  },

  // Directives robots
  seo: {
    enableIndex: true,      // Indexer les pages?
    enableFollow: true,     // Suivre les liens?
    enableSnippet: true,    // Afficher snippets?
    enableImageIndex: true, // Indexer les images?
  },

  // Organisation pour JSON-LD
  organization: {
    name: "Votre Nom",
    logo: "/img/logo.png",
    description: "Votre description",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  },
};
```

## 🚀 Déploiement (5 min)

### Sur Vercel (recommandé)

```bash
# 1. Push vers git
git add .
git commit -m "feat: add metadata management system"
git push

# 2. Déploiement automatique sur Vercel
# Vercel detecte automatiquement la config

# 3. Vérifiez en production
# https://votre-site-en-production.com/posts/[un-post]
```

### Sur autre plateforme

```bash
# 1. Build
npm run build

# 2. Deploy (selon votre plateforme)
# Pour Next.js standalone:
npm start

# Pour autres:
# Suivre les instructions de votre plateforme
```

### Vérification en production

1. Visitez votre site en production
2. Inspectez le source pour vérifier les métadonnées
3. Re-testez avec Facebook OG Debugger
4. Re-testez avec Twitter Card Validator
5. Soumettez à Google Search Console (optionnel)

## ✅ Checklist d'activation complète

### Préparation
- [ ] Tous les fichiers lib/metadata-*.ts présents
- [ ] Tous les fichiers documentation présents
- [ ] site.config.ts a le bon site_domain

### Configuration
- [ ] lib/metadata-config.ts personnalisé (optionnel)
- [ ] Variables d'environnement correctes (.env.local)

### Intégration
- [ ] app/posts/[slug]/page.tsx intégré
- [ ] app/[slug]/page.tsx intégré
- [ ] app/posts/page.tsx intégré

### Tests
- [ ] npm run build sans erreur
- [ ] npm run dev fonctionne
- [ ] Métadonnées visibles localement
- [ ] Testé avec Facebook OG Debugger
- [ ] Testé avec Twitter Card Validator
- [ ] Testé avec Google Rich Results

### Déploiement
- [ ] Code poussé à git
- [ ] Déployé en production
- [ ] Vérifiés en production
- [ ] Pas d'erreurs 404 images

### Documentation
- [ ] Équipe informée
- [ ] Documentation archivée
- [ ] README mis à jour

## 📞 Support

### Besoin d'aide?

1. Lire [METADATA_QUICKSTART.md](./METADATA_QUICKSTART.md)
2. Consulter [METADATA_GUIDE.md](./METADATA_GUIDE.md)
3. Voir les exemples dans [lib/metadata-examples.ts](./lib/metadata-examples.ts)
4. Voir le dépannage dans [METADATA_GUIDE.md#dépannage](./METADATA_GUIDE.md)

### Erreurs communes

**"generatePostMetadata is not defined"**
→ Assurez-vous d'importer depuis `@/lib/content-metadata`

**"Métadonnées n'apparaissent pas"**
→ Vérifiez que `generateMetadata()` est dans la page

**"L'image n'apparaît pas"**
→ Vérifiez que l'image à la une est définie dans WordPress

## 🎉 Activation complète!

Vous êtes maintenant prêt! Le système est:

✅ Installé
✅ Configuré
✅ Testé
✅ Déployé
✅ Prêt pour la production

**Prochaine étape:** Visiter votre site en production et partager un article sur les réseaux sociaux! 🚀

---

**Créé:** January 25, 2026
**Status:** ✅ Prêt pour activation
**Support:** Voir documentation

Bienvenue dans le monde des métadonnées professionnelles! 🎉
