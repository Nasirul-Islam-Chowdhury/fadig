import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3 } from "./geo";

const COLOR = {
  high: "#f35446",
  medium: "#e7cc3c",
  low: "#7ec53e",
};

const LABEL = {
  high: "High risk",
  medium: "Medium risk",
  low: "No risk",
};

const UP = new THREE.Vector3(0, 0, 1);

function Marker({ lat, lng, level, name }) {
  const pulseRef = useRef();
  const [hovered, setHovered] = useState(false);
  const isAlert = level === "high";

  const position = useMemo(() => latLngToVector3(lat, lng, 1.012), [lat, lng]);
  const quaternion = useMemo(() => {
    const normal = position.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(UP, normal);
  }, [position]);

  useFrame(({ clock }) => {
    if (!pulseRef.current || !isAlert) return;
    const t = (clock.getElapsedTime() * 0.7) % 1;
    pulseRef.current.scale.setScalar(1 + t * 3.2);
    pulseRef.current.material.opacity = 0.55 * (1 - t);
  });

  return (
    <group>
      <mesh
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[isAlert ? 0.026 : 0.02, 12, 12]} />
        <meshBasicMaterial
          color={COLOR[level]}
          transparent
          opacity={hovered ? 1 : 0.9}
        />
      </mesh>

      {isAlert && (
        <group position={position} quaternion={quaternion}>
          <mesh ref={pulseRef}>
            <ringGeometry args={[0.02, 0.027, 28]} />
            <meshBasicMaterial
              color={COLOR[level]}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}

      {hovered && (
        <Html position={position} distanceFactor={2.2} zIndexRange={[10, 0]}>
          <div className="pointer-events-none -translate-x-1/2 -translate-y-full rounded-lg border border-white/10 bg-fadig-bg/95 px-2.5 py-1.5 text-[11px] whitespace-nowrap shadow-xl">
            <p className="font-semibold text-white">{name}</p>
            <p style={{ color: COLOR[level] }} className="font-medium">
              {LABEL[level]}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function RiskMarkers({ locations }) {
  return (
    <>
      {locations.map((loc) => (
        <Marker key={loc.name} {...loc} />
      ))}
    </>
  );
}
