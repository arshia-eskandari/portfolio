import React from "react";
import type { Article } from "@prisma/client";
import { getArticles } from "./_actions/articles";
import ArticlesWrapper from "./_components/ArticlesWrapper";

export default async function Articles() {
  const articles: Article[] = (await getArticles()) || [];

  return (
    <div className="flex-1">
      <ArticlesWrapper articles={articles} />
    </div>
  );
}
