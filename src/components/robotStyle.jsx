import { RoundedBox } from "@react-three/drei";

export const COLORS = {
  steel: "#a98378",
  dark: "#5a3b5e",
  screen: "#030412",
  eye: "#33e0d0",
  trim: "#c4684c",
  tip: "#ca2f8c",
};

// Same 6.67 s loop as the model's idle animation.
export const W = (Math.PI * 2) / 6.667;

// Matte painted plating: no gloss, no glow. Colors come from the
// background palette and are shaded by the scene lights only.
export const Material = ({ color }) => (
  <meshStandardMaterial
    color={color}
    metalness={0.05}
    roughness={0.85}
    envMapIntensity={0.25}
  />
);

export const Plate = ({
  size,
  radius,
  color,
  position = [0, 0, 0],
  ...props
}) => (
  <RoundedBox
    args={size}
    radius={radius}
    smoothness={5}
    position={position}
    {...props}
  >
    <Material color={color} />
  </RoundedBox>
);

export const Ball = ({ radius, color, position = [0, 0, 0] }) => (
  <mesh position={position}>
    <sphereGeometry args={[radius, 32, 24]} />
    <Material color={color} />
  </mesh>
);
