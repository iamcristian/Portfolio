interface Project {
  title: string;
  description: string;
  tech: string[];
  category: string;
  year: number;
  image: string;
  linkRepository: string;
  linkDemo: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  sourceCodeText: string;
  liveDemoText: string;
  viewMode: "grid" | "list";
  featured: string;
}

export const ProjectCard = ({
  project,
  sourceCodeText,
  liveDemoText,
  viewMode,
  featured,
}: ProjectCardProps) => {
  return (
    <div
      className={`border rounded-2xl ${
        viewMode === "list" ? "flex items-center p-4 gap-4" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative ${viewMode === "list" ? "w-1/3 md:w-1/5" : "aspect-video"}`}
      >
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover ${
            viewMode === "list" ? "rounded-l-2xl" : "rounded-t-2xl"
          }`}
        />
        {project.featured && (
          <div className="badge badge-ghost absolute top-4 left-4 z-10">
            {featured}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`${
          viewMode === "list" ? "flex-1 space-y-2" : "p-6 space-y-4"
        }`}
      >
        <div className="space-x-4 text-sm">
          <span className="uppercase">{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p
          className={`leading-relaxed text-sm ${
            viewMode === "list" ? "line-clamp-2" : "line-clamp-3"
          }`}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tech.map((tech: string) => (
            <kbd key={tech} className="kbd">{tech}</kbd>
          ))}
        </div>
        <div className="space-x-2">
          <a
            href={project.linkRepository}
            className="btn btn-outline space-x-2"
          >
            <svg className="w-4 h-4">
              <use href="#icon-github" />
            </svg>
            <span>{sourceCodeText}</span>
          </a>
          <a
            href={project.linkDemo}
            className="btn bg-white text-base-100 space-x-2"
          >
            <span>{liveDemoText}</span>
            <svg className="w-4 h-4">
              <use href="#icon-external-link" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
