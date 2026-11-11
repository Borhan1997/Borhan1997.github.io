import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Matrix4, Vector3 } from "three";
import { COLORS, Material, Plate, W } from "./robotStyle";

const ONE = new Vector3(1, 1, 1);
const m = new Matrix4();
const inv = new Matrix4();

const STEEL = COLORS.steel;
const SCREEN = COLORS.screen;
const EYE = COLORS.eye;
const TRIM = COLORS.trim;

/**
 * Screen-face bot head that replaces the astronaut's helmet.
 * This head follows the head bone (position + rotation only) every frame.
 */
export function RobotHead({ nodes }) {
  const ref = useRef();
  const eyes = useRef();
  const face = useRef();
  const antenna = useRef();

  useFrame((state) => {
    const bone = nodes.spine006_metarig;
    const parent = bone.parent;
    // Runs after the animation mixer, so the bone's local transform is current.
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
    const t = state.clock.elapsedTime;
    eyes.current.scale.y = t % 4 < 0.15 ? 0.1 : 1;
    // Follow-through on the body's loop: the head floats a little behind
    // the neck and the antenna sways, like the drifting cables.
    face.current.rotation.z = Math.sin(t * W + 0.8) * 0.07;
    face.current.rotation.x = Math.sin(t * W * 2 + 0.3) * 0.05;
    antenna.current.rotation.z = Math.sin(t * W * 2 + 1.5) * 0.35;
    antenna.current.rotation.x = Math.sin(t * W * 2 + 3) * 0.25;
  });

  return (
    <>
      <group ref={ref}>
        <group ref={face} position={[0, 1.0, 0.2]} scale={0.62}>
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
          <group ref={antenna} position={[0, 1.9, 0]}>
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.9, 8]} />
              <Material color={TRIM} />
            </mesh>
            <mesh position={[0, 1.05, 0]}>
              <icosahedronGeometry args={[0.3, 0]} />
              <meshBasicMaterial color="#ca2f8c" toneMapped={false} />
            </mesh>
          </group>
          {/* Cyan trim band, like the suit's painted stripes */}
          <Plate
            size={[4.7, 0.35, 3.9]}
            radius={0.12}
            color={TRIM}
            position={[0, 1.2, 0]}
          />
        </group>
      </group>
    </>
  );
}
