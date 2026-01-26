// Fonctions pour récupérer les données du endpoint wp-json/wp-headless/v1/options

const baseUrl = process.env.WORDPRESS_URL;

export interface WPHeadlessOptions {
  hero_title: string;
  hero_title_line: string;
  hero_subtitle: string;
  hero_cta: string;
  hero_image: string;
  video_de_demo: Array<{ src: string }>;
  explanations: Array<{
    question: string;
    image: string;
    ctas: Array<{ cta_text: string; cta_link: string }>;
    answer: string;
  }>;
  quiz: {
    questions: { question: string; options: string[] }[];
    cta: string;
  };
  comparatif_table: Array<{ critere: string; wordpress_classique: string; headless_nextjs: string }>;
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
    // Essayer d'abord l'endpoint personnalisé
    const res = await fetch(`${baseUrl}/wp-json/wp-headless/v1/options`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600, tags: ['wordpress-options'] }
    });
    
    if (res.ok) {
      return await res.json();
    }
    
    // Sinon, essayer l'endpoint ACF natif
    return await getOptionsViaACF();
  } catch (error) {
    console.error('Erreur lors de la récupération des options:', error);
    return null;
  }
}

/**
 * Récupère les options via l'endpoint ACF REST API natif
 * Endpoint: /wp-json/acf/v3/options
 */
export async function getOptionsViaACF(): Promise<WPHeadlessOptions | null> {
  if (!baseUrl) return null;
  
  try {
    const res = await fetch(`${baseUrl}/wp-json/acf/v3/options`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600, tags: ['wordpress-options-acf'] }
    });
    
    if (!res.ok) {
      console.error(`Erreur ACF API: ${res.status}`);
      return getDefaultOptions();
    }
    
    const data = await res.json();
    
    // Les données ACF sont sous la clé 'acf'
    if (data.acf) {
      return data.acf as WPHeadlessOptions;
    }
    
    return data as WPHeadlessOptions;
  } catch (error) {
    console.error('Erreur lors de la récupération des options ACF:', error);
    return getDefaultOptions();
  }
}

/**
 * Retourne les données par défaut si aucune source n'est disponible
 */
export function getDefaultOptions(): WPHeadlessOptions {
  return {
    hero_title: 'Bienvenue',
    hero_title_line: 'WordPress & Next.js Starter',
    hero_subtitle: 'Plateforme moderne combinant WordPress et Next.js',
    hero_cta: 'Découvrir',
    hero_image: '',
    video_de_demo: [
      { src: 'https://example.com/demo-video.mp4' }
    ],
    explanations: [
      {
        question: 'Qu\'est-ce qu\'une approche Headless?',
        image: '',
        ctas: [{ cta_text: 'Lire plus', cta_link: '#' }],
        answer: 'Une approche où WordPress ne gère que le contenu, tandis que Next.js gère la présentation.',
      },
    ],
    quiz: {
      questions: [
        {
          question: 'Quel est votre niveau?',
          options: ['Débutant', 'Intermédiaire', 'Avancé'],
        },
      ],
      cta: 'Valider',
    },
    comparatif_table: [
      {
        critere: 'Performance',
        wordpress_classique: 'Bonne',
        headless_nextjs: 'Excellente',
      },
      {
        critere: 'SEO',
        wordpress_classique: 'Bonne',
        headless_nextjs: 'Excellente',
      },
      {
        critere: 'Flexibilité',
        wordpress_classique: 'Moyenne',
        headless_nextjs: 'Excellente',
      },
    ],
    comparatif_cta: 'Comparer plus',
    about_title: 'À propos',
    about_text: 'Découvrez comment WordPress et Next.js travaillent ensemble pour créer une expérience optimale.',
    about_image: '',
    about_cta: 'En savoir plus',
    articles: [],
  };
}
