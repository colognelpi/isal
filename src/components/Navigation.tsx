import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onOpenSettings?: () => void;
}

export function Navigation({ onOpenSettings: _onOpenSettings }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Universe', href: '#universe' },
    { name: 'Games', href: '#games' },
    { name: 'Reasons', href: '#little-things' },
    { name: 'Letters', href: '#letters' },
    { name: 'Memories', href: '#memories' },
    { name: 'Letter', href: '#love-letter' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#8B101D]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Brand wordmark in display face */}
          <a
            href="#universe"
            className="font-cinzel text-base sm:text-lg tracking-[0.25em] text-[#F3EEEE] hover:text-[#C51F35] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#C51F35] shadow-[0_0_8px_#C51F35]" />
            ONLY US
          </a>

          {/* Zone 2: 5 clean nav links, single-line text links */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-sans-clean text-[#AAA3A3]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="hover:text-[#F3EEEE] hover:underline underline-offset-8 decoration-[#8B101D] transition-colors whitespace-nowrap shrink-0"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Mobile Menu Trigger (hidden on desktop) */}
          <div className="flex items-center gap-3 shrink-0 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#AAA3A3] hover:text-[#F3EEEE] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/98 backdrop-blur-xl pt-24 px-8 pb-10 flex flex-col justify-between md:hidden border-b border-[#8B101D]/30">
          <nav className="flex flex-col gap-6 text-sm uppercase tracking-[0.25em] font-cinzel text-[#AAA3A3]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="hover:text-[#C51F35] py-2 border-b border-[#151313] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-6 border-t border-[#151313]">
            <p className="text-[11px] text-[#AAA3A3]/70 text-center font-sans-clean">
              Our favorite memories and little love notes.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
