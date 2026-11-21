import { MutableRefObject, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { ChromeSculpture } from './ChromeSculpture';
import { StudioEnvironment } from './StudioEnvironment';
import { detectSoftwareWebGL, hasWebGLSupport } from './webglSupport';

interface ChromeSculptureCanvasProps {
  scrollProgressRef: MutableRefObject<number>;
}

export default function ChromeSculptureCanvas({
  scrollProgressRef,
}: ChromeSculptureCanvasProps) {
  const [contextLost, setContextLost] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const webglReady = useMemo(() => hasWebGLSupport(), []);
  const isSoftwareGl = useMemo(() => detectSoftwareWebGL(), []);
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    // Allow clean fallback tracking
  }, []);

  if (!webglReady || contextLost) {
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-[#080808]"
        aria-label="Chrome sculpture fallback view"
      >
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#BFC1C5]/25 flex items-center justify-center">
          <div className="w-44 h-44 rounded-full border border-[#F4F4F1]/30 bg-gradient-to-br from-[#F4F4F1]/15 via-[#191919] to-[#080808]" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Canvas
        dpr={isSoftwareGl ? 1 : [1, 2]}
        camera={{ position: [0, 0, 6.2], fov: 38, near: 0.1, far: 50 }}
        gl={{
          antialias: !isSoftwareGl,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={({ gl }) => {
          const dom = gl.domElement;
          dom.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setContextLost(true);
          });
          dom.addEventListener('webglcontextrestored', () => {
            setContextLost(false);
          });
        }}
      >
        <color attach="background" args={['#080808']} />
        <fog attach="fog" args={['#080808', 9, 20]} />
        <StudioEnvironment />
        <ChromeSculpture
          scrollProgressRef={scrollProgressRef}
          reducedMotion={reducedMotion}
          isHovered={isHovered}
        />
      </Canvas>
    </div>
  );
}
