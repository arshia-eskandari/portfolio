import { Accordion } from "@/components/ui/Accordion";
import ArticlesForm from "./_components/ArticleForm";
import { H2 } from "@/components/ui/Typography";
import {
  addDefaultArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from "./_actions/articles";
import DefaultArticleForm from "./_components/DefaultArticleForm";
import { sortArticles } from "@/lib/articles";
import { getImageMedia } from "./_actions/media";

export default async function Articles() {
  const [articles, imageMedia] = await Promise.all([
    getArticles(),
    getImageMedia(),
  ]);
  return (
    <div className="">
      <H2>Articles</H2>
      <DefaultArticleForm action={addDefaultArticle} />
      <Accordion type="single" collapsible className="my-3 w-full">
        {sortArticles(articles).map((article) => (
          <ArticlesForm
            article={article}
            action={updateArticle}
            deleteAction={deleteArticle}
            imageMedia={imageMedia}
            key={article.id}
          />
        ))}
      </Accordion>
    </div>
  );
}
