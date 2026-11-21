import { SITE_CONFIG } from '../config/siteConfig';
import { ExhibitionImage } from '../components/ExhibitionImage';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 lg:py-36 border-t border-[#BFC1C5]/15 bg-[#080808]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Large Editorial Portrait (me_1) */}
          <div className="lg:col-span-5" data-reveal>
            <div className="relative h-full min-h-[460px] lg:min-h-[620px] bg-[#141414] border border-[#BFC1C5]/15 overflow-hidden group">
              <ExhibitionImage
                src={SITE_CONFIG.portrait.customPath}
                fallbackSrc={SITE_CONFIG.portrait.fallbackPath}
                alt={SITE_CONFIG.portrait.alt}
                plateLabel="PORTRAIT · MUHAMMAD MOHSIN KHAN"
                className="w-full h-full object-cover object-center grayscale-[25%] contrast-105 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#080808] via-[#080808]/65 to-transparent">
                <span className="text-[10px] tracking-[0.26em] text-[#BFC1C5]">
                  {SITE_CONFIG.fullName.toUpperCase()} · {SITE_CONFIG.location}
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Biography & Minimal Timeline */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-14 py-2">
            <div className="space-y-10" data-reveal>
              <div className="space-y-4">
                <p className="text-[11px] tracking-[0.28em] text-[#777777]">01 · ABOUT</p>
                <h2
                  className="font-display font-semibold tracking-tight text-[#F4F4F1] leading-[0.98]"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  }}
                >
                  THE MIND
                  <br />
                  BEHIND THE WORK.
                </h2>
              </div>

              <div className="space-y-5 max-w-xl text-base sm:text-lg text-[#BFC1C5] leading-[1.75] font-light">
                <p>
                  I’m Muhammad Mohsin Khan, a graphic designer, visual artist, and AI content
                  creator from Karachi, Pakistan.
                </p>
                <p>
                  With approximately five years of experience, I direct AI cinematic ads, animated
                  ads, photorealistic campaigns, and product commercials alongside visual
                  identities and digital graphics.
                </p>
                <p>
                  From concept to final cut—combining AI film synthesis, visual storytelling, and
                  purposeful design to bring any commercial vision to life.
                </p>
              </div>
            </div>

            {/* Minimal Experience Timeline */}
            <div className="space-y-4" data-reveal>
              <p className="text-[10px] tracking-[0.28em] text-[#777777]">
                EXPERIENCE TIMELINE · {SITE_CONFIG.experienceYears.toUpperCase()}
              </p>

              <div className="divide-y divide-[#BFC1C5]/15 border-t border-b border-[#BFC1C5]/15">
                {SITE_CONFIG.timeline.map((item) => (
                  <div
                    key={item.period + item.entity}
                    className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                  >
                    <span className="sm:col-span-3 font-mono-tabular text-xs tracking-[0.16em] text-[#777777]">
                      {item.period}
                    </span>
                    <span className="sm:col-span-5 text-sm font-medium text-[#F4F4F1]">
                      {item.role}
                    </span>
                    <span className="sm:col-span-4 sm:text-right text-xs tracking-[0.14em] text-[#BFC1C5]">
                      {item.entity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
