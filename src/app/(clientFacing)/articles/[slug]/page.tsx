import { notFound } from "next/navigation";
import db from "@/db/db";

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

    // 🔹 NEW: syntax highlighting (zero config)
    const rehypeHighlightModule = await import("rehype-highlight");
    const rehypeHighlight =
      rehypeHighlightModule.default ?? rehypeHighlightModule;

    const content = (article as any).content ?? (article as any).body ?? "";

    const components = {
      a: ({ href, children }: any) => (
        <a
          href={href}
          className="text-indigo-600 hover:underline dark:text-indigo-400"
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
          className="my-6 rounded-lg border border-slate-200 shadow-sm dark:border-slate-700"
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

      // inside components:
      code: ({ className, children, ...props }: any) => {
        const isBlock = /\blanguage-/.test(className || "");
        if (!isBlock) {
          return (
            <code
              className="whitespace-pre-wrap break-words rounded bg-slate-900 px-1 py-0.5 font-mono text-sm text-slate-100"
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

    return (
      <div className="mx-auto my-6 flex w-full max-w-[1280px] flex-col rounded-2xl border bg-[#FFFFFF50] p-4 px-6 shadow-lg">
        <main className="mx-auto px-6 py-10">
          <h1 className="mb-3 text-3xl font-semibold">
            {(article as any).title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date((article as any).createdAt).toLocaleDateString()}
          </p>

          <article
            className="prose prose-slate prose-lg dark:prose-invert prose-code:before:content-none prose-code:after:content-none
                     prose-code:break-words mt-6 max-w-none"
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
