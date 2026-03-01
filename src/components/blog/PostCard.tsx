type ViewMode = "grid" | "list";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: Date;
  readTime: string;
  tags: string[];
  image: { src: string; alt: string };
  featured: boolean;
}

interface PostCardProps {
  post: Post;
  viewMode: ViewMode;
  lang: "en" | "es";
  featuredText: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const PostCard = ({
  post,
  viewMode,
  lang,
  featuredText,
}: PostCardProps) => {
  const isListView = viewMode === "list";
  const postUrl = `/${lang}/blog/${post.slug.split("/").pop()}`;

  return (
    <a
      href={postUrl}
      className={`border rounded-2xl transition-shadow hover:shadow-lg ${
        isListView ? "flex items-center p-4 gap-4" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative ${isListView ? "w-1/3 md:w-1/5" : "aspect-video"}`}
      >
        <img
          src={post.image.src}
          alt={post.image.alt}
          loading="lazy"
          className={`w-full h-full object-cover ${
            isListView ? "rounded-l-2xl" : "rounded-t-2xl"
          }`}
        />
        {post.featured && (
          <div className="badge badge-ghost absolute top-4 left-4 z-10">
            {featuredText}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={isListView ? "flex-1 space-y-2" : "p-6 space-y-4"}>
        {/* Meta info */}
        <div className="flex items-center space-x-4 text-sm">
          <time dateTime={post.publishDate.toISOString()}>
            {post.publishDate.toLocaleDateString(lang, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold">{post.title}</h3>

        {/* Excerpt */}
        <p
          className={`text-sm leading-relaxed ${
            isListView ? "line-clamp-2" : "line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>

        {/* Tags */}
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
