import { useEffect, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useMotionValue, useSpring } from "motion/react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const COLORS = {
  head: "#4a4f8a",
  body: "#363a73",
  visor: "#030412",
  eye: "#33c2cc",
  accent: "#7a57db",
  tip: "#ca2f8c",
  debris: "#57db96",
};

// Same 6.67 s loop length as the astronaut's idle animation.
const LOOP = 6.667;
const W = (Math.PI * 2) / LOOP;

const Solid = ({ color, ...props }) => (
  <meshStandardMaterial color={color} roughness={0.4} metalness={0.15} {...props} />
);

const Glow = ({ color, ...props }) => (
  <meshBasicMaterial color={color} toneMapped={false} {...props} />
);

export function Robot(props) {
  const group = useRef();
  const head = useRef();
  const eyes = useRef();
  const body = useRef();
  const arms = useRef([]);
  const debris = useRef([]);

  const targetY = (props.position || [1.3, -0.6, 0])[1];
  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, { damping: 30 });
  useEffect(() => {
    yPosition.set(targetY);
  }, [yPosition, targetY]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    group.current.position.y = ySpring.get();

    // Weightless drift: the whole body slowly tumbles and bobs.
    group.current.rotation.x = 0 + Math.sin(t * W) * 0.1;
    group.current.rotation.z = 0.3 + Math.sin(t * W + 1.2) * 0.1;
    body.current.position.y = Math.sin(t * W * 2) * 0.05;

    // Head lags behind the body and glances at the cursor.
    easing.damp(head.current.rotation, "y", state.pointer.x * 0.5, 0.4, delta);
    easing.damp(head.current.rotation, "x", -state.pointer.y * 0.25, 0.4, delta);
    head.current.rotation.z = Math.sin(t * W + 2) * 0.08;

    // Arms float out of phase, like limbs in zero gravity.
    arms.current.forEach((arm, i) => {
      const side = i === 0 ? -1 : 1;
      arm.rotation.z = side * (0.9 + Math.sin(t * W + i * 2.1) * 0.35);
      arm.rotation.x = Math.sin(t * W * 2 + i * 1.3) * 0.3;
    });

    // Slow blink.
    easing.damp(eyes.current.scale, "y", t % 5 < 0.15 ? 0.1 : 1, 0.04, delta);

    // Debris orbits and tumbles around the robot.
    debris.current.forEach((d, i) => {
      const a = t * W * 0.5 + (i * Math.PI) / 2;
      d.position.set(
        Math.cos(a) * 1.2,
        Math.sin(t * W + i) * 0.25 + (i % 2 ? 0.5 : -0.2),
        Math.sin(a) * 0.9
      );
      d.rotation.x = t * 0.6 + i;
      d.rotation.y = t * 0.4 + i * 2;
    });
  });

  const addArm = (i) => (el) => {
    arms.current[i] = el;
  };
  const addDebris = (i) => (el) => {
    debris.current[i] = el;
  };

  return (
    <group
      ref={group}
      dispose={null}
      rotation={[0, -0.4, 0.3]}
      {...props}
      scale={props.scale || 1}
      position={props.position || [1.3, -0.6, 0]}
    >
      <group ref={body}>
        {/* Head: orb with a visor */}
        <group ref={head} position={[0, 0.75, 0]}>
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <Solid color={COLORS.head} />
          </mesh>
          <mesh position={[0, 0.02, 0.37]} scale={[0.85, 0.6, 0.3]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <Solid color={COLORS.visor} roughness={0.15} metalness={0.6} />
          </mesh>
          <group ref={eyes} position={[0, 0.02, 0.53]}>
            {[-0.15, 0.15].map((x) => (
              <mesh key={x} position={[x, 0, 0]}>
                <circleGeometry args={[0.06, 20]} />
                <Glow color={COLORS.eye} />
              </mesh>
            ))}
          </group>
          {/* Antenna */}
          <mesh position={[0, 0.58, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.2, 12]} />
            <Solid color={COLORS.eye} />
          </mesh>
          <mesh position={[0, 0.72, 0]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <Glow color={COLORS.tip} />
          </mesh>
        </group>

        {/* Body */}
        <mesh position={[0, 0.05, 0]} scale={[1, 0.85, 0.9]}>
          <sphereGeometry args={[0.38, 32, 32]} />
          <Solid color={COLORS.body} />
        </mesh>
        <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.02, 8, 48]} />
          <Glow color={COLORS.accent} />
        </mesh>

        {/* Arms with hands */}
        {[0, 1].map((i) => (
          <group
            key={i}
            ref={addArm(i)}
            position={[(i === 0 ? -1 : 1) * 0.36, 0.2, 0]}
          >
            <mesh position={[0, -0.2, 0]}>
              <capsuleGeometry args={[0.06, 0.26, 6, 12]} />
              <Solid color={COLORS.head} />
            </mesh>
            <mesh position={[0, -0.46, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <Solid color={COLORS.accent} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Floating debris, like the astronaut's drifting gear */}
      <group>
        <mesh ref={addDebris(0)}>
          <boxGeometry args={[0.18, 0.04, 0.12]} />
          <Solid color={COLORS.debris} />
        </mesh>
        <mesh ref={addDebris(1)}>
          <torusGeometry args={[0.07, 0.02, 8, 20]} />
          <Solid color={COLORS.eye} />
        </mesh>
        <RoundedBox ref={addDebris(2)} args={[0.1, 0.1, 0.1]} radius={0.03}>
          <Solid color={COLORS.tip} />
        </RoundedBox>
        <mesh ref={addDebris(3)}>
          <capsuleGeometry args={[0.025, 0.12, 4, 8]} />
          <Solid color={COLORS.accent} />
        </mesh>
      </group>
    </group>
  );
}
