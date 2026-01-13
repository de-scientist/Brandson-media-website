import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, MessageCircle } from "lucide-react"
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog-data"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: "Post Not Found | Brandson Media",
    }
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: `${post.category}, printing Nairobi, branding Kenya, Brandson Media`,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      locale: "en_KE",
      siteName: "Brandson Media",
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.featuredImage],
    },
    alternates: {
      canonical: `https://brandsonmedia.co.ke/blog/${post.slug}`,
    },
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, post.category)

  // JSON-LD Schema for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Brandson Media",
      logo: {
        "@type": "ImageObject",
        url: "https://brandsonmedia.co.ke/images/450402357-982850016870582-3987366302077048038-n.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://brandsonmedia.co.ke/blog/${post.slug}`,
    },
  }

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-dark-section-bg text-dark-section-fg overflow-hidden">
         <div className="absolute inset-0 bg-[url('/modern-printing-press-industrial.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-dark-section-fg/70 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <Badge className="bg-primary text-primary-foreground mb-4">{post.category}</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-dark-section-fg/80">
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {post.author.name}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {new Date(post.publishedAt).toLocaleDateString("en-KE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {post.readTime} min read
            </span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative h-64 sm:h-96 lg:h-[500px] w-full">
        <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
      </div>

      {/* Article Content */}
      <article className="py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-12">
            {/* Main Content */}
            <div className="lg:flex-1">
              <div
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-li:text-muted-foreground
                  prose-strong:text-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA within article */}
              <aside className="mt-12 p-6 bg-muted rounded-xl border border-border">
                <h3 className="text-xl font-bold text-foreground">Need Help with {post.category}?</h3>
                <p className="mt-2 text-muted-foreground">
                  Brandson Media offers professional {post.category.toLowerCase()} services in Nairobi and across Kenya.
                  Get in touch for a free quote!
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <a href="https://wa.me/254701869821" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Get a Quote
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/services">View All Services</Link>
                  </Button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="bg-card border-border overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Looking for Professional Printing, Branding, or Signage in Nairobi?</h2>
          <p className="mt-4 text-lg text-secondary-foreground/90 max-w-2xl mx-auto">
            Contact Brandson Media today for high-quality printing and branding solutions. Serving businesses across
            Kenya with excellence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90" asChild>
              <a href="https://wa.me/254701869821" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground/10 bg-transparent"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
