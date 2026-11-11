import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Loader from "../components/Loader";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  // Same slow, heavily damped scroll parallax as the background layers:
  // the robot sits at mid depth, between the near and far mountains.
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  const robotY = useTransform(x, [0, 0.5], ["0%", "40%"]);
  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />
      <motion.figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh", y: robotY }}
      >
        <Canvas
          camera={{ position: [0, 1, 4.2] }}
          gl={{ toneMappingExposure: 0.95 }}
        >
          <Suspense fallback={<Loader />}>
            {/* Cinematic grade: warm key from the horizon, teal bounce from
                the lagoon below, magenta kicker from the sky */}
            <hemisphereLight args={["#ff9a5c", "#1f6f7a", 0.3]} />
            <directionalLight position={[4, 2, -3]} intensity={2.2} color="#ff8a50" />
            <pointLight position={[-3, 2, 2]} intensity={2} color="#ca2f8c" />
            <pointLight position={[2, -2, 3]} intensity={2.5} color="#33c2cc" />
            <fog attach="fog" args={["#2a0f3a", 5, 14]} />
            <Environment resolution={128}>
              <Lightformer form="rect" intensity={3} color="#ff8a50" position={[0, 1, -6]} scale={[14, 4, 1]} />
              <Lightformer form="rect" intensity={2} color="#ca2f8c" position={[-6, 3, 2]} rotation-y={Math.PI / 2} scale={[8, 6, 1]} />
              <Lightformer form="rect" intensity={2} color="#33c2cc" position={[5, -2, 3]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
              <Lightformer form="rect" intensity={1.5} color="#7a57db" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
            </Environment>
            <Float speed={0.7} rotationIntensity={0.6} floatIntensity={1.2}>
              <Astronaut
                scale={isMobile && 0.23}
                position={isMobile && [0, -1.5, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
        {/* Film look: soft vignette and fine grain over the 3D layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 60% 50%, transparent 45%, rgba(3,4,18,0.55) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </motion.figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Slow push-in at the start, then a gentle handheld drift on top of
    // the mouse parallax.
    const dolly = 3 + 1.2 * Math.exp(-t / 2.5);
    easing.damp3(
      state.camera.position,
      [
        state.mouse.x / 10 + Math.sin(t * 0.25) * 0.08,
        1 + state.mouse.y / 10 + Math.sin(t * 0.18) * 0.05,
        dolly,
      ],
      0.8,
      delta
    );
  });
}

export default Hero;
