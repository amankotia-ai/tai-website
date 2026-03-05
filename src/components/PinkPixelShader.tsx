import { useRef, useMemo, useEffect, useState } from 'react';
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
  uniform float uProgress; // 0 to 1 for animation in/out
  varying vec2 vUv;

  // Pseudo-random functions
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float random2(vec2 st) {
    return fract(sin(dot(st.xy, vec2(39.346, 11.135))) * 22732.2838);
  }

  void main() {
    vec2 uv = vUv;
    
    // Grid size for pixels
    float gridSize = 55.0;
    vec2 gridUv = floor(uv * gridSize);
    vec2 cellUv = fract(uv * gridSize);
    
    // Colors matching #FFF3F3 pink background
    vec3 white = vec3(1.0, 1.0, 1.0);
    vec3 lightPink = vec3(1.0, 0.953, 0.953);   // #FFF3F3
    vec3 mediumPink = vec3(0.98, 0.88, 0.88);   // Slightly darker pink
    vec3 softPink = vec3(0.96, 0.84, 0.86);     // Soft rose
    
    // Base randomness for each cell
    float cellRand = random(gridUv);
    float cellRand2 = random2(gridUv);
    float cellRand3 = random(gridUv + 100.0);
    
    // Create dissolve threshold based on position and randomness
    // Pixels dissolve from bottom to top - bottom stays solid longer
    float verticalPos = 1.0 - uv.y; // Invert so bottom = 0, top = 1
    float dissolveBase = cellRand * 0.5 + verticalPos * 0.5;
    
    // Add some wave-like variation for organic feel
    float wave = sin(uv.x * 6.0 + uTime * 0.3) * 0.1 + sin(uv.y * 5.0 - uTime * 0.2) * 0.1;
    dissolveBase += wave;
    
    // Progress controls which pixels are visible
    // uProgress: 0 = fully dissolved (mostly white), 1 = fully visible (pink solid)
    float threshold = 1.0 - uProgress;
    
    // Determine if this pixel is visible or dissolved
    float isVisible = smoothstep(threshold - 0.15, threshold + 0.05, dissolveBase);
    
    // Edge glow effect - pixels at the dissolve boundary get brighter
    float edgeDist = abs(dissolveBase - threshold);
    float edgeGlow = 1.0 - smoothstep(0.0, 0.2, edgeDist);
    edgeGlow *= step(0.01, isVisible) * step(isVisible, 0.99); // Only at edges
    
    // Pick a pink shade for each pixel
    vec3 pixelColor;
    if (cellRand3 > 0.7) {
      pixelColor = mediumPink;
    } else if (cellRand3 > 0.3) {
      pixelColor = softPink;
    } else {
      pixelColor = lightPink;
    }
    
    // Subtle shimmer animation on visible pixels
    float shimmer = sin(uTime * 2.0 + cellRand * 20.0) * 0.02 + 1.0;
    pixelColor *= shimmer;
    
    // Mix between white and pixel color based on visibility
    vec3 color = mix(white, pixelColor, isVisible);
    
    // Add edge glow (slightly brighter)
    color += vec3(edgeGlow * 0.08);
    
    // Create square shapes within cells (with small gap)
    float gap = 0.08;
    float insideSquare = step(gap, cellUv.x) * step(gap, cellUv.y) * 
                         step(cellUv.x, 1.0 - gap) * step(cellUv.y, 1.0 - gap);
    
    // Apply square mask - gaps are always white
    color = mix(white, color, insideSquare);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function PixelShaderMesh({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth interpolation towards target progress
      material.uniforms.uProgress.value += (progress - material.uniforms.uProgress.value) * 0.05;
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

export default function PinkPixelShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the section is visible
      // Start animation when section enters viewport
      // Progress from 0 to 1 as section scrolls into view
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      if (sectionTop >= windowHeight) {
        // Section is below viewport
        setProgress(0);
      } else if (sectionBottom <= 0) {
        // Section is above viewport
        setProgress(1);
      } else {
        // Section is in viewport
        // Calculate progress based on how far we've scrolled into the section
        const visibleFromTop = windowHeight - sectionTop;
        const totalScrollDistance = windowHeight + rect.height;
        const scrollProgress = Math.min(Math.max(visibleFromTop / (totalScrollDistance * 0.4), 0), 1);
        setProgress(scrollProgress);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{
          background: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      >
        <PixelShaderMesh progress={progress} />
      </Canvas>
    </div>
  );
}
