import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://cristianarando.netlify.app",

  // Vite configuration
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimize chunk size for better caching
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
          },
        },
      },
    },
  },

  // i18n configuration
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  // Build options
  build: {
    inlineStylesheets: "auto",
  },

  // Integrations
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          es: "es",
        },
      },
      // Customize sitemap entries for better SEO
      serialize(item) {
        // Home pages - highest priority
        if (item.url.endsWith("/en/") || item.url.endsWith("/es/")) {
          item.priority = 1.0;
          item.changefreq = "weekly";
        }
        // Blog and Projects list pages
        else if (item.url.includes("/blog/") && !item.url.includes("/blog/")) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        } else if (
          item.url.endsWith("/blog/") ||
          item.url.endsWith("/projects/")
        ) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        }
        // Individual blog posts - high priority for indexing
        else if (item.url.includes("/blog/")) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        }
        // Default for other pages
        else {
          item.priority = 0.7;
          item.changefreq = "monthly";
        }
        return item;
      },
    }),
  ],

  // Prefetch configuration for faster navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
