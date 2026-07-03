import { useMemo } from "react";
import * as THREE from "three";
import { createEarthTexture } from "./earthTexture";

export default function Earth() {
  const texture = useMemo(() => createEarthTexture(), []);

  return (
    <group>
      {/* base sphere with procedural continent texture */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={0.9} metalness={0.05} />
      </mesh>

      {/* fine tech-grid wireframe shell */}
      <mesh>
        <sphereGeometry args={[1.004, 32, 32]} />
        <meshBasicMaterial color="#7ec53e" wireframe transparent opacity={0.05} />
      </mesh>

      {/* inner atmosphere glow (green, on-brand) */}
      <mesh scale={1.08}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#7ec53e"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>

      {/* outer warm glow (red, echoes the alert palette) */}
      <mesh scale={1.16}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#f35446"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
