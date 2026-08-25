import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  ArrowLeft,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronRight,
} from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

// npm i react-markdown remark-gfm
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Params = {
  params: Promise<{ slug: string }> | { slug: string }
}

function buildTocFromMarkdown(md: string) {
  const lines = md.split("\n")
  const items: { depth: 2 | 3; text: string; id: string }[] = []

  for (const line of lines) {
    const m = /^(##|###)\s+(.+)$/.exec(line.trim())
    if (!m) continue
    const depth = m[1] === "##" ? (2 as const) : (3 as const)
    const text = m[2].replace(/\*\*/g, "").trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
    if (!text) continue
    items.push({ depth, text, id })
  }

  const seen = new Map<string, number>()
  return items.map((it) => {
    const count = seen.get(it.id) ?? 0
    seen.set(it.id, count + 1)
    const id = count ? `${it.id}-${count + 1}` : it.id
    return { ...it, id }
  })
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolved = await Promise.resolve(params)
  const post = blogPosts.find((p) => p.slug === resolved.slug)
  if (!post) return {}

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || "Read the latest article.",
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || "Read the latest article.",
      images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || "Read the latest article.",
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  }
}

export default async function BlogSlugPage({ params }: Params) {
  const resolved = await Promise.resolve(params)
  const post = blogPosts.find((p) => p.slug === resolved.slug)
  if (!post) notFound()

  const toc = buildTocFromMarkdown(post.content)
  const hasToc = toc.length >= 3

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com"
  const canonical = `${siteUrl}/blog/${post.slug}`
  const shareText = encodeURIComponent(post.title)
  const shareUrl = encodeURIComponent(canonical)

  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category)
    .slice(0, 3)

  const fallbackRelated = related.length
    ? related
    : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Ambient header */}
      <div className="relative border-b">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/60 via-background to-background" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
          {/* Breadcrumb + Back */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="line-clamp-1 max-w-[40ch] text-foreground/80">
                {post.title}
              </span>
            </div>

            <Button asChild variant="ghost" className="gap-2">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Title block */}
          <div className="mt-6 grid gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{post.category}</Badge>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="max-w-3xl text-pretty text-base text-muted-foreground md:text-lg">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Hero media */}
            {post.featuredImage ? (
              <div className="mt-4 overflow-hidden rounded-2xl border bg-muted/30 shadow-sm">
                <div className="relative aspect-[16/7] w-full">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Article layout */}
      <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <article className="min-w-0">
            <Card className="overflow-hidden rounded-2xl border-muted/60 shadow-sm">
              <CardContent className="p-6 md:p-10">
                {/* Author + actions */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b pb-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      {post.author?.avatar ? (
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center">
                          <Bookmark className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="leading-tight">
                      <p className="text-sm font-medium text-foreground">
                        {post.author?.name || "Brandson Media"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {post.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button asChild variant="outline" className="gap-2">
                      <Link
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `${post.title} — ${canonical}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </Link>
                    </Button>

                    <Button asChild variant="default" className="gap-2">
                      <Link
                        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="
                    prose prose-neutral dark:prose-invert
                    max-w-none
                    prose-headings:scroll-mt-24
                    prose-h2:text-2xl prose-h2:tracking-tight
                    prose-h3:text-xl prose-h3:tracking-tight
                    prose-p:leading-relaxed
                    prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-muted-foreground/30
                    prose-blockquote:bg-muted/40 prose-blockquote:rounded-xl prose-blockquote:px-4 prose-blockquote:py-3
                    prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5
                    prose-pre:rounded-2xl prose-pre:border prose-pre:bg-muted/30
                    prose-hr:border-muted/60
                    prose-img:rounded-2xl prose-img:border
                  "
                >
                 <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: ({ children, ...props }) => (
      <h1
        className="mt-10 mb-6 text-3xl md:text-4xl font-bold tracking-tight leading-tight border-b pb-4"
        {...props}
      >
        {children}
      </h1>
    ),

    h2: ({ children, ...props }) => {
      const text = String(children)
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")

      return (
        <h2
          id={id}
          className="mt-14 mb-5 text-2xl md:text-3xl font-semibold tracking-tight leading-snug border-l-4 border-primary pl-4"
          {...props}
        >
          {children}
        </h2>
      )
    },

    h3: ({ children, ...props }) => {
      const text = String(children)
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")

      return (
        <h3
          id={id}
          className="mt-10 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-foreground/90"
          {...props}
        >
          {children}
        </h3>
      )
    },

    h4: ({ children, ...props }) => (
      <h4
        className="mt-8 mb-3 text-lg font-semibold text-foreground/80"
        {...props}
      >
        {children}
      </h4>
    ),

    p: ({ children, ...props }) => (
      <p
        className="mb-6 leading-relaxed text-base md:text-lg text-foreground/90"
        {...props}
      >
        {children}
      </p>
    ),

    ul: ({ children, ...props }) => (
      <ul className="mb-6 list-disc pl-6 space-y-2" {...props}>
        {children}
      </ul>
    ),

    ol: ({ children, ...props }) => (
      <ol className="mb-6 list-decimal pl-6 space-y-2" {...props}>
        {children}
      </ol>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-8 rounded-xl border-l-4 border-primary bg-muted/40 px-5 py-4 italic text-foreground/80"
        {...props}
      >
        {children}
      </blockquote>
    ),

    hr: () => <hr className="my-12 border-muted/60" />,

    a: ({ children, ...props }) => (
      <a
        className="font-medium text-primary underline-offset-4 hover:underline"
        {...props}
      >
        {children}
      </a>
    ),

    img: ({ ...props }) => (
      <img
        className="my-8 rounded-2xl border shadow-sm"
        {...props}
      />
    ),
  }}
>
  {post.content}
</ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            {/* Related */}
            <div className="mt-8">
              <div className="flex items-end justify-between gap-3">
                <h2 className="text-lg font-semibold tracking-tight">
                  Related reads
                </h2>
                <Button asChild variant="ghost" className="gap-2">
                  <Link href="/blog">
                    View all <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {fallbackRelated.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                    <Card className="h-full overflow-hidden rounded-2xl border-muted/60 transition-shadow group-hover:shadow-md">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="rounded-full">
                            {p.category}
                          </Badge>
                          <span className="line-clamp-1">{p.publishedAt}</span>
                        </div>
                        <h3 className="mt-3 line-clamp-2 text-base font-semibold tracking-tight">
                          {p.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                          {p.excerpt}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                          Read more{" "}
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {/* TOC */}
              {hasToc ? (
                <Card className="rounded-2xl border-muted/60 shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold tracking-tight">
                      On this page
                    </p>
                    <div className="mt-4 space-y-2">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={[
                            "block text-sm text-muted-foreground hover:text-foreground transition-colors",
                            item.depth === 3 ? "pl-4" : "pl-0",
                          ].join(" ")}
                        >
                          {item.text}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {/* CTA */}
              <Card className="rounded-2xl border-muted/60 shadow-sm">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold tracking-tight">
                    Want this done professionally?
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Clean prints. Bold branding. Fast turnaround. Let’s quote your job and move.
                  </p>

                  <div className="mt-4 grid gap-2">
                    <Button asChild className="w-full">
                      <Link href="/contact">Get Quote</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full gap-2">
                      <Link href="/contact">
                        <MessageCircle className="h-4 w-4" />
                        Talk to us
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  )
}