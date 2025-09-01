"use client";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useDeferredValue,
} from "react";
import type { Article as ArticleType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { H2 } from "@/components/ui/Typography";
import { Search, SortAsc, SortDesc } from "lucide-react";
import dateFmt from "@/lib/date";

type ListArticle = Pick<ArticleType, "id" | "slug" | "title" | "createdAt" | "updatedAt">;

export default function ArticlesWrapper({
  articles,
}: {
  articles: ListArticle[];
}) {
  const INITIAL_VISIBLE = 3;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearch = useDeferredValue(searchTerm);
  const [sortAsc, setSortAsc] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const toggleSort = () => setSortAsc((s) => !s);

  useEffect(() => {
    const toPrefetch = articles.slice(
      0,
      Math.min(visibleCount + 6, articles.length),
    );
    toPrefetch.forEach((a) => {
      if (a.slug) router.prefetch(`/articles/${encodeURIComponent(a.slug)}`);
    });
  }, [router, articles, visibleCount]);

  const sorted = useMemo(() => {
    return articles.slice().sort((a, b) => {
      const aTime = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return sortAsc ? aTime - bTime : bTime - aTime;
    });
  }, [articles, sortAsc]);

  const filtered = useMemo(() => {
    const term = deferredSearch.trim().toLowerCase();
    if (!term) return sorted;
    return sorted.filter((a) => a.title.toLowerCase().includes(term));
  }, [deferredSearch, sorted]);

  useEffect(() => {
    if (filtered.length === 0) {
      setVisibleCount(0);
      return;
    }
    if (filtered.length <= INITIAL_VISIBLE) {
      setVisibleCount(filtered.length);
      return;
    }
    setVisibleCount((current) =>
      Math.min(Math.max(current, INITIAL_VISIBLE), filtered.length),
    );
  }, [filtered.length]);

  const handleViewMore = () => {
    setVisibleCount((current) =>
      Math.min(filtered.length, current + INITIAL_VISIBLE),
    );
  };

  const handleViewLess = () => {
    setVisibleCount(INITIAL_VISIBLE);
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderDate = (article: ListArticle) => {
    const createdISO = new Date(article.createdAt).toISOString();
    const updatedISO = new Date(article.updatedAt).toISOString();
    const createdStr = dateFmt.format(new Date(createdISO));
    const updatedStr = dateFmt.format(new Date(updatedISO));

    return (
      <p className="text-sm italic text-muted-foreground">
        Published on{" "}
        <time dateTime={createdISO} suppressHydrationWarning>
          {createdStr}
        </time>
        {createdISO != updatedISO && (
          <>
            {" · "}
            Updated on{" "}
            <time dateTime={updatedISO} suppressHydrationWarning>
              {updatedStr}
            </time>
          </>
        )}
      </p>
    );
  };

  const visibleArticles = filtered.slice(0, visibleCount);

  return (
    <div
      ref={containerRef}
      className="mx-auto flex max-w-[1280px] flex-col px-6"
    >
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
          <article
            key={article.id}
            className="cursor-pointer rounded-xl border bg-white p-4 hover:bg-slate-50"
          >
            <Link
              href={`/articles/${article.slug}`}
              prefetch
            >
              <h3 className="text-lg font-semibold">{article.title}</h3>
              {renderDate(article)}
            </Link>
          </article>
        ))}
      </div>

      <div className="my-4 flex justify-center space-x-4">
        {visibleCount > INITIAL_VISIBLE && (
          <Button onClick={handleViewLess}>View Less</Button>
        )}
        {visibleCount < filtered.length && (
          <Button onClick={handleViewMore}>View More</Button>
        )}
      </div>
    </div>
  );
}
