import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { StudioEnvironment } from './StudioEnvironment';
import { detectSoftwareWebGL, hasWebGLSupport } from './webglSupport';

function InteractiveChromeToroid({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!groupRef.current) return;
    const speed = hovered ? 0.85 : 0.25;
    groupRef.current.rotation.y += dt * speed;
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.6,
      4,
      dt
    );
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshPhysicalMaterial
          color="#F4F4F1"
          metalness={1}
          roughness={0.05}
          clearcoat={1}
          envMapIntensity={1.6}
        />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.55, 0.025, 16, 100]} />
        <meshStandardMaterial color="#BFC1C5" metalness={0.95} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function LabMiniScene() {
  const [hovered, setHovered] = useState(false);
  const webglReady = useMemo(() => hasWebGLSupport(), []);
  const isSoftwareGl = useMemo(() => detectSoftwareWebGL(), []);

  if (!webglReady) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#101010] text-xs text-[#777777]">
        3D STUDY
      </div>
    );
  }

  return (
    <div
      className="w-full h-full cursor-crosshair"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Canvas
        dpr={isSoftwareGl ? 1 : [1, 1.75]}
        camera={{ position: [0, 0, 4.4], fov: 38 }}
        gl={{
          antialias: !isSoftwareGl,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={['#0E0E0E']} />
        <StudioEnvironment />
        <InteractiveChromeToroid hovered={hovered} />
      </Canvas>
    </div>
  );
}
