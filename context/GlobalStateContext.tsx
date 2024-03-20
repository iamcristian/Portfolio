"use client"

import React, { createContext, useState } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'es';

interface GlobalStateContextProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

export const GlobalStateContext = createContext<GlobalStateContextProps>({
  theme: 'light',
  setTheme: () => { },
  language: 'en',
  setLanguage: () => { },
});

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');

  return (
    <GlobalStateContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </GlobalStateContext.Provider>
  );
};