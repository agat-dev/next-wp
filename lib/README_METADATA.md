# 📚 Fichiers Métadonnées - Guide rapide

## 📂 Structure

```
lib/
├── metadata.ts                 # ⭐ CORE - Utilitaires de base
├── og-metadata.ts             # Génération OG + JSON-LD
├── content-metadata.ts        # Helpers pour contenu
├── metadata-types.ts          # Types TypeScript
├── metadata-config.ts         # Configuration
├── metadata-api-helpers.ts    # Helpers API
└── metadata-examples.ts       # Exemples copiables
```

## 🎯 Utilisation rapide

### Pour un post
```tsx
import { generatePostMetadata } from "@/lib/content-metadata";

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  const { metadata } = await generatePostMetadata(post, siteUrl, baseUrl);
  return metadata;
}
```

### Pour une page
```tsx
import { generatePageMetadata } from "@/lib/content-metadata";

export async function generateMetadata({ params }) {
  const page = await getPageBySlug(params.slug);
  const { metadata } = await generatePageMetadata(page, siteUrl, baseUrl);
  return metadata;
}
```

### Pour une archive
```tsx
import { generateCollectionMetadata } from "@/lib/content-metadata";

export const metadata = generateCollectionMetadata(
  "Posts",
  "Tous les posts",
  siteUrl,
  baseUrl,
  "/posts"
);
```

## 📊 Matrice des fichiers

| Fichier | Taille | Fonction | Import |
|---------|--------|----------|--------|
| metadata.ts | 220 lig | Utilitaires basiques | `metadata` |
| og-metadata.ts | 160 lig | OG + JSON-LD | `og-metadata` |
| content-metadata.ts | 190 lig | Helpers contenu | `content-metadata` |
| metadata-types.ts | 150 lig | Types | `metadata-types` |
| metadata-config.ts | 80 lig | Configuration | `metadata-config` |
| metadata-api-helpers.ts | 220 lig | API helpers | `metadata-api-helpers` |
| metadata-examples.ts | 180 lig | Exemples | `metadata-examples` |

## 🔍 Fonctions principales

### Extraction
- `extractFirstImageFromContent()` - 1ère image du HTML
- `cleanHtmlContent()` - Nettoyer et limiter texte
- `getDescription()` - Description du contenu
- `getFeaturedImageUrl()` - Image à la une

### Génération
- `buildMetadata()` - Objet métadonnées complet
- `generateOpenGraphMeta()` - Données OG
- `generateTwitterCardMeta()` - Données Twitter
- `generateNextMetadata()` - Format Next.js

### Contenu
- `generatePostMetadata()` - Métadonnées post complet
- `generatePageMetadata()` - Métadonnées page complet
- `generateCollectionMetadata()` - Archive complet
- `extractKeywords()` - Mots-clés

### JSON-LD
- `generateJsonLd()` - Données structurées
- `generateBreadcrumbSchema()` - Fil d'Ariane
- `escapeJsonLdText()` - Échappe le texte

### API
- `createMetadataResponse()` - Réponse succès
- `createMetadataErrorResponse()` - Réponse erreur
- `validateMetadataBundle()` - Valide les données
- `sanitizeMetadata()` - Nettoie les données
- `formatMetadataForSitemap()` - Format XML
- `formatMetadataForRSS()` - Format RSS

## 📖 Documentation

- [METADATA_INDEX.md](../METADATA_INDEX.md) - Guide de navigation
- [METADATA_QUICKSTART.md](../METADATA_QUICKSTART.md) - Démarrage rapide
- [METADATA_GUIDE.md](../METADATA_GUIDE.md) - Documentation complète
- [METADATA_FILES_SUMMARY.md](../METADATA_FILES_SUMMARY.md) - Résumé détaillé
- [METADATA_INTEGRATION_CHECKLIST.md](../METADATA_INTEGRATION_CHECKLIST.md) - Checklist
- [METADATA_CREATION_COMPLETE.md](../METADATA_CREATION_COMPLETE.md) - Résumé de création

## 🚀 Démarrage en 3 étapes

1. **Lire** → [METADATA_QUICKSTART.md](../METADATA_QUICKSTART.md) (5 min)
2. **Intégrer** → Copier exemple dans votre page (10 min)
3. **Tester** → `npm run build` + tester (5 min)

**Total: 20 minutes pour être opérationnel!**

## ✅ Checklist rapide

- [ ] Fichiers `lib/metadata-*.ts` présents
- [ ] Documentation lue
- [ ] Code intégré dans `app/posts/[slug]/page.tsx`
- [ ] Code intégré dans `app/[slug]/page.tsx`
- [ ] `npm run build` sans erreur
- [ ] Testé localement
- [ ] Testé avec Facebook OG Debugger
- [ ] Déployé

## 💡 Conseils

1. Commencez par `lib/content-metadata.ts` - c'est la plus facile à utiliser
2. Consultez `lib/metadata-examples.ts` pour du code copiable
3. Personnalisez `lib/metadata-config.ts` selon vos besoins
4. Utilisez les types de `lib/metadata-types.ts` pour TypeScript

## 🔗 Navigation

- **Pour poster** → `app/posts/[slug]/page.tsx`
- **Pour page** → `app/[slug]/page.tsx`
- **Pour archive** → `app/posts/page.tsx`
- **Pour API** → `app/api/metadata/route.ts`

## 📞 Besoin d'aide?

- **Commencer?** → METADATA_QUICKSTART.md
- **Comprendre?** → METADATA_GUIDE.md
- **Déboguer?** → Section Dépannage dans GUIDE
- **Code?** → lib/metadata-examples.ts

---

**Créé:** January 25, 2026
**Status:** ✅ Production-ready
