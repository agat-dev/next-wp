
import React from "react";
import { marked } from "marked";

interface AuditPreviewProps {
  markdown: string;
}

export default function AuditPreview({ markdown }: AuditPreviewProps) {
  const [showFull, setShowFull] = React.useState(true); // Affichage complet par défaut temporairement
  const [email, setEmail] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Découpe le markdown. On cherche "Indicateurs de bénéfice" ou "Détails de l'analyse"
  let preview = markdown;
  let rest = "";
  const match = markdown.match(/Détails de l'analyse|Indicateurs de bénéfice/i);
  
  if (match && match.index !== undefined) {
    const endOfMatchLine = markdown.indexOf('\n', match.index);
    if (endOfMatchLine !== -1) {
      const endOfNextLine = markdown.indexOf('\n', endOfMatchLine + 1);
      const splitIndex = endOfNextLine !== -1 ? endOfNextLine : markdown.length;
      
      preview = markdown.slice(0, splitIndex).trim();
      rest = markdown.slice(splitIndex).trim();
    }
  } else {
    const arbitrarySplit = Math.floor(markdown.length / 3);
    const safeSplitIndex = markdown.indexOf('\n', arbitrarySplit);
    if (safeSplitIndex !== -1) {
      preview = markdown.slice(0, safeSplitIndex).trim();
      rest = markdown.slice(safeSplitIndex).trim();
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, audit: markdown }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi de l'email");
      setSent(true);
      setShowFull(true);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setSending(false);
    }
  };

  const htmlContent = React.useMemo(() => {
    let textToParse = showFull ? markdown : preview;
    
    if (textToParse.trim().startsWith("```json")) {
      textToParse = textToParse.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    }
    
    try {
      const isJson = (str: string) => {
        try {
          const obj = JSON.parse(str);
          return !!obj && typeof obj === "object";
        } catch (e) { return false; }
      };

      if (isJson(textToParse)) {
        const obj = JSON.parse(textToParse);
        textToParse = "```json\n" + JSON.stringify(obj, null, 2) + "\n```";
      }

      return marked.parse(textToParse) as string;
    } catch (e) {
      console.error("Erreur parsing markdown:", e);
      return textToParse;
    }
  }, [markdown, preview, showFull]);

  return (
    <>
    <div className="mt-8 w-full max-w-4xl mx-auto p-8 bg-white/80 rounded-3xl shadow-xl text-left relative overflow-hidden ">
      <h3 className="font-semibold text-3xl mb-6 text-regularblue border-b pb-4">
        Résultat de l&rsquo;analyse pour votre site WordPress
      </h3>
      
      <div className="relative">
        <div
          className="prose prose:text-mediumblue prose-p:leading-relaxed prose-headings:font-medium prose-h1:text-2xl prose-h2:text-xl max-w-none"
          dangerouslySetInnerHTML={{
             __html: htmlContent,
          }}
        />
        
        {!showFull && rest && (
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" />
        )}
      </div>
      {/* 
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-extralightblue pointer-events-none" />
      */}

    </div>

      {/* Fonction mail en commentaire temporairement
      {!showFull && rest && (
        <div className="w-1/2 mx-auto mt-8 border-t pt-8">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
              <input
                id="audit_email"
                type="email"
                className="flex-1 border border-(--color-accent) rounded-xl p-3 focus:ring-0 bg-white text-black"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                disabled={sending || sent}
              />
              <button
                type="submit"
                className="bg-(--color-accent) text-white rounded-xl px-6 py-3 font-bold hover:bg-(--color-accent)/90 disabled:opacity-50"
                disabled={sending || sent || !email}
              >
                {sending ? "Envoi..." : "Recevoir l'audit complet"}
              </button>
            </form>
            {error && <p className="text-red-500 mt-2 text-sm text-center">{error}</p>}
        </div>
      )}
      {sent && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center">
          L&rsquo;audit complet vous a été envoyé avec succès.
        </div>
      )}
      */}
    </>
  );
}

