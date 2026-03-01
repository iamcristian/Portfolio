/**
 * Shared types used across the application
 * Only include types that are actually needed and not inferred
 */

// View mode for grid/list toggle
export type ViewMode = "grid" | "list";

// Language type
export type Language = "en" | "es";

// Table of Contents heading
export interface Heading {
  slug: string;
  text: string;
  depth: number;
}
