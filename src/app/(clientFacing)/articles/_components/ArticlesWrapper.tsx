"use client";
import React, { useMemo, useRef, useState } from "react";
import type { Article as ArticleType } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { H2 } from "@/components/ui/Typography";
import { Article as ArticleCard } from "./Article";
import { Search, SortAsc, SortDesc } from "lucide-react";

export default function ArticlesWrapper({ articles }: { articles: ArticleType[] }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(false); // false => newest first (desc), true => oldest first (asc)
  const endOfArticlesRef = useRef<HTMLDivElement | null>(null);

  const handleViewMore = () => setVisibleCount(articles.length);
  const handleViewLess = () => {
    setVisibleCount(3);
    endOfArticlesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSort = () => setSortAsc((s) => !s);

  const handleArticleAction = (article: ArticleType) => {
    console.log("Read article:", article.id);
  };

  const sorted = useMemo(() => {
    return articles.slice().sort((a, b) => {
      const aTime = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return sortAsc ? aTime - bTime : bTime - aTime;
    });
  }, [articles, sortAsc]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return sorted;
    return sorted.filter((a) => a.title.toLowerCase().includes(term));
  }, [searchTerm, sorted]);

  const visibleArticles = filtered.slice(0, visibleCount);

  return (
    <>
      <div className="mx-auto flex min-h-[calc(100vh-156px)] max-w-[1280px] flex-col px-6">
        <H2 className="mb-6 pb-6 pt-6 text-center">Articles</H2>

        <div className="flex w-full items-center justify-start pb-6 sm:justify-end">
          <Button
            type="button"
            onClick={toggleSort}
            className="transition-transform"
            aria-label={sortAsc ? "Sort by oldest" : "Sort by newest"}
          >
            {sortAsc ? <SortAsc size={16} /> : <SortDesc size={16} />}
          </Button>

          <div className="ml-3 flex w-full items-center rounded-2xl border bg-white ring-1 focus-within:ring-2 sm:w-2/3 md:w-1/3">
            <Input
              id="article-search-input"
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              className="flex-1 rounded-l-2xl border-0 ring-0 focus-visible:ring-0"
            />
            <button
              type="button"
              aria-label="Focus search"
              onMouseDown={(e) => {
                e.preventDefault();
                document.getElementById("article-search-input")?.focus();
              }}
              className="rounded-r-2xl pl-3 pr-3"
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {visibleArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              action={handleArticleAction}
            />
          ))}
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          {visibleCount >= filtered.length && (
            <Button onClick={handleViewLess}>View Less</Button>
          )}
          {visibleCount < filtered.length && (
            <Button onClick={handleViewMore}>View More</Button>
          )}
        </div>

        <div ref={endOfArticlesRef} />
      </div>
    </>
  );
}
