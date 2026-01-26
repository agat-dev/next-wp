# Checklist d'intégration des métadonnées

## ✅ Installation

### Fichiers créés
- [x] `lib/metadata.ts` - Utilitaires de base
- [x] `lib/og-metadata.ts` - Génération OG et JSON-LD
- [x] `lib/content-metadata.ts` - Helpers pour contenu
- [x] `lib/metadata-types.ts` - Types TypeScript
- [x] `lib/metadata-config.ts` - Configuration
- [x] `lib/metadata-api-helpers.ts` - Helpers API
- [x] Documentation complète

### Vérifications prérequis
- [ ] Node.js et npm installés
- [ ] Projet Next.js configuré
- [ ] WordPress connecté (WORDPRESS_URL configuré)
- [ ] `lib/decodeHtml.ts` existe (pour décodage HTML)
- [ ] `lib/wordpress.ts` existe (pour récupération données)
- [ ] `site.config.ts` configuré avec `site_domain`

## 📋 Étapes d'intégration

### Étape 1: Vérifier les dépendances
- [ ] `npm list next` (version 13.4+)
- [ ] Fichiers WordPress en place (`lib/wordpress.ts`, `lib/wordpress.d.ts`)
- [ ] Types `Post` et `Page` importables

### Étape 2: Intégrer les pages de posts
- [ ] Ouvrir `app/posts/[slug]/page.tsx`
- [ ] Importer `generatePostMetadata` depuis `lib/content-metadata`
- [ ] Remplacer la fonction `generateMetadata()` (voir METADATA_QUICKSTART.md)
- [ ] Ajouter `<Script>` pour JSON-LD
- [ ] Build local et tester: `npm run build`
- [ ] Vérifier pas d'erreurs TypeScript

### Étape 3: Intégrer les pages statiques
- [ ] Ouvrir `app/[slug]/page.tsx`
- [ ] Importer `generatePageMetadata` depuis `lib/content-metadata`
- [ ] Remplacer la fonction `generateMetadata()`
- [ ] Ajouter `<Script>` pour JSON-LD
- [ ] Build local et tester
- [ ] Vérifier pas d'erreurs TypeScript

### Étape 4: Intégrer les archives
- [ ] Ouvrir `app/posts/page.tsx`
- [ ] Importer `generateCollectionMetadata` depuis `lib/content-metadata`
- [ ] Remplacer `export const metadata`
- [ ] Répéter pour: `app/posts/categories/page.tsx`, `app/posts/tags/page.tsx`
- [ ] Build local et tester

### Étape 5: Vérifier les fichiers existants
- [ ] Vérifier que `site.config.ts` a `site_domain` correct
- [ ] Vérifier que `lib/wordpress.ts` a les bonnes fonctions
- [ ] Vérifier que `lib/decodeHtml.ts` existe

### Étape 6: Configuration optionnelle
- [ ] Éditer `lib/metadata-config.ts` si besoin (limites, organization, etc.)
- [ ] Ajouter un logo dans `public/img/`
- [ ] Personnaliser les informations d'organisation
- [ ] Ajouter les handles de réseaux sociaux

## 🧪 Tests

### Tests locaux
- [ ] `npm run dev` - Vérifier pas d'erreurs
- [ ] Visiter `http://localhost:3000/posts/un-post`
- [ ] Inspecter source (Ctrl+U) et chercher `<meta name="description"`
- [ ] Vérifier que `og:title`, `og:description`, `og:image` sont présents
- [ ] Vérifier que `<script type="application/ld+json">` existe

### Tests de construction
- [ ] `npm run build`
- [ ] Vérifier que le build complète sans erreurs
- [ ] Vérifier le temps de génération
- [ ] Vérifier la taille du bundle

### Validation externes
- [ ] **Facebook OG Debugger**: https://developers.facebook.com/tools/debug/og/object/
  - [ ] Visiter une URL de post
  - [ ] Vérifier que l'image s'affiche
  - [ ] Vérifier que le titre et description s'affichent
  
- [ ] **Twitter Card Validator**: https://cards-dev.twitter.com/validator
  - [ ] Visiter une URL de post
  - [ ] Vérifier que l'aperçu s'affiche correctement
  
- [ ] **Google Rich Results**: https://search.google.com/test/rich-results
  - [ ] Visiter une URL de post
  - [ ] Vérifier que le schéma BlogPosting est reconnu
  - [ ] Vérifier qu'il n'y a pas d'erreurs

- [ ] **Schema.org Validator**: https://validator.schema.org/
  - [ ] Copier le JSON-LD et valider
  - [ ] Vérifier qu'il n'y a pas d'erreurs

## 🔍 Débogage

### Problème: Les métadonnées n'apparaissent pas

**Vérifications:**
- [ ] `generateMetadata()` est bien appelée dans la page
- [ ] Les données WordPress sont récupérées (pas de 404)
- [ ] Pas d'erreurs dans les logs du build
- [ ] Le fichier page.tsx importe bien `generatePostMetadata`

**Solution:**
```bash
npm run build -- --debug
# Chercher les logs pour cette page
```

### Problème: L'image n'apparaît pas

**Vérifications:**
- [ ] Image à la une définie dans WordPress
- [ ] URL de l'image est accessible publiquement (pas de 403/404)
- [ ] Format supporté (JPG, PNG, WebP)
- [ ] Taille raisonnable (pas >10MB)

**Solution:**
Testez l'URL directement dans le navigateur:
```
https://votre-wordpress.com/wp-content/uploads/...image.jpg
```

### Problème: Caractères spéciaux affichés mal

**Vérifications:**
- [ ] Encodage UTF-8 dans WordPress
- [ ] `decodeHtml()` appelée pour nettoyer le contenu
- [ ] Métabase dans Next.js a le bon domaine

**Solution:**
Les entités HTML sont automatiquement décodées par `decodeHtml()`.

### Problème: Performance lente

**Vérifications:**
- [ ] Nombre d'appels API WordPress rédunis
- [ ] Cache activé (`next/cache` tags)
- [ ] Revalidate time configuré correctement

**Solution:**
```typescript
export const revalidate = 3600; // 1 heure
```

## 📊 Performance

### Métriques à suivre
- [ ] Temps de build (< 30s par page)
- [ ] Taille du HTML (< 100KB)
- [ ] Nombre d'appels API (< 3 par page)

### Optimisations
- [ ] Cache Next.js activé
- [ ] ISR (Incremental Static Regeneration) configuré
- [ ] Images optimisées
- [ ] JSON-LD inline (pas d'appel externe)

## 🚀 Déploiement

### Avant le déploiement
- [ ] Tous les tests locaux passent
- [ ] Validation externe réussie (Facebook, Twitter, Google)
- [ ] Configuration `.env` mise à jour
- [ ] `site.config.ts` a le bon domaine en production
- [ ] Image par défaut accessible

### Après le déploiement
- [ ] Vérifier une page en production
- [ ] Re-tester avec Facebook OG Debugger
- [ ] Re-tester avec Twitter Card Validator
- [ ] Vérifier Google Search Console
- [ ] Vérifier qu'aucune erreur 404 d'image

## 📚 Documentation

### Fichiers à lire
- [ ] `METADATA_QUICKSTART.md` - Démarrage rapide
- [ ] `METADATA_GUIDE.md` - Documentation complète
- [ ] `lib/metadata-examples.ts` - Exemples copiables

### Personnalisations supplémentaires
- [ ] Ajouter breadcrumbs (voir `generateBreadcrumbSchema`)
- [ ] Ajouter FAQSchema (si applicable)
- [ ] Ajouter NewsArticleSchema (pour actualités)
- [ ] Ajouter Product schema (pour e-commerce)

## ✨ Fonctionnalités avancées

### Optionnel: Sitemap dynamique
- [ ] Créer `app/sitemap.ts`
- [ ] Utiliser `buildSitemapEntry()` pour générer les entrées
- [ ] Voir exemple dans `METADATA_GUIDE.md`

### Optionnel: Fil d'Ariane
- [ ] Ajouter breadcrumb schema avec `generateBreadcrumbSchema()`
- [ ] Afficher visuellement les breadcrumbs (UI)
- [ ] Inclure dans le JSON-LD

### Optionnel: RSS Feed
- [ ] Créer `app/feed.xml/route.ts`
- [ ] Utiliser `formatMetadataForRSS()` pour générer les entrées
- [ ] Voir exemple dans helpers API

### Optionnel: API endpoint de métadonnées
- [ ] Créer `app/api/metadata/route.ts`
- [ ] Utiliser `createMetadataEndpointResponse()`
- [ ] Retourner les métadonnées en JSON

## 🎉 Finalisation

- [ ] Toutes les vérifications complétées
- [ ] Tous les tests passés
- [ ] Déployé et vérifié en production
- [ ] Équipe informée du nouveau système
- [ ] Documentation archivée

## 📞 Support

Fichiers de référence:
- `METADATA_GUIDE.md` - Documentation complète
- `METADATA_QUICKSTART.md` - Démarrage rapide
- `lib/metadata-examples.ts` - Exemples
- `lib/metadata-config.ts` - Configuration

Questions? Voir la section Dépannage dans les docs.

---

**Checklist complète!** ✨

Marquez les cases au fur et à mesure de l'intégration.
