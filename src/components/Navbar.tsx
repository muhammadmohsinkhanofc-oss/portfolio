import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'EXPERIMENTS', href: '#experiments' },
  { label: 'CONTACT', href: '#contact' },
];

export function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#080808]/92 border-b border-[#BFC1C5]/15'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between gap-8">
        <a
          href="#hero"
          className="font-display text-sm sm:text-base font-semibold tracking-[0.14em] text-[#F4F4F1] whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          {SITE_CONFIG.personalBrand}
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-xs font-medium tracking-[0.22em] text-[#BFC1C5] hover:text-[#F4F4F1] transition-colors duration-200 whitespace-nowrap shrink-0 py-1"
            >
              <span>{item.label}</span>
              <span className="absolute left-0 bottom-0 w-full h-px bg-[#F4F4F1] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#F4F4F1] hover:text-[#BFC1C5] transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
