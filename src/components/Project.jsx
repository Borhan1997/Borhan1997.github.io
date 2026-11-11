import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  sourceCode,
  image,
  tags,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      <div className="flex flex-col overflow-hidden border rounded-2xl border-white/10 bg-gradient-to-l from-midnight to-navy hover-animation">
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
            onClick={() => setIsHidden(true)}
            className="flex items-center gap-1 pt-5 mt-auto cursor-pointer hover-animation w-fit"
          >
            Read More
            <img src="assets/arrow-right.svg" className="w-5" />
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
