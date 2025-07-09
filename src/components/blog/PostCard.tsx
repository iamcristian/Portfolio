interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: { src: string; alt: string };
  featured: boolean;
}

interface PostCardProps {
  post: Post;
  viewMode: "grid" | "list";
  lang: string;
  featuredText: string;
}

export const PostCard = ({
  post,
  viewMode,
  lang,
  featuredText,
}: PostCardProps) => {
  return (
    <a
      href={`/${lang}/blog/${post.slug.split("/").pop()}`}
      className={`border rounded-2xl ${
        viewMode === "list" ? "flex items-center p-4 gap-4" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative ${viewMode === "list" ? "w-1/3" : "aspect-video"}`}
      >
        <img
          src={post.image.src}
          alt={post.image.alt}
          className={`w-full h-full object-cover ${
            viewMode === "list" ? "rounded-l-2xl" : "rounded-t-2xl"
          }`}
        />
        {post.featured && (
          <div className="badge badge-ghost absolute top-4 left-4 z-10">
            {featuredText}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`${
          viewMode === "list" ? "flex-1 space-y-2" : "p-6 space-y-4"
        }`}
      >
        <div className="flex items-center space-x-4 text-sm">
          <span>
            {new Date(post.date).toLocaleDateString(lang, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold">{post.title}</h3>
        <p
          className={`text-sm leading-relaxed ${
            viewMode === "list" ? "line-clamp-2" : "line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <kbd key={tag} className="kbd">
              {tag}
            </kbd>
          ))}
        </div>
      </div>
    </a>
  );
};
