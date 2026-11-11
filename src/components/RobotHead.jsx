import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Matrix4, Vector3 } from "three";

const ONE = new Vector3(1, 1, 1);
const m = new Matrix4();
const inv = new Matrix4();

const STEEL = "#4a4f8a";
const SCREEN = "#030412";
const EYE = "#57db96";
const TRIM = "#33c2cc";

// A box with a black outline, to match the hand-drawn look of the model.
const Plate = ({ size, radius, color, position = [0, 0, 0] }) => (
  <group position={position}>
    <RoundedBox args={size} radius={radius} smoothness={4}>
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
    </RoundedBox>
    <RoundedBox
      args={size.map((s) => s + 0.18)}
      radius={radius}
      smoothness={4}
    >
      <meshBasicMaterial color="#000000" side={1} />
    </RoundedBox>
  </group>
);

/**
 * Screen-face bot head that replaces the astronaut's helmet.
 * The helmet is hidden by collapsing the head bone, and this head
 * follows that bone (position + rotation only) every frame.
 */
export function RobotHead({ nodes }) {
  const ref = useRef();
  const eyes = useRef();

  useFrame((state) => {
    const bone = nodes.spine006_metarig;
    const parent = bone.parent;
    // Runs after the animation mixer, so the bone's local transform is current.
    bone.scale.setScalar(0.0001);
    parent.updateWorldMatrix(true, false);
    m.compose(bone.position, bone.quaternion, ONE).premultiply(
      parent.matrixWorld
    );
    inv.copy(ref.current.parent.matrixWorld).invert();
    m.premultiply(inv).decompose(
      ref.current.position,
      ref.current.quaternion,
      ref.current.scale
    );
    // Blink every few seconds.
    eyes.current.scale.y = state.clock.elapsedTime % 4 < 0.15 ? 0.1 : 1;
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 10]} intensity={2.5} />
      <group ref={ref}>
        <group position={[0, 1.2, 0.2]} scale={0.72}>
          <Plate size={[4.6, 3.8, 3.8]} radius={0.9} color={STEEL} />
          {/* Screen face */}
          <Plate
            size={[3.4, 2.2, 0.3]}
            radius={0.45}
            color={SCREEN}
            position={[0, 0, 1.95]}
          />
          <group ref={eyes} position={[0, 0.15, 2.2]}>
            {[-0.8, 0.8].map((x) => (
              <mesh key={x} position={[x, 0, 0]}>
                <capsuleGeometry args={[0.28, 0.5, 4, 12]} />
                <meshBasicMaterial color={EYE} toneMapped={false} />
              </mesh>
            ))}
            <mesh position={[0, -0.75, 0]} rotation={[0, 0, Math.PI]}>
              <torusGeometry args={[0.4, 0.07, 8, 24, Math.PI]} />
              <meshBasicMaterial color={EYE} toneMapped={false} />
            </mesh>
          </group>
          {/* Ear panels */}
          {[-2.5, 2.5].map((x) => (
            <Plate
              key={x}
              size={[0.6, 1.6, 1.2]}
              radius={0.25}
              color={TRIM}
              position={[x, 0, 0]}
            />
          ))}
          {/* Antenna */}
          <mesh position={[0, 2.35, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.9, 12]} />
            <meshStandardMaterial color={TRIM} />
          </mesh>
          <mesh position={[0, 2.95, 0]}>
            <sphereGeometry args={[0.28, 16, 16]} />
            <meshBasicMaterial color="#ca2f8c" toneMapped={false} />
          </mesh>
        </group>
      </group>
    </>
  );
}
