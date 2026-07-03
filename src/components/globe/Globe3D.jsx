import { Suspense, useCallback, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "./Earth";
import RiskMarkers from "./RiskMarkers";
import MigrationArcs from "./MigrationArcs";
import { HIGH_RISK, MEDIUM_RISK, NO_RISK, MIGRATION_ROUTES } from "./geo";

const MARKERS = [
  ...HIGH_RISK.map((loc) => ({ ...loc, level: "high" })),
  ...MEDIUM_RISK.map((loc) => ({ ...loc, level: "medium" })),
  ...NO_RISK.map((loc) => ({ ...loc, level: "low" })),
];

export default function Globe3D() {
  const [autoRotate, setAutoRotate] = useState(true);
  const resumeTimer = useRef(null);

  const pause = useCallback(() => {
    clearTimeout(resumeTimer.current);
    setAutoRotate(false);
  }, []);

  const resumeSoon = useCallback(() => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setAutoRotate(true), 3500);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 2.6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 2, 4]} intensity={1.2} />
      <pointLight position={[-3, -2, -3]} intensity={0.3} color="#7ec53e" />

      <Suspense fallback={null}>
        <group rotation={[0.15, 0, 0]}>
          <Earth />
          <RiskMarkers locations={MARKERS} />
          <MigrationArcs routes={MIGRATION_ROUTES} />
        </group>
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={1.7}
        maxDistance={3.6}
        rotateSpeed={0.55}
        autoRotate={autoRotate}
        autoRotateSpeed={0.6}
        onStart={pause}
        onEnd={resumeSoon}
      />
    </Canvas>
  );
}
