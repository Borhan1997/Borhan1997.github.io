import { useEffect, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useMotionValue, useSpring } from "motion/react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const COLORS = {
  head: "#4a4f8a",
  body: "#363a73",
  screen: "#030412",
  accent: "#57db96",
};

const Panel = ({ position, size, radius = 0.05, color, ...props }) => (
  <RoundedBox
    args={size}
    radius={radius}
    smoothness={4}
    position={position}
    {...props}
  >
    <meshStandardMaterial color={color} roughness={0.4} metalness={0.15} />
  </RoundedBox>
);

export function Robot(props) {
  const group = useRef();
  const head = useRef();
  const eyes = useRef();

  const targetY = (props.position || [1.3, -0.6, 0])[1];
  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, { damping: 30 });
  useEffect(() => {
    yPosition.set(targetY);
  }, [yPosition, targetY]);

  useFrame((state, delta) => {
    group.current.position.y = ySpring.get();

    // The head turns to follow the cursor.
    easing.damp(head.current.rotation, "y", state.pointer.x * 0.6, 0.25, delta);
    easing.damp(head.current.rotation, "x", -state.pointer.y * 0.3, 0.25, delta);

    // The eyes blink every few seconds.
    const t = state.clock.elapsedTime % 4;
    easing.damp(eyes.current.scale, "y", t < 0.15 ? 0.1 : 1, 0.04, delta);
  });

  return (
    <group
      ref={group}
      dispose={null}
      rotation={[0, -0.4, 0]}
      {...props}
      scale={props.scale || 1}
      position={props.position || [1.3, -0.6, 0]}
    >
      <group ref={head} position={[0, 0.9, 0]}>
        <Panel size={[1.1, 0.95, 0.9]} radius={0.22} color={COLORS.head} />
        {/* Screen face */}
        <Panel
          size={[0.85, 0.52, 0.06]}
          radius={0.1}
          position={[0, 0, 0.45]}
          color={COLORS.screen}
        />
        <group ref={eyes} position={[0, 0.02, 0.5]}>
          {[-0.2, 0.2].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <capsuleGeometry args={[0.06, 0.1, 4, 12]} />
              <meshBasicMaterial color={COLORS.accent} toneMapped={false} />
            </mesh>
          ))}
        </group>
        {/* Ear panels */}
        <Panel
          size={[0.14, 0.38, 0.3]}
          radius={0.06}
          position={[-0.62, 0, 0]}
          color={COLORS.accent}
        />
        <Panel
          size={[0.14, 0.38, 0.3]}
          radius={0.06}
          position={[0.62, 0, 0]}
          color={COLORS.accent}
        />
      </group>
      {/* Body */}
      <Panel
        size={[0.7, 0.62, 0.5]}
        radius={0.16}
        position={[0, 0.05, 0]}
        color={COLORS.body}
      />
      {/* Feet */}
      <Panel
        size={[0.22, 0.16, 0.26]}
        radius={0.06}
        position={[-0.17, -0.34, 0]}
        color={COLORS.head}
      />
      <Panel
        size={[0.22, 0.16, 0.26]}
        radius={0.06}
        position={[0.17, -0.34, 0]}
        color={COLORS.head}
      />
    </group>
  );
}
