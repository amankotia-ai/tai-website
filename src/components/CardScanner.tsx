import { type CSSProperties, useEffect, useRef } from 'react';
import './CardScanner.css';
import ScannerFeatures from './ScannerFeatures';

// Card images for the carousel
const cardImages = [
    "/mask1.png",
    "/mask2.png",
];

type CardScannerProps = {
    includeFeatures?: boolean;
    fullBleed?: boolean;
    startFromMiddle?: boolean;
    size?: 'default' | 'large' | 'hero';
    scannerPosition?: number;
    enableWebGLShine?: boolean;
};

type ShineRenderer = {
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    quadBuffer: WebGLBuffer;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
    uniforms: {
        resolution: WebGLUniformLocation | null;
        time: WebGLUniformLocation | null;
        shift: WebGLUniformLocation | null;
        velocity: WebGLUniformLocation | null;
        intensity: WebGLUniformLocation | null;
    };
};

const shineVertexShaderSource = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = (aPosition + 1.0) * 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const shineFragmentShaderSource = `
precision mediump float;

varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform float uShift;
uniform float uVelocity;
uniform float uIntensity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float wrappedDistance(float a, float b) {
  float d = abs(a - b);
  return min(d, 1.0 - d);
}

void main() {
  vec2 uv = vUv;
  float aspect = max(uResolution.x / max(uResolution.y, 1.0), 1.0);
  float velocityBoost = 1.0 + uVelocity * 0.95;

  float sweepBase = fract(uShift * 1.22 + sin(uTime * 0.085) * 0.025);
  float diag = uv.x * 1.08 - uv.y * 0.32;

  float centerA = fract(sweepBase + 0.08);
  float centerB = fract(sweepBase + 0.30);
  float centerC = fract(sweepBase + 0.55);

  float distA = wrappedDistance(diag, centerA);
  float distB = wrappedDistance(diag, centerB);
  float distC = wrappedDistance(diag, centerC);

  float bandA = exp(-pow(distA * (21.0 - uVelocity * 5.0), 2.0));
  float bandB = exp(-pow(distB * 9.6, 2.0));
  float bandC = exp(-pow(distC * 5.3, 2.0));

  float grain = noise(vec2(uv.x * aspect * 18.0 + uTime * 0.03, uv.y * 18.0 - uTime * 0.06));
  float shimmer = 0.92 + 0.08 * sin((uv.x + uv.y * 0.8 + uTime * 0.34) * 16.0);

  vec3 cool = vec3(0.62, 0.86, 1.0);
  vec3 warm = vec3(1.0, 0.91, 0.84);
  vec3 accent = vec3(0.78, 0.93, 1.0);
  vec3 tone = mix(cool, warm, smoothstep(0.18, 0.88, uv.y));
  tone = mix(tone, accent, bandB * 0.42);

  float centerFalloff = 1.0 - smoothstep(0.0, 0.9, abs(uv.x - 0.5) * 1.58);
  float verticalFade = smoothstep(0.0, 0.14, uv.y) * smoothstep(0.0, 0.14, 1.0 - uv.y);
  float alpha = (bandA * 0.68 + bandB * 0.34 + bandC * 0.2) * centerFalloff * verticalFade;
  alpha *= (0.9 + grain * 0.1) * shimmer * uIntensity * velocityBoost;

  gl_FragColor = vec4(tone * alpha * 2.35, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createShineRenderer(gl: WebGLRenderingContext): ShineRenderer | null {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, shineVertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, shineFragmentShaderSource);
    if (!vertexShader || !fragmentShader) {
        if (vertexShader) gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);
        return null;
    }

    const program = gl.createProgram();
    if (!program) {
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }

    const quadBuffer = gl.createBuffer();
    if (!quadBuffer) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1,
        ]),
        gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    if (positionLocation < 0) {
        gl.deleteBuffer(quadBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0);

    return {
        gl,
        program,
        quadBuffer,
        vertexShader,
        fragmentShader,
        uniforms: {
            resolution: gl.getUniformLocation(program, 'uResolution'),
            time: gl.getUniformLocation(program, 'uTime'),
            shift: gl.getUniformLocation(program, 'uShift'),
            velocity: gl.getUniformLocation(program, 'uVelocity'),
            intensity: gl.getUniformLocation(program, 'uIntensity'),
        },
    };
}

export default function CardScanner({
    includeFeatures = true,
    fullBleed = false,
    startFromMiddle = false,
    size = 'default',
    scannerPosition = 0.5,
    enableWebGLShine = false,
}: CardScannerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardLineRef = useRef<HTMLDivElement>(null);
    const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
    const shineCanvasRef = useRef<HTMLCanvasElement>(null);
    const shineRendererRef = useRef<ShineRenderer | null>(null);
    const animationRef = useRef<number | null>(null);
    const positionRef = useRef(0);
    const velocityRef = useRef(80);
    const prevShineShiftRef = useRef(0);
    const lastTimeRef = useRef(0);
    const cardLineWidthRef = useRef(0);
    const containerWidthRef = useRef(0);
    const streamDurationMs = 2200;
    const streamResetOffset = 180;

    // Generate pseudo-code lines for the ASCII overlay
    const generateCode = (width: number, height: number): string[] => {
        const header = [
            "// AI ANALYSIS PROTOCOL v9.2 -- START SCAN",
            "const detectFeatures = (input_tensor) => {",
            "  const edges = input.SobelFilter(KERNEL_3M);",
            "  if (edges.contrast > 0.85) return true;",
            "  // Analyzing frequency domain...",
            "  return fft.transform(input_tensor);",
            "};",
            "> DETECTING SYNTHETIC ARTIFACTS...",
            "  - pixel_grid_alignment: MATCH (0.999)",
            "  - chromatic_aberration: SYNTHETIC",
            "  - noise_pattern: GAUSSIAN_UNIFORM",
            "> COMPARING LATENT VECTORS...",
            "  [0x4F, 0x1A, 0x9C, ... ] MATCH FOUND",
            "  Confidence Score: 0.99982",
            "// GENERATIVE SIGNATURE CONFIRMED",
            "class NeuralScanner extends Model {",
            "  constructor(weights) { super(weights); }",
            "  async scan() { await this.tensorFlow(); }",
            "}",
            "> SCAN COMPLETE. ASSET VERIFIED.",
        ];

        const result: string[] = [];
        for (let row = 0; row < height; row++) {
            const line = header[row % header.length];
            result.push(line.padEnd(width, ' ').substring(0, width));
        }
        return result;
    };

    useEffect(() => {
        const container = containerRef.current;
        const cardLine = cardLineRef.current;
        const scannerCanvas = scannerCanvasRef.current;
        const shineCanvas = shineCanvasRef.current;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!container || !cardLine || !scannerCanvas) return;

        const ctx = scannerCanvas.getContext('2d');
        if (!ctx) return;

        // Setup scanner canvas
        const setupCanvas = () => {
            const rect = container.getBoundingClientRect();
            const stream = container.querySelector('.card-stream') as HTMLDivElement | null;
            const streamHeight = stream?.getBoundingClientRect().height ?? 300;
            scannerCanvas.width = rect.width;
            scannerCanvas.height = streamHeight;
            scannerCanvas.style.width = rect.width + 'px';
            scannerCanvas.style.height = streamHeight + 'px';

            if (enableWebGLShine && !prefersReducedMotion && shineCanvas) {
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                const width = Math.max(1, Math.floor(rect.width * dpr));
                const height = Math.max(1, Math.floor(streamHeight * dpr));
                shineCanvas.width = width;
                shineCanvas.height = height;
                shineCanvas.style.width = `${rect.width}px`;
                shineCanvas.style.height = `${streamHeight}px`;
                const shineRenderer = shineRendererRef.current;
                if (shineRenderer) {
                    shineRenderer.gl.viewport(0, 0, width, height);
                }
            }
        };

        setupCanvas();

        if (enableWebGLShine && !prefersReducedMotion && shineCanvas) {
            const gl = shineCanvas.getContext('webgl', {
                alpha: true,
                antialias: true,
                premultipliedAlpha: true,
                powerPreference: 'low-power',
            });

            if (gl) {
                shineRendererRef.current = createShineRenderer(gl);
            }
        }

        const updateDimensions = () => {
            const firstCard = cardLine.querySelector('.card-wrapper') as HTMLDivElement | null;
            const computed = window.getComputedStyle(cardLine);
            const cardGap = Number.parseFloat(computed.gap || '60') || 60;
            const cardWidth = firstCard?.getBoundingClientRect().width ?? 400;
            const cardCount = cardLine.children.length;

            cardLineWidthRef.current = (cardWidth + cardGap) * cardCount;
            containerWidthRef.current = container.offsetWidth;
        };

        updateDimensions();

        // Start position
        positionRef.current = startFromMiddle
            ? -(cardLineWidthRef.current * 0.5)
            : containerWidthRef.current;
        prevShineShiftRef.current = 0;

        const streamTimeouts = new Map<HTMLElement, number>();

        const clearStreamTimeout = (wrapper: HTMLElement) => {
            const timeoutId = streamTimeouts.get(wrapper);
            if (timeoutId) {
                window.clearTimeout(timeoutId);
                streamTimeouts.delete(wrapper);
            }
        };

        const startStreaming = (wrapper: HTMLElement, asciiContent: HTMLElement) => {
            wrapper.dataset.streamState = 'streaming';
            clearStreamTimeout(wrapper);

            asciiContent.classList.remove('is-complete');
            asciiContent.classList.remove('is-streaming');
            void asciiContent.offsetWidth;
            asciiContent.classList.add('is-streaming');

            const timeoutId = window.setTimeout(() => {
                wrapper.dataset.streamState = 'done';
                asciiContent.classList.remove('is-streaming');
                asciiContent.classList.add('is-complete');
                streamTimeouts.delete(wrapper);
            }, streamDurationMs);

            streamTimeouts.set(wrapper, timeoutId);
        };

        const resetStreaming = (wrapper: HTMLElement, asciiContent: HTMLElement) => {
            clearStreamTimeout(wrapper);
            wrapper.dataset.streamState = 'idle';
            asciiContent.classList.remove('is-streaming');
            asciiContent.classList.remove('is-complete');
        };

        // Update card clipping based on scanner position
        const updateCardClipping = () => {
            const rect = container.getBoundingClientRect();
            const scannerX = rect.left + rect.width * Math.min(Math.max(scannerPosition, 0.05), 0.95);
            const scannerWidth = 8;
            const scannerLeft = scannerX - scannerWidth / 2;
            const scannerRight = scannerX + scannerWidth / 2;

            const cardWrappers = cardLine.querySelectorAll('.card-wrapper');
            cardWrappers.forEach((wrapper) => {
                const wrapperEl = wrapper as HTMLElement;
                const wrapperRect = wrapper.getBoundingClientRect();
                const cardLeft = wrapperRect.left;
                const cardRight = wrapperRect.right;
                const cardW = wrapperRect.width;

                const normalCard = wrapper.querySelector('.card-normal') as HTMLElement;
                const asciiCard = wrapper.querySelector('.card-ascii') as HTMLElement;
                const asciiContent = wrapper.querySelector('.ascii-content') as HTMLElement;

                if (!normalCard || !asciiCard || !asciiContent) return;
                if (!wrapperEl.dataset.streamState) {
                    wrapperEl.dataset.streamState = 'idle';
                }

                if (cardLeft < scannerRight && cardRight > scannerLeft) {
                    const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
                    const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardW);

                    const normalClipRight = (scannerIntersectLeft / cardW) * 100;
                    const asciiClipLeft = (scannerIntersectRight / cardW) * 100;

                    normalCard.style.setProperty('--clip-right', `${normalClipRight}%`);
                    asciiCard.style.setProperty('--clip-left', `${asciiClipLeft}%`);

                    if (wrapperEl.dataset.streamState === 'idle') {
                        startStreaming(wrapperEl, asciiContent);
                    }
                } else {
                    if (cardRight < scannerLeft) {
                        normalCard.style.setProperty('--clip-right', '100%');
                        asciiCard.style.setProperty('--clip-left', '100%');
                    } else if (cardLeft > scannerRight) {
                        normalCard.style.setProperty('--clip-right', '0%');
                        asciiCard.style.setProperty('--clip-left', '0%');
                    }

                    if (cardRight < scannerLeft - streamResetOffset && wrapperEl.dataset.streamState !== 'idle') {
                        resetStreaming(wrapperEl, asciiContent);
                    }
                }
            });
        };

        // Draw the scanner light bar
        const drawLightBar = () => {
            if (!ctx) return;

            const w = scannerCanvas.width;
            const h = scannerCanvas.height;
            const verticalInset = size === 'hero' ? -14 : 0;
            const drawY = verticalInset;
            const drawH = Math.max(h - verticalInset * 2, 1);
            const fadeZone = Math.min(72, drawH * 0.45);
            const lightBarX = w * Math.min(Math.max(scannerPosition, 0.05), 0.95);
            const lightBarWidth = 3;

            ctx.clearRect(0, 0, w, h);

            // Vertical fade gradient
            const verticalGradient = ctx.createLinearGradient(0, drawY, 0, drawY + drawH);
            verticalGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            verticalGradient.addColorStop(fadeZone / drawH, 'rgba(255, 255, 255, 1)');
            verticalGradient.addColorStop(1 - fadeZone / drawH, 'rgba(255, 255, 255, 1)');
            verticalGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.globalCompositeOperation = 'lighter';

            // Core gradient
            const coreGradient = ctx.createLinearGradient(
                lightBarX - lightBarWidth / 2, 0,
                lightBarX + lightBarWidth / 2, 0
            );
            coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            coreGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
            coreGradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
            coreGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.9)');
            coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.globalAlpha = 1;
            ctx.fillStyle = coreGradient;
            ctx.beginPath();
            ctx.roundRect(lightBarX - lightBarWidth / 2, drawY, lightBarWidth, drawH, 15);
            ctx.fill();

            // Glow 1
            const glow1Gradient = ctx.createLinearGradient(
                lightBarX - lightBarWidth * 2, 0,
                lightBarX + lightBarWidth * 2, 0
            );
            glow1Gradient.addColorStop(0, 'rgba(21, 159, 250, 0)');
            glow1Gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.8)');
            glow1Gradient.addColorStop(1, 'rgba(21, 159, 250, 0)');

            ctx.globalAlpha = 0.8;
            ctx.fillStyle = glow1Gradient;
            ctx.beginPath();
            ctx.roundRect(lightBarX - lightBarWidth * 2, drawY, lightBarWidth * 4, drawH, 25);
            ctx.fill();

            // Glow 2
            const glow2Gradient = ctx.createLinearGradient(
                lightBarX - lightBarWidth * 4, 0,
                lightBarX + lightBarWidth * 4, 0
            );
            glow2Gradient.addColorStop(0, 'rgba(21, 159, 250, 0)');
            glow2Gradient.addColorStop(0.5, 'rgba(21, 159, 250, 0.4)');
            glow2Gradient.addColorStop(1, 'rgba(21, 159, 250, 0)');

            ctx.globalAlpha = 0.6;
            ctx.fillStyle = glow2Gradient;
            ctx.beginPath();
            ctx.roundRect(lightBarX - lightBarWidth * 4, drawY, lightBarWidth * 8, drawH, 35);
            ctx.fill();

            // Apply vertical fade mask
            ctx.globalCompositeOperation = 'destination-in';
            ctx.globalAlpha = 1;
            ctx.fillStyle = verticalGradient;
            ctx.fillRect(0, drawY, w, drawH);
        };

        // Draw the shader-driven shine overlay
        const drawShine = (currentTime: number) => {
            if (!enableWebGLShine || prefersReducedMotion) return;

            const shineRenderer = shineRendererRef.current;
            if (!shineRenderer) return;

            const travelDistance = cardLineWidthRef.current + containerWidthRef.current;
            const normalizedShift = travelDistance > 0
                ? (((-positionRef.current % travelDistance) + travelDistance) % travelDistance) / travelDistance
                : 0;
            const rawDelta = Math.abs(normalizedShift - prevShineShiftRef.current);
            const wrappedDelta = Math.min(rawDelta, 1 - rawDelta);
            const velocityPulse = Math.min(1, wrappedDelta * 48);
            const shineIntensity = size === 'hero' ? 0.9 : 0.68;
            prevShineShiftRef.current = normalizedShift;

            shineRenderer.gl.useProgram(shineRenderer.program);
            shineRenderer.gl.bindBuffer(shineRenderer.gl.ARRAY_BUFFER, shineRenderer.quadBuffer);
            shineRenderer.gl.clear(shineRenderer.gl.COLOR_BUFFER_BIT);
            shineRenderer.gl.uniform2f(
                shineRenderer.uniforms.resolution,
                shineRenderer.gl.canvas.width,
                shineRenderer.gl.canvas.height,
            );
            shineRenderer.gl.uniform1f(shineRenderer.uniforms.time, currentTime * 0.001);
            shineRenderer.gl.uniform1f(shineRenderer.uniforms.shift, normalizedShift);
            shineRenderer.gl.uniform1f(shineRenderer.uniforms.velocity, velocityPulse);
            shineRenderer.gl.uniform1f(shineRenderer.uniforms.intensity, shineIntensity);
            shineRenderer.gl.drawArrays(shineRenderer.gl.TRIANGLE_STRIP, 0, 4);
        };

        // Animation loop
        const animate = (currentTime: number) => {
            const deltaTime = (currentTime - lastTimeRef.current) / 1000;
            lastTimeRef.current = currentTime;

            // Update position
            positionRef.current -= velocityRef.current * deltaTime;

            // Loop the cards
            if (positionRef.current < -cardLineWidthRef.current) {
                positionRef.current = containerWidthRef.current;
            }

            // Apply transform
            cardLine.style.transform = `translateX(${positionRef.current}px)`;

            // Update clipping and draw
            updateCardClipping();
            drawLightBar();
            drawShine(currentTime);

            animationRef.current = requestAnimationFrame(animate);
        };

        // Start animation
        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);

        // Handle resize
        const handleResize = () => {
            setupCanvas();
            updateDimensions();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            streamTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
            window.removeEventListener('resize', handleResize);
            const shineRenderer = shineRendererRef.current;
            if (shineRenderer) {
                shineRenderer.gl.deleteBuffer(shineRenderer.quadBuffer);
                shineRenderer.gl.deleteProgram(shineRenderer.program);
                shineRenderer.gl.deleteShader(shineRenderer.vertexShader);
                shineRenderer.gl.deleteShader(shineRenderer.fragmentShader);
                shineRendererRef.current = null;
            }
        };
    }, [enableWebGLShine, scannerPosition, startFromMiddle, size]);

    // Generate ASCII content for cards
    const asciiLines = generateCode(67, 19);

    return (
        <div
            className={`card-scanner-container ${fullBleed ? 'card-scanner-full-bleed' : ''} ${size === 'large' ? 'card-scanner-large' : ''} ${size === 'hero' ? 'card-scanner-hero' : ''}`}
            ref={containerRef}
        >
            <canvas className="scanner-canvas" ref={scannerCanvasRef}></canvas>
            {enableWebGLShine ? <canvas className="scanner-shine-canvas" ref={shineCanvasRef}></canvas> : null}

            <div className="card-stream">
                <div className="card-line" ref={cardLineRef}>
                    {[...Array(30)].map((_, index) => (
                        <div className="card-wrapper" key={index}>
                            <div className="card card-normal">
                                <img
                                    className="card-image"
                                    src={cardImages[index % cardImages.length]}
                                    alt={`Card ${index + 1}`}
                                />
                            </div>
                            <div className="card card-ascii">
                                <div className="ascii-content">
                                    {asciiLines.map((line, lineIndex) => (
                                        <span
                                            key={`${index}-line-${lineIndex}`}
                                            className="ascii-line"
                                            style={{ '--line-delay': `${lineIndex * 72}ms` } as CSSProperties}
                                        >
                                            {line}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {includeFeatures ? <ScannerFeatures /> : null}
        </div>
    );
}
