export function decodeHtml(html: string): string {
  if (typeof window !== "undefined") {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  } else {
    // Pour Node.js (SSR)
    return html
      .replace(/&rsquo;/g, "’")
      .replace(/&lsquo;/g, "‘")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#038;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/&eacute;/g, "é")
      .replace(/&egrave;/g, "è")
      .replace(/&ecirc;/g, "ê")
      .replace(/&ocirc;/g, "ô")
      .replace(/&acirc;/g, "â")
      .replace(/&ccedil;/g, "ç")
      // Ajoute d'autres entités si besoin
      ;
  }
}