import { useEffect, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring } from "motion/react";
import { easing } from "maath";

const COLORS = {
  shell: "#8fb4d4",
  joint: "#27364a",
  cyan: "#35dcef",
  purple: "#8a63c8",
  eye: "#57db96",
  button: "#e8683a",
};

// Slow-motion loop for the weightless, cinematic feel.
const LOOP = 10.3;
const W = (Math.PI * 2) / LOOP;

// Glossy painted plastic.
const Shell = ({ color = COLORS.shell }) => (
  <meshPhysicalMaterial
    color={color}
    roughness={0.35}
    metalness={0.1}
    clearcoat={0.6}
    clearcoatRoughness={0.3}
  />
);

const Glow = ({ color = COLORS.cyan }) => (
  <meshBasicMaterial color={color} toneMapped={false} />
);

const Ring = ({ radius, tube = 0.03, color = COLORS.cyan, ...props }) => (
  <mesh {...props}>
    <torusGeometry args={[radius, tube, 12, 40]} />
    <Glow color={color} />
  </mesh>
);

function Hand({ pointing }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.1, 20, 16]} />
        <Shell color={COLORS.joint} />
      </mesh>
      {pointing ? (
        <>
          <mesh position={[0, -0.17, 0]}>
            <capsuleGeometry args={[0.032, 0.18, 6, 10]} />
            <Shell color={COLORS.shell} />
          </mesh>
          <mesh position={[0.07, -0.06, 0.04]} rotation={[0, 0, -0.6]}>
            <capsuleGeometry args={[0.026, 0.07, 6, 10]} />
            <Shell color={COLORS.joint} />
          </mesh>
        </>
      ) : (
        [-0.05, 0, 0.05].map((x) => (
          <mesh key={x} position={[x, -0.15, 0]}>
            <capsuleGeometry args={[0.026, 0.08, 6, 10]} />
            <Shell color={COLORS.joint} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Arm({ side, innerRef, forearmRef, pointing }) {
  return (
    <group ref={innerRef} position={[side * 0.46, 0.2, pointing ? 0.12 : 0]}>
      <mesh>
        <sphereGeometry args={[0.13, 20, 16]} />
        <Shell color={COLORS.joint} />
      </mesh>
      <Ring radius={0.13} tube={0.018} rotation={[0, Math.PI / 2, 0]} />
      <mesh position={[0, -0.2, 0]}>
        <capsuleGeometry args={[0.085, 0.2, 8, 16]} />
        <Shell />
      </mesh>
      <group ref={forearmRef} position={[0, -0.42, 0]}>
        <mesh>
          <sphereGeometry args={[0.095, 16, 12]} />
          <Shell color={COLORS.joint} />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <capsuleGeometry args={[0.075, 0.16, 8, 16]} />
          <Shell />
        </mesh>
        <group position={[0, -0.4, 0]}>
          <Hand pointing={pointing} />
        </group>
      </group>
    </group>
  );
}

function Leg({ side, innerRef, shinRef }) {
  return (
    <group ref={innerRef} position={[side * 0.2, -0.38, 0]}>
      <mesh>
        <sphereGeometry args={[0.12, 16, 12]} />
        <Shell color={COLORS.joint} />
      </mesh>
      <mesh position={[0, -0.16, 0]}>
        <capsuleGeometry args={[0.09, 0.12, 8, 16]} />
        <Shell />
      </mesh>
      <group ref={shinRef} position={[0, -0.34, 0]}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 12]} />
          <Shell color={COLORS.joint} />
        </mesh>
        <mesh position={[0, -0.14, 0]}>
          <capsuleGeometry args={[0.08, 0.1, 8, 16]} />
          <Shell />
        </mesh>
        {/* Foot */}
        <RoundedBox
          args={[0.26, 0.16, 0.38]}
          radius={0.07}
          smoothness={4}
          position={[0, -0.3, 0.06]}
        >
          <Shell />
        </RoundedBox>
        <RoundedBox
          args={[0.27, 0.05, 0.39]}
          radius={0.02}
          smoothness={2}
          position={[0, -0.37, 0.06]}
        >
          <Shell color={COLORS.joint} />
        </RoundedBox>
        <mesh position={[0, -0.3, 0.255]}>
          <boxGeometry args={[0.2, 0.03, 0.01]} />
          <Glow />
        </mesh>
      </group>
    </group>
  );
}

export function Robot(props) {
  const root = useRef();
  const head = useRef();
  const eyes = useRef();
  const armL = useRef();
  const forearmL = useRef();
  const armR = useRef();
  const forearmR = useRef();
  const legL = useRef();
  const shinL = useRef();
  const legR = useRef();
  const shinR = useRef();
  const antL = useRef();
  const antR = useRef();

  const targetY = (props.position || [1.3, -0.5, 0])[1];
  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, { damping: 30 });
  useEffect(() => {
    yPosition.set(targetY);
  }, [yPosition, targetY]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = t * W;
    root.current.position.y = ySpring.get() + Math.sin(p * 2) * 0.05;
    root.current.rotation.z = Math.sin(p) * 0.06;
    root.current.rotation.y = -0.35 + Math.sin(p + 1) * 0.08;

    // The head glances at the cursor a beat behind the body.
    easing.damp(head.current.rotation, "y", state.pointer.x * 0.5, 0.45, delta);
    easing.damp(head.current.rotation, "x", -state.pointer.y * 0.25, 0.45, delta);
    head.current.rotation.z = Math.sin(p + 2) * 0.05;

    // Slow blink.
    easing.damp(eyes.current.scale, "y", t % 5 < 0.15 ? 0.1 : 1, 0.04, delta);

    // Raised arm: slow wag of the pointing finger. Other limbs float loosely.
    armL.current.rotation.z = -1.5 + Math.sin(p) * 0.08;
    forearmL.current.rotation.z = -1.2 + Math.sin(p * 2) * 0.12;
    armR.current.rotation.z = 0.35 + Math.sin(p + 1.5) * 0.1;
    forearmR.current.rotation.z = 0.25 + Math.sin(p * 2 + 1) * 0.1;
    legL.current.rotation.x = Math.sin(p + 0.5) * 0.12;
    shinL.current.rotation.x = 0.15 + Math.sin(p + 1) * 0.1;
    legR.current.rotation.x = Math.sin(p + 2.5) * 0.12;
    shinR.current.rotation.x = 0.15 + Math.sin(p + 3) * 0.1;
    antL.current.rotation.z = 0.4 + Math.sin(p * 2 + 0.5) * 0.12;
    antR.current.rotation.z = -0.4 + Math.sin(p * 2 + 2) * 0.12;
  });

  return (
    <group
      ref={root}
      dispose={null}
      rotation={[0, -0.35, 0]}
      {...props}
      scale={props.scale || 0.85}
      position={props.position || [1.3, -0.5, 0]}
    >
      {/* Body */}
      <RoundedBox args={[0.72, 0.78, 0.56]} radius={0.22} smoothness={5}>
        <Shell />
      </RoundedBox>
      {/* Chest panel */}
      <group position={[0, 0.02, 0.285]}>
        <RoundedBox args={[0.32, 0.4, 0.03]} radius={0.05} smoothness={3}>
          <Shell color={COLORS.joint} />
        </RoundedBox>
        {[0.1, 0.04, -0.02].map((y) => (
          <mesh key={y} position={[0, y, 0.02]}>
            <boxGeometry args={[0.2, 0.018, 0.005]} />
            <Glow />
          </mesh>
        ))}
        <mesh position={[0, -0.13, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
          <Glow color={COLORS.button} />
        </mesh>
      </group>
      <Ring radius={0.31} tube={0.02} position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]} />

      <Arm side={-1} innerRef={armL} forearmRef={forearmL} pointing />
      <Arm side={1} innerRef={armR} forearmRef={forearmR} />
      <Leg side={-1} innerRef={legL} shinRef={shinL} />
      <Leg side={1} innerRef={legR} shinRef={shinR} />

      {/* Head */}
      <group ref={head} position={[0, 1.0, 0]}>
        <mesh scale={[1.12, 0.98, 1]}>
          <sphereGeometry args={[0.76, 48, 36]} />
          <Shell />
        </mesh>
        {/* Panel seam and top button */}
        <Ring
          radius={0.77}
          tube={0.008}
          color={COLORS.joint}
          position={[0, 0.02, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 0.98, 1.12]}
        />
        <mesh position={[0.18, 0.74, 0.1]} rotation={[0.1, 0, -0.15]}>
          <capsuleGeometry args={[0.04, 0.12, 6, 10]} />
          <Glow color={COLORS.button} />
        </mesh>
        {/* Screen face: dark visor with capsule eyes and a smile */}
        <mesh position={[0, 0.0, 0.58]} scale={[0.66, 0.4, 0.24]}>
          <sphereGeometry args={[1, 48, 32]} />
          <meshPhysicalMaterial
            color="#030412"
            roughness={0.12}
            metalness={0.6}
            clearcoat={1}
          />
        </mesh>
        <group ref={eyes} position={[0, 0.03, 0.82]}>
          {[-0.2, 0.2].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <capsuleGeometry args={[0.065, 0.12, 6, 14]} />
              <Glow color={COLORS.eye} />
            </mesh>
          ))}
          <mesh position={[0, -0.17, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.11, 0.022, 8, 24, Math.PI]} />
            <Glow color={COLORS.eye} />
          </mesh>
        </group>
        {/* Ears */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.88, -0.02, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.27, 0.27, 0.2, 32]} />
              <Shell />
            </mesh>
            <Ring
              radius={0.27}
              tube={0.035}
              position={[side * 0.1, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <mesh
              position={[side * 0.105, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <circleGeometry args={[0.18, 28]} />
              <meshStandardMaterial
                color={side < 0 ? COLORS.purple : COLORS.cyan}
                roughness={0.3}
              />
            </mesh>
          </group>
        ))}
        {/* Antennae */}
        {[
          [-1, antL],
          [1, antR],
        ].map(([side, ref]) => (
          <group
            key={side}
            ref={ref}
            position={[side * 0.55, 0.62, 0]}
            rotation={[0, 0, side * -0.4]}
          >
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.4, 10]} />
              <Shell color={COLORS.joint} />
            </mesh>
            <mesh position={[0, 0.46, 0]}>
              <sphereGeometry args={[0.085, 20, 16]} />
              <Glow color={COLORS.eye} />
            </mesh>
            <Ring radius={0.1} tube={0.016} position={[0, 0.46, 0]} />
          </group>
        ))}
      </group>
    </group>
  );
}
