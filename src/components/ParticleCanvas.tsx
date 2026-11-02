import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  isCrimson: boolean;
  isHeart: boolean;
  rotation: number;
  rotationSpeed: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isCrimson = Math.random() > 0.45;
      const isHeart = Math.random() > 0.85;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isHeart ? Math.random() * 4 + 3 : Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.2 - Math.random() * 0.35, // slowly float upwards
        alpha: Math.random() * 0.6 + 0.1,
        maxAlpha: Math.random() * 0.5 + 0.3,
        isCrimson,
        isHeart,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015
      });
    }

    function drawMiniHeart(c: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number) {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // top left curve
      c.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 2, 0, size);
      // top right curve
      c.bezierCurveTo(size, topCurveHeight / 2, size / 2, -topCurveHeight, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        ctx.save();
        if (p.isHeart) {
          ctx.fillStyle = p.isCrimson
            ? `rgba(197, 31, 53, ${p.alpha * 0.5})`
            : `rgba(243, 238, 238, ${p.alpha * 0.35})`;
          drawMiniHeart(ctx, p.x, p.y, p.radius, p.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          if (p.isCrimson) {
            ctx.fillStyle = `rgba(197, 31, 53, ${p.alpha * 0.6})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#C51F35';
          } else {
            ctx.fillStyle = `rgba(243, 238, 238, ${p.alpha * 0.4})`;
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#AAA3A3';
          }
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
