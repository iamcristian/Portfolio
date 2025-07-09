import { useReducer } from "react";

type ViewMode = "grid" | "list";

interface State {
  searchTerm: string;
  selectedTags: string[];
  viewMode: ViewMode;
}

type Action =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_SELECTED_TAGS"; payload: string[] }
  | { type: "SET_VIEW_MODE"; payload: ViewMode };

const initialState: State = {
  searchTerm: "",
  selectedTags: [],
  viewMode: "grid",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SELECTED_TAGS":
      return { ...state, selectedTags: action.payload };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    default:
      return state;
  }
}

export function useBlogFilter(posts: any[]) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredPosts = posts
    .filter((post) => {
      const term = state.searchTerm.toLowerCase();
      const matchesText =
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag: string) => tag.toLowerCase().includes(term));
      const matchesTags =
        state.selectedTags.length === 0 ||
        state.selectedTags.some((tag) => post.tags.includes(tag));
      return matchesText && matchesTags;
    })
    .sort((a, b) => {
      // Sort by featured first, then by date
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
      return dateDiff;
    });

  return { state, dispatch, filteredPosts };
}
