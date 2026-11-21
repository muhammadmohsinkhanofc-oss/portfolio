export type GalleryLayout = 'kashees-showcase' | 'triptych' | 'split-left' | 'monolith';

export interface ProjectImageSlot {
  id: string;
  src: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  caption: string;
  aspect: string;
  recommendedSize: string;
}

export interface PortfolioProject {
  id: string;
  index: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  layout: GalleryLayout;
  description: string;
  brief: string;
  deliverables: string[];
  coverSlot: ProjectImageSlot;
  gallery: ProjectImageSlot[];
}

export const SELECTED_PROJECTS: PortfolioProject[] = [
  {
    id: 'kashees',
    index: '01',
    slug: 'kashees',
    title: "KASHEE'S",
    category: 'AI CINEMATIC ADS, ANIMATED FILMS & PHOTOREALISTIC PRODUCT CAMPAIGNS',
    year: '2026',
    layout: 'kashees-showcase',
    description:
      "AI-directed photorealistic product commercial, animated fashion reels, and cinematic brand visuals for Kashee's.",
    brief:
      "Full-spectrum AI commercial production—pairing the photorealistic Classic Red product ad film with animated couture motion reels and hyper-detailed campaign portraits.",
    deliverables: ['AI Product Ad Film', 'AI Animated & Cinematic Reels', 'Photorealistic Key Visuals'],
    coverSlot: {
      id: 'kashees-main-hero',
      src: '/assets/aistudio/kashees_main_hero_6f1b241d.mp4',
      mediaType: 'video',
      poster: '/assets/aistudio/kashees_hero_thumbnail_2c5a69f7.jpg',
      caption: 'MAIN HERO FILM · AI PHOTOREALISTIC PRODUCT AD (CLASSIC RED)',
      aspect: '16 / 9',
      recommendedSize: '1920 × 1080 · MP4',
    },
    gallery: [
      {
        id: 'kashees-hero-2',
        src: '/assets/aistudio/kashees_hero_2_415f5239.mp4',
        mediaType: 'video',
        caption: 'HERO REEL 02 · COUTURE MOTION STUDY',
        aspect: '9 / 16',
        recommendedSize: '1080 × 1920 · MP4',
      },
      {
        id: 'kashees-hero-3',
        src: '/assets/aistudio/kashees_7_07134423.mp4',
        mediaType: 'video',
        caption: 'HERO REEL 03 · ROYAL PALACE SILHOUETTE',
        aspect: '9 / 16',
        recommendedSize: '1080 × 1920 · MP4',
      },
      {
        id: 'kashees-reel-04',
        src: '/assets/aistudio/THE_PROFESSIONALS_CORE_3_7de0719b.mp4',
        mediaType: 'video',
        caption: 'COUTURE REEL 04 · DESI AT HEART',
        aspect: '9 / 16',
        recommendedSize: '1080 × 1920 · MP4',
      },
      {
        id: 'kashees-thumb',
        src: '/assets/aistudio/kashees_hero_thumbnail_2c5a69f7.jpg',
        mediaType: 'image',
        caption: 'KEY VISUAL · FACE OF A GOLDEN ERA',
        aspect: '9 / 16',
        recommendedSize: '1080 × 1920 · JPG',
      },
      {
        id: 'kashees-01',
        src: '/assets/aistudio/kashees_1_214d191c.jpg',
        mediaType: 'image',
        caption: 'PLATE 01 · EDITORIAL PORTRAIT',
        aspect: '4 / 5',
        recommendedSize: '1080 × 1350 · JPG',
      },
      {
        id: 'kashees-02',
        src: '/assets/aistudio/kashees_2_e70cd313.jpg',
        mediaType: 'image',
        caption: 'PLATE 02 · FULL SILHOUETTE STUDY',
        aspect: '4 / 5',
        recommendedSize: '1080 × 1350 · JPG',
      },
      {
        id: 'kashees-03',
        src: '/assets/aistudio/kashees_3_70d9360d.jpg',
        mediaType: 'image',
        caption: 'PLATE 03 · GARDEN EDITORIAL',
        aspect: '4 / 5',
        recommendedSize: '1080 × 1350 · JPG',
      },
      {
        id: 'kashees-04',
        src: '/assets/aistudio/kashees_4_c9ddcaad.jpg',
        mediaType: 'image',
        caption: 'PLATE 04 · CLOSE DETAIL FRAME',
        aspect: '4 / 5',
        recommendedSize: '1080 × 1350 · JPG',
      },
      {
        id: 'kashees-06',
        src: '/assets/aistudio/kashees_6_c24e7c19.jpg',
        mediaType: 'image',
        caption: 'PLATE 05 · FULL LENGTH FRAME',
        aspect: '4 / 5',
        recommendedSize: '1080 × 1350 · JPG',
      },
    ],
  },
  {
    id: 'verge-schooling',
    index: '02',
    slug: 'verge-schooling',
    title: 'VERGE SCHOOLING',
    category: 'EDUCATIONAL BRANDING & SOCIAL GRAPHICS',
    year: '2026',
    layout: 'triptych',
    description: 'Educational branding and social media graphics.',
    brief:
      'Campaign posters and recurring social communication visuals crafted for Verge Schooling System—spanning Teacher’s Day tributes, athletic trials, and student field trips.',
    deliverables: ['Social Campaign Graphics', 'Event Posters', 'Brand Consistency'],
    coverSlot: {
      id: 'verge-cover',
      src: '/assets/aistudio/VERGE_SCHOOLING_1_8374a4bc.jpg',
      mediaType: 'image',
      caption: "PLATE 01 · TEACHER'S DAY CAMPAIGN",
      aspect: '4 / 5',
      recommendedSize: '1080 × 1350 · JPG',
    },
    gallery: [
      {
        id: 'verge-01',
        src: '/assets/aistudio/VERGE_SCHOOLING_1_8374a4bc.jpg',
        mediaType: 'image',
        caption: "PLATE 01 · HAPPY TEACHER'S DAY",
        aspect: '4 / 5',
        recommendedSize: '1080 × 1350 · JPG',
      },
      {
        id: 'verge-02',
        src: '/assets/aistudio/VERGE_SCHOOLING_2_c862b1c5.jpg',
        mediaType: 'image',
        caption: 'PLATE 02 · SPORTS TRIAL DAY 2',
        aspect: '4 / 5',
        recommendedSize: '1080 × 1350 · JPG',
      },
      {
        id: 'verge-03',
        src: '/assets/aistudio/VERGE_SCHOOLING_3_e53bff36.jpg',
        mediaType: 'image',
        caption: 'PLATE 03 · FIELD TRIP TO ONEDERLAND',
        aspect: '4 / 5',
        recommendedSize: '1080 × 1350 · JPG',
      },
    ],
  },
  {
    id: 'the-professionals-core',
    index: '03',
    slug: 'professionals-core',
    title: 'THE PROFESSIONALS CORE',
    category: 'PROMOTIONAL POSTERS & EDUCATIONAL GRAPHICS',
    year: '2025',
    layout: 'split-left',
    description: 'Promotional posters, orientation announcements, and faculty graphics.',
    brief:
      'High-clarity faculty lineups, O/A-Level orientation posters, and recorded batch announcements for The Professionals Core.',
    deliverables: ['Promotional Posters', 'Faculty Announcements', 'Educational Graphics'],
    coverSlot: {
      id: 'tpc-cover',
      src: '/assets/aistudio/THE_PROFESSIONALS_CORE_1_b5ea1769.jpg',
      mediaType: 'image',
      caption: 'PLATE 01 · AS LEVEL CLASSES FACULTY POSTER',
      aspect: '4 / 5',
      recommendedSize: '1080 × 1350 · JPG',
    },
    gallery: [
      {
        id: 'tpc-01',
        src: '/assets/aistudio/THE_PROFESSIONALS_CORE_2_c6d4a215.jpg',
        mediaType: 'image',
        caption: 'PLATE 02 · O LEVELS PHYSICS ORIENTATION',
        aspect: '1 / 1',
        recommendedSize: '1080 × 1080 · JPG',
      },
      {
        id: 'tpc-02',
        src: '/assets/aistudio/SaveClip.App_728912167_18073037315693391_965959888132097995_n_069c0612.jpg',
        mediaType: 'image',
        caption: 'PLATE 03 · OCT | NOV RECORDED BATCH',
        aspect: '4 / 5',
        recommendedSize: '1080 × 1350 · JPG',
      },
    ],
  },
  {
    id: 'mad-designs',
    index: '04',
    slug: 'mad-designs',
    title: 'MAD DESIGNS',
    category: 'PERSONAL EXPERIMENTS & STUDIO IDENTITY',
    year: '2026',
    layout: 'monolith',
    description: 'Personal experiments and studio identity.',
    brief:
      'Architectural monogram, monochrome wordmark, and experimental visual identity system representing the independent creative direction of MAD DESIGNS™.',
    deliverables: ['Geometric Monogram', 'Studio Wordmark', 'Monochrome Brand System'],
    coverSlot: {
      id: 'mad-cover',
      src: '/branding/mad-wordmark-light.svg',
      mediaType: 'image',
      caption: 'STUDIO IDENTITY LOCKUP — MAD DESIGNS™',
      aspect: '16 / 9',
      recommendedSize: 'SVG / Vector Master',
    },
    gallery: [
      {
        id: 'mad-01',
        src: '/branding/mad-monogram-light.svg',
        mediaType: 'image',
        caption: 'PLATE 01 · GEOMETRIC MONOGRAM (OBSIDIAN EDITION)',
        aspect: '4 / 3',
        recommendedSize: 'SVG Vector',
      },
      {
        id: 'mad-02',
        src: '/branding/mad-monogram-dark.svg',
        mediaType: 'image',
        caption: 'PLATE 02 · GEOMETRIC MONOGRAM (SILVER EDITION)',
        aspect: '4 / 3',
        recommendedSize: 'SVG Vector',
      },
      {
        id: 'mad-03',
        src: '/branding/mad-wordmark-dark.svg',
        mediaType: 'image',
        caption: 'PLATE 03 · STUDIO WORDMARK REVERSAL',
        aspect: '16 / 9',
        recommendedSize: 'SVG Vector',
      },
    ],
  },
];
