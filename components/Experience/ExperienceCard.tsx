interface ExperienceCardProps {
  title: string;
  date: string;
  company: string;
  text: string[];
}

export const ExperienceCard = ({
  title,
  date,
  company,
  text,
}: ExperienceCardProps) => {
  return (
    <div className="p-5 rounded-lg shadow-md bg-neutral-50 dark:bg-neutral-800">
      <h3 className="font-bold text-sm mb-1">{title}</h3>

      <p className="text-gray-400 mb-1">{date}</p>

      <p className="text-gray-400 mb-1">{company}</p>

      {text.map((item) => (
        <li key={item} className="mb-3">
          {item}
        </li>
      ))}
    </div>
  );
};
