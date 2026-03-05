import { useEffect, useRef } from 'react';

type AmbientOrb = {
  anchorX: number;
  anchorY: number;
  radius: number;
  travelX: number;
  travelY: number;
  speed: number;
  phase: number;
  color: [number, number, number];
  alpha: number;
  pulse: number;
};

type RGB = [number, number, number];
const GRAIN_TILE_SIZE = 128;

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function blendColor(a: RGB, b: RGB, t: number): RGB {
  return [
    clampChannel(a[0] + (b[0] - a[0]) * t),
    clampChannel(a[1] + (b[1] - a[1]) * t),
    clampChannel(a[2] + (b[2] - a[2]) * t),
  ];
}

function driftColor(base: RGB, time: number, phase: number, animate: boolean): RGB {
  if (!animate) return base;
  const t = Math.sin(time * 0.12 + phase) * 0.5 + 0.5;
  const coolTint: RGB = [210, 230, 255];
  const warmTint: RGB = [255, 228, 214];
  const blendTarget = blendColor(coolTint, warmTint, t);
  return blendColor(base, blendTarget, 0.22);
}

const ORBS: AmbientOrb[] = [
  // Top-right cluster
  { anchorX: 1.05, anchorY: -0.08, radius: 560, travelX: 16, travelY: 20, speed: 0.22, phase: 0.2, color: [21, 159, 250], alpha: 0.17, pulse: 0.03 },
  { anchorX: 0.88, anchorY: 0.05, radius: 320, travelX: 14, travelY: 18, speed: 0.28, phase: 1.1, color: [255, 70, 70], alpha: 0.145, pulse: 0.04 },
  { anchorX: 0.98, anchorY: 0.18, radius: 280, travelX: 12, travelY: 14, speed: 0.24, phase: 2.1, color: [99, 126, 173], alpha: 0.11, pulse: 0.03 },
  // Top-middle bridge
  { anchorX: 0.5, anchorY: -0.12, radius: 360, travelX: 14, travelY: 16, speed: 0.19, phase: 0.7, color: [21, 159, 250], alpha: 0.11, pulse: 0.025 },
  { anchorX: 0.56, anchorY: 0.06, radius: 220, travelX: 10, travelY: 12, speed: 0.24, phase: 2.9, color: [255, 70, 70], alpha: 0.09, pulse: 0.03 },
  // Center-center bridge
  { anchorX: 0.5, anchorY: 0.5, radius: 290, travelX: 8, travelY: 8, speed: 0.16, phase: 1.3, color: [21, 159, 250], alpha: 0.065, pulse: 0.02 },
  { anchorX: 0.54, anchorY: 0.46, radius: 210, travelX: 6, travelY: 7, speed: 0.19, phase: 2.4, color: [255, 70, 70], alpha: 0.055, pulse: 0.02 },
  // Bottom-right cluster
  { anchorX: 1.04, anchorY: 1.02, radius: 510, travelX: 18, travelY: 16, speed: 0.2, phase: 1.6, color: [255, 70, 70], alpha: 0.155, pulse: 0.03 },
  { anchorX: 0.84, anchorY: 0.9, radius: 310, travelX: 12, travelY: 14, speed: 0.27, phase: 0.8, color: [21, 159, 250], alpha: 0.135, pulse: 0.04 },
  // Bottom-middle bridge
  { anchorX: 0.5, anchorY: 1.08, radius: 380, travelX: 14, travelY: 16, speed: 0.2, phase: 1.9, color: [255, 70, 70], alpha: 0.11, pulse: 0.025 },
  { anchorX: 0.44, anchorY: 0.92, radius: 230, travelX: 10, travelY: 11, speed: 0.23, phase: 3.4, color: [21, 159, 250], alpha: 0.09, pulse: 0.03 },
  // Bottom-left cluster
  { anchorX: -0.08, anchorY: 1.04, radius: 530, travelX: 18, travelY: 20, speed: 0.21, phase: 2.5, color: [21, 159, 250], alpha: 0.155, pulse: 0.03 },
  { anchorX: 0.12, anchorY: 0.93, radius: 300, travelX: 14, travelY: 12, speed: 0.26, phase: 3.3, color: [255, 70, 70], alpha: 0.125, pulse: 0.04 },
];

function drawAmbientWash(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  animate: boolean,
) {
  const motionX = animate ? Math.sin(time * 0.08) * width * 0.06 : 0;
  const motionY = animate ? Math.cos(time * 0.07) * height * 0.05 : 0;
  const centerX = width * 0.58 + motionX;
  const centerY = height * 0.48 + motionY;

  const radial = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    Math.max(width, height) * 0.9,
  );
  radial.addColorStop(0, 'rgba(237, 244, 255, 0.46)');
  radial.addColorStop(0.42, 'rgba(250, 243, 242, 0.42)');
  radial.addColorStop(0.78, 'rgba(239, 245, 253, 0.34)');
  radial.addColorStop(1, 'rgba(255, 255, 255, 0.26)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, width, height);

  const bandOffset = animate ? Math.sin(time * 0.095) * width * 0.045 : 0;
  const linear = ctx.createLinearGradient(-width * 0.1 + bandOffset, 0, width * 1.1 + bandOffset, height);
  linear.addColorStop(0, 'rgba(221, 236, 255, 0.15)');
  linear.addColorStop(0.5, 'rgba(255, 238, 233, 0.16)');
  linear.addColorStop(1, 'rgba(231, 241, 255, 0.14)');
  ctx.fillStyle = linear;
  ctx.fillRect(0, 0, width, height);
}

function drawAmbientOrb(ctx: CanvasRenderingContext2D, width: number, height: number, orb: AmbientOrb, time: number, animate: boolean) {
  const driftX = animate ? Math.sin(time * orb.speed + orb.phase) * orb.travelX : 0;
  const driftY = animate ? Math.cos(time * (orb.speed * 0.9) + orb.phase) * orb.travelY : 0;
  const scale = animate ? 1 + Math.sin(time * 0.18 + orb.phase) * orb.pulse : 1;
  const dynamicColor = driftColor(orb.color, time, orb.phase, animate);

  const x = orb.anchorX * width + driftX;
  const y = orb.anchorY * height + driftY;
  const radius = orb.radius * scale;

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(${dynamicColor[0]}, ${dynamicColor[1]}, ${dynamicColor[2]}, ${orb.alpha})`);
  gradient.addColorStop(0.52, `rgba(${dynamicColor[0]}, ${dynamicColor[1]}, ${dynamicColor[2]}, ${orb.alpha * 0.58})`);
  gradient.addColorStop(0.84, `rgba(${dynamicColor[0]}, ${dynamicColor[1]}, ${dynamicColor[2]}, ${orb.alpha * 0.2})`);
  gradient.addColorStop(1, `rgba(${dynamicColor[0]}, ${dynamicColor[1]}, ${dynamicColor[2]}, 0)`);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function createFilmGrainPattern(ctx: CanvasRenderingContext2D): CanvasPattern | null {
  const grainCanvas = document.createElement('canvas');
  grainCanvas.width = GRAIN_TILE_SIZE;
  grainCanvas.height = GRAIN_TILE_SIZE;
  const grainCtx = grainCanvas.getContext('2d');
  if (!grainCtx) return null;

  const imageData = grainCtx.createImageData(GRAIN_TILE_SIZE, GRAIN_TILE_SIZE);
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const tone = 108 + Math.floor(Math.random() * 54);
    const alpha = 26 + Math.floor(Math.random() * 40);
    data[i] = tone;
    data[i + 1] = tone;
    data[i + 2] = tone;
    data[i + 3] = alpha;
  }
  grainCtx.putImageData(imageData, 0, 0);
  return ctx.createPattern(grainCanvas, 'repeat');
}

function drawFilmGrain(
  ctx: CanvasRenderingContext2D,
  pattern: CanvasPattern | null,
  width: number,
  height: number,
  time: number,
  animate: boolean,
) {
  if (!pattern) return;

  const shiftX = animate ? (time * 14.5) % GRAIN_TILE_SIZE : 0;
  const shiftY = animate ? (time * 9.2) % GRAIN_TILE_SIZE : 0;

  ctx.save();
  ctx.globalCompositeOperation = 'soft-light';
  ctx.globalAlpha = animate ? 0.095 : 0.075;
  ctx.translate(-shiftX, -shiftY);
  ctx.fillStyle = pattern;
  ctx.fillRect(shiftX, shiftY, width + GRAIN_TILE_SIZE, height + GRAIN_TILE_SIZE);
  ctx.restore();
}

export default function HomepageV2HeroAmbient({ animate }: { animate: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let grainPattern: CanvasPattern | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grainPattern = createFilmGrainPattern(ctx);
    };

    const draw = (timestampMs: number) => {
      const time = timestampMs / 1000;
      const shouldAnimate = animate && !prefersReducedMotion;
      ctx.clearRect(0, 0, width, height);
      drawAmbientWash(ctx, width, height, time, shouldAnimate);

      for (const orb of ORBS) {
        drawAmbientOrb(ctx, width, height, orb, time, shouldAnimate);
      }

      drawFilmGrain(ctx, grainPattern, width, height, time, shouldAnimate);
    };

    const loop = (timestampMs: number) => {
      draw(timestampMs);
      if (animate && !prefersReducedMotion) {
        rafId = window.requestAnimationFrame(loop);
      } else {
        rafId = 0;
      }
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (animate && !prefersReducedMotion) {
        rafId = window.requestAnimationFrame(loop);
      } else {
        draw(performance.now());
      }
    };

    resize();
    draw(performance.now());

    if (animate && !prefersReducedMotion) {
      rafId = window.requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
    />
  );
}
