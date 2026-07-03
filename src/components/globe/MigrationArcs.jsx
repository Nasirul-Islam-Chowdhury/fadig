import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3 } from "./geo";

const MIGRATION_COLOR = "#c1793e"; // "brown things coming" — planthopper migration

function buildCurve(from, to, height = 0.32) {
  const start = latLngToVector3(from.lat, from.lng, 1);
  const end = latLngToVector3(to.lat, to.lng, 1);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(1 + height);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

function Arc({ from, to, particleCount = 3, speed = 0.12 }) {
  const curve = useMemo(() => buildCurve(from, to), [from, to]);
  const lineGeometry = useMemo(() => {
    const points = curve.getPoints(64);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curve]);

  const offsets = useMemo(
    () => Array.from({ length: particleCount }, (_, i) => i / particleCount),
    [particleCount]
  );
  const particleRefs = useRef([]);

  useFrame(({ clock }) => {
    const base = (clock.getElapsedTime() * speed) % 1;
    particleRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = (base + offsets[i]) % 1;
      const point = curve.getPoint(t);
      mesh.position.copy(point);
      const fade = Math.sin(t * Math.PI); // ease in/out at both ends
      mesh.scale.setScalar(0.5 + fade * 0.8);
      mesh.material.opacity = 0.25 + fade * 0.75;
    });
  });

  return (
    <group>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color={MIGRATION_COLOR} transparent opacity={0.22} />
      </line>
      {offsets.map((_, i) => (
        <mesh key={i} ref={(el) => (particleRefs.current[i] = el)}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color={MIGRATION_COLOR} transparent />
        </mesh>
      ))}
    </group>
  );
}

export default function MigrationArcs({ routes }) {
  return (
    <>
      {routes.map((route, i) => (
        <Arc key={i} from={route.from} to={route.to} />
      ))}
    </>
  );
}
