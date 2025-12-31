// Fonctions pour récupérer les données du endpoint wp-json/wp-headless/v1/options

const baseUrl = process.env.WORDPRESS_URL;

export interface WPHeadlessOptions {
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;
  hero_image: string;
  quiz: {
    questions: { question: string; options: string[] }[];
    cta: string;
  };
  comparatif: Array<{ critere: string; wp_classique: string; headless_nextjs: string }>;
  comparatif_cta: string;
  about_title: string;
  about_text: string;
  about_image: string;
  about_cta: string;
  articles: Array<{ title: string; excerpt: string; url: string }>;
}

export async function getOptions(): Promise<WPHeadlessOptions | null> {
  if (!baseUrl) return null;
  try {
    const res = await fetch(`${baseUrl}/wp-json/wp-headless/v1/options`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
