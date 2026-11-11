import Project from "../components/Project";
import { myProjects } from "../constants";

const Projects = () => {
  return (
    <section id="projects" className="relative c-space section-spacing">
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {myProjects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
