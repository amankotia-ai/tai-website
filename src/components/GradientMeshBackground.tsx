import { useRef, useEffect } from 'react';

/* ─── Simplex noise helpers (compact) ─── */
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
const grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];

function buildPerm() {
    const p: number[] = [];
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [p[i], p[j]] = [p[j], p[i]];
    }
    const perm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    return perm;
}

function simplex2D(perm: Uint8Array, xin: number, yin: number) {
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = perm[ii + perm[jj]] % 12;
    const gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
    const gi2 = perm[ii + 1 + perm[jj + 1]] % 12;
    let n0 = 0, n1 = 0, n2 = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * (grad3[gi0][0] * x0 + grad3[gi0][1] * y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * (grad3[gi1][0] * x1 + grad3[gi1][1] * y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * (grad3[gi2][0] * x2 + grad3[gi2][1] * y2); }
    return 70 * (n0 + n1 + n2);
}

/* ─── fractal Brownian motion for richer patterns ─── */
function fbm(perm: Uint8Array, x: number, y: number, octaves: number) {
    let value = 0;
    let amp = 0.5;
    let freq = 1;
    for (let i = 0; i < octaves; i++) {
        value += amp * simplex2D(perm, x * freq, y * freq);
        freq *= 2;
        amp *= 0.5;
    }
    return value;
}

/* ─── Color palette ─── */
type RGB = [number, number, number];

function lerpColor(a: RGB, b: RGB, t: number): RGB {
    return [
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t,
    ];
}

const COLOR_WHITE: RGB = [255, 255, 255];
const COLOR_PALE_BLUE: RGB = [200, 220, 255];  // stronger blue
const COLOR_PALE_CORAL: RGB = [255, 215, 210]; // stronger coral
const COLOR_SOFT_BLUE: RGB = [170, 200, 255];  // richer blue
const COLOR_SOFT_PINK: RGB = [255, 185, 175];  // richer pink/coral

export default function GradientMeshBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: false });
        if (!ctx) return;

        const perm = buildPerm();

        /* resolution scaling — render at lower res for perf then upscale */
        const SCALE = 4; // each "pixel" is SCALE×SCALE canvas pixels
        let w = 0;
        let h = 0;
        let sw = 0;
        let sh = 0;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio, 1.5);
            w = canvas!.clientWidth * dpr;
            h = canvas!.clientHeight * dpr;
            canvas!.width = w;
            canvas!.height = h;
            sw = Math.ceil(w / SCALE);
            sh = Math.ceil(h / SCALE);
        }
        resize();
        window.addEventListener('resize', resize);

        /* offscreen buffer for noise rendering */
        const offCanvas = document.createElement('canvas');
        const offCtx = offCanvas.getContext('2d')!;

        let time = 0;

        function render() {
            time += 0.003;

            offCanvas.width = sw;
            offCanvas.height = sh;
            const imgData = offCtx.createImageData(sw, sh);
            const data = imgData.data;

            for (let y = 0; y < sh; y++) {
                for (let x = 0; x < sw; x++) {
                    const nx = x / sw;
                    const ny = y / sh;

                    /* layered noise */
                    const n1 = fbm(perm, nx * 2.2 + time * 0.4, ny * 2.2 + time * 0.2, 3);
                    const n2 = fbm(perm, nx * 1.5 - time * 0.3 + 50, ny * 1.5 + time * 0.15 + 50, 3);
                    const n3 = fbm(perm, nx * 3.0 + time * 0.1 + 100, ny * 3.0 - time * 0.25 + 100, 2);

                    /* map noise to 0..1 */
                    const v1 = (n1 + 1) * 0.5;
                    const v2 = (n2 + 1) * 0.5;
                    const v3 = (n3 + 1) * 0.5;

                    /* blend colors based on noise layers */
                    let color: RGB;
                    const baseBlend = lerpColor(COLOR_PALE_BLUE, COLOR_PALE_CORAL, v1);
                    const accentBlend = lerpColor(COLOR_SOFT_BLUE, COLOR_SOFT_PINK, v2);
                    color = lerpColor(baseBlend, accentBlend, v3 * 0.45);

                    /* push toward white — less aggressive to keep color visible */
                    color = lerpColor(color, COLOR_WHITE, 0.3);

                    /* vignette — darken edges very slightly */
                    const cx = (nx - 0.5) * 2;
                    const cy = (ny - 0.5) * 2;
                    const vignette = 1 - (cx * cx + cy * cy) * 0.04;
                    color[0] *= vignette;
                    color[1] *= vignette;
                    color[2] *= vignette;

                    const idx = (y * sw + x) * 4;
                    data[idx] = Math.min(255, Math.max(0, color[0]));
                    data[idx + 1] = Math.min(255, Math.max(0, color[1]));
                    data[idx + 2] = Math.min(255, Math.max(0, color[2]));
                    data[idx + 3] = 255;
                }
            }

            offCtx.putImageData(imgData, 0, 0);

            /* draw upscaled to main canvas */
            ctx!.imageSmoothingEnabled = true;
            ctx!.imageSmoothingQuality = 'high';
            ctx!.drawImage(offCanvas, 0, 0, w, h);

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
