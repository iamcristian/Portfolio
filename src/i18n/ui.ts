import en from "./en.json";
import es from "./es.json";

export const languages = {
  en: "English",
  es: "Español",
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = "en";

export const ui = { en, es } as const;

export function isValidLanguage(lang: string): lang is Language {
  return lang in languages;
}
