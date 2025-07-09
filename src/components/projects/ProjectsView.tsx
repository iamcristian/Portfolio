import { ProjectCard } from "./ProjectCard";
import { useFilter } from "./useFilter";

interface Props {
  projects: {
    title: string;
    description: string;
    tech: string[];
    category: string;
    year: number;
    image: string;
    linkRepository: string;
    linkDemo: string;
    featured: boolean;
  }[];
  categories: string[];
  t: any;
}

export default function ProjectsView({ projects, categories, t }: Props) {
  const {
    state,
    dispatch,
    filteredItems: filteredProjects,
  } = useFilter(projects);

  return (
    <div className="space-y-8 flex flex-col items-center">
      {/* Hero */}
      <h1 className="text-2xl md:text-6xl font-bold tracking-tighter text-center">
        {t.title}
      </h1>
      {/* Search Bar */}
      <label className="input md:w-1/3">
        <span className="sr-only">search</span>
        <svg className="h-4 opacity-50" viewBox="0 0 24 24">
          <use href="#icon-search" />
        </svg>
        <input
          type="search"
          required
          placeholder={t.searchPlaceholder}
          value={state.searchTerm}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
          }
        />
      </label>

      {/* Filters */}
      <section className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Category*/}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  dispatch({ type: "SET_CATEGORY", payload: category })
                }
                className={`btn ${
                  state.selectedCategory === category
                    ? "btn-outline"
                    : "bg-white text-base-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch({ type: "SET_VIEW_MODE", payload: "grid" })
              }
              className={`btn ${
                state.viewMode === "grid"
                  ? "btn-outline"
                  : "bg-white text-base-100"
              }`}
            >
              <svg className="w-5">
                <use href="#icon-grid" />
              </svg>
            </button>
            <button
              onClick={() =>
                dispatch({ type: "SET_VIEW_MODE", payload: "list" })
              }
              className={`btn ${
                state.viewMode === "list"
                  ? "btn-outline disabled"
                  : "bg-white text-base-100"
              }`}
            >
              <svg className="w-5">
                <use href="#icon-list" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div
              className={
                state.viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-8"
              }
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  sourceCodeText={t.sourceCode}
                  liveDemoText={t.liveDemo}
                  viewMode={state.viewMode}
                  featured={t.featured}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg mb-4">{t.noProjectsMatch}</p>
              <button
                onClick={() => {
                  dispatch({ type: "SET_SEARCH_TERM", payload: "" });
                  dispatch({ type: "SET_CATEGORY", payload: "All" });
                }}
                className="btn btn-outline"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
