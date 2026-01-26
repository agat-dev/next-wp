
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface GeminiSearchProps {
  onResult?: (result: any) => void;
  prompt?: string;
  className?: string;
}

export default function GeminiSearch({ onResult, prompt, className }: GeminiSearchProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    // On redirige vers la page d'analyse avec l'URL en paramètre
    const encodedUrl = encodeURIComponent(url);
    router.push(`/analyse?url=${encodedUrl}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full flex flex-col gap-6 p-4 ${className}`}>
      <h2 className="text-4xl font-medium mb-2 text-white">Analysez votre WordPress
      </h2>
      <label htmlFor="gemini_url" className="text-white">Entrez l&rsquo;URL de votre site WordPress pour recevoir une analyse détaillée des bénéfices potentiels d&rsquo;une migration en Headless.</label>
      <input
        id="gemini_url"
        className="border rounded-xl p-2 bg-darkblue/30 border-white/20 text-white placeholder:text-white/50"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Votre URL WordPress à analyser..."
        required
        disabled={loading}
        type="url"
        pattern="https?://.+"
      />
      <button
        type="submit"
        className="bg-(--color-accent) text-white rounded-xl px-4 py-2 hover:bg-(--color-accent)/90 disabled:opacity-50"
        disabled={loading || !url.trim()}
      >
        {loading ? "Envoi..." : "Lancer l'analyse"}
      </button>
    </form>
  );
}
