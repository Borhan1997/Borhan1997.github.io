import { useMemo, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  DataTexture,
  Matrix4,
  NearestFilter,
  RedFormat,
  Vector3,
} from "three";

const ONE = new Vector3(1, 1, 1);
const m = new Matrix4();
const inv = new Matrix4();

const STEEL = "#4a4f8a";
const SCREEN = "#030412";
const EYE = "#57db96";
const TRIM = "#33c2cc";

// Same 6.67 s loop as the body's idle animation.
const W = (Math.PI * 2) / 6.667;

// Three flat shading steps, like the painted shading on the body texture.
const useCelGradient = () =>
  useMemo(() => {
    const tex = new DataTexture(new Uint8Array([90, 170, 255]), 3, 1, RedFormat);
    tex.minFilter = tex.magFilter = NearestFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);

// A faceted cel-shaded box with a thick black outline, to match the
// hand-drawn look of the body.
const Plate = ({ size, radius, color, gradient, position = [0, 0, 0] }) => (
  <group position={position}>
    <RoundedBox args={size} radius={radius} smoothness={2}>
      <meshToonMaterial color={color} gradientMap={gradient} />
    </RoundedBox>
    <RoundedBox
      args={size.map((s) => s + 0.3)}
      radius={radius}
      smoothness={2}
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
  const face = useRef();
  const antenna = useRef();
  const gradient = useCelGradient();

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
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 10]} intensity={2.5} />
      <group ref={ref}>
        <group ref={face} position={[0, 1.2, 0.2]} scale={0.72}>
          <Plate size={[4.6, 3.8, 3.8]} radius={0.9} color={STEEL} gradient={gradient} />
          {/* Screen face */}
          <Plate
            size={[3.4, 2.2, 0.3]}
            radius={0.45}
            color={SCREEN}
            gradient={gradient}
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
              gradient={gradient}
              position={[x, 0, 0]}
            />
          ))}
          {/* Antenna */}
          <group ref={antenna} position={[0, 1.9, 0]}>
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.9, 8]} />
              <meshToonMaterial color={TRIM} gradientMap={gradient} />
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
            gradient={gradient}
            position={[0, 1.2, 0]}
          />
        </group>
      </group>
    </>
  );
}
