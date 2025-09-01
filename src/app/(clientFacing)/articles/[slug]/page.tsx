import { notFound } from "next/navigation";
import db from "@/db/db";

type Props = {
  params: { slug: string };
};

export default async function ArticlePage({ params }: Props) {
  const slug = decodeURIComponent(params.slug);

  const article = await db.article.findUnique({
    where: { slug },
  });

  if (!article) return notFound();

  return await (async () => {
    const ReactMarkdownModule = await import("react-markdown");
    const ReactMarkdown = ReactMarkdownModule.default;
    const remarkGfmModule = await import("remark-gfm");
    const remarkGfm = remarkGfmModule?.default ?? remarkGfmModule;

    const content = (article as any).content ?? (article as any).body ?? "";

    // Light-weight Markdown element overrides to improve styling with Tailwind (prose)
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
        // allow responsive / lazy images; keep simple <img> to avoid extra Next.js Image config here
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
      code: ({ node, inline, className, children, ...props }: any) => {
        const language = (className || "").replace("language-", "");
        if (inline) {
          return (
            <code className="rounded bg-slate-100 px-1 font-mono text-sm dark:bg-slate-800">
              {children}
            </code>
          );
        }
        return (
          <pre className="my-4 overflow-auto rounded-md bg-slate-900 text-slate-100">
            <code className={className ?? "language-text"} {...props}>
              {children}
            </code>
          </pre>
        );
      },
      // optional: slightly larger headings inside article for better rhythm
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
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="mb-3 text-3xl font-semibold">{article.title}</h1>
        <p className="text-sm text-muted-foreground">
          {new Date(article.createdAt).toLocaleDateString()}
        </p>

        <article className="prose prose-slate prose-lg dark:prose-invert mt-6 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
          </ReactMarkdown>
        </article>
      </main>
    );
  })();
}

// Let new slugs work at runtime (when you don't prebuild with generateStaticParams)
export const dynamicParams = true; // default is true, but being explicit helps
export const revalidate = 60; // optional ISR if the content changes
export const fetchCache = "force-no-store"; // always fetch fresh data
