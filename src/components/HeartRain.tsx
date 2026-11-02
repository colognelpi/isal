import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface FallingHeart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayAmplitude: number;
  swayOffset: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

interface HeartRainProps {
  isActive: boolean;
  onToggle: () => void;
}

export function HeartRainCanvas({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heartsRef = useRef<FallingHeart[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(197, 31, 53, 0.75)',  // Crimson
      'rgba(139, 16, 29, 0.7)',   // Blood Red
      'rgba(225, 29, 72, 0.65)',  // Rose Crimson
      'rgba(255, 75, 100, 0.6)',  // Soft Ruby
      'rgba(120, 15, 25, 0.8)'    // Dark Burgundy
    ];

    const heartCount = Math.min(Math.floor((width * height) / 22000), 55);

    // Initialize falling hearts
    heartsRef.current = Array.from({ length: heartCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 10 + 6, // 6px to 16px
      speedY: Math.random() * 1.4 + 0.8, // gentle falling speed
      swaySpeed: Math.random() * 0.025 + 0.015,
      swayAmplitude: Math.random() * 1.8 + 0.6,
      swayOffset: Math.random() * Math.PI * 2,
      rotation: (Math.random() - 0.5) * 0.6,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.35,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    function drawHeart(c: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number, color: string, alpha: number) {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.shadowBlur = 10;
      c.shadowColor = '#C51F35';

      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // Left curve
      c.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 2, 0, size);
      // Right curve
      c.bezierCurveTo(size, topCurveHeight / 2, size / 2, -topCurveHeight, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    }

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      tick += 1;

      for (let i = 0; i < heartsRef.current.length; i++) {
        const h = heartsRef.current[i];
        h.y += h.speedY;
        h.x += Math.sin(tick * h.swaySpeed + h.swayOffset) * h.swayAmplitude;
        h.rotation += h.rotationSpeed;

        // Reset heart to top when it drifts past bottom
        if (h.y > height + 25) {
          h.y = -25;
          h.x = Math.random() * width;
        }

        drawHeart(ctx, h.x, h.y, h.size, h.rotation, h.color, h.opacity);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[5] transition-opacity duration-700 ease-in-out ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    />
  );
}

export function HeartRainButton({ isActive, onToggle }: HeartRainProps) {
  const handleClick = () => {
    if (!isActive) {
      audioEngine.playHeartFoundSfx();
    }
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-2xl ${
        isActive
          ? 'bg-[#8B101D]/40 border-[#C51F35] text-[#F3EEEE] glow-crimson scale-105'
          : 'bg-[#151313]/90 border-[#8B101D]/40 text-[#AAA3A3] hover:text-[#F3EEEE] hover:border-[#8B101D] hover:bg-[#1a1215]'
      }`}
      title={isActive ? 'Disable Heart Rain' : 'Enable Heart Rain'}
      aria-label={isActive ? 'Disable Heart Rain' : 'Enable Heart Rain'}
    >
      <div className="relative">
        <Heart
          className={`w-4 h-4 transition-transform duration-300 ${
            isActive
              ? 'text-[#C51F35] fill-[#C51F35] animate-pulse drop-shadow-[0_0_8px_#C51F35]'
              : 'text-[#AAA3A3]'
          }`}
        />
        {isActive && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C51F35] animate-ping" />
        )}
      </div>

      <span className="text-xs font-cinzel tracking-wider whitespace-nowrap">
        Heart Rain
      </span>

      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors ${
          isActive ? 'bg-[#C51F35] shadow-[0_0_6px_#C51F35]' : 'bg-[#AAA3A3]/40'
        }`}
      />
    </button>
  );
}
