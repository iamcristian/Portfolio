import { ProjectCard } from "./ProjectCard";
import { useProjectFilter } from "@/hooks/useFilter";

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

interface ProjectsViewProps {
  projects: Project[];
  categories: string[];
  t: {
    title: string;
    searchPlaceholder: string;
    sourceCode: string;
    liveDemo: string;
    featured: string;
    noProjectsMatch: string;
    clearFilters: string;
  };
}

// =============================================================================
// COMPONENTS
// =============================================================================

interface SearchBarProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, placeholder, onChange }: SearchBarProps) => (
  <label className="input md:w-1/3">
    <span className="sr-only">Search</span>
    <svg className="h-4 opacity-50" viewBox="0 0 24 24">
      <use href="#icon-search" />
    </svg>
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onSelect(category)}
        className={`btn ${
          selectedCategory === category
            ? "btn-outline"
            : "bg-white text-base-100"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);

interface ViewToggleProps {
  currentView: "grid" | "list";
  onChangeView: (view: "grid" | "list") => void;
}

const ViewToggle = ({ currentView, onChangeView }: ViewToggleProps) => (
  <div className="flex items-center gap-2">
    <button
      onClick={() => onChangeView("grid")}
      className={`btn ${
        currentView === "grid" ? "btn-outline" : "bg-white text-base-100"
      }`}
      aria-label="Grid view"
    >
      <svg className="w-5">
        <use href="#icon-grid" />
      </svg>
    </button>
    <button
      onClick={() => onChangeView("list")}
      className={`btn ${
        currentView === "list" ? "btn-outline" : "bg-white text-base-100"
      }`}
      aria-label="List view"
    >
      <svg className="w-5">
        <use href="#icon-list" />
      </svg>
    </button>
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ProjectsView({
  projects,
  categories,
  t,
}: ProjectsViewProps) {
  const { state, dispatch, filteredProjects } = useProjectFilter(projects);

  const handleClearFilters = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  return (
    <div className="space-y-8 flex flex-col items-center">
      {/* Hero */}
      <h1 className="text-2xl md:text-6xl font-bold tracking-tighter text-center">
        {t.title}
      </h1>

      {/* Search Bar */}
      <SearchBar
        value={state.searchTerm}
        placeholder={t.searchPlaceholder}
        onChange={(value) =>
          dispatch({ type: "SET_SEARCH_TERM", payload: value })
        }
      />

      {/* Filters */}
      <section className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={state.selectedCategory}
            onSelect={(category) =>
              dispatch({ type: "SET_CATEGORY", payload: category })
            }
          />
          <ViewToggle
            currentView={state.viewMode}
            onChangeView={(view) =>
              dispatch({ type: "SET_VIEW_MODE", payload: view })
            }
          />
        </div>
      </section>

      {/* Projects Grid */}
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
              <button onClick={handleClearFilters} className="btn btn-outline">
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
