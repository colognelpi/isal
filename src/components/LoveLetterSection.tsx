import { motion } from 'motion/react';
import { Heart, Feather, Sparkles } from 'lucide-react';
import { RelationshipConfig } from '../config/relationshipData';

interface LoveLetterSectionProps {
  letterData: RelationshipConfig['loveLetter'];
  partnerOneName: string;
}

export function LoveLetterSection({ letterData, partnerOneName }: LoveLetterSectionProps) {
  return (
    <section id="love-letter" className="py-24 px-6 relative bg-gradient-to-b from-[#080808] via-[#120a0d] to-[#080808]">
      {/* Background warm crimson glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#8B101D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        {/* Subtle decorative quill header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#151313] border border-[#8B101D]/40 text-[#C51F35] mb-4 glow-crimson-subtle">
            <Feather className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-cinzel uppercase tracking-[0.3em] text-[#C51F35] block">
            FROM MY HEART TO YOURS
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#F3EEEE] mt-2 tracking-tight text-glow-soft">
            {letterData.headline}
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-sans-clean text-[#AAA3A3]">
            {letterData.subheadline}
          </p>
        </div>

        {/* Editorial Manuscript Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative bg-[#151313]/90 border border-[#8B101D]/40 backdrop-blur-md rounded-2xl p-8 sm:p-14 glow-crimson-subtle"
        >
          {/* Subtle top & bottom decorative hairlines */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#C51F35]/50 to-transparent" />
          <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#C51F35]/50 to-transparent" />

          {/* Salutation */}
          <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#C51F35] mb-8">
            {letterData.salutation}
          </p>

          {/* Letter Body */}
          <div className="space-y-6 font-sans-clean text-base sm:text-lg text-[#F3EEEE] leading-[1.8] font-light">
            {letterData.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="tracking-wide">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature Block */}
          <div className="mt-12 pt-8 border-t border-[#8B101D]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-serif-editorial italic text-sm text-[#AAA3A3]">
                {letterData.signature}
              </p>
              <p className="font-cinzel text-xl sm:text-2xl text-[#F3EEEE] tracking-wider mt-1 flex items-center gap-2">
                <span>{partnerOneName}</span>
                <Heart className="w-4 h-4 text-[#C51F35] fill-[#C51F35]" />
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="font-serif-editorial italic text-xs sm:text-sm text-[#C51F35]">
                {letterData.postscript}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
