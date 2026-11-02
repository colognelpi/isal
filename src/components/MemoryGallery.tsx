import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, ChevronLeft, ChevronRight, X, Film, Calendar, MapPin } from 'lucide-react';
import { MemoryPhoto } from '../config/relationshipData';

interface MemoryGalleryProps {
  memories: MemoryPhoto[];
}

export function MemoryGallery({ memories }: MemoryGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % memories.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + memories.length) % memories.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, memories.length]);

  const activePhoto = lightboxIndex !== null ? memories[lightboxIndex] : null;

  return (
    <section id="memories" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C51F35] block">
            SNAPSHOTS OF US
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#F3EEEE] mt-2">
            OUR MEMORIES
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-sans-clean text-[#AAA3A3] leading-relaxed">
            A few of my favorite pictures of us. Each one holds a sweet memory I never want to forget.
          </p>
        </div>

        {/* 2x2 or Bento Cinematic Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {memories.map((mem, index) => (
            <motion.div
              key={mem.id}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden border border-[#2A161B] bg-[#151313] hover:border-[#8B101D] transition-all duration-300 shadow-2xl cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              {/* Aspect Ratio 16:9 container */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#080808]">
                <img
                  src={mem.imageUrl}
                  alt={mem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallbackMap: Record<number, string> = {
                      1: '/src/assets/images/user_uploaded_memory.jpg',
                      2: '/src/assets/images/user_uploaded_memory_2.jpg',
                      3: '/src/assets/images/user_uploaded_memory_3.jpg',
                      4: '/src/assets/images/user_uploaded_memory_4.jpg',
                    };
                    const fallback = fallbackMap[mem.id];
                    if (fallback && !target.src.includes(fallback)) {
                      target.src = fallback;
                    }
                  }}
                />
                
                {/* Fallback container if image fails */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1c1214] to-[#080808] -z-10">
                  <Film className="w-10 h-10 text-[#8B101D]" />
                </div>

                {/* Dark cinematic gradient scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Scene Kicker */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-cinzel text-[#AAA3A3]">
                  <span className="flex items-center gap-1.5 text-[10px] tracking-widest text-[#C51F35] uppercase">
                    <Film className="w-3.5 h-3.5" />
                    {mem.subtitle}
                  </span>
                  <span className="p-1.5 rounded-full bg-black/60 border border-white/10 group-hover:border-[#C51F35] text-white transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Bottom Captions */}
                <div className="absolute bottom-4 left-5 right-5 text-left">
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F3EEEE] group-hover:text-glow-soft transition-all">
                    {mem.title}
                  </h3>
                  <div className="flex items-center gap-3.5 text-xs font-sans-clean mt-1.5">
                    <span className="flex items-center gap-1.5 font-cinzel text-xs font-medium text-[#F3EEEE] tracking-wide">
                      <Calendar className="w-3.5 h-3.5 text-[#C51F35] drop-shadow-[0_0_6px_rgba(197,31,53,0.8)]" />
                      {mem.date}
                    </span>
                    <span className="text-[#8B101D]">·</span>
                    <span className="flex items-center gap-1.5 text-xs text-[#AAA3A3]">
                      <MapPin className="w-3.5 h-3.5 text-[#C51F35]" />
                      {mem.location}
                    </span>
                  </div>
                  <p className="font-serif-editorial italic text-xs sm:text-sm text-[#F3EEEE]/80 mt-2 line-clamp-2">
                    {mem.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Cinematic Lightbox */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar with Title and Close */}
            <div
              className="w-full max-w-5xl flex items-center justify-between py-3 mb-2 text-[#AAA3A3] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-[#C51F35]">
                  {activePhoto.subtitle}
                </span>
                <h4 className="font-serif-editorial text-xl sm:text-2xl text-[#F3EEEE]">
                  {activePhoto.title}
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-sans-clean tracking-wider">
                  Scene {lightboxIndex! + 1} of {memories.length}
                </span>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-full bg-[#151313] border border-white/10 hover:border-[#C51F35] text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Stage with Image and Nav Buttons */}
            <div
              className="relative w-full max-w-5xl aspect-video max-h-[72vh] rounded-2xl overflow-hidden border border-[#8B101D]/40 bg-[#080808] flex items-center justify-center glow-crimson"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const fallbackMap: Record<number, string> = {
                    1: '/src/assets/images/user_uploaded_memory.jpg',
                    2: '/src/assets/images/user_uploaded_memory_2.jpg',
                    3: '/src/assets/images/user_uploaded_memory_3.jpg',
                    4: '/src/assets/images/user_uploaded_memory_4.jpg',
                  };
                  const fallback = fallbackMap[activePhoto.id];
                  if (fallback && !target.src.includes(fallback)) {
                    target.src = fallback;
                  }
                }}
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex! - 1 + memories.length) % memories.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-[#8B101D] border border-white/10 text-white transition-colors cursor-pointer"
                aria-label="Previous scene"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex! + 1) % memories.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-[#8B101D] border border-white/10 text-white transition-colors cursor-pointer"
                aria-label="Next scene"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div
              className="w-full max-w-5xl text-center mt-4 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-serif-editorial italic text-base sm:text-lg text-[#F3EEEE] text-balance">
                “{activePhoto.caption}”
              </p>
              <p className="text-xs font-sans-clean text-[#AAA3A3] mt-1">
                {activePhoto.date} · {activePhoto.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
