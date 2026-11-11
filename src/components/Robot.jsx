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
  glow: "#33c2cc",
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

const Glow = ({ color, ...props }) => (
  <meshBasicMaterial color={color} toneMapped={false} {...props} />
);

export function Robot(props) {
  const group = useRef();
  const head = useRef();
  const eyes = useRef();
  const antennaTip = useRef();
  const chestLight = useRef();
  const thruster = useRef();
  const leftArm = useRef();
  const rightArm = useRef();

  const targetY = (props.position || [1.3, -0.6, 0])[1];
  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, { damping: 30 });
  useEffect(() => {
    yPosition.set(targetY);
  }, [yPosition, targetY]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    group.current.position.y = ySpring.get();

    // The head turns to follow the cursor, and the eyes slide with it.
    easing.damp(head.current.rotation, "y", state.pointer.x * 0.6, 0.25, delta);
    easing.damp(head.current.rotation, "x", -state.pointer.y * 0.3, 0.25, delta);
    easing.damp(eyes.current.position, "x", state.pointer.x * 0.1, 0.2, delta);
    easing.damp(eyes.current.position, "y", 0.02 + state.pointer.y * 0.05, 0.2, delta);

    // The eyes blink every few seconds.
    const blink = time % 4 < 0.15;
    easing.damp(eyes.current.scale, "y", blink ? 0.1 : 1, 0.04, delta);

    // Idle motion: the arms sway and the lights pulse.
    leftArm.current.rotation.z = 0.25 + Math.sin(time * 2) * 0.12;
    rightArm.current.rotation.z = -0.25 - Math.sin(time * 2 + 1) * 0.12;
    antennaTip.current.scale.setScalar(1 + Math.sin(time * 4) * 0.2);
    chestLight.current.material.opacity = 0.6 + Math.sin(time * 3) * 0.4;
    thruster.current.scale.y = 1 + Math.sin(time * 14) * 0.15;
  });

  const arm = (side, innerRef) => (
    <group key={side} ref={innerRef} position={[side * 0.42, 0.22, 0]}>
      <Panel
        size={[0.14, 0.4, 0.14]}
        radius={0.06}
        position={[side * 0.04, -0.2, 0]}
        color={COLORS.head}
      />
      <mesh position={[side * 0.04, -0.44, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={COLORS.accent} roughness={0.4} />
      </mesh>
    </group>
  );

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
            <mesh key={x} position={[x, 0.03, 0]}>
              <capsuleGeometry args={[0.06, 0.1, 4, 12]} />
              <Glow color={COLORS.accent} />
            </mesh>
          ))}
          {/* Smile */}
          <mesh position={[0, -0.12, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.09, 0.016, 8, 24, Math.PI]} />
            <Glow color={COLORS.accent} />
          </mesh>
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
        {/* Antenna */}
        <mesh position={[0, 0.58, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.22, 12]} />
          <meshStandardMaterial color={COLORS.accent} roughness={0.4} />
        </mesh>
        <mesh ref={antennaTip} position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <Glow color={COLORS.glow} />
        </mesh>
      </group>

      {/* Body */}
      <Panel
        size={[0.7, 0.62, 0.5]}
        radius={0.16}
        position={[0, 0.05, 0]}
        color={COLORS.body}
      />
      <mesh ref={chestLight} position={[0, 0.08, 0.26]}>
        <circleGeometry args={[0.07, 24]} />
        <Glow color={COLORS.glow} transparent />
      </mesh>
      {arm(-1, leftArm)}
      {arm(1, rightArm)}

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
      {/* Thruster glow under the feet */}
      <mesh ref={thruster} position={[0, -0.62, 0]}>
        <coneGeometry args={[0.2, 0.4, 24, 1, true]} />
        <Glow color={COLORS.glow} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
