import { useBlogFilter } from "@/hooks/useFilter";
import { PostCard } from "./PostCard";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: Date;
  readTime: string;
  tags: string[];
  image: { src: string; alt: string };
  featured: boolean;
  author: string;
  authorContact: string;
}

interface BlogViewProps {
  posts: Post[];
  lang: "en" | "es";
  tags: string[];
  t: {
    title: string;
    searchPlaceholder: string;
    featured: string;
    noPostsMatch: string;
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

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

const TagFilter = ({ tags, selectedTags, onToggle }: TagFilterProps) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <button
        key={tag}
        onClick={() => onToggle(tag)}
        className={`btn ${selectedTags.includes(tag) ? "btn-outline" : ""}`}
      >
        {tag}
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
        currentView === "grid" ? "btn-outline" : "bg-base-content text-base-100"
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
        currentView === "list" ? "btn-outline" : "bg-base-content text-base-100"
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

const BlogView = ({ posts, tags, t, lang }: BlogViewProps) => {
  const { state, dispatch, filteredPosts } = useBlogFilter(posts);

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
          <TagFilter
            tags={tags}
            selectedTags={state.selectedTags}
            onToggle={(tag) => dispatch({ type: "TOGGLE_TAG", payload: tag })}
          />
          <ViewToggle
            currentView={state.viewMode}
            onChangeView={(view) =>
              dispatch({ type: "SET_VIEW_MODE", payload: view })
            }
          />
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl w-full mx-auto">
        {filteredPosts.length > 0 ? (
          <div
            className={
              state.viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-8"
            }
          >
            {filteredPosts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                viewMode={state.viewMode}
                lang={lang}
                featuredText={t.featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg mb-4">{t.noPostsMatch}</p>
            <button onClick={handleClearFilters} className="btn btn-outline">
              {t.clearFilters}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogView;
