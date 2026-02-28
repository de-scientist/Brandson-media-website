"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Printer,
  Shirt,
  Sparkles,
  Building2,
  GraduationCap,
  FileText,
  Scissors,
  Layers,
  Package,
  Hotel,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const serviceCategories = [
  {
    id: "printing",
    icon: Printer,
    title: "Printing & Stickers",
    description: "High-quality banners and stickers for all your promotional needs.",
    images: ["/printing-banners-rollup.jpg", "/printing-stickers-vinyl.jpg", "/vehicle-branding-wrap.jpg", "/print1.jpg"],
    items: [
      {
        subtitle: "Banners",
        list: ["Roll-up banners", "Tear drop banners", "Pop-up banners", "Backdrop banners", "Telescopic banners", "Road banners"],
      },
      {
        subtitle: "Stickers",
        list: ["Wall branding stickers", "Car wrapping & vehicle branding", "Packaging labels", "Contour cutting stickers"],
      },
    ],
  },
  {
    id: "branding",
    icon: Shirt,
    title: "Branding Services (Apparel)",
    description: "Professional branding on apparel and corporate wear.",
    images: ["/embroidery.jpg", "/branded-corporate-t-shirts-uniform.jpg", "/uv-printed-promotional-items-bottles.jpg", "/promotional1.jpg"],
    items: [
      { subtitle: "Services", list: ["T-shirt branding", "Screen printing", "Embroidery"] },
      {
        subtitle: "Branded Items",
        list: ["T-shirts", "Dust coats", "Aprons", "Overalls", "Jackets", "Hoodies", "Caps & hats", "General apparel"],
      },
    ],
  },
  {
    id: "uv-printing",
    icon: Sparkles,
    title: "UV Printing Services",
    description: "Premium UV printing on promotional merchandise and gifts.",
    images: ["/uv-printed-promotional-items.jpg", "/IMG20260213184001.jpg", "/IMG20240103183335.jpg", "/brand.jpg"],
    items: [
      {
        subtitle: "Products",
        list: ["Water bottles", "Notebooks & diaries", "Pens", "Thermo mugs & tumblers", "Clocks", "Desktop organizers", "Customized gifts", "Promotional merchandise & giveaways"],
      },
    ],
  },
  {
    id: "hotel",
    icon: Hotel,
    title: "Hotel & Conference Solutions",
    description: "Professional branded materials for hospitality and events.",
    images: ["/IMG20260131172039.jpg", "/IMG20260130180600.jpg", "/promotional1.jpg", "/IMG20260126152115.jpg"],
    items: [
      { subtitle: "Products", list: ["Branded conference pens", "Notepads & notebooks", "Attendance registers", "Training manuals & guides"] },
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training Centres Support",
    description: "Complete solutions for training institutions and workshops.",
    images: ["/IMG20230415183051.jpg", "/IMG20230821143027.jpg", "/uv-printed-promotional-items-bottles.jpg", "/company-profile-printing.jpg"],
    items: [
      { subtitle: "Products", list: ["Training manuals", "Custom awards & trophies", "Badges & tags", "Winner awards", "Participant certificates"] },
    ],
  },
  {
    id: "paper",
    icon: FileText,
    title: "Paper Printing Services",
    description: "Professional paper printing for corporate documentation.",
    images: ["/paper-printing-kenya.jpeg", "/pen-books.jpeg", "/professional-roll-up-banner-stand.jpg", "/IMG20260123200231.jpg"],
    items: [
      { subtitle: "Products", list: ["Company profiles (design & print)", "Letterheads", "Journals & diaries", "Training & conference guides"] },
    ],
  },
  {
    id: "laser-cutting",
    icon: Scissors,
    title: "Laser Cutting & Engraving",
    description: "Precision laser cutting and engraving services.",
    images: ["/IMG20260221113312.jpg", "/laser-printing.jpg", "/IMG20260204184906.jpg", "/IMG20260212124145.jpg"],
    items: [
      {
        subtitle: "Services",
        list: ["Acrylic / Perspex cutting", "2D & 3D logos", "Wood cutting & engraving", "Wooden key holders", "Door signs & hangers", "Acrylic room key holders", "Floor labels", "Building names & signage", "Customized engraved items"],
      },
    ],
  },
  {
    id: "signage",
    icon: Building2,
    title: "Signages & 3D Signs",
    description: "Durable indoor and outdoor signage solutions.",
    images: ["/3d-company-signage-letters.jpg", "/IMG20230327153715.jpg", "/IMG20230208101603.jpg", "/IMG20230630142526 (1).jpg"],
    items: [
      { subtitle: "3D Signs For", list: ["Restaurants", "Barbershops", "Hotels", "Buildings", "Malls", "Supermarkets", "Gas stations"] },
    ],
  },
  {
    id: "displays",
    icon: Layers,
    title: "Acrylic Bending & Custom Displays",
    description: "Custom acrylic displays and holders for retail.",
    images: ["/acrylic-menu-holders.jpg", "/14.png", "/15.png", "/16-.png"],
    items: [
      { subtitle: "Products", list: ["Menu holders", "Price tag holders", "Promotional stands", "Supermarket & electronics displays", "Product offer displays"] },
    ],
  },
  {
    id: "additional",
    icon: Package,
    title: "Additional Printing Services",
    description: "Comprehensive printing solutions for every need.",
    images: ["/vehicle-branding-wrap.jpg", "/paper-printing-kenya.jpeg", "/IMG20230821143027.jpg", "/IMG20230301200336.jpg"],
    items: [
      {
        subtitle: "Products",
        list: ["Business cards", "Wedding cards", "Brochures & flyers", "Magazines", "Eulogies", "Desktop standee banners & flags", "Institutional & custom flags", "Calendars", "Event branding", "Wheel covers", "Event banners & stands", "Vehicle branding"],
      },
    ],
  },
]

/**
 * CardMediaCarousel:
 * - Lives ONLY inside the card media area
 * - Doesn't interfere with the card click (open preview)
 * - Autoplays gently; can be navigated with arrows
 * - Images are fully visible (object-cover), consistent height
 */
function CardMediaCarousel({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const safeImages = images?.length ? images : ["/placeholder.svg"]
  const [idx, setIdx] = useState(0)

  // gentle autoplay (only for the card media)
  useEffect(() => {
    if (safeImages.length <= 1) return
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % safeImages.length)
    }, 4500)
    return () => clearInterval(t)
  }, [safeImages.length])

  const prev = () => setIdx((p) => (p - 1 + safeImages.length) % safeImages.length)
  const next = () => setIdx((p) => (p + 1) % safeImages.length)

  const current = safeImages[idx]

  return (
    <div className="relative h-56 sm:h-60 md:h-64 w-full">
      <Image
        src={current}
        alt={`${title} image ${idx + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={idx === 0}
      />

      {/* subtle overlay for readability (still keeps image visible) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

      {/* mini indicators */}
      {safeImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {safeImages.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-6 bg-white/90" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* arrows (stop propagation so card click still opens preview, not slide navigation click) */}
      {safeImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              prev()
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/45 text-white backdrop-blur-sm transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              next()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/45 text-white backdrop-blur-sm transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* counter */}
          <div className="absolute top-3 right-3 z-10 text-xs text-white bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {idx + 1}/{safeImages.length}
          </div>
        </>
      )}
    </div>
  )
}

export default function ServicesPage() {
  const [preview, setPreview] = useState<{
    id: string
    title: string
    images: string[]
    activeIndex: number
  } | null>(null)

  const activeImage = useMemo(() => {
    if (!preview) return null
    return preview.images[preview.activeIndex] ?? null
  }, [preview])

  const closePreview = () => setPreview(null)

  const prevImage = () => {
    if (!preview) return
    setPreview((p) => {
      if (!p) return p
      const nextIndex = (p.activeIndex - 1 + p.images.length) % p.images.length
      return { ...p, activeIndex: nextIndex }
    })
  }

  const nextImage = () => {
    if (!preview) return
    setPreview((p) => {
      if (!p) return p
      const nextIndex = (p.activeIndex + 1) % p.images.length
      return { ...p, activeIndex: nextIndex }
    })
  }

  useEffect(() => {
    if (!preview) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [preview])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-dark-section-bg text-dark-section-fg overflow-hidden">
        <div className="absolute inset-0 bg-[url('/IMG20231019165648.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Our <span className="text-primary">Services</span>
              </h1>
              <p className="mt-6 text-xl text-dark-section-fg/80 leading-relaxed">
                Comprehensive printing, branding, and signage solutions tailored to your business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {serviceCategories.map((category) => {
              const images = category.images?.length ? category.images : ["/placeholder.svg"]
              const coverFallback = images[0] || "/placeholder.svg"

              return (
                <Card
                  key={category.id}
                  id={category.id}
                  className="bg-card border-border scroll-mt-24 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() =>
                    setPreview({
                      id: category.id,
                      title: category.title,
                      images: images?.length ? images : [coverFallback],
                      activeIndex: 0,
                    })
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setPreview({
                        id: category.id,
                        title: category.title,
                        images: images?.length ? images : [coverFallback],
                        activeIndex: 0,
                      })
                    }
                  }}
                >
                  {/* Card cover carousel (NEW) */}
                  <div className="relative w-full overflow-hidden">
                    <CardMediaCarousel images={images} title={category.title} />

                    {/* bottom-left icon + hint remains (same vibe) */}
                    <div className="absolute left-6 bottom-4 flex items-center gap-3 pointer-events-none">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-sm text-dark-section-fg/90">
                        <span className="inline-block bg-dark-section-bg/40 px-3 py-1 rounded-full backdrop-blur-sm">
                          Click to preview
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-card-foreground">{category.title}</CardTitle>
                        <p className="text-muted-foreground mt-1">{category.description}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {category.items.map((item, idx) => (
                        <div key={idx}>
                          <h4 className="font-medium text-secondary mb-2">{item.subtitle}</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                            {item.list.map((listItem) => (
                              <li key={listItem} className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                {listItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <button className="absolute inset-0 bg-black/70" onClick={closePreview} aria-label="Close preview" />

          {/* Dialog */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-background border border-border rounded-lg overflow-hidden shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Preview</p>
                  <h3 className="text-lg font-semibold text-foreground">{preview.title}</h3>
                </div>

                <button
                  onClick={closePreview}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative bg-dark-section-bg">
                {/* Main image */}
                {activeImage && (
                  <div className="relative w-full h-[320px] sm:h-[420px]">
                    <Image
                      src={activeImage}
                      alt={`${preview.title} image ${preview.activeIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 800px"
                      priority
                    />
                  </div>
                )}

                {/* Nav arrows */}
                {preview.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/10 hover:bg-background/20 text-dark-section-fg backdrop-blur-sm transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/10 hover:bg-background/20 text-dark-section-fg backdrop-blur-sm transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Counter */}
                <div className="absolute bottom-3 right-3 text-xs text-dark-section-fg/90 bg-dark-section-bg/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  {preview.activeIndex + 1} / {preview.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {preview.images.length > 1 && (
                <div className="p-4 border-t border-border">
                  <div className="flex gap-3 overflow-x-auto">
                    {preview.images.map((src, idx) => {
                      const active = idx === preview.activeIndex
                      return (
                        <button
                          key={`${src}-${idx}`}
                          onClick={() => setPreview((p) => (p ? { ...p, activeIndex: idx } : p))}
                          className={`relative w-24 h-16 rounded-md overflow-hidden border transition-colors flex-shrink-0 ${
                            active ? "border-primary" : "border-border hover:border-primary/50"
                          }`}
                          aria-label={`Open image ${idx + 1}`}
                        >
                          <Image src={src} alt={`${preview.title} thumbnail ${idx + 1}`} fill className="object-cover" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Need a Custom Solution?</h2>
          <p className="mt-4 text-lg text-secondary-foreground/90 max-w-2xl mx-auto">
            Contact us today to discuss your specific requirements and get a personalized quote.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90" asChild>
              <a href="https://wa.me/254701869821" target="_blank" rel="noopener noreferrer">
                Get a Quote on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}