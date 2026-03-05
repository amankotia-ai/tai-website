import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  // Pseudo-random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // Second random for variety
  float random2(vec2 st) {
    return fract(sin(dot(st.xy, vec2(39.346, 11.135))) * 22732.2838);
  }

  void main() {
    vec2 uv = vUv;
    
    // Grid size for pixels
    float gridSize = 28.0;
    vec2 gridUv = floor(uv * gridSize);
    vec2 cellUv = fract(uv * gridSize);
    
    // Colors
    vec3 cream = vec3(0.988, 0.976, 0.949);  // #FCF9F2 - base/unverified
    vec3 white = vec3(1.0, 1.0, 1.0);        // Flash color when sampling
    vec3 pink = vec3(1.0, 0.867, 0.945);     // #FFDDF1 - Verified pink
    vec3 red = vec3(0.839, 0.114, 0.122);    // #D61D1F - Verified red
    
    // Base randomness for each cell
    float cellRand = random(gridUv);
    float cellRand2 = random2(gridUv);
    
    // Determine if this cell should be a "verification pixel"
    float threshold = 0.35 + uv.x * 0.35;
    
    vec3 color = cream;
    
    if (cellRand > threshold) {
      // This is a verification pixel
      
      // Each pixel has a unique "sampling time" in a cycle
      float cycleLength = 15.0; // Longer, slower cycle
      float sampleDelay = cellRand2 * cycleLength; // When this pixel gets sampled
      
      // Current position in cycle
      float cycleTime = mod(uTime, cycleLength);
      
      // Calculate time since this pixel was "sampled"
      float timeSinceSample = cycleTime - sampleDelay;
      
      // If we haven't been sampled yet in this cycle, use previous cycle
      if (timeSinceSample < 0.0) {
        timeSinceSample += cycleLength;
      }
      
      // Sampling flash phase - gentler, longer flash
      float flashDuration = 0.5;
      float flashIntensity = 1.0 - smoothstep(0.0, flashDuration, timeSinceSample);
      // Apply easing for smoother flash
      flashIntensity = flashIntensity * flashIntensity * (3.0 - 2.0 * flashIntensity);
      
      // Verification lock phase - slower, smoother fade into verified color
      float lockDelay = 0.3;
      float lockDuration = 1.5;
      float lockProgress = smoothstep(lockDelay, lockDelay + lockDuration, timeSinceSample);
      
      // Hold the verified state longer
      float holdDuration = cycleLength - 3.0; // Stay verified for most of cycle
      float fadeOutStart = holdDuration;
      float fadeOut = 1.0 - smoothstep(fadeOutStart, fadeOutStart + 2.5, timeSinceSample);
      
      // Combine lock and fade
      float verifiedIntensity = lockProgress * fadeOut;
      
      // Pick verified color (pink or red)
      float colorChoice = random(gridUv + 50.0);
      vec3 verifiedColor = colorChoice > 0.45 ? red : pink;
      
      // Build final color: cream -> flash white -> verified color -> fade back
      color = cream;
      color = mix(color, verifiedColor, verifiedIntensity * 0.9);
      color = mix(color, white, flashIntensity * 0.85);
      
      // Add subtle glow during flash
      float glow = flashIntensity * 0.15;
      color += glow;
    }
    
    // Create square shapes within cells (with small gap)
    float gap = 0.06;
    float insideSquare = step(gap, cellUv.x) * step(gap, cellUv.y) * 
                         step(cellUv.x, 1.0 - gap) * step(cellUv.y, 1.0 - gap);
    
    // Apply square mask
    color = mix(cream, color, insideSquare);
    
    // Gradual fade on left side
    float fadeLeft = smoothstep(0.0, 0.30, uv.x);
    color = mix(cream, color, fadeLeft);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function PixelShaderMesh() {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default function PixelShader() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 75 }}
                style={{ background: '#FCF9F2' }}
            >
                <PixelShaderMesh />
            </Canvas>
        </div>
    );
}
