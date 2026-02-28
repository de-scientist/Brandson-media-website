"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, TrendingUp, Users, Briefcase, BadgeCheck, X, ArrowRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Wanjiku",
    role: "Creative Lead",
    company: "Cut To Fit graphics",
    image: "/african-woman-professional-headshot.png",
    rating: 5,
    testimonial:
      "Partnering with Brandson Media has been a game-changer for our finishing quality. Their attention to detail in large-format prints is unmatched in the Nairobi market. Every project we've collaborated on has been flawless.",
  },
  {
    name: "James Ochieng",
    role: "Operations Manager",
    company: "Inuka Africa",
    image: "/african-man-professional-headshot.png",
    rating: 5,
    testimonial:
      "We needed a reliable branding partner for our regional branches, and Brandson Media delivered. Their team understands the local landscape and provides durable signage that withstands all weather conditions.",
  },
  {
    name: "Grace Mutua",
    role: "Director",
    company: "Sign City",
    image: "/kenyan-woman-professional-portrait.jpg",
    rating: 5,
    testimonial:
      "Impeccable service! The 3D illuminated signs they fabricated for us are stunning. Brandson Media manages to balance high-end technology with true craftsmanship.",
  },
  {
    name: "David Kimani",
    role: "Production Head",
    company: "Mish Prints",
    image: "/mish.png",
    rating: 5,
    testimonial:
      "Their UV printing capabilities are the best we've seen. The color accuracy and speed of delivery help us meet even the tightest deadlines for our corporate clients.",
  },
  {
    name: "Amina Hassan",
    role: "Founder",
    company: "Frannah Graphics",
    image: "/african-woman-restaurant-owner.jpg",
    rating: 5,
    testimonial:
      "Working with the Brandson Media team is always a pleasure. They aren't just a service provider; they are brand consultants who genuinely care about the final impact of the work.",
  },
  {
    name: "Peter Njoroge",
    role: "Chief Engineer",
    company: "RobTech Limited",
    image: "/kenyan-man-corporate-headshot.jpg",
    rating: 5,
    testimonial:
      "For industrial-grade marking and laser engraving, RobTech trusts no one else. Their precision on metal and acrylic components is vital for our technical projects.",
  },
  {
    name: "Catherine Akinyi",
    role: "Marketing Manager",
    company: "Graphix Press",
    image: "/african-woman-educator-professional.jpg",
    rating: 5,
    testimonial:
      "The vehicle branding Brandson Media executed for our delivery fleet has significantly increased our brand visibility on the road. The vinyl quality is top-tier.",
  },
  {
    name: "Michael Mwangi",
    role: "Project Coordinator",
    company: "Future Prints",
    image: "/african-fitness-trainer-headshot.png",
    rating: 5,
    testimonial:
      "Excellent turnaround time and communication. They handled our last-minute event branding with ease, delivering high-quality roll-up banners and backdrops within 24 hours.",
  },
  {
    name: "Samuel Gakuo",
    role: "Owner",
    company: "CTF graphics",
    image: "/african-man-professional-headshot.png",
    rating: 5,
    testimonial:
      "Brandson Media has been instrumental in our growth. Their consistent quality in fabric printing and indoor signage keeps our clients coming back for more.",
  },
]

type StatKey = "clients" | "projects" | "years" | "satisfaction"

type Stat = {
  key: StatKey
  label: string
  value: number
  suffix: string
  icon: any
  hint: string
}

export default function TestimonialsPage() {
  const stats: Stat[] = useMemo(
    () => [
      {
        key: "clients",
        label: "Happy Clients",
        value: 500,
        suffix: "+",
        icon: Users,
        hint: "Trusted partners across Kenya",
      },
      {
        key: "projects",
        label: "Projects Completed",
        value: 1000,
        suffix: "+",
        icon: Briefcase,
        hint: "From one-offs to full rollouts",
      },
      {
        key: "years",
        label: "Years Experience",
        value: 10,
        suffix: "+",
        icon: TrendingUp,
        hint: "Built on consistency & craft",
      },
      {
        key: "satisfaction",
        label: "Client Satisfaction",
        value: 98,
        suffix: "%",
        icon: BadgeCheck,
        hint: "Quality that holds up",
      },
    ],
    []
  )

  const [activeStat, setActiveStat] = useState<StatKey | "all">("all")
  const [selected, setSelected] = useState<(typeof testimonials)[number] | null>(null)

  const filteredTestimonials = useMemo(() => {
    // Light, intentional mapping (keeps it honest—no fake metrics per client)
    if (activeStat === "all") return testimonials

    if (activeStat === "clients") return testimonials
    if (activeStat === "projects")
      return testimonials.filter((t) =>
        /deadline|turnaround|delivered|24 hours|branches|regional|roll-out|rollout/i.test(t.testimonial)
      )
    if (activeStat === "years")
      return testimonials.filter((t) =>
        /consistent|craftsmanship|precision|quality|attention to detail|technology/i.test(t.testimonial)
      )
    if (activeStat === "satisfaction")
      return testimonials.filter((t) =>
        /impeccable|pleasure|flawless|best we've seen|stunning|top-tier/i.test(t.testimonial)
      )

    return testimonials
  }, [activeStat])

  const openWhatsApp = (name?: string, company?: string) => {
    const phone = "254701869821"
    const text =
      `Hello Brandson Media!%0A%0A` +
      `I saw your Testimonials page and I would like to discuss a project.%0A` +
      (name ? `Reference: ${encodeURIComponent(name)} (${encodeURIComponent(company || "")})%0A` : "") +
      `%0AKindly share pricing, turnaround time, and required specs.%0AThank you!`
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative bg-dark-section-bg text-dark-section-fg overflow-hidden">
          <div className="absolute inset-0 bg-[url('/IMG20231019165648.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-background" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-widest uppercase text-dark-section-fg/80 backdrop-blur">
                Real words. Real work. Real outcomes.
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-balance">
                Trusted by <span className="text-primary">Industry Leaders</span>
              </h1>

              <p className="text-lg md:text-xl text-dark-section-fg/80 max-w-3xl mx-auto text-pretty">
                Don&apos;t just take our word for it. Hear from businesses across Kenya who have trusted Brandson Media
                to bring their brand visions to life through precision printing and signage.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="h-12 rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                  onClick={() => openWhatsApp()}
                >
                  Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 rounded-2xl bg-white/10 text-dark-section-fg hover:bg-white/15 border border-white/15"
                  onClick={() => {
                    const el = document.getElementById("testimonials")
                    el?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Read Reviews
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE STATS */}
        <section className="py-14 bg-muted/30 border-y border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-xs font-extrabold tracking-widest uppercase text-primary">Quick Proof</p>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Tap a stat to filter reviews</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Not a gimmick—just a faster way to find what you care about.
                </p>
              </div>

              <Button
                variant="secondary"
                className="rounded-2xl border border-border/60"
                onClick={() => setActiveStat("all")}
              >
                Reset
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {stats.map((stat) => {
                const Icon = stat.icon
                const isActive = activeStat === stat.key
                return (
                  <button
                    key={stat.key}
                    type="button"
                    onClick={() => setActiveStat(stat.key)}
                    className={[
                      "group text-left rounded-3xl border bg-background/60 backdrop-blur p-5 md:p-6 transition-all",
                      "hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary",
                      isActive ? "border-primary/60 shadow-xl" : "border-border/60",
                    ].join(" ")}
                    aria-pressed={isActive}
                    title="Click to filter testimonials"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={[
                          "text-[11px] font-extrabold tracking-widest uppercase",
                          isActive ? "text-primary" : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {isActive ? "Active" : "Tap"}
                      </span>
                    </div>

                    <div className="mt-5">
                      <p className="text-3xl md:text-4xl font-extrabold text-primary leading-none">
                        {stat.value}
                        {stat.suffix}
                      </p>
                      <p className="text-sm font-semibold text-foreground mt-2">{stat.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.hint}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-7 rounded-2xl border border-border/60 bg-background/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-extrabold text-foreground">{filteredTestimonials.length}</span> review
                {filteredTestimonials.length === 1 ? "" : "s"}
                {activeStat !== "all" ? (
                  <>
                    {" "}
                    filtered by <span className="font-extrabold text-primary">“{stats.find((s) => s.key === activeStat)?.label}”</span>
                  </>
                ) : null}
                .
              </p>

              <Button className="rounded-2xl" onClick={() => openWhatsApp()}>
                Ask for a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold tracking-widest uppercase text-primary">Testimonials</p>
                <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">What clients say after delivery</h2>
                <p className="mt-2 text-muted-foreground max-w-2xl">
                  Clean finishing. Clear communication. Work that stays sharp in the real world.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant={activeStat === "all" ? "default" : "secondary"}
                  className="rounded-2xl"
                  onClick={() => setActiveStat("all")}
                >
                  All
                </Button>
                <Button
                  variant={activeStat === "projects" ? "default" : "secondary"}
                  className="rounded-2xl"
                  onClick={() => setActiveStat("projects")}
                >
                  Fast Turnaround
                </Button>
                <Button
                  variant={activeStat === "years" ? "default" : "secondary"}
                  className="rounded-2xl"
                  onClick={() => setActiveStat("years")}
                >
                  Quality & Precision
                </Button>
              </div>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredTestimonials.map((t, index) => (
                <Card
                  key={`${t.name}-${index}`}
                  className="break-inside-avoid border-border/50 hover:border-primary/40 hover:shadow-xl transition-all duration-300 bg-card/60 backdrop-blur-sm rounded-[2rem] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setSelected(t)}
                    className="w-full text-left"
                    aria-label={`Open testimonial by ${t.name}`}
                  >
                    <CardContent className="p-8">
                      <Quote className="h-10 w-10 text-primary/10 mb-4" />
                      <p className="text-foreground/90 italic leading-relaxed mb-6 text-lg">
                        “{t.testimonial}”
                      </p>

                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                        <div className="relative h-12 w-12 shrink-0">
                          <Image
                            src={t.image || "/placeholder.svg"}
                            alt={t.name}
                            fill
                            className="rounded-full object-cover border-2 border-primary/20"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-extrabold text-foreground truncate">{t.name}</p>
                          <p className="text-xs font-bold text-primary uppercase tracking-tight truncate">{t.role}</p>
                          <p className="text-xs text-muted-foreground truncate">{t.company}</p>
                        </div>
                      </div>

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-primary">
                        Read full <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEW MODAL */}
        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="w-full max-w-3xl rounded-[2rem] overflow-hidden border border-white/10 bg-background shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 border-b border-border/60 flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0">
                    <Image
                      src={selected.image || "/placeholder.svg"}
                      alt={selected.name}
                      fill
                      className="rounded-full object-cover border-2 border-primary/20"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold tracking-widest uppercase text-primary">Client Review</p>
                    <h3 className="text-xl md:text-2xl font-extrabold">{selected.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selected.role} • {selected.company}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      {[...Array(selected.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="rounded-full bg-black/5 hover:bg-black/10 p-2 transition"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <Quote className="h-10 w-10 text-primary/10 mb-4" />
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
                  “{selected.testimonial}”
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
                  <Button variant="secondary" className="rounded-2xl" onClick={() => setSelected(null)}>
                    Close
                  </Button>
                  <Button className="rounded-2xl" onClick={() => openWhatsApp(selected.name, selected.company)}>
                    Start a Similar Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              Join our growing list of satisfied partners in Nairobi. Let’s create something that looks sharp — and sells.
            </p>

            <Button
              size="lg"
              className="h-14 px-10 rounded-full bg-white text-primary font-extrabold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => openWhatsApp()}
            >
              Start Your Project Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}