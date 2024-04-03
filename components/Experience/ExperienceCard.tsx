
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
    <div className="p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-sm mb-1">
        {title}
      </h3>

      <p className="text-gray-500 mb-1">{date}</p>

      <p className="text-gray-500 mb-1">{company}</p>

      {text.map((item) => (
        <li key={item} className="mb-1">
          {item}
        </li>
      ))}
    </div>
  );
};
