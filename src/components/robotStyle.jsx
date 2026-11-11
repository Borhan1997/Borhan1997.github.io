import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { DataTexture, NearestFilter, RedFormat } from "three";

export const COLORS = {
  steel: "#4a4f8a",
  dark: "#363a73",
  screen: "#030412",
  eye: "#57db96",
  trim: "#33c2cc",
  tip: "#ca2f8c",
};

// Same 6.67 s loop as the model's idle animation.
export const W = (Math.PI * 2) / 6.667;

const OUTLINE = 0.2;

// Three flat shading steps, like the painted shading of the original model.
export const useCelGradient = () =>
  useMemo(() => {
    const tex = new DataTexture(new Uint8Array([90, 170, 255]), 3, 1, RedFormat);
    tex.minFilter = tex.magFilter = NearestFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);

// A faceted cel-shaded box with a thick black outline.
export const Plate = ({
  size,
  radius,
  color,
  gradient,
  position = [0, 0, 0],
  ...props
}) => (
  <group position={position} {...props}>
    <RoundedBox args={size} radius={radius} smoothness={2}>
      <meshToonMaterial color={color} gradientMap={gradient} />
    </RoundedBox>
    <RoundedBox
      args={size.map((s) => s + OUTLINE)}
      radius={radius}
      smoothness={2}
    >
      <meshBasicMaterial color="#000000" side={1} />
    </RoundedBox>
  </group>
);

// A cel-shaded sphere with an outline.
export const Ball = ({ radius, color, gradient, position = [0, 0, 0] }) => (
  <group position={position}>
    <mesh>
      <sphereGeometry args={[radius, 16, 12]} />
      <meshToonMaterial color={color} gradientMap={gradient} />
    </mesh>
    <mesh>
      <sphereGeometry args={[radius + OUTLINE / 2, 16, 12]} />
      <meshBasicMaterial color="#000000" side={1} />
    </mesh>
  </group>
);
