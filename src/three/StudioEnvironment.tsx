import { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();

    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.035);
    scene.environment = envTarget.texture;
    scene.environmentIntensity = 1.15;

    roomEnv.dispose();
    pmremGenerator.dispose();

    return () => {
      scene.environment = null;
      envTarget.dispose();
    };
  }, [gl, scene]);

  return (
    <>
      {/* Cool silver sky / obsidian floor hemisphere fill */}
      <hemisphereLight args={['#E4E6EB', '#080808', 0.45]} />

      {/* Studio Key Light (crisp silver-white overhead angle) */}
      <directionalLight position={[5, 6, 4]} intensity={2.2} color="#F4F4F1" />

      {/* Opposite Rim Light for sculptural metallic edge separation */}
      <directionalLight position={[-6, -3, -4]} intensity={1.5} color="#BFC1C5" />

      {/* Focused studio spotlight accent */}
      <spotLight
        position={[0, 7, 3]}
        angle={0.45}
        penumbra={0.8}
        intensity={2.4}
        color="#FFFFFF"
      />
    </>
  );
}
