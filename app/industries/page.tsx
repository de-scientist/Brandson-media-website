import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MessageCircle, Building2 } from "lucide-react"
import { industries, buildWhatsAppUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Industries We Serve | Brandson Media Nairobi",
  description:
    "Brandson Media provides printing, branding, signage, and promotional production for SMEs, corporates, hospitality, retail, events, institutions, real estate, and logistics across Kenya.",
  alternates: { canonical: "https://brandsonmedia.co.ke/industries" },
  openGraph: {
    title: "Industries We Serve | Brandson Media",
    description:
      "From SMEs to corporates and hospitality — branding and production tailored to how your business operates.",
    type: "website",
  },
}

export default function IndustriesPage() {
  const waUrl = buildWhatsAppUrl({ context: "I'd like branding for my industry." })
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-dark-section-bg text-dark-section-fg">
        <div className="absolute inset-0">
          <img src="/corporate-branding-kenya-business.jpg" alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-widest text-primary">
              Industries We Serve
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
              Branding built for how your business actually works
            </h1>
            <p className="mt-5 text-lg text-dark-section-fg/80">
              Whether you run a growing SME, a multi-branch corporate, a busy restaurant, or a national
              logistics fleet — we tailor production to your goals, timelines, and budget.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Discuss Your Project
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white/10 text-dark-section-fg hover:bg-white/15 border border-white/15"
              >
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Card key={industry.name} className="border-border/60">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{industry.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{industry.description}</p>
                  <ul className="mt-4 space-y-2">
                    {industry.services.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-foreground/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Don&apos;t see your industry?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            We work with all kinds of businesses. Tell us what you&apos;re trying to achieve and we&apos;ll
            shape the right production plan.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start the Conversation
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/portfolio">
                See Our Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
