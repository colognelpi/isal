import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gamepad2, Gift, Search, BookOpen } from 'lucide-react';
import {
  RelationshipConfig,
  loadRelationshipConfig,
  DEFAULT_RELATIONSHIP_CONFIG
} from './config/relationshipData';
import { ParticleCanvas } from './components/ParticleCanvas';
import { OpeningExperience } from './components/OpeningExperience';
import { Navigation } from './components/Navigation';
import { UniverseHero } from './components/UniverseHero';
import { GameQuiz } from './components/GameQuiz';
import { GameFindHeart } from './components/GameFindHeart';
import { GameMysteryBoxes } from './components/GameMysteryBoxes';
import { LittleThings } from './components/LittleThings';
import { OpenWhenLetters } from './components/OpenWhenLetters';
import { MemoryGallery } from './components/MemoryGallery';
import { LoveLetterSection } from './components/LoveLetterSection';
import { FinalBossSection } from './components/FinalBossSection';
import { MusicPlayer } from './components/MusicPlayer';
import { UniverseSettingsModal } from './components/UniverseSettingsModal';
import { HeartRainCanvas } from './components/HeartRain';
import { youtubeAudio } from './utils/youtubeAudio';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [config, setConfig] = useState<RelationshipConfig>(DEFAULT_RELATIONSHIP_CONFIG);
  const [activeGameTab, setActiveGameTab] = useState<'quiz' | 'hidden' | 'boxes'>('quiz');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHeartRainActive, setIsHeartRainActive] = useState(false);

  useEffect(() => {
    // Load persisted configuration from localStorage
    const savedConfig = loadRelationshipConfig();
    setConfig(savedConfig);

    // Initialize official YouTube IFrame Audio Player
    youtubeAudio.init('youtube-audio-container');
  }, []);

  const handleFirstEntry = () => {
    // 1. Immediately start playing the YouTube lyric video within the click user gesture
    youtubeAudio.play();

    // 2. Automatically activate gentle falling crimson heart rain
    setIsHeartRainActive(true);

    // 3. Reveal the main universe
    setHasEntered(true);
  };

  const handleExploreScroll = () => {
    const el = document.getElementById('games');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F3EEEE] relative selection:bg-[#8B101D] selection:text-white">
      {/* Dynamic Starlight & Crimson Particle Canvas */}
      <ParticleCanvas />

      {/* Automatically Triggered Crimson Heart Rain Visual Effect */}
      <HeartRainCanvas isActive={isHeartRainActive} />

      {/* Opening Full-screen Experience */}
      {!hasEntered && (
        <OpeningExperience
          partnerTwoName={config.partnerTwo}
          onEnter={handleFirstEntry}
        />
      )}

      {/* Main Experience (Mounted and smoothly revealed) */}
      <AnimatePresence>
        {hasEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="relative z-10"
          >
            {/* Top Bar adhering to Top Bar Contract */}
            <Navigation onOpenSettings={() => setIsSettingsOpen(true)} />

            {/* Section 03: Home — Our Little Universe */}
            <UniverseHero config={config} onExploreClick={handleExploreScroll} />

            {/* Section 04, 05, 06: Mini-Games Hub */}
            <section id="games" className="py-24 px-6 relative max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C51F35] block">
                  JUST FOR FUN
                </span>
                <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#F3EEEE] mt-2">
                  LITTLE GAMES FOR US
                </h2>
                <p className="mt-2 text-xs sm:text-sm font-sans-clean text-[#AAA3A3]">
                  A few cute mini-games made just for us. See how well you remember our moments, find
                  hidden little tokens, or open a sweet surprise.
                </p>
              </div>

              {/* Functional Game Switcher Tabs */}
              <div className="flex items-center justify-center gap-2 mb-12">
                <div className="p-1.5 rounded-full bg-[#151313] border border-[#8B101D]/30 flex flex-wrap items-center justify-center gap-1.5">
                  <button
                    onClick={() => setActiveGameTab('quiz')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeGameTab === 'quiz'
                        ? 'bg-[#8B101D] text-[#F3EEEE] shadow-[0_0_15px_rgba(197,31,53,0.5)]'
                        : 'text-[#AAA3A3] hover:text-[#F3EEEE]'
                    }`}
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>How Well Do You Know Us?</span>
                  </button>

                  <button
                    onClick={() => setActiveGameTab('hidden')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeGameTab === 'hidden'
                        ? 'bg-[#8B101D] text-[#F3EEEE] shadow-[0_0_15px_rgba(197,31,53,0.5)]'
                        : 'text-[#AAA3A3] hover:text-[#F3EEEE]'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Find My Heart</span>
                  </button>

                  <button
                    onClick={() => setActiveGameTab('boxes')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeGameTab === 'boxes'
                        ? 'bg-[#8B101D] text-[#F3EEEE] shadow-[0_0_15px_rgba(197,31,53,0.5)]'
                        : 'text-[#AAA3A3] hover:text-[#F3EEEE]'
                    }`}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Pick Your Surprise</span>
                  </button>
                </div>
              </div>

              {/* Active Game View */}
              <AnimatePresence mode="wait">
                {activeGameTab === 'quiz' && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GameQuiz
                      questions={config.quizQuestions}
                      partnerTwoName={config.partnerTwo}
                    />
                  </motion.div>
                )}

                {activeGameTab === 'hidden' && (
                  <motion.div
                    key="hidden"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GameFindHeart hiddenObjects={config.hiddenObjects} />
                  </motion.div>
                )}

                {activeGameTab === 'boxes' && (
                  <motion.div
                    key="boxes"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GameMysteryBoxes boxes={config.mysteryBoxes} />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Section 07: Little Things I Love About You */}
            <LittleThings items={config.littleThings} />

            {/* Section 08: Open When You Need Me */}
            <OpenWhenLetters
              letters={config.openWhenLetters}
              partnerOneName={config.partnerOne}
            />

            {/* Section 09: Our Memories */}
            <MemoryGallery memories={config.memories} />

            {/* Section 10: The Love Letter */}
            <LoveLetterSection
              letterData={config.loveLetter}
              partnerOneName={config.partnerOne}
            />

            {/* Section 11: Final Boss — One Last Question */}
            <FinalBossSection
              partnerOneName={config.partnerOne}
              partnerTwoName={config.partnerTwo}
            />

            {/* Section 12: Floating Music Experience */}
            <MusicPlayer onOpenSettings={() => setIsSettingsOpen(true)} />

            {/* Personalization Modal */}
            <UniverseSettingsModal
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              config={config}
              onUpdateConfig={(newConfig) => setConfig(newConfig)}
            />

            {/* Minimalist Footnote */}
            <footer className="py-12 border-t border-[#8B101D]/20 text-center text-xs font-sans-clean text-[#AAA3A3]/60">
              <p className="flex items-center justify-center gap-2">
                <span>ONLY US</span>
                <span>·</span>
                <span>Made with love for {config.partnerTwo}</span>
                <span>·</span>
                <Heart className="w-3 h-3 text-[#C51F35] fill-[#C51F35]" />
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
