
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

#define MAX_STEPS 100
#define MAX_DIST 100.0
#define SURF_DIST 0.001

// Gyroid function for the SDF
float sdGyroid(vec3 p, float scale, float thickness, float bias) {
    p *= scale;
    return abs(dot(sin(p), cos(p.zxy)) - bias) / scale - thickness;
}

// Scene SDF
float GetDist(vec3 p) {
    // Rotating the domain slightly over time for flow
    float t = iTime * 0.1;
    
    // Twist effect
    // p.xy *= mat2(cos(p.z*0.1 + t), -sin(p.z*0.1 + t), sin(p.z*0.1 + t), cos(p.z*0.1 + t));

    // Base gyroid
    float g1 = sdGyroid(p, 5.0, 0.03, 0.0);
    
    // Secondary gyroid for detail
    float g2 = sdGyroid(p, 10.0, 0.03, 0.0);
    
    // Combine
    float d = max(g1, -g2*0.5); // Intersection-like
    
    // Add some noise/distortion based on time
    d += sin(p.x * 3.0 + iTime) * 0.02 * sin(p.y * 3.0 + iTime);
    
    return d * 0.7; // Dampen step size for stability
}

// Raymarching
float RayMarch(vec3 ro, vec3 rd) {
    float dO = 0.0;
    
    for(int i=0; i<MAX_STEPS; i++) {
        vec3 p = ro + rd * dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
    }
    
    return dO;
}

// Calculate Normal
vec3 GetNormal(vec3 p) {
    float d = GetDist(p);
    vec2 e = vec2(0.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx)
    );
    
    return normalize(n);
}

// Lighting and Color
vec3 GetColor(vec3 p, vec3 n, vec3 rd) {
    // Iridescence based on normal and view direction
    float fresnel = pow(1.0 + dot(rd, n), 2.0);
    
    vec3 col = vec3(0.0);
    
    // Color palette based on position
    vec3 baseCol = 0.5 + 0.5 * cos(iTime * 0.2 + p.xyx * 0.5 + vec3(0, 2, 4));
    
    // Lighting
    vec3 lightDir = normalize(vec3(1, 2, -3));
    float diff = max(dot(n, lightDir), 0.0);
    float spec = pow(max(dot(reflect(lightDir, n), rd), 0.0), 32.0);
    
    col += baseCol * diff;
    col += vec3(1.0) * spec; // Highlight
    
    // Rim light / Fresnel
    col += vec3(0.1, 0.5, 1.0) * fresnel * 2.0;

    // Fog
    float d = length(p); // Approximate fog distance
    col = mix(col, vec3(0.05, 0.05, 0.1), 1.0 - exp(-0.05 * d));
    
    return col;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    vec2 m = (iMouse.xy - 0.5 * iResolution.xy) / iResolution.y;

    // Camera setup
    vec3 ro = vec3(0, 0, -3.0 + iTime * 0.5); // Moving forward
    vec3 lookAt = ro + vec3(0, 0, 1);
    
    // Mouse rotation
    // ro.yz *= mat2(cos(-m.y), -sin(-m.y), sin(-m.y), cos(-m.y));
    // ro.xz *= mat2(cos(-m.x), -sin(-m.x), sin(-m.x), cos(-m.x));
    
    vec3 f = normalize(lookAt - ro);
    vec3 r = normalize(cross(vec3(0, 1, 0), f));
    vec3 u = cross(f, r);
    
    float zoom = 1.0;
    vec3 rd = normalize(f * zoom + r * uv.x + u * uv.y);

    // Raymarch
    float d = RayMarch(ro, rd);
    
    vec3 col = vec3(0.05, 0.05, 0.1); // Background color
    
    if(d < MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        col = GetColor(p, n, rd);
    }
    
    // Gamma correction
    col = pow(col, vec3(0.4545));
    
    fragColor = vec4(col, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const vertexShader = `
void main() {
    gl_Position = vec4( position, 1.0 );
}
`;

function ShaderMesh() {
    const mesh = useRef<THREE.Mesh>(null);
    const { size, viewport } = useThree();

    const uniforms = useMemo(
        () => ({
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector3(size.width, size.height, 1) },
            iMouse: { value: new THREE.Vector2() },
        }),
        []
    );

    useFrame((state) => {
        const { clock, pointer } = state;
        if (mesh.current) {
            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.iTime.value = clock.getElapsedTime();

            // Update resolution if resized (handled partially by key in parent, but good to have)
            material.uniforms.iResolution.value.set(state.size.width, state.size.height, 1);

            // Update mouse
            const x = (pointer.x * 0.5 + 0.5) * state.size.width;
            const y = (pointer.y * 0.5 + 0.5) * state.size.height;
            material.uniforms.iMouse.value.set(x, y);
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export default function RaymarchingShader() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 1] }} // Ortho camera logic with plane filling screen
                gl={{ antialias: false, pixelRatio: 1 }} // Shader handles AA usually, but pixelRatio 1 for perf
                dpr={1} // Force DPR 1 for performance on high res screens, shader looks fine
            >
                <ShaderMesh />
            </Canvas>
        </div>
    );
}
