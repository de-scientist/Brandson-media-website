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
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Layers,
  Sparkles,
  Recycle,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react"
import { getService, serviceSlugs } from "@/lib/services-data"
import { SITE_URL, buildWhatsAppUrl } from "@/lib/site"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: "Service Not Found" }

  const title = `${service.title} in Nairobi | Brandson Media`
  const description = service.intro
  const url = `${SITE_URL}/services/${service.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Brandson Media",
      type: "website",
      images: [{ url: service.heroImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.heroImage],
    },
  }
}

const benefitIcons = [Layers, Sparkles, Recycle, Clock, ShieldCheck, CheckCircle2]

export default async function ServicePage({ params }: Params) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const url = `${SITE_URL}/services/${service.slug}`
  const related = service.relatedServices
    .map((s) => getService(s))
    .filter(Boolean) as ReturnType<typeof getService>[]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  const waUrl = buildWhatsAppUrl({ service: service.title })

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-dark-section-bg text-dark-section-fg">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-background" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <nav className="mb-4 flex items-center gap-2 text-sm text-dark-section-fg/70" aria-label="Breadcrumb">
              <Link href="/services" className="hover:text-primary">Services</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-dark-section-fg/90">{service.category}</span>
            </nav>

            <Badge className="bg-primary/15 text-primary border border-primary/30">
              {service.category}
            </Badge>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-primary font-semibold sm:text-xl">{service.tagline}</p>
            <p className="mt-4 max-w-2xl text-base text-dark-section-fg/80 sm:text-lg">
              {service.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  Get a Quote for This Service <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white/10 text-dark-section-fg hover:bg-white/15 border border-white/15"
              >
                <Link href="/portfolio">See Related Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary">What it is</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {service.title} explained
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{service.sections.what}</p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-xl">
              <Image
                src={service.heroImage}
                alt={service.title}
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Who it&apos;s for</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Built for organisations that need reliable, good-looking production — not guesswork.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.sections.whoFor.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Available options</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {service.sections.options.map((opt) => (
              <Card key={opt.name} className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground">{opt.name}</h3>
                  <p className="mt-2 text-muted-foreground">{opt.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS + PROCESS */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Materials & techniques</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {service.sections.materials.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">How we work</h2>
            <ol className="mt-6 space-y-4">
              {service.sections.process.map((step, i) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="font-medium text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Why choose Brandson Media</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.sections.whyChoose.map((item, i) => {
              const Icon = benefitIcons[i % benefitIcons.length]
              return (
                <div key={item} className="rounded-2xl border border-border/60 bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-foreground">{item}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <section className="bg-muted/40 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Related services</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r!.slug} href={`/services/${r!.slug}`} className="group">
                  <Card className="overflow-hidden border-border/60 transition-shadow hover:shadow-lg">
                    <div className="relative h-44">
                      <Image src={r!.heroImage} alt={r!.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary">{r!.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{r!.tagline}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 space-y-4">
            {service.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border/60 bg-card p-5 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-foreground">
                  {f.q}
                  <span className="ml-4 text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to start your {service.title.toLowerCase()} project?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Send us your specs — size, quantity, material, and deadline — and we&apos;ll reply with a quote.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get a Quote on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
