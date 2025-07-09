import { useReducer } from "react";

type ViewMode = "grid" | "list";

interface State {
  selectedCategory: string;
  searchTerm: string;
  viewMode: ViewMode;
}

type Action =
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_VIEW_MODE"; payload: ViewMode };

const initialState: State = {
  selectedCategory: "All",
  searchTerm: "",
  viewMode: "grid",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    default:
      return state;
  }
}

export function useFilter<
  T extends {
    category: string;
    title: string;
    description: string;
    tech: string[];
  }
>(items: T[]) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      state.selectedCategory === "All" ||
      item.category === state.selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      item.tech.some((tech) =>
        tech.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return { state, dispatch, filteredItems };
}
