"use client";

import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";
type Language = "en" | "es";

interface ConfigContextProps {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
}

const ConfigContext = createContext<ConfigContextProps>({
  theme: "dark",
  toggleTheme: () => {},
  language: "en",
  toggleLanguage: () => {},
});

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Language>("en");

  const toggleTheme = () => {
    if (theme === "light") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "es" : "en"));
  };

  const value: ConfigContextProps = {
    theme,
    toggleTheme,
    language,
    toggleLanguage,
  };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(ConfigContext);
};
