import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Loader2 } from 'lucide-react';
import { youtubeAudio, YouTubePlayerStatus } from '../utils/youtubeAudio';

interface MusicPlayerProps {
  onOpenSettings?: () => void;
}

export function MusicPlayer({ onOpenSettings }: MusicPlayerProps) {
  const [status, setStatus] = useState<YouTubePlayerStatus>(youtubeAudio.getStatus());

  useEffect(() => {
    // Ensure YouTube player is initialized with the persistent container
    youtubeAudio.init('youtube-audio-container');

    const unsubscribe = youtubeAudio.subscribe((newStatus) => {
      setStatus({ ...newStatus });
    });

    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    youtubeAudio.toggle();
  };

  const handleToggleMute = () => {
    youtubeAudio.toggleMute();
  };

  const isPlaying = status.isPlaying;
  const isMuted = status.isMuted;
  const isBuffering = status.isBuffering;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#151313]/90 border border-[#8B101D]/40 backdrop-blur-md rounded-full px-4 py-2.5 glow-crimson-subtle shadow-2xl transition-all duration-300 select-none hover:border-[#C51F35]/70"
      role="region"
      aria-label="Soundtrack Player"
    >
      {/* Equalizer Visualizer Bars */}
      <div className="flex items-end gap-1 h-4 w-4 mr-1">
        <span
          className={`w-0.5 bg-[#C51F35] rounded-full transition-all duration-300 ${
            isPlaying && !isMuted
              ? 'h-3.5 animate-pulse'
              : isBuffering
              ? 'h-2 animate-pulse'
              : 'h-1'
          }`}
        />
        <span
          className={`w-0.5 bg-[#C51F35] rounded-full transition-all duration-300 ${
            isPlaying && !isMuted
              ? 'h-2 animate-bounce'
              : isBuffering
              ? 'h-3 animate-pulse'
              : 'h-1'
          }`}
        />
        <span
          className={`w-0.5 bg-[#C51F35] rounded-full transition-all duration-300 ${
            isPlaying && !isMuted
              ? 'h-4 animate-pulse'
              : isBuffering
              ? 'h-2.5 animate-pulse'
              : 'h-1'
          }`}
        />
        <span
          className={`w-0.5 bg-[#C51F35] rounded-full transition-all duration-300 ${
            isPlaying && !isMuted
              ? 'h-2.5 animate-bounce'
              : isBuffering
              ? 'h-1.5 animate-pulse'
              : 'h-1'
          }`}
        />
      </div>

      {/* Track Label */}
      <div className="hidden sm:flex flex-col text-left mr-2 min-w-[85px]">
        <span className="text-[11px] font-cinzel font-medium tracking-wider text-[#F3EEEE] text-glow-soft leading-none">
          {status.title}
        </span>
        <span className="text-[9px] font-sans-clean text-[#C51F35] tracking-wide mt-1 leading-none font-medium flex items-center gap-1">
          {isBuffering ? (
            <>
              <Loader2 className="w-2.5 h-2.5 animate-spin inline" />
              <span>Connecting...</span>
            </>
          ) : isPlaying ? (
            <span>{status.artist} · Playing</span>
          ) : (
            <span>{status.artist} · Paused</span>
          )}
        </span>
      </div>

      {/* Play / Pause Button */}
      <button
        onClick={handleTogglePlay}
        className="p-2 rounded-full bg-[#080808] hover:bg-[#8B101D]/40 border border-[#8B101D]/40 hover:border-[#C51F35] text-[#F3EEEE] hover:text-[#C51F35] transition-all cursor-pointer shadow-sm active:scale-95"
        title={isPlaying ? "Pause 'Sure Thing' by Miguel" : "Play 'Sure Thing' by Miguel"}
        aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
      >
        {isBuffering ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C51F35]" />
        ) : isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        )}
      </button>

      {/* Mute / Unmute Button */}
      <button
        onClick={handleToggleMute}
        className="p-2 rounded-full bg-[#080808] hover:bg-[#8B101D]/40 border border-[#8B101D]/40 hover:border-[#C51F35] text-[#AAA3A3] hover:text-[#F3EEEE] transition-all cursor-pointer active:scale-95"
        title={isMuted ? "Unmute audio" : "Mute audio"}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-[#C51F35]" />
        ) : (
          <Volume2 className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}
