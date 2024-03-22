"use client";

import { useState } from "react";
import { ButtonTab } from "./ButtonTab";
import { BackendSkills, DatabasesSkills, FrontendSkills, LanguagesProgrammingSkills, SoftSkills, TestingSkills } from "./TabContent";

const tabs = ["languages programming", "frontend", "backend", "databases", "testing", "soft skills"];

export const TabTable = () => {
  const [selectedTab, setSelectedTab] = useState("languages programming");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const getTabContent = () => {
    switch (selectedTab) {
      case "languages programming":
        return <LanguagesProgrammingSkills />;
      case "frontend":
        return <FrontendSkills />;
      case "backend":
        return <BackendSkills />;
      case "databases":
        return <DatabasesSkills />;
      case "testing":
        return <TestingSkills />;
      case "soft skills":
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
