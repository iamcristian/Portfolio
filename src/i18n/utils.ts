import { ui, defaultLang } from "./ui";

type UI = typeof ui;
type Lang = keyof UI;
type TranslationKeys = keyof UI[typeof defaultLang];

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t<K extends TranslationKeys>(key: K): UI[Lang][K] {
    const dict = ui[lang] ?? ui[defaultLang];
    const fallback = ui[defaultLang];

    return (dict[key] ?? fallback[key]) as UI[Lang][K];
  };
}
