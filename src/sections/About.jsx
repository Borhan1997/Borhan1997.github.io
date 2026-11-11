import { useRef } from "react";
import Card from "../components/Card";
import { TechSphere } from "../components/TechSphere";
import CopyEmailButton from "../components/CopyEmailButton";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Borhan Hleiss</p>
            <p className="subtext">
              Over the last 4 years, I developed my frontend and backend dev
              skills to deliver dynamic and software and web applications.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              BEYOND THE CODE
            </p>
            <Card
              style={{ rotate: "-8deg", top: "6%", left: "4%" }}
              text="Photography"
              color="#38bdf8"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "6deg", top: "8%", left: "52%" }}
              text="AI"
              color="#818cf8"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "7deg", top: "38%", left: "2%" }}
              text="Robotics"
              color="#a78bfa"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-6deg", top: "40%", left: "50%" }}
              text="Financial Markets"
              color="#f472b6"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-5deg", top: "68%", left: "8%" }}
              text="Entrepreneurship"
              color="#2dd4bf"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "8deg", top: "70%", left: "48%" }}
              text="Kickboxing"
              color="#fbbf24"
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">My Toolbox</p>
            <p className="subtext">
              The languages, frameworks and tools I build and ship with
            </p>
          </div>
          <figure className="absolute left-[48%] top-[0%]">
            <TechSphere />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
