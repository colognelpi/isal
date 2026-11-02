import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Infinity as InfinityIcon, Stars } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface FinalBossSectionProps {
  partnerOneName: string;
  partnerTwoName: string;
}

export function FinalBossSection({ partnerOneName, partnerTwoName }: FinalBossSectionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'always' | 'lifetime' | null>(null);

  const handleChoose = (choice: 'always' | 'lifetime') => {
    setSelectedAnswer(choice);
    audioEngine.playCelebrationSfx();
  };

  return (
    <section className="py-28 px-6 relative text-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-[#8B101D]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <span className="text-xs font-cinzel uppercase tracking-[0.3em] text-[#C51F35] block mb-3">
          ONE LAST QUESTION FOR YOU...
        </span>

        <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#F3EEEE] tracking-tight leading-tight">
          Would you choose me again?
        </h2>

        {/* Interactive Choice Buttons */}
        {!selectedAnswer ? (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoose('always')}
              className="w-full sm:w-auto px-8 py-4 bg-[#151313] hover:bg-[#8B101D]/40 border border-[#8B101D] hover:border-[#C51F35] text-[#F3EEEE] rounded-full font-cinzel text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(139,16,29,0.3)] hover:shadow-[0_0_35px_rgba(197,31,53,0.7)] flex items-center justify-center gap-3 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#C51F35] fill-[#C51F35]" />
              <span>Always.</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoose('lifetime')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#8B101D] to-[#42121D] hover:from-[#C51F35] hover:to-[#8B101D] text-[#F3EEEE] rounded-full font-cinzel text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_25px_rgba(197,31,53,0.5)] hover:shadow-[0_0_40px_rgba(197,31,53,0.9)] flex items-center justify-center gap-3 cursor-pointer"
            >
              <InfinityIcon className="w-4 h-4 text-[#F3EEEE]" />
              <span>In every lifetime.</span>
            </motion.button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 p-8 sm:p-12 rounded-3xl bg-[#151313]/90 border border-[#C51F35] glow-crimson space-y-6"
            >
              {/* Playful animated icon response */}
              <div className="flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    rotate: selectedAnswer === 'lifetime' ? [0, 360] : [0, 0]
                  }}
                  transition={{
                    scale: { repeat: Infinity, duration: 2 },
                    rotate: { duration: 3, ease: 'linear' }
                  }}
                  className="w-16 h-16 rounded-full bg-[#C51F35] flex items-center justify-center shadow-[0_0_30px_#C51F35]"
                >
                  {selectedAnswer === 'always' ? (
                    <Heart className="w-8 h-8 fill-white text-white" />
                  ) : (
                    <Stars className="w-8 h-8 text-white" />
                  )}
                </motion.div>
              </div>

              {/* Heartfelt dialogue */}
              <p className="text-xs font-cinzel uppercase tracking-[0.25em] text-[#C51F35]">
                {selectedAnswer === 'always'
                  ? 'I will always choose you, too.'
                  : 'Without a second thought, every single time.'}
              </p>

              <blockquote className="font-serif-editorial italic text-2xl sm:text-3xl text-[#F3EEEE] text-glow-soft max-w-xl mx-auto leading-relaxed">
                “Loving you has been the easiest and most wonderful decision I’ve ever made.”
              </blockquote>

              <div className="pt-6 border-t border-[#8B101D]/30">
                <h3 className="font-cinzel text-xl sm:text-3xl tracking-[0.25em] text-[#C51F35] font-bold text-glow-crimson">
                  HAPPY MONTHSIVERSARY, MY LOVE.
                </h3>
                <p className="font-serif-editorial text-sm sm:text-base text-[#AAA3A3] mt-3">
                  With all of my heart, today and for all the tomorrows to come.
                </p>
                <p className="font-cinzel text-xs tracking-widest text-[#F3EEEE]/80 mt-2">
                  {partnerOneName} & {partnerTwoName}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
