import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 3.2;
const BOUNDS = { x: 12, y: 6, z: 3 };

/* ─── Particle system rendered inside R3F ─── */
function Particles() {
    const pointsRef = useRef<THREE.Points>(null!);
    const linesRef = useRef<THREE.LineSegments>(null!);
    const velocities = useRef<Float32Array>(null!);
    const mouse = useRef({ x: 0, y: 0 });

    /* seed positions + velocities once */
    const positions = useMemo(() => {
        const arr = new Float32Array(PARTICLE_COUNT * 3);
        const vel = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            arr[i * 3] = (Math.random() - 0.5) * BOUNDS.x * 2;
            arr[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS.y * 2;
            arr[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS.z * 2;
            vel[i * 3] = (Math.random() - 0.5) * 0.006;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
        }
        velocities.current = vel;
        return arr;
    }, []);

    /* line buffer — max possible edges */
    const maxLines = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
    const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

    /* track mouse for subtle parallax */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handler, { passive: true });
        return () => window.removeEventListener('mousemove', handler);
    }, []);

    /* per-frame update */
    useFrame((_state, delta) => {
        const pts = pointsRef.current;
        const lines = linesRef.current;
        if (!pts || !lines) return;

        const pos = pts.geometry.attributes.position.array as Float32Array;
        const vel = velocities.current;
        const clampedDelta = Math.min(delta, 0.05); // avoid jumps on tab-switch

        /* move particles */
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const ix = i * 3;
            pos[ix] += vel[ix] * clampedDelta * 60;
            pos[ix + 1] += vel[ix + 1] * clampedDelta * 60;
            pos[ix + 2] += vel[ix + 2] * clampedDelta * 60;

            /* wrap around bounds */
            if (pos[ix] > BOUNDS.x) pos[ix] = -BOUNDS.x;
            if (pos[ix] < -BOUNDS.x) pos[ix] = BOUNDS.x;
            if (pos[ix + 1] > BOUNDS.y) pos[ix + 1] = -BOUNDS.y;
            if (pos[ix + 1] < -BOUNDS.y) pos[ix + 1] = BOUNDS.y;
            if (pos[ix + 2] > BOUNDS.z) pos[ix + 2] = -BOUNDS.z;
            if (pos[ix + 2] < -BOUNDS.z) pos[ix + 2] = BOUNDS.z;
        }
        pts.geometry.attributes.position.needsUpdate = true;

        /* build connection lines */
        let lineIdx = 0;
        const lp = lines.geometry.attributes.position.array as Float32Array;
        const lc = lines.geometry.attributes.color.array as Float32Array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const dx = pos[i * 3] - pos[j * 3];
                const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < CONNECTION_DISTANCE) {
                    const alpha = 1 - dist / CONNECTION_DISTANCE;
                    const o = lineIdx * 6;
                    lp[o] = pos[i * 3];
                    lp[o + 1] = pos[i * 3 + 1];
                    lp[o + 2] = pos[i * 3 + 2];
                    lp[o + 3] = pos[j * 3];
                    lp[o + 4] = pos[j * 3 + 1];
                    lp[o + 5] = pos[j * 3 + 2];

                    /* warm-gray with hint of brand red for some lines */
                    const isAccent = (i + j) % 7 === 0;
                    const r = isAccent ? 0.92 : 0.62;
                    const g = isAccent ? 0.55 : 0.62;
                    const b = isAccent ? 0.55 : 0.68;

                    /* fade via vertex color — stronger visibility */
                    const fade = alpha * 0.85;
                    lc[o] = 1 - (1 - r) * fade;
                    lc[o + 1] = 1 - (1 - g) * fade;
                    lc[o + 2] = 1 - (1 - b) * fade;
                    lc[o + 3] = 1 - (1 - r) * fade;
                    lc[o + 4] = 1 - (1 - g) * fade;
                    lc[o + 5] = 1 - (1 - b) * fade;

                    lineIdx++;
                }
            }
        }

        /* clear remaining line vertices */
        for (let k = lineIdx * 6; k < lp.length; k++) {
            lp[k] = 0;
        }

        lines.geometry.attributes.position.needsUpdate = true;
        lines.geometry.attributes.color.needsUpdate = true;
        lines.geometry.setDrawRange(0, lineIdx * 2);

        /* subtle parallax tilt from mouse */
        const targetRotY = mouse.current.x * 0.06;
        const targetRotX = mouse.current.y * 0.04;
        pts.rotation.y += (targetRotY - pts.rotation.y) * 0.02;
        pts.rotation.x += (targetRotX - pts.rotation.x) * 0.02;
        lines.rotation.y = pts.rotation.y;
        lines.rotation.x = pts.rotation.x;
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={PARTICLE_COUNT}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.065}
                    color="#999999"
                    transparent
                    opacity={0.85}
                    sizeAttenuation
                    depthWrite={false}
                />
            </points>

            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={maxLines * 2}
                        array={linePositions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={maxLines * 2}
                        array={lineColors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.75} depthWrite={false} />
            </lineSegments>
        </>
    );
}

/* ─── Wrapper component ─── */
export default function ParticleMeshBackground() {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 30 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Particles />
            </Canvas>
        </div>
    );
}
