import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ChevronRight, Eye } from 'lucide-react';
import { LittleThing } from '../config/relationshipData';

interface LittleThingsProps {
  items: LittleThing[];
}

export function LittleThings({ items }: LittleThingsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="little-things" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C51F35] block">
            THE LITTLE DETAILS
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#F3EEEE] mt-2 tracking-tight">
            THINGS I LOVE ABOUT YOU
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-sans-clean text-[#AAA3A3] leading-relaxed">
            Ten little things that make me smile every single day. Tap each card to see the small details
            that make me fall for you over and over.
          </p>
        </div>

        {/* 10 Interactive Glowing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => toggleExpand(item.id)}
                className={`group p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer select-none relative overflow-hidden ${
                  isExpanded
                    ? 'bg-[#151313] border-[#C51F35]/70 glow-crimson'
                    : 'bg-[#100c0e]/80 border-[#2A161B] hover:border-[#8B101D]/70 hover:bg-[#151313]'
                }`}
              >
                {/* Subtle corner index */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-cinzel tracking-[0.2em] text-[#8B101D] group-hover:text-[#C51F35] transition-colors">
                    Reason {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#080808] border border-[#8B101D]/30 flex items-center justify-center text-[#C51F35] group-hover:scale-110 transition-transform">
                    {isExpanded ? (
                      <Heart className="w-3.5 h-3.5 fill-[#C51F35]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-[#AAA3A3] group-hover:text-[#F3EEEE]" />
                    )}
                  </div>
                </div>

                <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#F3EEEE] group-hover:text-glow-soft transition-all">
                  {item.title}
                </h3>

                <p className="font-serif-editorial italic text-xs sm:text-sm text-[#AAA3A3] mt-1.5">
                  “{item.teaser}”
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-4 mt-4 border-t border-[#8B101D]/30"
                    >
                      <p className="font-sans-clean text-sm sm:text-[15px] text-[#F3EEEE] leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
