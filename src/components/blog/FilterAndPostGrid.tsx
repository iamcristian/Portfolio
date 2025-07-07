"use client";

import React, { useState, startTransition } from "react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  image: { src: string; alt: string };
  author: string;
  language: "en" | "es" | "ru" | "ge";
  publishDate: Date;
  authorContact: string;
}

interface Props {
  posts: Post[];
  lang: string;
}

const FilterAndPostGrid: React.FC<Props> = ({ posts, lang }) => {
  const blogPosts = posts;
  const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const filtered = blogPosts
    .filter((p) => {
      const term = searchTerm.toLowerCase();
      const matchesText =
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term));
      const matchesTag =
        selectedTags.length === 0 || selectedTags.includes(p.tags[0]);
      return matchesText && matchesTag;
    })
    .sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortOrder === "newest" ? -diff : diff;
    });

  const featured = filtered.filter((p) => p.featured).slice(0, 5);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search & Sort */}
      <div className="rounded-3xl p-8 mb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start mb-6">
          <input
            type="text"
            placeholder="Search articles, topics, or keywords..."
            className="flex-1 pl-2 pr-2 py-2 rounded-2xl focus:bg-base-200"
            value={searchTerm}
            onChange={(e) =>
              startTransition(() => setSearchTerm(e.target.value))
            }
          />
          <button
            onClick={() =>
              setSortOrder((o) => (o === "newest" ? "oldest" : "newest"))
            }
            className="px-4 py-3 rounded-xl"
          >
            {sortOrder === "newest" ? (
              <svg className="w-6 h-6">
                <use href="#icon-sort-up"></use>
              </svg>
            ) : (
              <svg className="w-6 h-6">
                <use href="#icon-sort-down"></use>
              </svg>
            )}
          </button>
        </div>

        {/* Tags */}
        <div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  selectedTags.includes(tag)
                    ? "bg-base-200"
                    : "hover:bg-base-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button onClick={() => setSelectedTags([])} className="text-sm">
              Clear all filters ({selectedTags.length})
            </button>
          )}
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section>
          <h2 className="mb-8 text-2xl font-light">Featured Articles</h2>
          <div className="grid grid-cols-3 gap-4 h-[400px]">
            {featured.map((post, i) => (
              <a
                href={`/${lang}/blog/${post.slug.split("/").pop()}`}
                className={`group relative rounded-xl border-2 ${
                  i === 0
                    ? "col-span-2 row-span-2"
                    : i === 1
                    ? "col-span-1 row-span-2"
                    : ""
                }`}
              >
                <div className="absolute inset-0" />
                <div className="absolute bottom-0 p-6">
                  <h3
                    className={`${
                      i === 0 ? "text-2xl" : i === 1 ? "text-lg" : "text-sm"
                    } font-medium mb-2`}
                  >
                    {post.title}
                  </h3>
                  <span className="text-xs uppercase">Learn More</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* More Articles */}
      {regular.length > 0 && (
        <section className="py-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-light">More Articles</h2>
            <span className="text-sm">
              {filtered.length} article
              {filtered.length !== 1 ? "s" : ""} found
            </span>
          </div>
          <div className="space-y-6">
            {regular.map((post) => (
              <a
                key={post.slug}
                href={`/${lang}/blog/${post.slug.split("/").pop()}`}
                className="group block"
              >
                <article className="flex gap-8 p-8 rounded-2xl border">
                  <div className="w-1/3 rounded-xl" />
                  <div className="w-2/3 flex flex-col justify-between">
                    <div className="flex items-center space-x-4 text-sm ">
                      <span>
                        {new Date(post.date).toLocaleDateString(post.language)}
                      </span>
                      <span className="w-1 h-1 rounded-full" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-medium">{post.title}</h3>
                    <p className="text-sm">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {filtered.length === 0 && (
        <section className="py-20 text-center">
          <p className=" text-lg">No articles found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedTags([]);
            }}
            className="mt-4 text-black hover:text-gray-600"
          >
            Clear all filters
          </button>
        </section>
      )}
    </div>
  );
};

export default FilterAndPostGrid;
