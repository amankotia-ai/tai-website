import { useRef, useEffect } from 'react';

/**
 * Smooth, undulating silk-like aurora wave ribbons.
 * Renders on a 2D canvas with sine-based wave forms and layered opacity.
 */

const WAVE_COUNT = 5;

interface WaveConfig {
    amplitude: number;
    frequency: number;
    speed: number;
    yOffset: number;      // 0–1 of canvas height
    thickness: number;
    color: [number, number, number];
    opacity: number;
}

const WAVE_CONFIGS: WaveConfig[] = [
    { amplitude: 40, frequency: 0.003, speed: 0.4, yOffset: 0.35, thickness: 120, color: [255, 60, 60], opacity: 0.04 },
    { amplitude: 55, frequency: 0.002, speed: 0.25, yOffset: 0.45, thickness: 160, color: [21, 159, 250], opacity: 0.045 },
    { amplitude: 35, frequency: 0.004, speed: 0.55, yOffset: 0.55, thickness: 100, color: [160, 120, 220], opacity: 0.035 },
    { amplitude: 60, frequency: 0.0015, speed: 0.3, yOffset: 0.65, thickness: 180, color: [255, 100, 80], opacity: 0.03 },
    { amplitude: 45, frequency: 0.0025, speed: 0.35, yOffset: 0.25, thickness: 140, color: [80, 140, 255], opacity: 0.04 },
];

export default function AuroraWavesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = 0, h = 0;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio, 2);
            w = canvas!.clientWidth * dpr;
            h = canvas!.clientHeight * dpr;
            canvas!.width = w;
            canvas!.height = h;
        }
        resize();
        window.addEventListener('resize', resize);

        let time = 0;

        function drawWave(config: WaveConfig) {
            const { amplitude, frequency, speed, yOffset, thickness, color, opacity } = config;
            const baseY = h * yOffset;
            const amp = amplitude * (h / 600); // scale with viewport

            ctx!.beginPath();
            ctx!.moveTo(0, h);

            // draw bottom edge of wave
            for (let x = 0; x <= w; x += 3) {
                const y = baseY
                    + Math.sin(x * frequency + time * speed) * amp
                    + Math.sin(x * frequency * 1.8 + time * speed * 0.7 + 2) * amp * 0.4
                    + Math.cos(x * frequency * 0.5 + time * speed * 1.2) * amp * 0.3;
                if (x === 0) {
                    ctx!.moveTo(x, y);
                } else {
                    ctx!.lineTo(x, y);
                }
            }

            // close path by sweeping back along top of wave (offset by thickness)
            for (let x = w; x >= 0; x -= 3) {
                const y = baseY - thickness * (h / 600)
                    + Math.sin(x * frequency + time * speed + 1) * amp * 0.8
                    + Math.sin(x * frequency * 1.5 + time * speed * 0.5 + 3) * amp * 0.3
                    + Math.cos(x * frequency * 0.7 + time * speed * 0.9 + 1) * amp * 0.2;
                ctx!.lineTo(x, y);
            }

            ctx!.closePath();

            // gradient fill
            const grad = ctx!.createLinearGradient(0, baseY - thickness, 0, baseY + amplitude);
            grad.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
            grad.addColorStop(0.3, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`);
            grad.addColorStop(0.7, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity * 0.8})`);
            grad.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

            ctx!.fillStyle = grad;
            ctx!.fill();
        }

        function render() {
            time += 0.012;
            ctx!.clearRect(0, 0, w, h);

            for (let i = 0; i < WAVE_COUNT; i++) {
                drawWave(WAVE_CONFIGS[i]);
            }

            animRef.current = requestAnimationFrame(render);
        }

        animRef.current = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
}
