import { Article } from "@prisma/client"

function slugifyText(input: string): string {
  if (!input) return ''
  const normalized = input.normalize('NFKD').replace(/\p{M}/gu, '')
  return normalized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

function makeShortSuffix(id?: string, createdAt?: Date, length = 6): string {
  if (id) {
    const clean = id.replace(/[^a-f0-9]/gi, '')
    return clean.slice(-length) || clean
  }
  if (createdAt) {
    return Math.floor(createdAt.getTime() / 1000)
      .toString(36)
      .slice(-length)
  }
  let s = ''
  while (s.length < length) {
    s += Math.random().toString(36).slice(2)
  }
  return s.slice(0, length)
}

export function generateArticleSlug(
  article: Partial<Article>,
  opts?: { maxLength?: number; suffixLength?: number }
): string {
  const maxLength = opts?.maxLength ?? 64
  const suffixLength = opts?.suffixLength ?? 6

  const base = slugifyText(article.title || 'untitled')
  const suffix = makeShortSuffix(article.id ?? undefined, article.createdAt ?? undefined, suffixLength)

  const reserved = suffix.length + 1
  const available = Math.max(1, maxLength - reserved)
  let head = base.slice(0, available)

  head = head.replace(/-+$/g, '')

  const slug = `${head}-${suffix}`.toLowerCase()
  return slug
}

export default generateArticleSlug
