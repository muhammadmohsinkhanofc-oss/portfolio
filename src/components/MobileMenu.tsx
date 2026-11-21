import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const LINKS = [
  { index: '01', label: 'ABOUT', href: '#about' },
  { index: '02', label: 'WORK', href: '#work' },
  { index: '03', label: 'EXPERIMENTS', href: '#experiments' },
  { index: '04', label: 'CONTACT', href: '#contact' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#080808] text-[#F4F4F1] flex flex-col justify-between p-6 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold tracking-[0.14em]">
              {SITE_CONFIG.personalBrand}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 inline-flex items-center justify-center text-[#F4F4F1] hover:text-[#BFC1C5] cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 my-auto" aria-label="Full-screen Mobile Navigation">
            {LINKS.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * idx, duration: 0.35 }}
                className="group flex items-baseline gap-5 border-b border-[#BFC1C5]/15 pb-4"
              >
                <span className="font-mono-tabular text-xs text-[#777777]">{link.index}</span>
                <span className="font-display text-4xl font-semibold tracking-tight text-[#F4F4F1] group-hover:text-[#BFC1C5] transition-colors">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </nav>

          <div className="flex items-end justify-between gap-4 pt-6 border-t border-[#BFC1C5]/15">
            <div className="space-y-1">
              <p className="text-[11px] tracking-[0.24em] text-[#777777]">
                {SITE_CONFIG.location}
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-xs text-[#BFC1C5] hover:text-[#F4F4F1] transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
            <BrandLogo variant="monogram" tone="light" className="h-8 w-auto" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
