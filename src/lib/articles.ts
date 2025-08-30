import { Article } from "@prisma/client";

export function sortArticles(articles: Article[]) {
  articles.sort((a, b) => {
    if (!a.createdAt && b.createdAt) return -1;
    if (a.createdAt && !b.createdAt) return 1;

    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return articles;
}