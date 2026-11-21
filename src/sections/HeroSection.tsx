import { lazy, MutableRefObject, Suspense } from 'react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';

const ChromeSculptureCanvas = lazy(() => import('../three/ChromeSculptureCanvas'));

interface HeroSectionProps {
  scrollProgressRef: MutableRefObject<number>;
}

export function HeroSection({ scrollProgressRef }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[680px] w-full bg-[#080808] overflow-hidden select-none"
    >
      {/* Fullscreen Interactive 3D Chrome Centerpiece */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-[#080808]">
              <div className="text-[10px] tracking-[0.35em] text-[#777777]">
                INITIALIZING SCULPTURE
              </div>
            </div>
          }
        >
          <ChromeSculptureCanvas scrollProgressRef={scrollProgressRef} />
        </Suspense>
      </div>

      {/* Subtle Edge Vignette for Text Contrast */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 32%, rgba(8,8,8,0.72) 100%)',
        }}
      />

      {/* Semantic Editorial Overlay */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-24 pb-8 flex flex-col justify-between pointer-events-none">
        {/* Top Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2"
        >
          <span className="text-[11px] tracking-[0.28em] text-[#BFC1C5]">
            {SITE_CONFIG.profession.toUpperCase()}
          </span>
          <span className="text-[11px] tracking-[0.28em] text-[#777777]">
            {SITE_CONFIG.studioBrand}
          </span>
        </motion.div>

        {/* Bottom Architectural Lockup */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-w-4xl"
          >
            <p className="text-[11px] tracking-[0.3em] text-[#BFC1C5]">
              {SITE_CONFIG.personalBrand}
            </p>
            <h1
              className="font-display font-semibold tracking-tight leading-[0.95] chrome-text"
              style={{
                fontSize: 'clamp(2.5rem, 6.2vw, 5.75rem)',
                textWrap: 'balance',
              }}
            >
              “{SITE_CONFIG.tagline}”
            </h1>
          </motion.div>

          {/* Location + Minimal Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex items-end justify-between lg:justify-end gap-10 pointer-events-auto"
          >
            <span className="text-[11px] tracking-[0.28em] text-[#777777]">
              {SITE_CONFIG.location}
            </span>

            <a
              href="#about"
              className="group flex flex-col items-center gap-3 text-[10px] tracking-[0.3em] text-[#BFC1C5] hover:text-[#F4F4F1] transition-colors"
              aria-label="Scroll to About section"
            >
              <span>SCROLL</span>
              <span className="w-px h-10 bg-[#BFC1C5]/40 group-hover:bg-[#F4F4F1] transition-colors" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
