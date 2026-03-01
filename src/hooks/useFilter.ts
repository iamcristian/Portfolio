/**
 * Generic filtering hooks for lists with search and view mode
 */

import { useReducer, useMemo } from "react";

type ViewMode = "grid" | "list";

// =============================================================================
// BASE FILTER TYPES
// =============================================================================

interface BaseFilterState {
  searchTerm: string;
  viewMode: ViewMode;
}

type BaseFilterAction =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_VIEW_MODE"; payload: ViewMode }
  | { type: "CLEAR_ALL" };

// =============================================================================
// BASE FILTER REDUCER
// =============================================================================

function createBaseReducer<S extends BaseFilterState>(initialState: S) {
  return function reducer(state: S, action: BaseFilterAction): S {
    switch (action.type) {
      case "SET_SEARCH_TERM":
        return { ...state, searchTerm: action.payload };
      case "SET_VIEW_MODE":
        return { ...state, viewMode: action.payload };
      case "CLEAR_ALL":
        return initialState;
      default:
        return state;
    }
  };
}

// =============================================================================
// BLOG FILTER HOOK
// =============================================================================

export interface BlogFilterState extends BaseFilterState {
  selectedTags: string[];
}

export type BlogFilterAction =
  | BaseFilterAction
  | { type: "SET_SELECTED_TAGS"; payload: string[] }
  | { type: "TOGGLE_TAG"; payload: string };

const blogInitialState: BlogFilterState = {
  searchTerm: "",
  selectedTags: [],
  viewMode: "grid",
};

function blogReducer(
  state: BlogFilterState,
  action: BlogFilterAction,
): BlogFilterState {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    case "SET_SELECTED_TAGS":
      return { ...state, selectedTags: action.payload };
    case "TOGGLE_TAG": {
      const tag = action.payload;
      const newTags = state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag];
      return { ...state, selectedTags: newTags };
    }
    case "CLEAR_ALL":
      return blogInitialState;
    default:
      return state;
  }
}

export interface BlogPost {
  title: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
  publishDate: Date;
}

export function useBlogFilter<T extends BlogPost>(posts: T[]) {
  const [state, dispatch] = useReducer(blogReducer, blogInitialState);

  const filteredPosts = useMemo(() => {
    const term = state.searchTerm.toLowerCase();

    return posts
      .filter((post) => {
        // Text search
        const matchesText =
          !term ||
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term));

        // Tag filter
        const matchesTags =
          state.selectedTags.length === 0 ||
          state.selectedTags.some((tag) => post.tags.includes(tag));

        return matchesText && matchesTags;
      })
      .sort((a, b) => {
        // Featured posts first, then by date
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.publishDate.getTime() - a.publishDate.getTime();
      });
  }, [posts, state.searchTerm, state.selectedTags]);

  return { state, dispatch, filteredPosts };
}

// =============================================================================
// PROJECT FILTER HOOK
// =============================================================================

export interface ProjectFilterState extends BaseFilterState {
  selectedCategory: string;
}

export type ProjectFilterAction =
  | BaseFilterAction
  | { type: "SET_CATEGORY"; payload: string };

const projectInitialState: ProjectFilterState = {
  selectedCategory: "All",
  searchTerm: "",
  viewMode: "grid",
};

function projectReducer(
  state: ProjectFilterState,
  action: ProjectFilterAction,
): ProjectFilterState {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "CLEAR_ALL":
      return projectInitialState;
    default:
      return state;
  }
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  category: string;
  featured: boolean;
  year: number;
}

export function useProjectFilter<T extends ProjectItem>(projects: T[]) {
  const [state, dispatch] = useReducer(projectReducer, projectInitialState);

  const filteredProjects = useMemo(() => {
    const term = state.searchTerm.toLowerCase();

    return projects
      .filter((project) => {
        // Category filter
        const matchesCategory =
          state.selectedCategory === "All" ||
          project.category === state.selectedCategory;

        // Text search
        const matchesSearch =
          !term ||
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.tech.some((tech) => tech.toLowerCase().includes(term));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        // Featured projects first, then by year
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.year - a.year;
      });
  }, [projects, state.searchTerm, state.selectedCategory]);

  return { state, dispatch, filteredProjects };
}
