import { useRef, useEffect } from 'react';

interface Orb {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    r: number;
    g: number;
    b: number;
    opacity: number;
    phaseOffset: number;
}

/* Red and blue brand orbs */
const ORB_PALETTE: [number, number, number][] = [
    [255, 30, 20],     // brand red
    [30, 140, 255],    // brand blue
    [255, 60, 50],     // softer red
    [50, 120, 240],    // mid blue
    [220, 40, 35],     // deep red
    [30, 160, 255],    // sky blue
];

function createOrbs(count: number, w: number, h: number): Orb[] {
    return Array.from({ length: count }, (_, i) => {
        const color = ORB_PALETTE[i % ORB_PALETTE.length];
        return {
            x: (Math.random() * 0.8 + 0.1) * w,
            y: (Math.random() * 0.8 + 0.1) * h,
            radius: 200 + Math.random() * 350,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.2,
            r: color[0],
            g: color[1],
            b: color[2],
            opacity: 0.35 + Math.random() * 0.2,
            phaseOffset: Math.random() * Math.PI * 2,
        };
    });
}

export default function FloatingOrbsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const orbsRef = useRef<Orb[]>([]);

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
            // Re-create orbs on resize to fit new dimensions
            orbsRef.current = createOrbs(8, w, h);
        }
        resize();
        window.addEventListener('resize', resize);

        let time = 0;

        function render() {
            time += 0.005;
            ctx!.clearRect(0, 0, w, h);

            for (const orb of orbsRef.current) {
                // gentle drift
                orb.x += orb.vx;
                orb.y += orb.vy;

                // breathing scale
                const breathe = 1 + Math.sin(time * 0.5 + orb.phaseOffset) * 0.1;
                const r = orb.radius * breathe;

                // wrap around with padding
                if (orb.x - r > w + 100) orb.x = -r;
                if (orb.x + r < -100) orb.x = w + r;
                if (orb.y - r > h + 100) orb.y = -r;
                if (orb.y + r < -100) orb.y = h + r;

                // draw radial gradient orb
                const gradient = ctx!.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
                gradient.addColorStop(0, `rgba(${orb.r}, ${orb.g}, ${orb.b}, ${orb.opacity})`);
                gradient.addColorStop(0.35, `rgba(${orb.r}, ${orb.g}, ${orb.b}, ${orb.opacity * 0.6})`);
                gradient.addColorStop(0.65, `rgba(${orb.r}, ${orb.g}, ${orb.b}, ${orb.opacity * 0.25})`);
                gradient.addColorStop(1, `rgba(${orb.r}, ${orb.g}, ${orb.b}, 0)`);

                ctx!.fillStyle = gradient;
                ctx!.beginPath();
                ctx!.arc(orb.x, orb.y, r, 0, Math.PI * 2);
                ctx!.fill();
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
                filter: 'blur(60px)',
            }}
        />
    );
}
