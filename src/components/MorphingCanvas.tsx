import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * MorphingCanvas — renders a canvas-driven morphing portrait cycle.
 *
 * 120 frames across 5 transitions (1→2, 2→3, 3→4, 4→5, 5→1), 24 frames each.
 * Automatically advances to the next state every `intervalMs` milliseconds
 * with a buttery-smooth ~2 s morph animation.
 */

const FRAMES_PER_TRANSITION = 24;
const TOTAL_STATES = 5;
const TOTAL_FRAMES = FRAMES_PER_TRANSITION * TOTAL_STATES; // 120

// Build paths for all 120 frames
function buildFramePaths(): string[] {
    const transitions = ['1-2', '2-3', '3-4', '4-5', '5-1'];
    const paths: string[] = [];
    for (const tr of transitions) {
        for (let i = 0; i < FRAMES_PER_TRANSITION; i++) {
            paths.push(`/morphing/${tr}/${tr}${i.toString().padStart(2, '0')}.jpg`);
        }
    }
    return paths;
}

const framePaths = buildFramePaths();

// Map a floating-point "state" value (1..6 wrapping to 1) into a frame index
function stateToFrameIndex(state: number): number {
    const t = (state - 1) / TOTAL_STATES; // 0..1
    return Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(t * (TOTAL_FRAMES - 1))));
}

// Smooth ease-in-out (quintic) for extra buttery transitions
function easeInOutQuint(t: number): number {
    return t < 0.5
        ? 16 * t * t * t * t * t
        : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

interface MorphingCanvasProps {
    /** Canvas render width. Default 720 */
    width?: number;
    /** Canvas render height. Default 720 */
    height?: number;
    /** Milliseconds between auto-transitions. Default 5000 */
    intervalMs?: number;
    /** Morph animation duration in ms. Default 2000 */
    morphDurationMs?: number;
    /** Extra className on the wrapper */
    className?: string;
}

export default function MorphingCanvas({
    width = 720,
    height = 720,
    intervalMs = 5000,
    morphDurationMs = 2000,
    className = '',
}: MorphingCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const animationRef = useRef<number | null>(null);
    const autoTimerRef = useRef<number | null>(null);

    // progress value: 1 → 2 → 3 → 4 → 5 → (back to 1 via 6 wrapping)
    const progressRef = useRef(1);
    const startValueRef = useRef(1);
    const targetValueRef = useRef(1);
    const startTimeRef = useRef<number | null>(null);
    const currentFrameRef = useRef(-1);
    const currentStateRef = useRef(1);

    // Draw a specific frame index onto the canvas
    const drawFrame = useCallback((index: number) => {
        if (index === currentFrameRef.current) return;
        currentFrameRef.current = index;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const img = imagesRef.current[index];
        if (!img) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }, []);

    // Continuous render loop
    const renderLoop = useCallback(() => {
        const index = stateToFrameIndex(progressRef.current);
        drawFrame(index);
        animationRef.current = requestAnimationFrame(renderLoop);
    }, [drawFrame]);

    // Shortest-path helper for circular state ring 1-5
    const shortestPath = useCallback((start: number, end: number) => {
        const direct = end - start;
        const throughTop = end + 5 - start;
        const throughBottom = end - (start + 5);
        const diffs = [direct, throughTop, throughBottom];
        const absDiffs = diffs.map(Math.abs);
        const min = Math.min(...absDiffs);
        return diffs[absDiffs.indexOf(min)];
    }, []);

    // Animate from current progress to target over morphDurationMs
    const animateTo = useCallback(
        (target: number) => {
            startTimeRef.current = null;
            startValueRef.current = progressRef.current;
            targetValueRef.current = target;

            const step = (timestamp: number) => {
                if (startTimeRef.current === null) startTimeRef.current = timestamp;
                const elapsed = timestamp - startTimeRef.current;

                if (elapsed < morphDurationMs) {
                    const t = elapsed / morphDurationMs;
                    const eased = easeInOutQuint(t);
                    const diff = shortestPath(startValueRef.current, targetValueRef.current);
                    let val = startValueRef.current + diff * eased;
                    if (val > 6) val -= 5;
                    if (val < 1) val += 5;
                    progressRef.current = val;
                    requestAnimationFrame(step);
                } else {
                    // Land exactly on the target
                    progressRef.current = target > 5 ? target - 5 : target;
                }
            };
            requestAnimationFrame(step);
        },
        [shortestPath, morphDurationMs],
    );

    // Preload all images
    useEffect(() => {
        let cancelled = false;
        const promises = framePaths.map(
            (src) =>
                new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(img);
                }),
        );
        Promise.all(promises).then((imgs) => {
            if (cancelled) return;
            imagesRef.current = imgs;
            setLoaded(true);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    // Start render loop once loaded
    useEffect(() => {
        if (!loaded) return;
        animationRef.current = requestAnimationFrame(renderLoop);
        return () => {
            if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
        };
    }, [loaded, renderLoop]);

    // Auto-cycle: advance to next state every intervalMs
    useEffect(() => {
        if (!loaded) return;
        autoTimerRef.current = window.setInterval(() => {
            const next = currentStateRef.current >= TOTAL_STATES ? 1 : currentStateRef.current + 1;
            const target = currentStateRef.current === TOTAL_STATES ? 6 : next;
            animateTo(target);
            currentStateRef.current = next;
        }, intervalMs);
        return () => {
            if (autoTimerRef.current !== null) window.clearInterval(autoTimerRef.current);
        };
    }, [loaded, intervalMs, animateTo]);

    return (
        <div className={`morphing-canvas-wrapper ${className}`}>
            {!loaded && (
                <div className="morphing-canvas-loader">
                    <div className="morphing-canvas-loader-bar" />
                </div>
            )}
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: loaded ? 'block' : 'none',
                }}
            />
        </div>
    );
}
