import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Heart, Shield, Moon, Frown, Sparkles, Flame } from 'lucide-react';
import { OpenWhenLetter } from '../config/relationshipData';
import { audioEngine } from '../utils/audioSynth';

interface OpenWhenLettersProps {
  letters: OpenWhenLetter[];
  partnerOneName: string;
}

export function OpenWhenLetters({ letters, partnerOneName }: OpenWhenLettersProps) {
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);

  const handleOpenLetter = (letter: OpenWhenLetter) => {
    setActiveLetterId(letter.id);
    audioEngine.playSealBreakSfx();
  };

  const activeLetter = letters.find((l) => l.id === activeLetterId);

  const getLetterIcon = (id: string) => {
    switch (id) {
      case 'miss-me':
        return <Heart className="w-4 h-4 text-[#C51F35]" />;
      case 'bad-day':
        return <Frown className="w-4 h-4 text-[#C51F35]" />;
      case 'reassurance':
        return <Shield className="w-4 h-4 text-[#C51F35]" />;
      case 'cant-sleep':
        return <Moon className="w-4 h-4 text-[#C51F35]" />;
      case 'doubt-yourself':
        return <Sparkles className="w-4 h-4 text-[#C51F35]" />;
      case 'need-love':
      default:
        return <Flame className="w-4 h-4 text-[#C51F35]" />;
    }
  };

  return (
    <section id="letters" className="py-24 px-6 relative bg-gradient-to-b from-[#080808] via-[#100c0e] to-[#080808]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C51F35] block">
            LETTERS FOR YOU
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#F3EEEE] mt-2">
            OPEN WHEN YOU NEED ME
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-sans-clean text-[#AAA3A3] leading-relaxed">
            Written for the days when you need a hug, a gentle smile, or just a little reminder of how
            much I love you.
          </p>
        </div>

        {/* 6 Elegant Letter Envelopes / Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {letters.map((letter) => (
            <motion.button
              key={letter.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenLetter(letter)}
              className="group p-6 rounded-2xl bg-[#151313]/90 border border-[#8B101D]/30 hover:border-[#C51F35] hover:bg-[#1C1417] text-left transition-all duration-300 glow-crimson-subtle relative overflow-hidden cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-[#080808] border border-[#8B101D]/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getLetterIcon(letter.id)}
                </span>
                <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#AAA3A3]">
                  Digital Wax Seal
                </span>
              </div>

              <h3 className="font-serif-editorial text-xl text-[#F3EEEE] group-hover:text-glow-soft transition-all">
                {letter.label}
              </h3>

              <p className="text-xs font-sans-clean text-[#AAA3A3] mt-2 line-clamp-2">
                {letter.title}
              </p>

              <div className="mt-6 pt-4 border-t border-[#8B101D]/20 flex items-center justify-between text-xs font-cinzel uppercase tracking-wider text-[#C51F35]">
                <span>Break Seal</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Letter Reading Modal */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setActiveLetterId(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#151313] border border-[#C51F35]/70 rounded-2xl p-6 sm:p-10 my-8 glow-crimson text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLetterId(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#080808] border border-[#8B101D]/40 text-[#AAA3A3] hover:text-[#F3EEEE] transition-colors cursor-pointer"
                aria-label="Close letter"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-[#8B101D]/30 pb-4 mb-6">
                <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C51F35] block">
                  {activeLetter.label}
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F3EEEE] mt-1">
                  {activeLetter.title}
                </h3>
                <p className="text-xs font-serif-editorial italic text-[#AAA3A3] mt-1">
                  {activeLetter.dateNote}
                </p>
              </div>

              {/* Salutation */}
              <p className="font-serif-editorial text-lg text-[#C51F35] mb-4">
                {activeLetter.salutation}
              </p>

              {/* Letter Paragraphs */}
              <div className="space-y-4 font-sans-clean text-sm sm:text-base text-[#F3EEEE] leading-relaxed">
                {activeLetter.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Closing Sign-off */}
              <div className="mt-8 pt-6 border-t border-[#8B101D]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif-editorial italic text-xs text-[#AAA3A3]">
                    {activeLetter.closing}
                  </p>
                  <p className="font-cinzel text-base text-[#F3EEEE] mt-1 tracking-wider">
                    {partnerOneName}
                  </p>
                </div>

                <button
                  onClick={() => setActiveLetterId(null)}
                  className="px-5 py-2 bg-[#8B101D] hover:bg-[#C51F35] text-[#F3EEEE] rounded-lg font-cinzel text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Fold & Seal Letter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
