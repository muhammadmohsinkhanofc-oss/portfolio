import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { getPublicWhatsappHref, SITE_CONFIG } from '../config/siteConfig';
import { BrandLogo } from '../components/BrandLogo';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const whatsappHref = getPublicWhatsappHref(SITE_CONFIG);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer
      id="contact"
      className="pt-24 lg:pt-36 pb-12 border-t border-[#BFC1C5]/15 bg-[#080808]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 space-y-20">
        {/* Cinematic Ending Headline */}
        <div className="space-y-10" data-reveal>
          <p className="text-[11px] tracking-[0.28em] text-[#777777]">05 · CONTACT</p>

          <h2
            className="font-display font-semibold tracking-tight leading-[0.95] text-[#F4F4F1] max-w-5xl"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              textWrap: 'balance',
            }}
          >
            LET’S CREATE SOMETHING MEANINGFUL.
          </h2>
        </div>

        {/* Minimal Restrained Contact Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-[#BFC1C5]/15"
          data-reveal
        >
          <div className="md:col-span-5 space-y-4">
            <BrandLogo variant="wordmark" tone="light" className="h-12 w-auto" />
            <div className="text-xs tracking-[0.22em] text-[#777777] pt-2">
              {SITE_CONFIG.personalBrand} × {SITE_CONFIG.studioBrand}
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="text-[10px] tracking-[0.26em] text-[#777777]">DIRECT EMAIL</div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-sm sm:text-base text-[#F4F4F1] hover:text-[#BFC1C5] underline underline-offset-4 transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#BFC1C5]/20 text-[10px] tracking-[0.18em] text-[#BFC1C5] hover:border-[#F4F4F1] hover:text-[#F4F4F1] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-xs tracking-[0.2em] text-[#777777] pt-2">
              {SITE_CONFIG.location}
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-[10px] tracking-[0.26em] text-[#777777]">CHANNELS</div>
            <div className="flex flex-col space-y-2.5 text-xs tracking-[0.2em]">
              <a
                href={SITE_CONFIG.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#BFC1C5] hover:text-[#F4F4F1] transition-colors"
              >
                <span>INSTAGRAM ({SITE_CONFIG.social.instagramHandle.toUpperCase()})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#BFC1C5] hover:text-[#F4F4F1] transition-colors"
                >
                  <span>WHATSAPP</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <a
                  href={`mailto:${SITE_CONFIG.email}?subject=WhatsApp%20Contact%20Request`}
                  className="inline-flex items-center gap-1.5 text-[#777777] hover:text-[#BFC1C5] transition-colors"
                >
                  <span>{SITE_CONFIG.whatsappConfig.publicLabel}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Quiet Copyright Baseline */}
        <div className="pt-8 border-t border-[#BFC1C5]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] tracking-[0.24em] text-[#777777]">
          <span>
            © {new Date().getFullYear()} {SITE_CONFIG.fullName.toUpperCase()} ·{' '}
            {SITE_CONFIG.studioBrand}
          </span>
          <span>DESIGNING BEYOND THE OBVIOUS.</span>
        </div>
      </div>
    </footer>
  );
}
