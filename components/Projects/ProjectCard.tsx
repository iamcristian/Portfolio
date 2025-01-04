import Link from "next/link";

interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
  repository: string;
  text: string[];
}

export const ProjectCard = ({
  title,
  date,
  description,
  repository,
  text,
}: ProjectCardProps) => {
  return (
    <div className="p-5 rounded-lg shadow-md bg-neutral-50 dark:bg-neutral-800">
      <h3 className="font-bold text-sm mb-1">
        {title}{" "}
        <em className="text-xs">
            <Link href={repository} className="underline text-neutral-400" target="_blank" rel="noopener noreferrer">
            [link github]
            </Link>
        </em>
      </h3>

      <p className="text-gray-400 mb-1">{date}</p>

      <p className="text-gray-400 mb-1">{description}</p>

      {text.map((item) => (
        <li key={item} className="mb-3">
          {item}
        </li>
      ))}
    </div>
  );
};
