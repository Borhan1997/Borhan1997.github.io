import { useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

const LOGOS = [
  "python",
  "cplusplus",
  "qt",
  "linux",
  "ros",
  "pytorch",
  "langchain",
  "streamlit",
  "modal",
  "mlflow",
  "dvc",
  "docker",
  "githubactions",
  "jenkins",
  "jfrog",
  "jira",
  "git",
  "fastapi",
  "prometheus",
  "grafana",
  "react",
  "tailwindcss",
];

const RADIUS = 1.9;

// Spread points evenly over a sphere (Fibonacci lattice).
const spherePoints = (count, radius) =>
  Array.from({ length: count }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / count;
    const r = Math.sqrt(1 - y * y);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return [
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ];
  });

function Sphere() {
  const core = useRef();
  const points = useMemo(() => spherePoints(LOGOS.length, RADIUS), []);
  return (
    <group>
      <mesh ref={core}>
        <sphereGeometry args={[RADIUS * 0.96, 32, 32]} />
        <meshBasicMaterial color="#1f1e39" />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.97, 24, 16]} />
        <meshBasicMaterial color="#7a57db" wireframe transparent opacity={0.35} />
      </mesh>
      {LOGOS.map((name, i) => (
        <Html
          key={name}
          position={points[i]}
          transform
          sprite
          occlude={[core]}
          distanceFactor={4}
          style={{ pointerEvents: "none" }}
        >
          <div className="flex items-center justify-center p-2 rounded-full size-14 bg-primary ring-1 ring-white/20">
            <img
              src={`/assets/logos/${name}.svg`}
              alt={name}
              className="object-contain size-full"
              draggable={false}
            />
          </div>
        </Html>
      ))}
    </group>
  );
}

export function TechSphere() {
  return (
    <div className="size-[18rem] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Sphere />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}
