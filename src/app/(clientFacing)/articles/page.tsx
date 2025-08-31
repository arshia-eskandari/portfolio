import React from "react";
import type { Article } from "@prisma/client";
import { H3, H4, P } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { getArticles } from "./_actions/articles";
import ArticlesWrapper from "./_components/ArticlesWrapper";

export default async function Articles() {
  const articles: Article[] = (await getArticles()) || [];

  return (
    <ArticlesWrapper articles={articles} />
  );
}
