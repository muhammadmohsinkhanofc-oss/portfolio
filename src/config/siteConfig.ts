export interface SiteConfig {
  personalBrand: string;
  studioBrand: string;
  fullName: string;
  profession: string;
  tagline: string;
  location: string;
  experienceYears: string;
  email: string;
  /**
   * WhatsApp number is intentionally kept private in configuration.
   * Set `publishWhatsapp: true` when you are ready to expose the direct WhatsApp link publicly.
   */
  whatsappConfig: {
    number: string;
    publishWhatsapp: boolean;
    publicLabel: string;
  };
  social: {
    instagramUrl: string;
    instagramHandle: string;
  };
  portrait: {
    customPath: string;
    fallbackPath: string;
    alt: string;
  };
  timeline: Array<{
    period: string;
    role: string;
    entity: string;
    location: string;
  }>;
  toolkit: Array<{
    index: string;
    name: string;
    discipline: string;
  }>;
}

export const SITE_CONFIG: SiteConfig = {
  personalBrand: 'MOHSIN KHAN®',
  studioBrand: 'MAD DESIGNS™',
  fullName: 'Muhammad Mohsin Khan',
  profession: 'Graphic Designer, Visual Artist & AI Content Creator',
  tagline: 'DESIGNING BEYOND THE OBVIOUS.',
  location: 'KARACHI, PAKISTAN.',
  experienceYears: 'Approx. 5 Years',
  email: 'muhammadmohsinkhanofc@gmail.com',
  whatsappConfig: {
    number: '03282243432',
    publishWhatsapp: false,
    publicLabel: 'WHATSAPP — PRIVATE / ON REQUEST',
  },
  social: {
    instagramUrl: 'https://instagram.com/',
    instagramHandle: '@maddesigns.studio',
  },
  portrait: {
    customPath: '/assets/aistudio/me_1_42414fae.jpeg',
    fallbackPath: '/assets/aistudio/me_1_42414fae.jpeg',
    alt: 'Portrait of Muhammad Mohsin Khan, Graphic Designer & Visual Artist',
  },
  timeline: [
    {
      period: '2021 — PRESENT',
      role: 'Graphic Designer, Visual Artist & AI Content Creator',
      entity: 'Independent Practice',
      location: 'Karachi, Pakistan',
    },
    {
      period: 'STUDIO',
      role: 'AI Cinematic Ads, Animated & Photorealistic Product Films',
      entity: 'MAD DESIGNS™',
      location: 'Karachi, Pakistan',
    },
    {
      period: 'FOCUS',
      role: 'AI Commercials, Brand Graphics & Educational Visuals',
      entity: "Kashee's · Verge Schooling · The Professionals Core",
      location: 'Karachi & Remote',
    },
  ],
  toolkit: [
    {
      index: '01',
      name: 'Adobe Photoshop',
      discipline: 'Visual Composition · Retouching · Key Visuals',
    },
    {
      index: '02',
      name: 'Canva',
      discipline: 'Social Systems · Rapid Editorial Templates',
    },
    {
      index: '03',
      name: 'CapCut',
      discipline: 'Motion Cuts · Kinetic Reels · Visual Pacing',
    },
    {
      index: '04',
      name: 'Higgsfield',
      discipline: 'AI Cinematography · Motion Generation · Visual Direction',
    },
    {
      index: '05',
      name: 'Claude',
      discipline: 'Creative Systems · Concept Architecture · Interactive Code',
    },
    {
      index: '06',
      name: 'ChatGPT',
      discipline: 'Ideation · Campaign Copy · Art Direction Workflows',
    },
  ],
};

export function getPublicWhatsappHref(config: SiteConfig): string | null {
  if (!config.whatsappConfig.publishWhatsapp) return null;
  const digits = config.whatsappConfig.number.replace(/\D/g, '');
  const intl = digits.startsWith('0') ? `92${digits.slice(1)}` : digits;
  return `https://wa.me/${intl}`;
}
