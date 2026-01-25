# 📚 Index Complet du Système de Métadonnées

Bienvenue! Ce document vous guide dans le système de gestion des métadonnées créé pour votre site Next.js avec WordPress.

## 🚀 Démarrage rapide

**Nouveau?** Commencez ici:

1. Lire [METADATA_QUICKSTART.md](./METADATA_QUICKSTART.md) ⚡ (5 min)
2. Intégrer dans vos pages (15 min)
3. Tester avec les outils externes (10 min)

**Total: ~30 minutes pour être opérationnel!**

---

## 📖 Documentation

### Pour les utilisateurs

| Document | Durée | Contenu |
|----------|-------|---------|
| [METADATA_QUICKSTART.md](./METADATA_QUICKSTART.md) | 5 min | Démarrage en 3 étapes |
| [METADATA_GUIDE.md](./METADATA_GUIDE.md) | 15 min | Documentation complète |
| [METADATA_INTEGRATION_CHECKLIST.md](./METADATA_INTEGRATION_CHECKLIST.md) | À l'usage | Checklist d'intégration |
| [METADATA_FILES_SUMMARY.md](./METADATA_FILES_SUMMARY.md) | 10 min | Vue d'ensemble des fichiers |

### Pour les développeurs

| Fichier | Type | Description |
|---------|------|-------------|
| [lib/metadata.ts](./lib/metadata.ts) | Utilitaires | Fonctions de base pour métadonnées |
| [lib/og-metadata.ts](./lib/og-metadata.ts) | Utilitaires | Génération OpenGraph et JSON-LD |
| [lib/content-metadata.ts](./lib/content-metadata.ts) | Helpers | Helpers pour posts et pages |
| [lib/metadata-types.ts](./lib/metadata-types.ts) | Types | Types TypeScript complets |
| [lib/metadata-config.ts](./lib/metadata-config.ts) | Config | Configuration centralisée |
| [lib/metadata-api-helpers.ts](./lib/metadata-api-helpers.ts) | Helpers | Helpers pour API routes |
| [lib/metadata-examples.ts](./lib/metadata-examples.ts) | Exemples | Exemples copiables |

---

## 🎯 Ce que cela fait

### ✅ Récupère automatiquement depuis WordPress:

- **Titre** du post/page
- **Description** (extrait ou contenu)
- **Image** (à la une ou 1ère image du contenu)
- **Auteur** du contenu
- **Dates** (publication et modification)
- **Catégories** et **Tags**

### ✅ Génère automatiquement:

- **Meta description** optimisée (160 caractères)
- **OpenGraph** (pour Facebook, LinkedIn, etc.)
- **Twitter Card** (pour Twitter/X)
- **JSON-LD** (pour Google et moteurs de recherche)
- **Directives robots** (indexation/suivi)
- **Fil d'Ariane** (breadcrumb schema)

---

## 📂 Structure des fichiers créés

```
lib/
├── metadata.ts                  # Utilitaires de base ⭐
├── og-metadata.ts              # OpenGraph et JSON-LD
├── content-metadata.ts         # Helpers pour contenu
├── metadata-types.ts           # Types TypeScript
├── metadata-config.ts          # Configuration
├── metadata-api-helpers.ts     # Helpers API
└── metadata-examples.ts        # Exemples

Documentation/
├── METADATA_QUICKSTART.md              # Démarrage rapide ⭐
├── METADATA_GUIDE.md                   # Guide complet
├── METADATA_INTEGRATION_CHECKLIST.md  # Checklist
├── METADATA_FILES_SUMMARY.md          # Résumé fichiers
└── METADATA_INDEX.md                  # Ce fichier
```

---

## 🔄 Cas d'usage courants

### 1️⃣ Ajouter métadonnées à une page de post

```tsx
import { generatePostMetadata } from "@/lib/content-metadata";

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  const { metadata } = await generatePostMetadata(post, siteUrl, baseUrl);
  return metadata;
}
```

### 2️⃣ Ajouter métadonnées à une page statique

```tsx
import { generatePageMetadata } from "@/lib/content-metadata";

export async function generateMetadata({ params }) {
  const page = await getPageBySlug(params.slug);
  const { metadata } = await generatePageMetadata(page, siteUrl, baseUrl);
  return metadata;
}
```

### 3️⃣ Ajouter métadonnées à une archive

```tsx
import { generateCollectionMetadata } from "@/lib/content-metadata";

export const metadata = generateCollectionMetadata(
  "Tous les posts",
  "Découvrez tous nos articles",
  siteUrl,
  baseUrl,
  "/posts"
);
```

### 4️⃣ Extraire une image du contenu

```tsx
import { extractFirstImageFromContent } from "@/lib/metadata";

const image = extractFirstImageFromContent(post.content.rendered);
```

### 5️⃣ Nettoyer et limiter du texte

```tsx
import { cleanHtmlContent } from "@/lib/metadata";

const description = cleanHtmlContent(post.content.rendered, 160);
```

---

## 🧭 Guide de navigation

### Je veux...

**Intégrer les métadonnées dans mes pages**
→ Lire [METADATA_QUICKSTART.md](./METADATA_QUICKSTART.md)

**Comprendre comment fonctionne le système**
→ Lire [METADATA_GUIDE.md](./METADATA_GUIDE.md)

**Personnaliser la configuration**
→ Éditer [lib/metadata-config.ts](./lib/metadata-config.ts)

**Voir des exemples copiables**
→ Regarder [lib/metadata-examples.ts](./lib/metadata-examples.ts)

**Déboguer un problème**
→ Section Dépannage dans [METADATA_GUIDE.md](./METADATA_GUIDE.md)

**Utiliser les métadonnées dans une API**
→ Voir [lib/metadata-api-helpers.ts](./lib/metadata-api-helpers.ts)

**Générer un sitemap**
→ Fonction `buildSitemapEntry()` dans [lib/content-metadata.ts](./lib/content-metadata.ts)

**Générer un RSS feed**
→ Fonction `formatMetadataForRSS()` dans [lib/metadata-api-helpers.ts](./lib/metadata-api-helpers.ts)

---

## 📊 Vue d'ensemble des fonctions

### Extraction et nettoyage

```typescript
// Extraire une image du HTML
extractFirstImageFromContent(html: string): string | null

// Nettoyer du HTML et limiter la longueur
cleanHtmlContent(html: string, maxLength?: number): string

// Récupérer la description d'un post
getDescription(content: Post | Page, maxLength?: number): string

// Récupérer l'image à la une ou 1ère du contenu
getFeaturedImageUrl(content: Post | Page, featuredMediaData?: FeaturedMedia): Promise<string | null>
```

### Génération de métadonnées

```typescript
// Générer un objet métadonnées complet
buildMetadata(content: Post | Page, url: string, featuredMediaData?: FeaturedMedia): Promise<MetadataContent>

// Générer les données OpenGraph
generateOpenGraphMeta(metadata: MetadataContent): object

// Générer les données Twitter Card
generateTwitterCardMeta(metadata: MetadataContent): object

// Générer le format Next.js Metadata complet
generateNextMetadata(content: Post | Page, url: string, siteUrl: string, featuredMediaData?: FeaturedMedia): Promise<Metadata>
```

### Helpers pour contenu

```typescript
// Générer métadonnées complètes pour un post
generatePostMetadata(post: Post, siteUrl: string, baseUrl: string): Promise<{
  metadata: Metadata;
  ogImageUrl: string;
  jsonLd: object;
  description: string;
  image?: string;
}>

// Générer métadonnées complètes pour une page
generatePageMetadata(page: Page, siteUrl: string, baseUrl: string): Promise<{
  metadata: Metadata;
  ogImageUrl: string;
  jsonLd: object;
  description: string;
  image?: string;
}>

// Générer métadonnées pour une collection
generateCollectionMetadata(title: string, description: string, siteUrl: string, baseUrl: string, urlPath: string, image?: string): object
```

### Données structurées (JSON-LD)

```typescript
// Générer JSON-LD structuré
generateJsonLd(type: "Article" | "BlogPosting" | "WebPage" | "NewsArticle", data: object): object

// Générer fil d'Ariane
generateBreadcrumbSchema(items: Array<{name: string; url: string}>, baseUrl: string): object
```

### Configuration

```typescript
// Récupérer une valeur de config
getMetadataConfig(key: "og" | "limits" | "seo" | "sitemap" | "cache" | "social" | "organization"): object

// Personnaliser la config à l'exécution
overrideMetadataConfig(key: string, value: object): void
```

### Helpers API

```typescript
// Créer une réponse de succès
createMetadataResponse(data: MetadataBundle): MetadataApiResponse

// Créer une réponse d'erreur
createMetadataErrorResponse(error: string, statusCode?: number): {response: MetadataApiResponse; statusCode: number}

// Valider les métadonnées
validateMetadataBundle(data: any): boolean

// Nettoyer les métadonnées
sanitizeMetadata(metadata: MetadataBundle): MetadataBundle

// Formater pour sitemap XML
formatMetadataForSitemap(metadata: ContentMetadataBundle, baseUrl: string): string

// Formater pour RSS
formatMetadataForRSS(metadata: ContentMetadataBundle, baseUrl: string): string
```

---

## ✅ Checklist de vérification

- [ ] Tous les fichiers `lib/metadata-*.ts` créés
- [ ] Documentation lue: `METADATA_QUICKSTART.md`
- [ ] Intégration dans `app/posts/[slug]/page.tsx`
- [ ] Intégration dans `app/[slug]/page.tsx`
- [ ] Intégration dans `app/posts/page.tsx`
- [ ] Build local sans erreurs: `npm run build`
- [ ] Testé avec Facebook OG Debugger
- [ ] Testé avec Twitter Card Validator
- [ ] Testé avec Google Rich Results
- [ ] Déployé en production
- [ ] Vérification finale en production

---

## 🆘 Aide rapide

### Problème: Comment déboguer?

Voir "Dépannage" dans [METADATA_GUIDE.md](./METADATA_GUIDE.md#dépannage)

### Problème: L'image n'apparaît pas?

Voir "L'image n'apparaît pas" dans [METADATA_GUIDE.md](./METADATA_GUIDE.md#limage-napparaît-pas)

### Problème: Caractères spéciaux affichés mal?

Voir "Caractères spéciaux" dans [METADATA_GUIDE.md](./METADATA_GUIDE.md#les-caractères-spéciaux-saffichent-mal)

### Besoin d'exemples?

Voir [lib/metadata-examples.ts](./lib/metadata-examples.ts)

---

## 📞 Fichiers de référence

| Besoin | Fichier |
|--------|---------|
| Démarrage | [METADATA_QUICKSTART.md](./METADATA_QUICKSTART.md) |
| Documentation | [METADATA_GUIDE.md](./METADATA_GUIDE.md) |
| Checklist | [METADATA_INTEGRATION_CHECKLIST.md](./METADATA_INTEGRATION_CHECKLIST.md) |
| Résumé | [METADATA_FILES_SUMMARY.md](./METADATA_FILES_SUMMARY.md) |
| Exemples | [lib/metadata-examples.ts](./lib/metadata-examples.ts) |
| Configuration | [lib/metadata-config.ts](./lib/metadata-config.ts) |
| API | [lib/metadata-api-helpers.ts](./lib/metadata-api-helpers.ts) |

---

## 🎓 Apprentissage progressif

### Niveau 1: Débutant ⭐
1. Lire [METADATA_QUICKSTART.md](./METADATA_QUICKSTART.md)
2. Copier l'exemple pour les posts
3. Tester localement

### Niveau 2: Intermédiaire ⭐⭐
1. Lire [METADATA_GUIDE.md](./METADATA_GUIDE.md)
2. Intégrer pour tous les types de pages
3. Personnaliser la configuration

### Niveau 3: Avancé ⭐⭐⭐
1. Créer des API endpoints de métadonnées
2. Implémenter un sitemap dynamique
3. Ajouter un RSS feed
4. Créer des schémas JSON-LD personnalisés

---

## 🚀 Vous êtes prêt!

Commencez par lire **[METADATA_QUICKSTART.md](./METADATA_QUICKSTART.md)** et vous serez opérationnel en 30 minutes! 💪

---

**Créé:** January 25, 2026
**Version:** 1.0
**Status:** Prêt pour production ✅
