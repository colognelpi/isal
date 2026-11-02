import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { RelationshipConfig } from '../config/relationshipData';

interface UniverseHeroProps {
  config: RelationshipConfig;
  onExploreClick: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  monthsCount: number;
}

export function UniverseHero({ config, onExploreClick }: UniverseHeroProps) {
  const [time, setTime] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    monthsCount: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(config.anniversaryDate).getTime();
      const now = new Date().getTime();
      const diffMs = Math.max(0, now - start);

      const seconds = Math.floor((diffMs / 1000) % 60);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      // Calculate approximate months
      const startDate = new Date(config.anniversaryDate);
      const currentDate = new Date();
      const months = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());

      setTime({
        days,
        hours,
        minutes,
        seconds,
        monthsCount: Math.max(1, months)
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.anniversaryDate]);

  const formattedDate = new Date(config.anniversaryDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section id="universe" className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 pt-24 pb-16 text-center overflow-hidden">
      {/* Red atmospheric backdrop glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B101D]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#42121D]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle kicker text with partner names */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.35em] font-cinzel text-[#C51F35] mb-6 font-medium"
      >
        <span className="text-[#F3EEEE] hover:text-white transition-colors">{config.partnerOne || "Ishaac Jasper"}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B101D] shadow-[0_0_6px_#8B101D]" />
        <Heart className="w-3.5 h-3.5 text-[#C51F35] fill-[#C51F35] filter drop-shadow-[0_0_6px_rgba(197,31,53,0.8)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B101D] shadow-[0_0_6px_#8B101D]" />
        <span className="text-[#F3EEEE] hover:text-white transition-colors">{config.partnerTwo || "Aluna Prameswari"}</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="max-w-4xl font-serif-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#F3EEEE] leading-[1.15] text-glow-soft text-balance"
      >
        IN A WORLD FULL OF PEOPLE, <br className="hidden sm:inline" />
        <span className="italic text-[#C51F35] text-glow-crimson font-light">
          I’D STILL CHOOSE YOU.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-6 max-w-xl font-sans-clean text-sm sm:text-base text-[#AAA3A3] font-light tracking-wide leading-relaxed text-balance"
      >
        A little universe made for two. Celebrating our{' '}
        <span className="text-[#F3EEEE] font-normal text-glow-soft">
          {time.monthsCount === 1 ? '1 month' : `${time.monthsCount} months`}
        </span>{' '}
        together since{' '}
        <span className="text-[#C51F35] font-medium text-glow-crimson">{formattedDate}</span>.
      </motion.p>

      {/* Live Relationship Counter Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.45 }}
        className="mt-12 w-full max-w-2xl bg-[#151313]/80 border border-[#8B101D]/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 glow-crimson-subtle relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C51F35]/60 to-transparent" />
        
        <p className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#AAA3A3] mb-5">
          TIME SPENT IN LOVE
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 divide-x divide-[#8B101D]/20">
          <div className="px-1 sm:px-2">
            <span className="block font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#F3EEEE] tabular-nums">
              {time.days}
            </span>
            <span className="text-[10px] sm:text-xs font-sans-clean uppercase tracking-widest text-[#AAA3A3] mt-1 block">
              Days
            </span>
          </div>

          <div className="px-1 sm:px-2">
            <span className="block font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#F3EEEE] tabular-nums">
              {String(time.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-sans-clean uppercase tracking-widest text-[#AAA3A3] mt-1 block">
              Hours
            </span>
          </div>

          <div className="px-1 sm:px-2">
            <span className="block font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#F3EEEE] tabular-nums">
              {String(time.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-sans-clean uppercase tracking-widest text-[#AAA3A3] mt-1 block">
              Minutes
            </span>
          </div>

          <div className="px-1 sm:px-2">
            <span className="block font-serif-editorial text-3xl sm:text-5xl font-semibold text-[#C51F35] text-glow-crimson tabular-nums">
              {String(time.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-sans-clean uppercase tracking-widest text-[#C51F35] mt-1 block">
              Seconds
            </span>
          </div>
        </div>

        <p className="mt-5 text-xs italic font-serif-editorial text-[#AAA3A3]/80">
          {config.anniversarySubtitle}
        </p>
      </motion.div>

      {/* Down indicator */}
      <motion.button
        onClick={onExploreClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 0.9, duration: 0.6 },
          y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
        }}
        className="mt-14 inline-flex flex-col items-center gap-2 text-xs font-cinzel uppercase tracking-[0.2em] text-[#AAA3A3] hover:text-[#C51F35] transition-colors cursor-pointer"
      >
        <span>Explore Our World</span>
        <ChevronDown className="w-4 h-4 text-[#C51F35]" />
      </motion.button>
    </section>
  );
}
