import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, X, Heart, Key, Star, Ticket, MessageSquareHeart } from 'lucide-react';
import { MysteryBox } from '../config/relationshipData';
import { audioEngine } from '../utils/audioSynth';

interface GameMysteryBoxesProps {
  boxes: MysteryBox[];
}

export function GameMysteryBoxes({ boxes }: GameMysteryBoxesProps) {
  const [openedBoxId, setOpenedBoxId] = useState<number | null>(null);
  const [openedIds, setOpenedIds] = useState<number[]>([]);

  const handleBoxClick = (box: MysteryBox) => {
    setOpenedBoxId(box.id);
    if (!openedIds.includes(box.id)) {
      setOpenedIds((prev) => [...prev, box.id]);
    }
    audioEngine.playBoxOpenSfx();
  };

  const getCategoryIcon = (type: MysteryBox['type']) => {
    switch (type) {
      case 'confession':
        return <MessageSquareHeart className="w-5 h-5 text-[#C51F35]" />;
      case 'compliment':
        return <Star className="w-5 h-5 text-[#C51F35]" />;
      case 'ticket':
        return <Ticket className="w-5 h-5 text-[#C51F35]" />;
      case 'promise':
        return <Key className="w-5 h-5 text-[#C51F35]" />;
      case 'memory':
      default:
        return <Heart className="w-5 h-5 text-[#C51F35]" />;
    }
  };

  const currentOpenedBox = boxes.find((b) => b.id === openedBoxId);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C51F35] block">
          LITTLE SURPRISES
        </span>
        <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#F3EEEE] mt-1">
          Pick Your Surprise
        </h2>
        <p className="max-w-lg mx-auto text-xs sm:text-sm font-sans-clean text-[#AAA3A3] mt-2">
          Six little gift boxes, each holding a sweet note, a cute confession, or a promise for you.
          Pick whichever one you like!
        </p>
      </div>

      {/* Grid of 6 Mystery Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map((box, index) => {
          const isOpened = openedIds.includes(box.id);
          return (
            <motion.div
              key={box.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer"
              onClick={() => handleBoxClick(box)}
            >
              <div
                className={`h-full min-h-[220px] p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                  isOpened
                    ? 'bg-[#151313]/90 border-[#8B101D]/50 glow-crimson-subtle'
                    : 'bg-[#100c0e]/80 border-[#2A161B] hover:border-[#C51F35]/60 hover:bg-[#151313]'
                }`}
              >
                {/* Subtle box ribbon accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8B101D]/20 via-transparent to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#AAA3A3]">
                      Box 0{index + 1}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#080808] border border-[#8B101D]/30 flex items-center justify-center group-hover:border-[#C51F35] transition-colors">
                      {getCategoryIcon(box.type)}
                    </span>
                  </div>

                  <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#F3EEEE] group-hover:text-glow-soft transition-all">
                    {box.title}
                  </h3>
                  <p className="text-xs font-sans-clean text-[#AAA3A3] mt-1.5 leading-relaxed">
                    {box.subtitle}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#8B101D]/20 flex items-center justify-between">
                  <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#C51F35] group-hover:underline flex items-center gap-1.5">
                    {isOpened ? 'Read Again' : 'Open Box'} →
                  </span>
                  {isOpened && (
                    <span className="text-[10px] font-sans-clean text-[#AAA3A3]">
                      Unlocked
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal for Revealed Mystery Box */}
      <AnimatePresence>
        {currentOpenedBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setOpenedBoxId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#151313] border border-[#C51F35]/70 rounded-2xl p-6 sm:p-8 glow-crimson overflow-hidden text-left"
            >
              {/* Glowing header bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B101D] via-[#C51F35] to-[#8B101D]" />

              <button
                onClick={() => setOpenedBoxId(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-[#080808] border border-[#8B101D]/40 text-[#AAA3A3] hover:text-[#F3EEEE] transition-colors"
                aria-label="Close surprise box"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-cinzel uppercase tracking-widest text-[#C51F35] flex items-center gap-1.5 font-semibold">
                  {getCategoryIcon(currentOpenedBox.type)}
                  {currentOpenedBox.type.toUpperCase()} FOR YOU
                </span>
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F3EEEE] mb-4">
                {currentOpenedBox.title}
              </h3>

              <div className="p-4 rounded-xl bg-[#080808]/90 border border-[#8B101D]/30 mb-5">
                <p className="font-sans-clean text-sm sm:text-base text-[#F3EEEE] leading-relaxed">
                  {currentOpenedBox.content}
                </p>
              </div>

              <div className="border-t border-[#8B101D]/20 pt-4 flex items-center justify-between">
                <p className="font-serif-editorial italic text-sm text-[#C51F35]">
                  {currentOpenedBox.accentQuote}
                </p>
                <button
                  onClick={() => setOpenedBoxId(null)}
                  className="px-4 py-1.5 bg-[#8B101D] hover:bg-[#C51F35] text-[#F3EEEE] text-xs font-cinzel uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Keep Safe
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
