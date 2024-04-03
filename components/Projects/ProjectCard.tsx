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
    <div className="p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-sm mb-1">
        {title}{" "}
        <em className="text-xs">
          <Link href={repository} className="underline text-neutral-500">
            [link github]
          </Link>
        </em>
      </h3>

      <p className="text-gray-500 mb-1">{date}</p>

      <p className="text-gray-500 mb-1">{description}</p>

      {text.map((item) => (
        <li key={item} className="mb-1">
          {item}
        </li>
      ))}
    </div>
  );
};
