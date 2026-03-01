/**
 * Application-wide constants
 * Centralized configuration for consistent values across the app
 */

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

export const SITE_CONFIG = {
  name: "Cristian Arando",
  title: "Software Developer Portfolio",
  url: "https://cristianarando.netlify.app",
  author: {
    name: "Cristian Arando",
    email: "crisarandosyse@gmail.com",
    github: "https://github.com/iamcristian",
    linkedin: "https://linkedin.com/in/cristianarando",
  },
} as const;

// =============================================================================
// THEME CONFIGURATION
// =============================================================================

export const THEMES = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "cyberpunk", label: "Cyberpunk" },
  { key: "forest", label: "Forest" },
  { key: "dracula", label: "Dracula" },
  { key: "lofi", label: "Lofi" },
] as const;

export type ThemeKey = (typeof THEMES)[number]["key"];

// =============================================================================
// NAVIGATION
// =============================================================================

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/cristianarando",
    icon: "linkedin",
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    name: "GitHub",
    url: "https://github.com/iamcristian",
    icon: "github",
    ariaLabel: "Visit GitHub profile",
  },
  {
    name: "Email",
    url: "mailto:crisarandosyse@gmail.com",
    icon: "mail",
    ariaLabel: "Send an email",
  },
] as const;

// =============================================================================
// CONTENT CONFIGURATION
// =============================================================================

export const BLOG_CONFIG = {
  postsPerPage: 9,
  excerptLength: 300,
  defaultReadTime: "5 min",
} as const;

export const PROJECTS_CONFIG = {
  projectsPerPage: 9,
  defaultCategory: "All",
} as const;
