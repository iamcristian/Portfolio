interface ButtonTabProps {
  currentTab: string;
  name: string;
  tabChange: (tab: string) => void;
}

export const ButtonTab = ({ currentTab, name, tabChange }: ButtonTabProps) => {
  return (
    <button
      className={`uppercase ${currentTab === name && "dark:text-yellow-200 underline underline-offset-8"}`}
      onClick={() => tabChange(name)}
    >
      {name}
    </button>
  );
};
