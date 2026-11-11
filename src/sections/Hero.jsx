import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            {/* Light the robot with the colors of the painted sky */}
            <ambientLight intensity={0.9} color="#7a57db" />
            <directionalLight position={[4, 2, -3]} intensity={3} color="#ff9a5c" />
            <pointLight position={[-3, 2, 2]} intensity={14} color="#ca2f8c" />
            <pointLight position={[2, -2, 3]} intensity={10} color="#33c2cc" />
            <Environment resolution={128}>
              <Lightformer form="rect" intensity={3} color="#ff8a50" position={[0, 1, -6]} scale={[14, 4, 1]} />
              <Lightformer form="rect" intensity={2} color="#ca2f8c" position={[-6, 3, 2]} rotation-y={Math.PI / 2} scale={[8, 6, 1]} />
              <Lightformer form="rect" intensity={2} color="#33c2cc" position={[5, -2, 3]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
              <Lightformer form="rect" intensity={1.5} color="#7a57db" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
            </Environment>
            <Float>
              <Astronaut
                scale={isMobile && 0.23}
                position={isMobile && [0, -1.5, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
