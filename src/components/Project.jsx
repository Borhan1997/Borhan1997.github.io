import { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  sourceCode,
  image,
  tags,
  status = "active",
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const isActive = status === "active";
  const isWip = status === "wip";
  return (
    <>
      <div
        className={`flex flex-col overflow-hidden border rounded-2xl border-white/10 bg-gradient-to-l from-midnight to-navy ${
          isActive ? "hover-animation" : "opacity-60 grayscale"
        }`}
      >
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-48"
        />
        <div className="flex flex-col flex-1 p-5">
          <p className="text-2xl">{title}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sand">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
          <button
            onClick={() => isActive && setIsHidden(true)}
            disabled={!isActive}
            className={`flex items-center gap-2 pt-5 mt-auto w-fit ${
              isActive
                ? "cursor-pointer hover-animation"
                : "cursor-not-allowed"
            }`}
          >
            {isWip ? "Work in progress" : "Read More"}
            {isWip ? (
              <span
                role="status"
                aria-label="Work in progress"
                className="inline-block w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"
              />
            ) : (
              <img src="assets/arrow-right.svg" className="w-5" />
            )}
          </button>
        </div>
      </div>
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          sourceCode={sourceCode}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
