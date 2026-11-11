import { useMemo } from "react";
import { createPortal } from "@react-three/fiber";
import { Matrix4, Quaternion, Vector3 } from "three";
import { Ball, COLORS, Plate } from "./robotStyle";

const Y = new Vector3(0, 1, 0);

// Bones are named like "upper_arm.L_metarig"; the loader strips the dots.
const bone = (nodes, name) => nodes[name.replace(/\./g, "")];

/**
 * Robot body built from simple parts that ride on the model's skeleton, so
 * it moves with the original animation. Each limb part runs along its bone,
 * from the bone's origin to its child's origin.
 */
function Limb({ from, to, radius, color }) {
  const { length, quaternion } = useMemo(() => {
    const v = to.position.clone();
    return {
      length: v.length(),
      quaternion: new Quaternion().setFromUnitVectors(Y, v.normalize()),
    };
  }, [to]);
  return createPortal(
    <group quaternion={quaternion}>
      <Plate
        size={[radius * 2, length * 0.8, radius * 2]}
        radius={radius * 0.8}
        color={color}
        position={[0, length / 2, 0]}
      />
    </group>,
    from
  );
}

function Joint({ at, radius }) {
  return createPortal(
    <Ball radius={radius} color={COLORS.trim} />,
    at
  );
}

function Torso({ nodes }) {
  const torso = bone(nodes, "spine.003_metarig");
  // The shoulders define which way is "sideways" in the torso's frame.
  const basis = useMemo(() => {
    const side = bone(nodes, "upper_arm.R_metarig").position
      .clone()
      .sub(bone(nodes, "upper_arm.L_metarig").position)
      .setY(0)
      .normalize();
    const up = Y;
    const front = new Vector3().crossVectors(side, up);
    return new Quaternion().setFromRotationMatrix(
      new Matrix4().makeBasis(side, up, front)
    );
  }, [nodes]);
  return createPortal(
    <group quaternion={basis}>
      {/* Chest */}
      <Plate
        size={[3.2, 2.6, 2.2]}
        radius={0.7}
        color={COLORS.steel}
        position={[0, 0.5, 0]}
      />
      {/* Chest light */}
      <mesh position={[0, 0.6, 1.25]}>
        <circleGeometry args={[0.35, 16]} />
        <meshBasicMaterial color={COLORS.trim} toneMapped={false} />
      </mesh>
      {/* Waist and pelvis */}
      <Plate
        size={[2.6, 1.6, 2]}
        radius={0.5}
        color={COLORS.dark}
        position={[-0.1, -2.1, 0]}
      />
      {/* Neck */}
      <Plate
        size={[1.1, 0.6, 1.1]}
        radius={0.25}
        color={COLORS.trim}
        position={[0, 2.0, 0]}
      />
    </group>,
    torso
  );
}

export function RobotBody({ nodes }) {
  const b = (name) => bone(nodes, name);
  const limbs = [];
  for (const s of ["L", "R"]) {
    limbs.push(
      // Arms
      [`upper_arm.${s}_metarig`, `forearm.${s}_metarig`, 0.5, COLORS.steel],
      [`forearm.${s}_metarig`, `hand.${s}.001_metarig`, 0.45, COLORS.dark],
      // Legs
      [`thigh.${s}_metarig`, `shin.${s}_metarig`, 0.7, COLORS.steel],
      [`shin.${s}_metarig`, `foot.${s}_metarig`, 0.55, COLORS.dark],
      [`foot.${s}_metarig`, `toe.${s}_metarig`, 0.65, COLORS.steel]
    );
  }
  const joints = [];
  for (const s of ["L", "R"]) {
    joints.push(
      [`upper_arm.${s}_metarig`, 0.47],
      [`forearm.${s}_metarig`, 0.36],
      [`hand.${s}.001_metarig`, 0.43],
      [`thigh.${s}_metarig`, 0.58],
      [`shin.${s}_metarig`, 0.43],
      [`foot.${s}_metarig`, 0.4]
    );
  }
  return (
    <>
      <Torso nodes={nodes} />
      {limbs.map(([from, to, radius, color]) => (
        <Limb
          key={from + to}
          from={b(from)}
          to={b(to)}
          radius={radius}
          color={color}
        />
      ))}
      {joints.map(([name, radius]) => (
        <Joint key={name} at={b(name)} radius={radius} />
      ))}
    </>
  );
}
