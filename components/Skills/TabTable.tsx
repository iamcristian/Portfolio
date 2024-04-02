"use client";

import { useEffect, useState } from "react";
import { ButtonTab } from "./ButtonTab";
import {
  BackendSkills,
  DatabasesSkills,
  FrontendSkills,
  LanguagesProgrammingSkills,
  SoftSkills,
  TestingSkills,
} from "./TabContent";
import { useAppContext } from "@/context/ConfigContext";

import esTranslations from "../../translations/es.json";
import enTranslations from "../../translations/en.json";

export const TabTable = () => {
  const { language } = useAppContext();
  const translations = language === "es" ? esTranslations : enTranslations;
  const { tabs } = translations.skills as { tabs: string[] };

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(() => {
    setSelectedTab(tabs[0]);
  }, [language, tabs]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const getTabContent = () => {
    switch (selectedTab) {
      case tabs[0]:
        return <LanguagesProgrammingSkills />;
      case tabs[1]:
        return <FrontendSkills />;
      case tabs[2]:
        return <BackendSkills />;
      case tabs[3]:
        return <DatabasesSkills />;
      case tabs[4]:
        return <TestingSkills />;
      case tabs[5]:
        return <SoftSkills />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-center space-x-4 gap-4 flex-wrap">
        {tabs.map((tab: string) => (
          <ButtonTab
            key={tab}
            currentTab={selectedTab}
            name={tab}
            tabChange={handleTabChange}
          />
        ))}
      </div>

      <div className="flex justify-center flex-wrap mt-4">
        {getTabContent()}
      </div>
    </>
  );
};
