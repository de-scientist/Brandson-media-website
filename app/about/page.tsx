"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Zap,
  CheckCircle2,
  X,
  ArrowRight,
  Images,
  Sparkles,
} from "lucide-react"

const values = [
  {
    icon: Award,
    title: "Quality First",
    description:
      "We never compromise. Every project receives premium materials and rigorous quality checks.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description:
      "Your vision is our blueprint. We collaborate closely to ensure the final product exceeds expectations.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Utilizing UV printing and laser technology to provide East Africa with modern branding solutions.",
  },
  {
    icon: Users,
    title: "Reliability",
    description:
      "Our reputation is built on consistency. We meet deadlines so you can meet yours.",
  },
]

type GalleryItem = {
  img: string
  title: string
  desc: string
  tag?: string
  href?: string
}

export default function AboutPage() {
  const gallery = useMemo<GalleryItem[]>(
    () => [
      {
        img: "/IMG20230208101603.jpg",
        title: "Signage Fabrication",
        desc: "Custom 3D, LED, and Pylon signs built to last.",
        tag: "Signage",
        href: "/services/signage",
      },
      {
        img: "/IMG20230713141705.jpg",
        title: "Corporate Branding",
        desc: "Vehicle wraps and office interiors that speak your brand.",
        tag: "Branding",
        href: "/services/branding",
      },
      {
        img: "/IMG20231016150822.jpg",
        title: "Digital Printing",
        desc: "Vibrant large format and UV printing for all surfaces.",
        tag: "Printing",
        href: "/services/printing",
      },
    ],
    []
  )

  const [active, setActive] = useState<GalleryItem | null>(null)

  // ✅ Prefilled WhatsApp redirection for the selected service
  const openWhatsAppForService = (serviceTitle: string, serviceTag?: string) => {
    const phone = "254701869821"
    const text =
      `Hello Brandson Media!%0A%0A` +
      `*Service Request*%0A` +
      `*Service:* ${encodeURIComponent(serviceTitle)}%0A` +
      (serviceTag ? `*Category:* ${encodeURIComponent(serviceTag)}%0A` : "") +
      `%0A` +
      `Kindly share pricing, turnaround time, and required specs (size/quantity/material).%0A` +
      `Thank you!`

    window.open(`https://wa.me/${phone}?text=${text}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-dark-section-bg text-dark-section-fg">
        <div className="absolute inset-0">
          <Image
            src="/3d-company-signage-letters.jpg"
            alt="Brandson Media Workshop"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-background" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-widest uppercase text-dark-section-fg/80 backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              EST. 2016 <span className="opacity-50">•</span> Nairobi, Kenya
            </div>

            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight">
              Crafting <span className="text-primary italic">Visual</span> Excellence
            </h1>

            <p className="mt-4 text-base sm:text-xl text-dark-section-fg/70 max-w-2xl">
              Nairobi&apos;s premier destination for high-impact printing, precision branding,
              and architectural signage — built to be seen, remembered, and trusted.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <a href="https://wa.me/254701869821" target="_blank" rel="noreferrer">
                  Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-12 rounded-2xl bg-white/10 text-dark-section-fg hover:bg-white/15 border border-white/15"
              >
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative group">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
              <div className="relative rounded-[2rem] overflow-hidden border border-border/60 shadow-2xl">
                <Image
                  src="/printing-team-at-work.jpg"
                  alt="Our Team at Work"
                  width={900}
                  height={1100}
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-background/90 backdrop-blur p-6 rounded-2xl shadow-xl hidden md:block max-w-[260px] border border-border/60">
                <p className="text-primary font-extrabold text-3xl">10+</p>
                <p className="text-muted-foreground text-sm font-medium">
                  Years of transforming Kenyan brands with precision.
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-widest text-primary uppercase mb-3">
                Our Journey
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Built on a Vision of{" "}
                <span className="text-primary">Impactful Graphics</span>
              </h2>

              <div className="mt-6 space-y-5 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Brandson Media was founded with a simple mission: to help businesses in Nairobi and across Kenya
                  create powerful visual identities that stand out in a competitive market.
                </p>

                <p>
                  What started as a small printing operation has grown into a full-service branding powerhouse,
                  leveraging state-of-the-art <strong>UV Printing</strong> and <strong>CNC routing</strong> to serve
                  industries ranging from hospitality to logistics.
                </p>

                <ul className="space-y-3 pt-2">
                  {[
                    "State-of-the-art equipment",
                    "Nairobi-based production hub",
                    "Expert design consultation",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-foreground font-semibold"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Button asChild className="rounded-2xl">
                    <Link href="/services">
                      Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="group bg-background p-10 rounded-[2rem] border border-border/60 hover:border-primary/50 transition-all hover:shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To empower businesses with high-quality, affordable printing and branding solutions that help them
                communicate their message effectively and build lasting brand recognition in East Africa.
              </p>
            </div>

            <div className="group bg-background p-10 rounded-[2rem] border border-border/60 hover:border-secondary/50 transition-all hover:shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform">
                <Eye className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground mb-3">
                Our Vision
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the undisputed leader in innovative branding and signage solutions across the continent,
                defined by our creativity, sustainability, and relentless pursuit of customer perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO - FUNCTIONAL IMAGE CARDS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-extrabold">
              <Images className="h-4 w-4" />
              What We Do
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight">
              Work That Looks{" "}
              <span className="text-primary">Expensive</span> — and Performs
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Click a card to preview our work. Each piece is built with clarity, consistency, and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gallery.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(item)}
                className="group text-left rounded-[2rem] overflow-hidden border border-border/60 bg-card/80 shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div className="relative aspect-[4/4]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 p-6">
                    {item.tag && (
                      <span className="inline-block mb-2 text-[11px] font-extrabold tracking-widest uppercase text-white/80 bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="text-xl font-extrabold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">{item.desc}</p>

                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-white">
                      View preview{" "}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-extrabold text-foreground">
                      Explore this service
                    </p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary font-extrabold text-sm hover:underline"
                      >
                        Open <ArrowRight className="inline h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="text-muted-foreground text-sm font-semibold">
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-4xl rounded-[2rem] overflow-hidden border border-white/10 bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-muted">
              <Image src={active.img} alt={active.title} fill className="object-cover" />
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold tracking-widest uppercase text-primary">
                    Preview
                  </p>
                  <h4 className="text-2xl font-extrabold">{active.title}</h4>
                  <p className="mt-2 text-muted-foreground">{active.desc}</p>
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" className="rounded-2xl" onClick={() => setActive(null)}>
                    Close
                  </Button>

                  {/* ✅ Prefilled WhatsApp message includes service requested */}
                  <Button
                    className="rounded-2xl"
                    onClick={() => openWhatsAppForService(active.title, active.tag)}
                  >
                    Request This <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VALUES */}
      <section className="py-24 bg-dark-section-bg text-dark-section-fg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold">Our Core Values</h2>
            <p className="mt-4 text-dark-section-fg/60">The DNA of Brandson Media</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value) => (
              <div key={value.title} className="text-center group">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-primary/30">
                  <value.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-extrabold mb-2">{value.title}</h3>
                <p className="text-dark-section-fg/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold tracking-tight">Find Us</h3>
            <p className="text-muted-foreground">Nairobi, Kenya — we’re within reach.</p>
          </div>

          <div className="rounded-[2.5rem] overflow-hidden border border-border/60 shadow-2xl h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.161103504107!2d36.8197!3d-1.2867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d65b53d7e5%3A0x6a05342a967f6b21!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Brandson Media Location"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-18 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(theme(colors.primary/40)_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Ready to Work With Us?
          </h2>
          <p className="mt-6 text-lg md:text-xl text-secondary-foreground/90 max-w-2xl mx-auto">
            Let’s build something that turns heads — and turns interest into action.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-secondary hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:scale-[1.03]"
              asChild
            >
              <a href="https://wa.me/254701869821" target="_blank" rel="noopener noreferrer">
                Start Your Project
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full bg-transparent"
              asChild
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}