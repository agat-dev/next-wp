import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Clé API Groq manquante" }, { status: 500 });
    }
    const groqRes = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3-mini",
        messages: [
          {
            role: "system",
            content:
              "Tu es un expert WordPress et Next.js. Tu vas auditer un site WordPress donné et fournir un rapport synthétique, orienté décision, sans évoquer les prix.",
          },
          {
            role: "user",
            content: `Audite ce site web WordPress (${url}) et retourne :\n\n1. Détermine d'abord de quel type de site il s'agit (site vitrine, portail, ecommerce, blog, institutionnel, etc.) et précise-le en une phrase.\n2. Adapte toute ton analyse et tes recommandations à ce type de site.\n3. Un résumé de l'audit initial en 5 lignes maximum.\n4. Une section : Pourquoi passer à WordPress headless ? (liste les avantages et inconvénients, analyse SEO, performances, scalabilité, sécurité, sans évoquer les prix).\n5. Analyse l'UI et l'UX du site en premiers critères d'audit, avant tout autre point.\n6. Termine par une recommandation de quelques lignes adaptée à la situation et au type de site.\n\nLe rapport doit être structuré, synthétique, compréhensible pour un client non technique, et ne doit contenir aucune introduction, uniquement les sections demandées dans l'ordre.`,
          },
        ],
      }),
    });
    if (!groqRes.ok) {
      const error = await groqRes.text();
      return NextResponse.json({ error }, { status: groqRes.status });
    }
    const data = await groqRes.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}
