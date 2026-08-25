"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { DynamicHero } from "@/components/DynamicHero"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Printer,
  Shirt,
  Sparkles,
  Building2,
  CheckCircle,
  Clock,
  ArrowRight,
  MapPin,
  Factory,
} from "lucide-react"
import { stats, industries, buildWhatsAppUrl } from "@/lib/site"

/* ----------------------------- Count Up UI ----------------------------- */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, inView }
}

function CountUp({ value, duration = 1200 }: { value: number; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.25 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
    </span>
  )
}

/* ----------------------------- Page Data ----------------------------- */
const serviceGroups = [
  {
    icon: Printer,
    title: "Printing & Stickers",
    description: "Banners, large-format prints, and vinyl stickers that get seen.",
    href: "/services/banner-printing",
    image: "/printing-banners-rollup.jpg",
  },
  {
    icon: Shirt,
    title: "Branding & Apparel",
    description: "Vehicle wraps, uniforms, and corporate branding that build recognition.",
    href: "/services/corporate-branding",
    image: "/corporate-branding-kenya-business.jpg",
  },
  {
    icon: Building2,
    title: "Signage & 3D Signs",
    description: "Dimensional, illuminated signage built for storefront visibility.",
    href: "/services/3d-signage",
    image: "/3d-company-signage-letters.jpg",
  },
  {
    icon: Sparkles,
    title: "UV Printing & Laser",
    description: "Promotional products, gifts, and precision-cut displays.",
    href: "/services/uv-printing",
    image: "/uv-printed-promotional-items.jpg",
  },
]

const whyPoints = [
  {
    icon: Factory,
    title: "In-house production",
    description:
      "From UV printing and laser cutting to large-format output, our in-house capabilities give us tighter control over quality and finishing.",
  },
  {
    icon: CheckCircle,
    title: "Materials that last",
    description:
      "We specify durable vinyl, acrylic, and substrates chosen for Kenyan sun, rain, and daily handling — not the cheapest option.",
  },
  {
    icon: Clock,
    title: "Reliable turnaround",
    description:
      "Clear timelines and realistic deadlines mean your branding is ready when your campaign, launch, or event goes live.",
  },
  {
    icon: MapPin,
    title: "Local Nairobi studio",
    description:
      "A Nairobi base means fast communication, easy approvals, and straightforward pickups and site visits.",
  },
]

const portfolioItems = [
  { title: "Corporate Branding", category: "Branding", image: "/promotional1.jpg" },
  { title: "Event Banners", category: "Printing", image: "/print1.jpg" },
  { title: "Vehicle Wrapping", category: "Branding", image: "/vehicle-branding-wrap.jpg" },
  { title: "3D Signage", category: "Signage", image: "/3d signage.jpg" },
  { title: "UV Printed Items", category: "UV Printing", image: "/uv-printed-promotional-items.jpg" },
  { title: "Acrylic Displays", category: "Laser Cutting", image: "/acrylic-menu-holders.jpg" },
]

/* ----------------------------- Page ----------------------------- */
export default function HomePage() {
  const waUrl = buildWhatsAppUrl({ context: "I'd like a quote for a project." })

  return (
    <div className="min-h-screen">
      <Navbar />
      <DynamicHero />

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-extrabold uppercase tracking-widest text-primary">What we do</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
              Production that makes brands impossible to overlook
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              One studio for printing, branding, signage, and promotional production in Nairobi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceGroups.map((service) => (
              <Link key={service.title} href={service.href} className="group block">
                <Card className="group hover:shadow-lg transition-shadow bg-card border-border overflow-hidden h-full">
                  <CardContent className="p-0">
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                      <div className="absolute left-4 bottom-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors backdrop-blur-sm">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold text-card-foreground">{service.title}</h3>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="mt-2 text-muted-foreground">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              asChild
            >
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Brandson */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-extrabold uppercase tracking-widest text-primary">Why Brandson Media</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
              Capability you can see in the finished work
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We handle production, finishing, and installation so your brand looks right when it reaches the real world.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {stats.map((s) => (
              <Card key={s.key} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-foreground">
                    <CountUp value={s.value} />
                    <span className="text-primary">{s.suffix}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyPoints.map((point) => (
              <div key={point.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <point.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-muted-foreground text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-extrabold uppercase tracking-widest text-primary">Who we help</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">Built for every kind of business</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From SMEs to corporates, hospitality to logistics — branding that fits how you operate.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <Link
                key={industry.name}
                href="/industries"
                className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {industry.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{industry.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/industries">
                Explore by Industry <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Work</h2>
            <p className="mt-4 text-lg text-muted-foreground">A glimpse of recent production across our core services.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div key={item.title} className="group relative overflow-hidden rounded-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark-section-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center text-dark-section-fg">
                    <p className="text-sm text-primary font-medium">{item.category}</p>
                    <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              asChild
            >
              <Link href="/portfolio">
                View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Ready to make your brand impossible to overlook?
          </h2>
          <p className="mt-4 text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Send your specs and we&apos;ll reply with a quote and the best route to get it produced.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-dark-section-fg text-dark-section-bg hover:bg-dark-section-fg/90" asChild>
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp Us Now
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              asChild
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
