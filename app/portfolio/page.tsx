"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Search,
  ZoomIn,
  ZoomOut,
  Copy,
} from "lucide-react"

const categories = ["All", "Branding", "Printing", "Signage", "UV Printing", "Events"] as const
type Category = (typeof categories)[number]

type PortfolioItem = {
  title: string
  category: Exclude<Category, "All">
  cover: string // ✅ single image per card
  client?: string
  year?: string
  summary: string
  deliverables: string[]
  outcome?: string
  tags?: string[]
}

const portfolioItems: PortfolioItem[] = [
  {
    title: "Corporate T-Shirt Branding",
    category: "Branding",
    cover: "/branded-corporate-t-shirts-uniform.jpg",
    client: "Corporate Client",
    year: "2025",
    summary: "Uniform branding designed for visibility, comfort, and consistency across teams and departments.",
    deliverables: ["Design layout", "Print setup", "Quality control"],
    outcome: "Clean identity alignment across staff uniforms.",
    tags: ["Apparel", "Screen/DTF", "Bulk"],
  },
  {
    title: "Roll-Up Banner Design & Print",
    category: "Printing",
    cover: "/professional-roll-up-banner-stand.jpg",
    client: "Event/Marketing Team",
    year: "2025",
    summary: "High-contrast banners optimized for distance readability and clean finishing for repeated deployments.",
    deliverables: ["Layout design", "Print", "Finishing"],
    outcome: "Sharper messaging and better booth visibility.",
    tags: ["Large format", "Events", "Fast turnaround"],
  },
  {
    title: "Vehicle Fleet Branding",
    category: "Branding",
    cover: "/vehicle-branding-car-wrap-kenya.jpg",
    client: "Logistics Company",
    year: "2025",
    summary: "Fleet branding built for road visibility, durability, and clean application on multiple vehicle types.",
    deliverables: ["Mockups", "Vinyl print", "Installation"],
    outcome: "Increased brand presence across daily routes.",
    tags: ["Wraps", "Vinyl", "Outdoor"],
  },
  {
    title: "Restaurant 3D Signage",
    category: "Signage",
    cover: "/3d-restaurant-signage-illuminated.jpg",
    client: "Hospitality Brand",
    year: "2024",
    summary: "3D illuminated signage engineered for nighttime legibility and premium storefront presence.",
    deliverables: ["Fabrication", "Mounting", "Finishing"],
    outcome: "Stronger storefront recognition after dark.",
    tags: ["3D", "Illuminated", "Exterior"],
  },
  {
    title: "UV Printed Branded Water Bottles",
    category: "UV Printing",
    cover: "/uv-printed-branded-water-bottles (2).jpg",
    client: "Corporate Client",
    year: "2024",
    summary: "UV branding on bottles with crisp detail, accurate color, and durable adhesion.",
    deliverables: ["Surface prep", "UV print", "Quality check"],
    outcome: "Premium giveaways with consistent branding.",
    tags: ["Merch", "UV", "Color accuracy"],
  },
  {
    title: "Conference Event Branding Setup",
    category: "Events",
    cover: "/IMG20230821143027.jpg",
    client: "Conference Organizer",
    year: "2025",
    summary: "Full event branding setup optimized for photography, stage presence, and sponsor visibility.",
    deliverables: ["Backdrop", "Directional signage", "Rollups"],
    outcome: "Clean stage visuals and sponsor clarity.",
    tags: ["Backdrops", "On-site", "Fast"],
  },
  {
    title: "Acrylic Menu Holders",
    category: "Signage",
    cover: "/acrylic-menu-holders.jpg",
    client: "Restaurant",
    year: "2024",
    summary: "Acrylic holders cut and finished for daily handling, clarity, and a premium table look.",
    deliverables: ["Laser cutting", "Polish/finishing", "Packaging"],
    outcome: "Improved table presentation and durability.",
    tags: ["Acrylic", "Laser", "Interior"],
  },
  {
    title: "Promotional Pens (UV)",
    category: "UV Printing",
    cover: "/uv-printed-promotional-items.jpg",
    client: "Corporate Client",
    year: "2024",
    summary: "High-volume UV branding on pens with clean alignment and consistent placement.",
    deliverables: ["UV print", "Batch handling", "Quality control"],
    outcome: "Merch that looks premium in bulk.",
    tags: ["Merch", "Bulk", "UV"],
  },
  {
    title: "Corporate Promotional Prints",
    category: "Printing",
    cover: "/promotional.jpg",
    client: "Marketing Team",
    year: "2024",
    summary: "Promotional print assets optimized for clarity, brand color accuracy, and strong finishing.",
    deliverables: ["Print", "Cut/trim", "Finishing"],
    outcome: "Improved campaign consistency across materials.",
    tags: ["Print", "Brand consistency"],
  },
  {
    title: "Outdoor Signage",
    category: "Signage",
    cover: "/IMG20230907195815.jpg",
    client: "Retail Client",
    year: "2024",
    summary: "Outdoor signage produced for visibility, weather resistance, and clean installation.",
    deliverables: ["Fabrication", "Installation prep", "Finishing"],
    outcome: "Higher walk-in attention from the street.",
    tags: ["Outdoor", "Durable"],
  },
  {
    title: "Event Backdrop",
    category: "Events",
    cover: "/event-backdrop.jpg",
    client: "Event Client",
    year: "2025",
    summary: "Backdrop designed for camera-ready clarity and premium finishing to elevate the event space.",
    deliverables: ["Design", "Print", "Finishing"],
    outcome: "Better brand presence in photos and video.",
    tags: ["Backdrop", "Stage"],
  },
  {
    title: "Embroidery Branding",
    category: "Branding",
    cover: "/embroidery.jpg",
    client: "Corporate Client",
    year: "2024",
    summary: "Embroidery work focused on durability, stitch precision, and a premium uniform finish.",
    deliverables: ["Digitizing", "Embroidery", "Quality check"],
    outcome: "Premium uniform branding with longevity.",
    tags: ["Embroidery", "Uniforms"],
  },
]

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMTExODI3Ii8+PC9zdmc+"

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [query, setQuery] = useState("")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [copied, setCopied] = useState(false)

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const lastTouchTime = useRef<number>(0)

  const filteredItems = useMemo(() => {
    const byCategory =
      activeCategory === "All"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeCategory)

    if (!query.trim()) return byCategory
    const q = query.trim().toLowerCase()
    return byCategory.filter((item) => {
      const hay = [
        item.title,
        item.category,
        item.client ?? "",
        item.summary,
        ...(item.tags ?? []),
        ...(item.deliverables ?? []),
      ]
        .join(" ")
        .toLowerCase()
      return hay.includes(q)
    })
  }, [activeCategory, query])

  const featured = useMemo(() => portfolioItems.slice(0, 3), [])

  const activeItem = lightboxIndex === null ? null : filteredItems[lightboxIndex]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsZoomed(false)
    setCopied(false)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    setIsZoomed(false)
    setCopied(false)
  }

  const prev = () => {
    setLightboxIndex((i) => {
      if (i === null) return i
      const nextIndex = (i - 1 + filteredItems.length) % filteredItems.length
      return nextIndex
    })
    setIsZoomed(false)
    setCopied(false)
  }

  const next = () => {
    setLightboxIndex((i) => {
      if (i === null) return i
      const nextIndex = (i + 1) % filteredItems.length
      return nextIndex
    })
    setIsZoomed(false)
    setCopied(false)
  }

  // ✅ Prefilled WhatsApp message with the selected portfolio item
  const openWhatsAppForProject = (item: PortfolioItem) => {
    const phone = "254701869821"
    const text =
      `Hello Brandson Media!%0A%0A` +
      `*Portfolio Inquiry*%0A` +
      `*Project:* ${encodeURIComponent(item.title)}%0A` +
      `*Category:* ${encodeURIComponent(item.category)}%0A` +
      (item.client ? `*Client Type:* ${encodeURIComponent(item.client)}%0A` : "") +
      (item.year ? `*Year:* ${encodeURIComponent(item.year)}%0A` : "") +
      `%0A` +
      `I’d like something similar. Kindly share pricing, turnaround time, and required specs (size/quantity/material).%0A` +
      `Thank you!`

    window.open(`https://wa.me/${phone}?text=${text}`, "_blank")
  }

  const copyProjectTitle = async (item: PortfolioItem) => {
    try {
      await navigator.clipboard.writeText(`${item.title} — ${item.category}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  // Premium: keyboard controls + lock scroll
  useEffect(() => {
    if (lightboxIndex === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key.toLowerCase() === "z") setIsZoomed((v) => !v)
    }

    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filteredItems.length])

  // Premium: swipe gestures (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const endX = e.changedTouches[0]?.clientX
    const endY = e.changedTouches[0]?.clientY
    if (endX == null || endY == null) return

    const dx = endX - touchStartX.current
    const dy = endY - touchStartY.current

    touchStartX.current = null
    touchStartY.current = null

    const now = Date.now()
    if (now - lastTouchTime.current < 250) return
    lastTouchTime.current = now

    const absX = Math.abs(dx)
    const absY = Math.abs(dy)
    if (absX < 40 || absX < absY) return

    if (dx > 0) prev()
    else next()
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-dark-section-bg text-dark-section-fg overflow-hidden">
        <div className="absolute inset-0 bg-[url('/IMG20231019165648.jpg')] bg-cover bg-center opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-background" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-widest uppercase text-dark-section-fg/80 backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              Selected work • Print • Branding • Signage
            </div>

            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight">
              Professional <span className="text-secondary">Portfolio</span>
            </h1>

            <p className="mt-5 text-base sm:text-xl text-dark-section-fg/70 leading-relaxed max-w-2xl">
              One strong cover per project. Built like case studies — clean visuals, clear outcomes.
              Click a card to preview and request a quote fast.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="h-12 rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                asChild
              >
                <a href="#work">
                  View Work <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="h-12 rounded-2xl bg-white/10 text-dark-section-fg hover:bg-white/15 border border-white/15"
                asChild
              >
                <a href="https://wa.me/254701869821" target="_blank" rel="noopener noreferrer">
                  Request a Quote
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-extrabold tracking-widest uppercase text-primary">Featured</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">High-impact projects</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Work that proves the standard: clean finishing, accurate color, strong brand presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  const idx = filteredItems.findIndex((x) => x.title === item.title)
                  openLightbox(Math.max(idx, 0))
                }}
                className="group text-left rounded-[2rem] overflow-hidden border border-border/60 bg-card/60 hover:bg-card/80 hover:shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label={`Open project: ${item.title}`}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.cover || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest bg-white/10 border border-white/15 text-white/90 rounded-full px-3 py-1 backdrop-blur">
                      <Briefcase className="h-4 w-4" />
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/80 line-clamp-2">{item.summary}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {(item.tags ?? []).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground border border-border/60 rounded-full px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-primary">
                    View details <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section id="work" className="py-16 bg-muted/20 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-border/60 bg-background/70 backdrop-blur p-6 md:p-8 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold tracking-widest uppercase text-primary">Browse Work</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
                  Filter by category, search by need
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Professional format: one cover image per project. Click for full preview + request path.
                </p>
              </div>

              <div className="w-full lg:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search: signage, UV, banners, wraps..."
                    className="w-full h-12 rounded-2xl border border-border bg-card pl-10 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    aria-label="Search portfolio"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-muted transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Showing <span className="text-foreground font-extrabold">{filteredItems.length}</span> project
                  {filteredItems.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={[
                    "rounded-full",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:bg-primary hover:text-primary-foreground",
                  ].join(" ")}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                onClick={() => openLightbox(index)}
                className="group text-left rounded-[2rem] overflow-hidden border border-border/60 bg-background hover:bg-card/70 hover:shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label={`Open details: ${item.title}`}
              >
                <div className="relative aspect-[16/11]">
                  <Image
                    src={item.cover || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <span className="inline-block px-3 py-1 bg-white/10 border border-white/15 text-white/90 rounded-full text-[11px] font-extrabold tracking-widest uppercase backdrop-blur">
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/80 line-clamp-2">{item.summary}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {(item.tags ?? []).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground border border-border/60 rounded-full px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-sm font-extrabold text-foreground">View case details</span>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">No projects found. Try a different keyword or category.</p>
              <div className="mt-4 flex justify-center gap-3">
                <Button
                  variant="outline"
                  className="rounded-2xl border-border text-foreground hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {
                    setQuery("")
                    setActiveCategory("All")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-center pt-12">
            <Button size="lg" className="rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-colors" asChild>
              <a href="https://photos.app.goo.gl/62LxMxU1mRU2efhp7" target="_blank" rel="noopener noreferrer">
                View Full Gallery
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">Want a similar outcome for your brand?</h2>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Share your specs and timeline — we’ll reply with a quote and the best route to execute.
          </p>
          <div className="mt-8">
            <Button size="lg" className="h-12 rounded-2xl bg-background text-foreground hover:bg-background/90" asChild>
              <a href="https://wa.me/254701869821" target="_blank" rel="noopener noreferrer">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* PREMIUM LIGHTBOX (UPDATED: shows full card experience) */}
      {activeItem && (
        <div className="fixed inset-0 z-[70]">
          {/* Backdrop (click to close) */}
          <button
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeLightbox}
            aria-label="Close preview"
          />

          {/* Dialog */}
          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-[2rem] border border-white/10 bg-background shadow-2xl">
              {/* Top bar */}
              <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 border-b border-border/60">
                <div className="min-w-0">
                  <p className="text-xs font-extrabold tracking-widest uppercase text-primary">
                    {activeItem.category}
                  </p>
                  <h3 className="mt-1 text-base sm:text-lg md:text-xl font-extrabold truncate">
                    {activeItem.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Zoom */}
                  <button
                    onClick={() => setIsZoomed((v) => !v)}
                    className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/60 bg-muted/30 hover:bg-muted transition"
                    aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                    title="Press Z to toggle zoom"
                  >
                    {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                    <span className="text-xs font-extrabold tracking-widest uppercase">
                      {isZoomed ? "Zoom Out" : "Zoom In"}
                    </span>
                  </button>

                  {/* Copy */}
                  <button
                    onClick={() => copyProjectTitle(activeItem)}
                    className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/60 bg-muted/30 hover:bg-muted transition"
                    aria-label="Copy project title"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="text-xs font-extrabold tracking-widest uppercase">
                      {copied ? "Copied" : "Copy"}
                    </span>
                  </button>

                  {/* Prev/Next */}
                  {filteredItems.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/70 transition"
                        aria-label="Previous"
                        title="←"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={next}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/70 transition"
                        aria-label="Next"
                        title="→"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Close */}
                  <button
                    onClick={closeLightbox}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/70 transition"
                    aria-label="Close preview"
                    title="Esc"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Body (scrollable) — shows full “card” content */}
              <div className="overflow-auto max-h-[calc(92vh-64px)]">
                <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: card-style preview (image + tags + summary) */}
                  <div
                    className="lg:col-span-7"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                  >
                    <div className="rounded-[2rem] overflow-hidden border border-border/60 bg-card/60">
                      {/* Image stage: fully visible */}
                      <div className="relative bg-black">
                        <div className="relative h-[46vh] min-h-[280px] w-full">
                          <div
                            className={[
                              "absolute inset-0 transition-transform duration-500 ease-out",
                              isZoomed ? "scale-[1.18] cursor-zoom-out" : "scale-100 cursor-zoom-in",
                            ].join(" ")}
                            onClick={() => setIsZoomed((v) => !v)}
                            role="button"
                            aria-label="Toggle zoom"
                            title="Click to zoom"
                          >
                            <Image
                              src={activeItem.cover || "/placeholder.svg"}
                              alt={activeItem.title}
                              fill
                              className="object-contain"
                              sizes="100vw"
                              priority
                              placeholder="blur"
                              blurDataURL={blurDataURL}
                            />
                          </div>
                        </div>

                        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
                          <span className="text-xs bg-black/55 text-white px-3 py-1 rounded-full backdrop-blur">
                            {(lightboxIndex ?? 0) + 1} / {filteredItems.length}
                          </span>
                          <span className="hidden sm:inline text-xs bg-black/35 text-white/90 px-3 py-1 rounded-full backdrop-blur">
                            Swipe • Z to zoom • Esc to close
                          </span>
                        </div>
                      </div>

                      {/* “Card” content like the grid card */}
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-wrap gap-2">
                          {(activeItem.tags ?? []).slice(0, 6).map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground border border-border/60 rounded-full px-3 py-1"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                          {activeItem.summary}
                        </p>

                        {activeItem.outcome && (
                          <div className="mt-4 rounded-2xl border border-border/60 bg-muted/30 p-4">
                            <p className="text-sm font-extrabold text-foreground">Outcome</p>
                            <p className="mt-2 text-sm text-muted-foreground">{activeItem.outcome}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: details + actions */}
                  <div className="lg:col-span-5">
                    <div className="rounded-[2rem] border border-border/60 bg-background/70 p-5 sm:p-6">
                      <p className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">
                        Project Info
                      </p>

                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-muted-foreground">Category</span>
                          <span className="font-extrabold text-foreground">{activeItem.category}</span>
                        </div>
                        {activeItem.client && (
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-muted-foreground">Client</span>
                            <span className="font-extrabold text-foreground">{activeItem.client}</span>
                          </div>
                        )}
                        {activeItem.year && (
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-muted-foreground">Year</span>
                            <span className="font-extrabold text-foreground">{activeItem.year}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6">
                        <p className="text-sm font-extrabold text-foreground">Deliverables</p>
                        <ul className="mt-3 space-y-2">
                          {activeItem.deliverables.map((d) => (
                            <li key={d} className="flex items-center gap-3 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span className="text-foreground/90">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-col gap-3">
                        <Button className="rounded-2xl" onClick={() => openWhatsAppForProject(activeItem)}>
                          Request This Project <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <Button variant="secondary" className="rounded-2xl" onClick={() => copyProjectTitle(activeItem)}>
                          <Copy className="mr-2 h-4 w-4" />
                          {copied ? "Copied!" : "Copy Project Name"}
                        </Button>

                        <Button variant="outline" className="rounded-2xl" onClick={closeLightbox}>
                          Close Preview
                        </Button>
                      </div>

                      <p className="mt-5 text-xs text-muted-foreground">
                        Tip: Send size, quantity, material, and deadline — you’ll get a faster quote.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* end scroll body */}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  )
}