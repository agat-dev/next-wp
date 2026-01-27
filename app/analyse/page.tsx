
"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuditPreview from "@/components/gemini/audit-preview";
import { Loader2 } from "lucide-react";

function AnalyseContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const prompt = `**Mission :** Audit stratégique de l'URL ${url} pour évaluer la pertinence d'une migration vers une architecture Headless principalement sur l'angle des enjeux d'image et de développement. 
L'audit doit être structuré en deux grandes étapes : un diagnostic d'identité précis et une analyse stratégique détaillée.
Tu dois adopter le ton d'un consultant expert en transformation digitale et architecture web, capable de synthétiser des informations complexes de manière claire et convaincante.
Le secteur d'activité et les paramètres stratégie et de positionnement de l'entreprise doit être prise en compte pour formuler des recommandations pragmatiques et adaptées.

---

**Synthèse globale des résultats attendue (à ne pas inclure dans la réponse, juste pour ton organisation) :**
- Secteur d'activité : [Secteur]
- Proposition de valeur : [Proposition]
---

 1. Diagnostic d'Identité (Scan Précis)
*Effectue une analyse croisée du contenu visible (Header, Footer, Page "À Propos").*

**Secteur d'activité :** (Ex: E-commerce B2C, SaaS B2B, Média, etc.)
**Proposition de valeur :** Quelle est la promesse principale faite au client ?
**Mission :** Cite un court extrait du site qui valide cette proposition.
**Cibles prioritaires :** Identifie les 2 profils d'utilisateurs les plus évidents.
*Si le site est inaccessible ou le contenu protégé, réponds uniquement : "Accès bloqué : Diagnostic impossible." et arrête l'analyse.*

---

 2. Analyse Stratégique (Format Markdown)

### 1. Positionnement Actuel
*   **Perception de marque :** Le design et la navigation du site inspirent-ils confiance et modernité, ou montrent-ils des signes de retard technologique (lenteur, design daté) ?
*   **Friction UX Majeure :** Quel est le principal obstacle visible dans le parcours utilisateur (ex: formulaire complexe, navigation peu claire, temps de chargement) ?
*   **Indice de modernité :** [Note sur 10] évaluant la performance et l'expérience globale par rapport aux standards actuels.

### 2. Pertinence d'une Migration Headless
*   **Verdict Stratégique :** [Accélérer / Maintenir / Pivoter]. Justifie en une phrase.
*   **Enjeu de Différenciation :** Comment le Headless peut-il transformer l'expérience (ex: ultra-rapide, personnalisée) pour créer un avantage concurrentiel ?
*   **Justification Business :** Quels sont les arguments clés (ROI potentiel) justifiant l'investissement face aux gains attendus en performance, SEO et agilité marketing ?

### 3. Indicateurs d'Impact Business
*   **Performance & SEO :** Quel serait l'impact de temps de chargement quasi-instantanés (Core Web Vitals optimaux) sur le classement Google et le taux de rebond ?
*   **Agilité Marketing :** Explique comment le Headless permettrait aux équipes de lancer plus rapidement des campagnes ou de nouveaux contenus sans dépendre du back-end.

### 4. Leviers de Croissance via Headless
*Identifie 3 fonctionnalités de 3 niveaux de complexité que le Headless rendrait possibles.*
Rapide
Moyennement complexe
Très complexe

### 5. Stack recommandée 

Comparatif des stacks : WordPress monolithique, WP Astro, WP Next.js
Recommandation de stack
---

**Instruction de sortie :** Réponds exclusivement en Markdown. La structure doit suivre les titres et les points de l'étape 2. Assure la capitalisation française du texte. Et n'introduit pas trop d'icones
`;

  useEffect(() => {
    if (url) {
      const runAnalysis = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        
        const finalPrompt = prompt.replaceAll("{$url}", url);
        
        try {
          const res = await fetch("/api/gemini-analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: finalPrompt }),
          });
          
          if (!res.ok) throw new Error("Erreur lors de l'appel à Gemini");
          const data = await res.json();
          setResult(data);
        } catch (err: any) {
          setError(err.message || "Erreur inconnue");
        } finally {
          setLoading(false);
        }
      };
      
      runAnalysis();
    }
  }, [url]);

  if (!url) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center text-white mt-20">
        <h1 className="text-3xl font-bold mb-4">Aucune URL fournie</h1>
        <p>Veuillez entrer une URL sur la page d&apos;accueil pour lancer une analyse.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-(--color-header) to-(--color-bg) py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Analyse de votre site
          </h1>
          <p className="text-xl text-white/80">
            URL : <span className="text-(--color-lightyellow) font-mono">{url}</span>
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center p-20 bg-white/5 rounded-3xl border border-white/10">
            <Loader2 className="w-12 h-12 text-(--color-accent) animate-spin mb-4" />
            <p className="text-xl text-white font-medium">Analyse en cours par Gemini AI...</p>
            <p className="text-white/60 mt-2">Cela peut prendre quelques secondes.</p>
          </div>
        )}

        {error && (
          <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl text-center">
            <p className="text-red-400 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
            >
              Réessayer
            </button>
          </div>
        )}

        {result && (
          <AuditPreview 
            markdown={result.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(result, null, 2)} 
          />
        )}
      </div>
    </div>
  );
}

export default function AnalysePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-(--color-bg)"><Loader2 className="w-12 h-12 text-(--color-accent) animate-spin" /></div>}>
      <AnalyseContent />
    </Suspense>
  );
}
