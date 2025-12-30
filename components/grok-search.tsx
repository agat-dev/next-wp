"use client";
import React, { useState } from "react";

interface GrokSearchProps {
  onResult: (result: any) => void;
}

export default function GrokSearch({ onResult }: GrokSearchProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Appel à l'API interne Next.js pour proxy la requête Groq
      const res = await fetch("/api/grok-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'analyse Grok");
      const data = await res.json();
      onResult(data);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="md:w-full flex flex-col gap-8 justify-center items-center mb-8 bg-white/80 p-16 rounded-2xl shadow-lg mx-auto">
      <label htmlFor="wp_url" className="text-2xl font-title font-semibold text-foreground">
        Est-ce le moment de passer au Headless ? 
        <div className="mt-4 font-light text-lg">Entrez l'URL de votre site WordPress pour une analyse rapide : </div>
      </label>
      <div className="flex justify-center items-center gap-8 mt-8">
      <input
        type="url"
        name="wp_url"
        placeholder="Votre URL WordPress (ex: https://monsite.fr)"
        className="flex-1 px-4 py-2 rounded-lg border border-border border-w-[1px] bg-white/60 text-base max-w-xs active:ring-0 focus:ring-0 focus:outline-none focus:bg-white"
        aria-label="URL WordPress"
        required
        pattern="https?://.+"
        value={url}
        onChange={e => setUrl(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-white text-foreground px-8 py-2 rounded-lg text-lg font-semibold shadow-lg hover:bg-white/60 transition"
        disabled={loading}
      >
        {loading ? "Analyse en cours..." : "Tester mon site"}
      </button>
      </div>
      {error && <span className="text-red-500 ml-4">{error}</span>}
    </form>
  );
}
