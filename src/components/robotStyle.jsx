import { RoundedBox } from "@react-three/drei";

export const COLORS = {
  steel: "#c98a7a",
  dark: "#6b3a67",
  screen: "#030412",
  eye: "#33e0d0",
  trim: "#ea6a4a",
  tip: "#ca2f8c",
};

// Same 6.67 s loop as the model's idle animation.
export const W = (Math.PI * 2) / 6.667;

// Brushed-metal plating, glossy glass for the screen and softly glowing
// trim, all lit by the sunset colors of the background.
export const Material = ({ color }) => {
  if (color === COLORS.screen) {
    return (
      <meshPhysicalMaterial
        color={color}
        metalness={0.9}
        roughness={0.05}
        clearcoat={1}
        envMapIntensity={1.4}
      />
    );
  }
  if (color === COLORS.trim) {
    return (
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.4}
      />
    );
  }
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.75}
      roughness={0.32}
      envMapIntensity={1.3}
    />
  );
};

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
