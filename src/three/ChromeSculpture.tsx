import { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ChromeSculptureProps {
  scrollProgressRef: MutableRefObject<number>;
  reducedMotion: boolean;
  isHovered: boolean;
}

export function ChromeSculpture({
  scrollProgressRef,
  reducedMotion,
  isHovered,
}: ChromeSculptureProps) {
  const rootRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const bladesRef = useRef<THREE.Group>(null);

  // Subtle chamfered architectural silver accent blades
  const bladeGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.34);
    shape.quadraticCurveTo(0.14, -0.1, 0.08, 0.3);
    shape.lineTo(0.01, 0.38);
    shape.quadraticCurveTo(-0.05, 0.04, 0, -0.34);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.028,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.01,
      bevelSegments: 4,
    });
    geo.center();
    return geo;
  }, []);

  const materials = useMemo(() => {
    const mirrorChrome = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#EAEAE6'),
      metalness: 1.0,
      roughness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.45,
    });

    const satinGraphite = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1A1A1D'),
      metalness: 0.86,
      roughness: 0.38,
      envMapIntensity: 0.95,
    });

    const brushedSilver = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#BFC1C5'),
      metalness: 0.95,
      roughness: 0.22,
      anisotropy: 0.75,
      envMapIntensity: 1.25,
    });

    const mercuryCore = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#D8D9DC'),
      metalness: 1.0,
      roughness: 0.03,
      clearcoat: 1.0,
      envMapIntensity: 1.65,
    });

    return { mirrorChrome, satinGraphite, brushedSilver, mercuryCore };
  }, []);

  useEffect(() => {
    return () => {
      bladeGeometry.dispose();
      materials.mirrorChrome.dispose();
      materials.satinGraphite.dispose();
      materials.brushedSilver.dispose();
      materials.mercuryCore.dispose();
    };
  }, [bladeGeometry, materials]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.getElapsedTime();
    const scroll = scrollProgressRef.current;

    if (!rootRef.current) return;

    const targetRotY = state.pointer.x * 0.45 + scroll * Math.PI * 0.75;
    const targetRotX = -state.pointer.y * 0.28 + scroll * 0.35;
    const targetPosY = reducedMotion ? 0 : Math.sin(t * 0.6) * 0.07 - scroll * 0.55;
    const targetScale = isHovered ? 1.03 : 0.94;

    rootRef.current.rotation.y = THREE.MathUtils.damp(
      rootRef.current.rotation.y,
      targetRotY,
      3.5,
      dt
    );
    rootRef.current.rotation.x = THREE.MathUtils.damp(
      rootRef.current.rotation.x,
      targetRotX,
      3.5,
      dt
    );
    rootRef.current.position.y = THREE.MathUtils.damp(
      rootRef.current.position.y,
      targetPosY,
      4.0,
      dt
    );
    const nextScale = THREE.MathUtils.damp(rootRef.current.scale.x, targetScale, 5.0, dt);
    rootRef.current.scale.setScalar(nextScale);

    if (reducedMotion) return;

    if (knotRef.current) {
      knotRef.current.rotation.y += dt * 0.14;
      knotRef.current.rotation.z = Math.sin(t * 0.22) * 0.1;
    }

    if (ringARef.current) {
      ringARef.current.rotation.z += dt * 0.16;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.y -= dt * 0.12;
    }

    if (bladesRef.current) {
      bladesRef.current.rotation.y -= dt * 0.2;
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 1.2) * 0.02;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={rootRef} position={[0, 0.08, 0]} scale={0.94}>
      {/* 1. Sleek Sculpted Chrome Ribbon */}
      <mesh ref={knotRef} material={materials.mirrorChrome}>
        <torusKnotGeometry args={[1.05, 0.15, 220, 36, 2, 3]} />
      </mesh>

      {/* 2. Liquid Mercury Core Sphere */}
      <mesh ref={coreRef} material={materials.mercuryCore}>
        <sphereGeometry args={[0.3, 64, 64]} />
      </mesh>

      {/* 3. Obsidian-Graphite Structural Ring */}
      <mesh
        ref={ringARef}
        material={materials.satinGraphite}
        rotation={[Math.PI / 3, 0.25, 0]}
      >
        <torusGeometry args={[1.65, 0.028, 20, 140]} />
      </mesh>

      {/* 4. Fine Brushed Silver Orbital Halo */}
      <mesh
        ref={ringBRef}
        material={materials.brushedSilver}
        rotation={[-Math.PI / 4, 0.45, 0]}
      >
        <torusGeometry args={[1.95, 0.011, 16, 160]} />
      </mesh>

      {/* 5 & 6. Minimal Chamfered Chrome Accent Blades */}
      <group ref={bladesRef}>
        <mesh
          geometry={bladeGeometry}
          material={materials.brushedSilver}
          position={[1.72, 0.1, 0]}
          rotation={[0, 0, -0.22]}
        />
        <mesh
          geometry={bladeGeometry}
          material={materials.satinGraphite}
          position={[-1.72, -0.1, 0]}
          rotation={[0, Math.PI, -0.22]}
        />
      </group>
    </group>
  );
}
