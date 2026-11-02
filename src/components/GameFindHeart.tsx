import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  HelpCircle,
  Disc,
  Clock,
  Sparkles,
  Flame,
  Wine,
  Compass,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { HiddenObject } from '../config/relationshipData';
import { audioEngine } from '../utils/audioSynth';

interface GameFindHeartProps {
  hiddenObjects: HiddenObject[];
}

export function GameFindHeart({ hiddenObjects }: GameFindHeartProps) {
  const [foundIds, setFoundIds] = useState<number[]>([]);
  const [activeHintId, setActiveHintId] = useState<number | null>(null);
  const [lastDiscovered, setLastDiscovered] = useState<HiddenObject | null>(null);

  const isAllFound = foundIds.length === hiddenObjects.length;

  const handleObjectClick = (obj: HiddenObject) => {
    if (!foundIds.includes(obj.id)) {
      setFoundIds((prev) => [...prev, obj.id]);
      setLastDiscovered(obj);
      audioEngine.playHeartFoundSfx();
      if (foundIds.length + 1 === hiddenObjects.length) {
        setTimeout(() => audioEngine.playCelebrationSfx(), 400);
      }
    } else {
      setLastDiscovered(obj);
    }
  };

  const handleRestart = () => {
    setFoundIds([]);
    setActiveHintId(null);
    setLastDiscovered(null);
  };

  const getObjectIcon = (type: HiddenObject['iconType'], isFound: boolean) => {
    const iconClass = `w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 ${
      isFound
        ? 'text-[#C51F35] drop-shadow-[0_0_12px_#C51F35]'
        : 'text-[#AAA3A3] group-hover:text-[#F3EEEE] group-hover:scale-110'
    }`;

    switch (type) {
      case 'vinyl':
        return <Disc className={iconClass} />;
      case 'stars':
        return <Compass className={iconClass} />;
      case 'clock':
        return <Clock className={iconClass} />;
      case 'bottle':
        return <Wine className={iconClass} />;
      case 'lantern':
      default:
        return <Flame className={iconClass} />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#151313]/90 border border-[#8B101D]/30 backdrop-blur-md rounded-2xl p-6 sm:p-10 glow-crimson-subtle relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C51F35] to-transparent" />

      {/* Header and status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B101D]/20 pb-5 mb-6">
        <div>
          <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C51F35] block">
            INTERACTIVE SEARCH
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#F3EEEE] mt-1">
            Find My Heart
          </h2>
          <p className="text-xs font-sans-clean text-[#AAA3A3] mt-1">
            5 glowing hearts are hidden among our cherished relics. Click to discover them.
          </p>
        </div>

        {/* Counter indicator */}
        <div className="flex items-center gap-4 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-4 py-2 bg-[#080808] border border-[#8B101D]/40 rounded-full">
            <Heart className="w-4 h-4 text-[#C51F35] fill-[#C51F35]" />
            <span className="text-xs font-cinzel uppercase tracking-wider text-[#F3EEEE]">
              Found: <strong className="text-[#C51F35] tabular-nums">{foundIds.length}</strong> /{' '}
              {hiddenObjects.length}
            </span>
          </div>

          <button
            onClick={() => {
              const uncollected = hiddenObjects.find((h) => !foundIds.includes(h.id));
              if (uncollected) setActiveHintId(uncollected.id);
            }}
            disabled={isAllFound}
            className="p-2 bg-[#080808] border border-[#8B101D]/30 hover:border-[#C51F35] text-[#AAA3A3] hover:text-[#F3EEEE] rounded-full transition-all cursor-pointer disabled:opacity-40"
            title="Need a hint?"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hint Alert if requested */}
      {activeHintId !== null && !isAllFound && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 rounded-xl bg-[#251216]/60 border border-[#8B101D]/60 flex items-start justify-between gap-3 text-xs font-sans-clean text-[#F3EEEE]"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C51F35] shrink-0" />
            <span>
              <strong className="text-[#C51F35] font-cinzel">Whisper Hint:</strong>{' '}
              {hiddenObjects.find((h) => h.id === activeHintId)?.hint}
            </span>
          </div>
          <button
            onClick={() => setActiveHintId(null)}
            className="text-[#AAA3A3] hover:text-white shrink-0 font-cinzel text-xs"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* Atmospheric Interactive Scene Canvas */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-gradient-to-b from-[#080808] via-[#100b0d] to-[#151313] border border-[#2A161B] overflow-hidden select-none">
        {/* Soft background ambient starlight map & vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8B101D]/15 via-transparent to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Glowing constellation decorative lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
          <polyline
            points="70,140 180,110 320,180 500,120 700,240 850,160"
            fill="none"
            stroke="#C51F35"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>

        {/* Interactive Clickable Relic Objects */}
        {hiddenObjects.map((obj) => {
          const isFound = foundIds.includes(obj.id);
          return (
            <motion.button
              key={obj.id}
              onClick={() => handleObjectClick(obj)}
              style={{
                left: `${obj.xPercent}%`,
                top: `${obj.yPercent}%`
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-full cursor-pointer transition-all duration-300"
            >
              <div
                className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border transition-all duration-300 ${
                  isFound
                    ? 'bg-[#42121D]/50 border-[#C51F35] glow-crimson'
                    : 'bg-[#151313]/90 border-[#8B101D]/30 group-hover:border-[#C51F35]/70 group-hover:bg-[#251216]'
                }`}
              >
                {getObjectIcon(obj.iconType, isFound)}

                {/* Floating Heart Discovery Badge */}
                {isFound && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#C51F35] flex items-center justify-center shadow-[0_0_10px_#C51F35]"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                  </motion.div>
                )}
              </div>

              {/* Name tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap text-[10px] font-cinzel tracking-wider text-[#AAA3A3] group-hover:text-[#F3EEEE] opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none">
                {obj.name}
              </span>
            </motion.button>
          );
        })}

        {/* Ambient bottom instructions overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-center pointer-events-none">
          <p className="text-[11px] font-cinzel tracking-[0.2em] text-[#AAA3A3]/60">
            Tap the little tokens to find each surprise
          </p>
        </div>
      </div>

      {/* Discovery Detail Dialogue */}
      {lastDiscovered && !isAllFound && (
        <motion.div
          key={lastDiscovered.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-[#080808]/90 border border-[#8B101D]/40 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-[#42121D]/50 border border-[#C51F35] flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-[#C51F35] fill-[#C51F35]" />
          </div>
          <div>
            <h4 className="text-xs uppercase font-cinzel tracking-wider text-[#C51F35]">
              {lastDiscovered.name}
            </h4>
            <p className="text-sm font-serif-editorial italic text-[#F3EEEE] mt-1 leading-relaxed">
              “{lastDiscovered.foundMessage}”
            </p>
          </div>
        </motion.div>
      )}

      {/* Grand Completion Banner */}
      {isAllFound && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-[#42121D]/60 via-[#151313] to-[#42121D]/60 border border-[#C51F35] text-center glow-crimson space-y-4"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C51F35] text-white shadow-[0_0_20px_#C51F35]">
            <Heart className="w-6 h-6 fill-white" />
          </div>

          <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F3EEEE]">
            “You found all of them! Every single one was kept for you.”
          </h3>

          <p className="max-w-md mx-auto text-xs font-sans-clean text-[#AAA3A3] leading-relaxed">
            No matter where you look in this world, my heart is always right there with you.
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#080808] hover:bg-[#8B101D]/30 border border-[#8B101D]/50 text-[#F3EEEE] rounded-lg font-cinzel text-xs uppercase tracking-widest transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C51F35]" />
            Find Them Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
