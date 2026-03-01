type ViewMode = "grid" | "list";

interface Project {
  title: string;
  description: string;
  tech: string[];
  category: string;
  year: number;
  image: string;
  linkRepository: string;
  linkDemo?: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  sourceCodeText: string;
  liveDemoText: string;
  viewMode: ViewMode;
  featured: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const ProjectCard = ({
  project,
  sourceCodeText,
  liveDemoText,
  viewMode,
  featured,
}: ProjectCardProps) => {
  const isListView = viewMode === "list";

  return (
    <div
      className={`border rounded-2xl transition-shadow hover:shadow-lg ${
        isListView ? "flex items-center p-4 gap-4" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative ${isListView ? "w-1/3 md:w-1/5" : "aspect-video"}`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          width={400}
          height={300}
          className={`w-full h-full object-cover ${
            isListView ? "rounded-l-2xl" : "rounded-t-2xl"
          }`}
        />
        {project.featured && (
          <div className="badge badge-ghost absolute top-4 left-4 z-10">
            {featured}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={isListView ? "flex-1 space-y-2" : "p-6 space-y-4"}>
        {/* Meta info */}
        <div className="space-x-4 text-sm">
          <span className="uppercase">{project.category}</span>
          <span>{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold">{project.title}</h3>

        {/* Description */}
        <p
          className={`leading-relaxed text-sm ${
            isListView ? "line-clamp-2" : "line-clamp-3"
          }`}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1">
          {project.tech.map((tech) => (
            <kbd key={tech} className="kbd">
              {tech}
            </kbd>
          ))}
        </div>

        {/* Links */}
        <div className="space-x-2">
          <a
            href={project.linkRepository}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline space-x-2"
          >
            <svg className="w-4 h-4">
              <use href="#icon-github" />
            </svg>
            <span>{sourceCodeText}</span>
          </a>
          {project.linkDemo && (
            <a
              href={project.linkDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-base-100 space-x-2"
            >
              <span>{liveDemoText}</span>
              <svg className="w-4 h-4">
                <use href="#icon-external-link" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
