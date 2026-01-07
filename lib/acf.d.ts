// Types générés à partir du schéma ACF exporté

export interface ACFArticle {
  article_type?: 'guide' | 'etude_de_cas' | 'checklist' | 'editorial';
  excerpt?: string;
  featured_image?: string; // URL
  related_articles?: { ID: number; post_title: string; post_type: string }[];
}

export interface ACFGuideComparatif {
  critere: string;
  wp_classique: string;
  headless_nextjs: string;
}

export interface ACFGuideAvantage {
  titre: string;
  description: string;
}

export interface ACFGuideRisque {
  titre: string;
  description: string;
}

export interface ACFGuide {
  guide_intro?: string;
  guide_comparatif?: ACFGuideComparatif[];
  avantages?: ACFGuideAvantage[];
  risques?: ACFGuideRisque[];
}


// Union pour tous les groupes ACF principaux
export type ACFFields = ACFArticle & ACFGuide;
