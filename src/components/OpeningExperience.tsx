import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface OpeningExperienceProps {
  onEnter: () => void;
  partnerTwoName: string;
}

export function OpeningExperience({ onEnter, partnerTwoName }: OpeningExperienceProps) {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [isExiting, setIsExiting] = useState(false);

  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase(2);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterClick = () => {
    setIsExiting(true);
    // Play sweet entry chime
    audioEngine.playHeartFoundSfx();
    // Synchronously execute entry callback so the user gesture starts YouTube audio immediately
    onEnter();
    // Allow the 1.1s dissolve animation to finish before removing intro overlay
    setTimeout(() => {
      setIsDone(true);
    }, 1200);
  };

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] px-6 text-center select-none overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.08 : 1,
          filter: isExiting ? 'blur(10px)' : 'blur(0px)'
        }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle radial red glow expanding during exit */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isExiting
              ? 'radial-gradient(circle at center, rgba(197,31,53,0.35) 0%, rgba(8,8,8,0.98) 75%)'
              : 'radial-gradient(circle at center, rgba(139,16,29,0.18) 0%, rgba(8,8,8,1) 70%)'
          }}
          transition={{ duration: 1.2 }}
        />

        {/* Ambient floating ring */}
        <div className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full border border-[#8B101D]/20 animate-pulse pointer-events-none" />

        {/* Center Animated Glowing Heart Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: 1 }}
          transition={{
            scale: { repeat: Infinity, duration: 2.8, ease: "easeInOut" },
            opacity: { duration: 1.2 }
          }}
          className="relative mb-12"
        >
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#151313]/90 border border-[#8B101D]/50 glow-crimson">
            <Heart className="w-9 h-9 text-[#C51F35] fill-[#8B101D]/50 filter drop-shadow-[0_0_12px_rgba(197,31,53,0.8)]" />
          </div>
          {/* Subtle heartbeat ripple */}
          <div className="absolute inset-0 rounded-full border border-[#C51F35]/40 animate-ping opacity-30" />
        </motion.div>

        {/* Cinematic Headline Sequence */}
        <div className="relative max-w-2xl min-h-[140px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === 1 ? (
              <motion.div
                key="phase1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3"
              >
                <p className="font-cinzel text-xs uppercase tracking-[0.35em] text-[#AAA3A3]">
                  A Private Dimension
                </p>
                <h1 className="font-serif-editorial text-3xl sm:text-5xl md:text-6xl text-[#F3EEEE] tracking-wide text-glow-soft">
                  THIS WORLD IS A LITTLE DIFFERENT.
                </h1>
              </motion.div>
            ) : (
              <motion.div
                key="phase2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.4em] text-[#C51F35] text-glow-crimson font-medium flex items-center justify-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C51F35] shadow-[0_0_8px_#C51F35]" />
                  <span>Dedicated to {partnerTwoName || "Aluna Prameswari"}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C51F35] shadow-[0_0_8px_#C51F35]" />
                </p>
                <h1 className="font-serif-editorial italic text-3xl sm:text-5xl md:text-6xl text-[#F3EEEE] text-glow-crimson font-light">
                  “Because it’s made for you.”
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: phase === 2 ? 1 : 0, y: phase === 2 ? 0 : 24 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-12 z-10"
        >
          <button
            onClick={handleEnterClick}
            disabled={isExiting}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#8B101D] to-[#42121D] hover:from-[#C51F35] hover:to-[#8B101D] text-[#F3EEEE] font-cinzel text-xs uppercase tracking-[0.25em] rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(139,16,29,0.5)] hover:shadow-[0_0_40px_rgba(197,31,53,0.8)] hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <span>ENTER OUR WORLD</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F3EEEE] group-hover:scale-150 transition-transform" />
          </button>
        </motion.div>

        {/* Subtle whisper footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 2 ? 0.45 : 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-8 font-sans-clean text-[11px] uppercase tracking-widest text-[#AAA3A3]"
        >
          Turn up your audio · Designed exclusively for two
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
