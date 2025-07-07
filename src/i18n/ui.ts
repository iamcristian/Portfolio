import en from "./en.json";
import es from "./es.json";

export const languages = {
  en: "English",
  es: "Español",
};

export const defaultLang = "en";

export const ui = {
  en,
  es,
} as const;
