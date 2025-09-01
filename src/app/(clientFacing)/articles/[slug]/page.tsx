import { notFound } from "next/navigation";
import db from "@/db/db";
import Image from "next/image";
import { H4 } from "@/components/ui/Typography";

type Props = { params: { slug: string } };

export default async function ArticlePage({ params }: Props) {
  const slug = decodeURIComponent(params.slug);

  const article = await db.article.findUnique({ where: { slug } });
  if (!article) return notFound();

  return await (async () => {
    const ReactMarkdownModule = await import("react-markdown");
    const ReactMarkdown = ReactMarkdownModule.default;

    const remarkGfmModule = await import("remark-gfm");
    const remarkGfm = remarkGfmModule?.default ?? remarkGfmModule;

    const rehypeHighlightModule = await import("rehype-highlight");
    const rehypeHighlight =
      rehypeHighlightModule.default ?? rehypeHighlightModule;

    const content = (article as any).content ?? (article as any).body ?? "";

    const components = {
      a: ({ href, children }: any) => (
        <a
          href={href}
          className="break-words text-indigo-600 hover:underline dark:text-indigo-400"
          target={href && href.startsWith("http") ? "_blank" : undefined}
          rel={
            href && href.startsWith("http") ? "noopener noreferrer" : undefined
          }
        >
          {children}
        </a>
      ),
      img: ({ src, alt }: any) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className="my-6 h-auto max-w-full rounded-lg border border-slate-200 shadow-sm dark:border-slate-700"
        />
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-slate-200 pl-4 italic text-slate-600 dark:border-slate-700 dark:text-slate-300">
          {children}
        </blockquote>
      ),
      table: ({ children }: any) => (
        <div className="my-6 w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            {children}
          </table>
        </div>
      ),
      th: ({ children }: any) => (
        <th className="border bg-slate-100 px-3 py-2 text-left font-medium dark:bg-slate-800">
          {children}
        </th>
      ),
      td: ({ children }: any) => (
        <td className="border px-3 py-2 align-top">{children}</td>
      ),

      code: ({ className, children, ...props }: any) => {
        const isBlock = /\blanguage-/.test(className || "");
        if (!isBlock) {
          return (
            <code
              className="whitespace-pre-wrap break-words rounded bg-slate-900 px-1 py-0.5 font-mono text-sm text-slate-100 dark:bg-slate-800"
              {...props}
            >
              {children}
            </code>
          );
        }
        return (
          <pre className="my-4 overflow-auto rounded-md bg-slate-100 p-0 dark:bg-slate-900">
            <code className={`hljs ${className ?? ""} block p-4`} {...props}>
              {children}
            </code>
          </pre>
        );
      },

      h1: ({ children }: any) => (
        <h1 className="my-4 text-2xl font-semibold">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="my-3 text-xl font-semibold">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="my-2 text-lg font-semibold">{children}</h3>
      ),
    };

    const renderDates = () => {
      const { createdAt, updatedAt } = article;
      const createdAtStr = new Date(createdAt).toLocaleDateString();
      const updatedAtStr = new Date(updatedAt).toLocaleDateString();
      return (
        <>
          <p className="text-sm italic text-muted-foreground">
            Published on {createdAtStr}
            {createdAtStr !== updatedAtStr && (
              <>
                {" · "}
                <span className="text-sm text-muted-foreground">
                  Updated on {updatedAtStr}
                </span>
              </>
            )}
          </p>
        </>
      );
    };

    let renderImage = () => {
      const { banner } = article as any;
      if (!banner) return null;

      return (
        <figure
          className="relative mx-auto my-6 w-full max-w-[70ch] print:max-w-[70ch]"
          style={{
            aspectRatio: "16/9",
          }}
        >
          <Image
            src={banner}
            alt={`${article.title} banner`}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 70ch, (min-width: 640px) min(70ch, 100vw - 2rem), 100vw"
            priority={false}
            quality={90}
            placeholder="blur"
            blurDataURL="blur"
            draggable={false}
          />
        </figure>
      );
    };

    return (
      <div className="mx-auto my-0 w-full max-w-[70ch] overflow-x-hidden rounded-none border bg-[#FFFFFF50] p-4 shadow-lg sm:my-6 sm:rounded-2xl">
        <main className="mx-auto w-full max-w-[70ch] px-4 py-8 sm:px-6 sm:py-10">
          <h1 className="mb-3 text-2xl font-semibold sm:text-3xl">
            {article.title}
          </h1>
          {renderDates()}
          {renderImage()}
          {article.tags && article.tags.length > 0 && (
            <div className="flex">
              {article.tags.map((tag) => (
                <span key={tag} className="mr-2">
                  {`#${tag}`}
                </span>
              ))}
            </div>
          )}

          <article
            className="prose prose-base sm:prose-lg lg:prose-xl prose-slate dark:prose-invert
                       prose-code:before:content-none prose-code:after:content-none
                       prose-code:break-words prose-a:break-words prose-blockquote:break-words
                       mt-6 max-w-none"
            style={{ overflowWrap: "anywhere" }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={components}
            >
              {content}
            </ReactMarkdown>
          </article>
        </main>
      </div>
    );
  })();
}

export const dynamicParams = true;
export const revalidate = 60;
export const fetchCache = "force-no-store";
