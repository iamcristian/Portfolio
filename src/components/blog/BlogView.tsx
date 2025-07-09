import { useBlogFilter } from "./useBlogFilter";
import { PostCard } from "./PostCard";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: { src: string; alt: string };
  featured: boolean;
}

interface Props {
  posts: Post[];
  lang: string;
  tags: string[];
  t: any;
}

const BlogView = ({ posts, tags, t, lang }: Props) => {
  const { state, dispatch, filteredPosts } = useBlogFilter(posts);

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
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  dispatch({
                    type: "SET_SELECTED_TAGS",
                    payload: state.selectedTags.includes(tag)
                      ? state.selectedTags.filter((t) => t !== tag)
                      : [...state.selectedTags, tag],
                  })
                }
                className={`btn ${
                  state.selectedTags.includes(tag)
                    ? "btn-outline"
                    : "bg-white text-base-100"
                }`}
              >
                {tag}
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
                  ? "btn-outline"
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

      {/* Posts */}
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
            <button
              onClick={() => {
                dispatch({ type: "SET_SEARCH_TERM", payload: "" });
                dispatch({ type: "SET_SELECTED_TAGS", payload: [] });
              }}
              className="btn btn-outline"
            >
              {t.clearFilters}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogView;
