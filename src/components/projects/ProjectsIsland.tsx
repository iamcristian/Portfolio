import { useState } from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  year: string;
  status: string;
  github: string;
  demo: string;
  featured: boolean;
  metrics: Record<string, string>;
}

interface Props {
  projects: Project[];
  lang: string;
}

export default function ProjectsIsland({ projects, lang }: Props) {
  const [sel, setSel] = useState("All");
  const cats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = projects.filter((p) => sel === "All" || p.category === sel);
  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2">
          <a href={`/${lang}`}>Home</a>
          {/* <ChevronRight className="w-4 h-4" /> */}
          <span>Projects</span>
        </nav>
      </div>

      {/* Header & Filter */}
      <section className="py-20 px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-light mb-4">
          Selected
          <br />
          <span className="font-medium">Projects</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          A curated collection of projects showcasing expertise in modern web
          technologies, AI, and system architecture.
        </p>
        <div className="flex justify-center mb-16">
          <div className="bg-gray-50 rounded-2xl p-2 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setSel(c)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition ${
                  sel === c ? "btn btn-primary" : "btn btn-ghost"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-light mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" /> Featured Projects
            </h2>
            <div className="space-y-32">
              {featured.map((p, i) => (
                <div
                  key={p.id}
                  className="border grid lg:grid-cols-2 gap-16 items-center"
                >
                  {/* Visual */}
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="aspect-video rounded-3xl relative">
                      <div className="absolute top-6 right-6">
                        <div className="flex items-center rounded-full px-4 py-2 space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              p.status === "Live"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          <span className="text-sm font-medium">
                            {p.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Info */}
                  <div
                    className={
                      i % 2 === 1 ? "lg:order-1 space-y-6" : "space-y-6"
                    }
                  >
                    <div className="flex items-center text-sm space-x-4">
                      <span className="uppercase tracking-wider">
                        {p.category}
                      </span>
                      <div className="w-1 h-1 rounded-full" />
                      <div className="flex items-center space-x-1">
                        {/* <Calendar className="w-4 h-4" /> */}
                        <span>{p.year}</span>
                      </div>
                    </div>
                    <h3 className="text-4xl">{p.title}</h3>
                    <p className="text-lg leading-relaxed">
                      {p.longDescription}
                    </p>
                    <div className="grid grid-cols-3 gap-6 py-6">
                      {Object.entries(p.metrics).map(([k, v]) => (
                        <div key={k} className="text-center">
                          <div className="text-2xl font-light mb-1">{v}</div>
                          <div className="text-sm capitalize">{k}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {p.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-4 py-2 rounded-full text-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-6">
                      <a
                        href={p.github}
                        className="flex items-center px-6 py-3"
                      >
                        {/* <Github className="w-4 h-4 mr-2" /> */}
                        View Code
                      </a>
                      <a href={p.demo} className="flex items-center">
                        Live Demo
                        {/* <ExternalLink className="w-4 h-4 ml-2" /> */}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      {regular.length > 0 && (
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-light mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" /> All Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regular.map((p) => (
                <div key={p.id} className="border rounded-2xl">
                  <div className="aspect-video relative">
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center rounded-full px-3 py-1 space-x-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.status === "Live"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        <span className="text-xs">{p.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-sm flex items-center gap-2 mb-4">
                      <span className="uppercase">{p.category}</span>
                      <div className="w-1 h-1 rounded-full" />
                      <span>{p.year}</span>
                    </div>
                    <h3 className="text-xl font-medium mb-3">{p.title}</h3>
                    <p className="text-sm mb-6">{p.description}</p>
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4">
                      {Object.entries(p.metrics)
                        .slice(0, 3)
                        .map(([k, v]) => (
                          <div key={k} className="text-center">
                            <div className="text-lg font-light">{v}</div>
                            <div className="text-xs capitalize">{k}</div>
                          </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-6">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 rounded-full text-xs"
                        >
                          {t}
                        </span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="px-2 py-1 rounded-full text-xs">
                          +{p.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <a href={p.github} className="">
                        {/* <Github className="w-5 h-5" /> */}
                      </a>
                      <a href={p.demo} className="flex items-center text-sm">
                        {/* View Project <ChevronRight className="w-4 h-4 ml-2" /> */}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
