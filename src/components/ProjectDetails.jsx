import { motion } from "motion/react";
const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  sourceCode,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className="relative max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute z-10 p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500"
        >
          <img src="assets/close.svg" className="w-6 h-6" />
        </button>
        <div className="relative overflow-hidden group/cover rounded-t-2xl">
          <img
            src={image}
            alt={title}
            className="w-full transition duration-300 group-hover/cover:blur-sm group-hover/cover:brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 opacity-0 group-hover/cover:opacity-100">
            {[
              { label: "View Project", url: href },
              { label: "Source Code", url: sourceCode },
            ].map(({ label, url }) => (
              <a
                key={label}
                href={url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!url}
                title={url ? undefined : "Link coming soon"}
                className={`inline-flex items-center gap-1 px-5 py-2 font-medium text-white border rounded-full bg-midnight/80 border-white/20 hover-animation ${
                  url ? "cursor-pointer hover:bg-midnight" : "cursor-not-allowed opacity-60"
                }`}
              >
                {label}
                <img src="assets/arrow-up.svg" className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p className="mb-3 font-normal text-neutral-400">{subDesc}</p>
          ))}
          <div className="mt-4">
            <div className="flex flex-wrap items-center justify-evenly gap-3">
              {tags.map((tag) => (
                <div key={tag.id} className="relative group">
                  <img
                    src={tag.path}
                    alt={tag.name}
                    className="rounded-lg size-10 hover-animation"
                  />
                  <span className="absolute z-10 px-2 py-1 mb-2 text-xs font-medium text-white -translate-x-1/2 rounded-md opacity-0 pointer-events-none left-1/2 bottom-full whitespace-nowrap bg-midnight border border-white/10 group-hover:opacity-100 transition-opacity duration-200">
                    {tag.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
