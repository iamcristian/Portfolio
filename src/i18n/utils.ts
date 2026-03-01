import { ui, defaultLang, isValidLanguage, type Language } from "./ui";

type UI = typeof ui;
type TranslationKeys = keyof UI[typeof defaultLang];

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split("/");
  if (lang && isValidLanguage(lang)) {
    return lang;
  }
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t<K extends TranslationKeys>(key: K): UI[Language][K] {
    const dict = ui[lang] ?? ui[defaultLang];
    const fallback = ui[defaultLang];
    return (dict[key] ?? fallback[key]) as UI[Language][K];
  };
}
