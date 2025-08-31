"use client";
import { H4, P } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { Article } from "@prisma/client";

export function Article({ article, action }: { article: Article, action: (article: Article) => void }) {
  const { id, title, createdAt, updatedAt, content } = article;

  const formatDate = (d?: string | Date | null) =>
    d ? new Date(d).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";
  
  return (
    <article
      key={id}
      className={cn(
        "rounded-2xl border bg-[#FFFFFF50] p-4 shadow-lg",
        "flex flex-col gap-4",
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <H4 className="font-bold">{title}</H4>

          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {createdAt && (
              <time dateTime={String(createdAt)}>
                Created {formatDate(createdAt)}
              </time>
            )}
            {updatedAt && (
              <time dateTime={String(updatedAt)}>
                Updated {formatDate(updatedAt)}
              </time>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => action(article)}
            className="animated-button shine rounded-2xl bg-[#050041] px-4 py-2 text-sm font-medium text-white shadow"
            aria-label={`Read ${title}`}
          >
            Read
          </button>
        </div>
      </div>

    </article>
  );
}
