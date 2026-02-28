"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ShoppingCart,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react"

interface HeroSlide {
  id: string
  type: "image" | "video"
  src: string
  title: string
  subtitle: string
  description?: string
  cta?: {
    text: string
    href: string
    variant?: "default" | "outline" | "secondary"
  }
  badge?: string
  features?: string[]
}

interface DynamicHeroProps {
  slides?: HeroSlide[]
  autoPlay?: boolean
  interval?: number
  showControls?: boolean
  showThumbnails?: boolean
  height?: string
  className?: string
}

const defaultSlides: HeroSlide[] = [
  {
    id: "1",
    type: "image",
    src: "/promotional1.jpg",
    title: "Professional Branding Solutions",
    subtitle: "Transform Your Business Identity",
    description:
      "High-quality corporate branding, uniforms, and promotional materials that make your brand stand out.",
    cta: { text: "Get Started", href: "/quote", variant: "default" },
    badge: "Popular",
    features: ["Premium Quality", "Fast Delivery", "Best Prices"],
  },
  {
    id: "2",
    type: "video",
    src: "/uv-printing.mp4",
    title: "UV Printing Technology",
    subtitle: "Advanced Printing Solutions",
    description: "Cutting-edge UV printing technology for vibrant, durable prints on any surface.",
    cta: { text: "Learn More", href: "/services?category=uv-printing", variant: "outline" },
    badge: "New",
    features: ["UV Technology", "Eco-Friendly", "Long-lasting"],
  },
  {
    id: "3",
    type: "image",
    src: "/corporate-event-branding-kenya.jpg",
    title: "Event & Exhibition Solutions",
    subtitle: "Make Your Event Unforgettable",
    description: "Complete event branding solutions from banners to displays and everything in between.",
    cta: { text: "View Portfolio", href: "/portfolio", variant: "secondary" },
    features: ["Custom Designs", "Quick Turnaround", "Expert Installation"],
  },
  {
    id: "4",
    type: "video",
    src: "/led-billboard-advertising-kenya.mp4",
    title: "LED Billboard Advertising",
    subtitle: "Dominate Attention. Day & Night.",
    description:
      "Elevate your brand with powerful LED billboard advertising that delivers bold visuals, nonstop visibility, and unmatched audience reach across high-traffic locations.",
    cta: { text: "Our Services", href: "/services", variant: "default" },
    badge: "Featured",
    features: ["Ultra-Bright HD Display", "Prime Traffic Locations", "24/7 Brand Exposure"],
},
]

function isEmbedUrl(src: string) {
  const s = src.toLowerCase()
  return (
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.includes("youtube.com") ||
    s.includes("youtu.be") ||
    s.includes("vimeo.com")
  )
}

export function DynamicHero({
  slides = defaultSlides,
  autoPlay = true,
  interval = 10000,
  showControls = true,
  showThumbnails = false,
  height = "h-[600px]",
  className = "",
}: DynamicHeroProps) {
  const safeSlides = useMemo(() => (slides?.length ? slides : defaultSlides), [slides])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(true)

  const containerRef = useRef<HTMLDivElement | null>(null)

  // Clamp slide index if slides change
  useEffect(() => {
    if (currentSlide >= safeSlides.length) setCurrentSlide(0)
  }, [safeSlides.length, currentSlide])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % safeSlides.length)
    }, interval)
    return () => clearInterval(timer)
  }, [isPlaying, interval, safeSlides.length])

  const goToSlide = (index: number) => setCurrentSlide(index)
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + safeSlides.length) % safeSlides.length)
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % safeSlides.length)
  const togglePlayPause = () => setIsPlaying((v) => !v)

  const toggleFullscreen = async () => {
    const el = containerRef.current
    if (!el) return
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await el.requestFullscreen()
      }
    } catch {
      // Silently ignore if browser blocks it
    }
  }

  const currentSlideData = safeSlides[currentSlide]

  // Keyboard UX: arrows + space
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
    if (e.key === " ") {
      e.preventDefault()
      togglePlayPause()
    }
  }

  const renderSlideContent = () => {
    if (currentSlideData.type === "video") {
      // If it's an embed (YouTube/Vimeo/etc), keep iframe behavior
      if (isEmbedUrl(currentSlideData.src)) {
        const joinChar = currentSlideData.src.includes("?") ? "&" : "?"
        const muteParam = `mute=${isMuted ? "1" : "0"}`
        return (
          <div className="relative w-full h-full">
            <iframe
              src={`${currentSlideData.src}${joinChar}${muteParam}`}
              title={currentSlideData.title}
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </div>
        )
      }

      // Local video (mp4/webm/etc) — this is the UX fix that makes your slide actually play
      return (
        <div className="relative w-full h-full">
          <video
            className="w-full h-full object-cover"
            src={currentSlideData.src}
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
      )
    }

    return (
      <div className="relative w-full h-full">
        <img src={currentSlideData.src} alt={currentSlideData.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${height} overflow-hidden ${className}`}
      role="region"
      aria-label="Hero carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Slide Content */}
      <div className="relative w-full h-full">
        {renderSlideContent()}

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-white" aria-live="polite">
              <div className="flex items-center gap-3 mb-4">
                {currentSlideData.badge && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {currentSlideData.badge}
                  </Badge>
                )}

                {/* Rating (fixed: no duplicate stars) */}
                <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {currentSlideData.title}
              </h1>

              <h2 className="text-xl md:text-2xl mb-6 text-white/90">{currentSlideData.subtitle}</h2>

              {currentSlideData.description && (
                <p className="text-lg mb-6 text-white/80 max-w-xl">{currentSlideData.description}</p>
              )}

              {currentSlideData.features && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {currentSlideData.features.map((feature, index) => (
                    <div
                      key={`${currentSlideData.id}-feature-${index}`}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                    >
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-white">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {currentSlideData.cta && (
                  <Button
                    size="lg"
                    variant={currentSlideData.cta.variant as any}
                    asChild
                    className="bg-white text-black hover:bg-white/90"
                  >
                    <a href={currentSlideData.cta.href} aria-label={currentSlideData.cta.text}>
                      {currentSlideData.cta.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}

                <Button size="lg" className="rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-colors" asChild>
              <a href="https://photos.app.goo.gl/62LxMxU1mRU2efhp7" target="_blank" rel="noopener noreferrer">
                View Full Gallery
              </a>
            </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Play/Pause and Volume Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={togglePlayPause}
              className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            {currentSlideData.type === "video" && (
              <button
                onClick={() => setIsMuted((v) => !v)}
                className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            )}

            <button
              onClick={toggleFullscreen}
              className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </>
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {safeSlides.map((slide, index) => (
          <button
            key={slide.id ?? index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {safeSlides.map((slide, index) => (
            <button
              key={slide.id ?? index}
              onClick={() => goToSlide(index)}
              className={`relative w-20 h-12 rounded overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                index === currentSlide ? "border-white" : "border-transparent hover:border-white/50"
              }`}
              aria-label={`Preview slide ${index + 1}`}
            >
              {slide.type === "image" ? (
                <img src={slide.src} alt={slide.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}