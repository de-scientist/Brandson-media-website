/**
 * Central Brandson Media site configuration.
 *
 * This is the single source of truth for business information, navigation,
 * social profiles, and shared copy. Keeping it here prevents the NAP
 * (Name / Address / Phone) inconsistencies that previously existed between
 * the footer, contact page, and schema markup.
 *
 * NOTE ON UNVERIFIED DATA:
 * - Stats and the street address below reflect values already present in the
 *   existing codebase. They are flagged for human verification (see
 *   PENDING_VERIFICATION). Do not treat them as confirmed until Brandson Media
 *   signs off. No figures have been invented here.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://brandsonmedia.co.ke"

export const business = {
  name: "Brandson Media",
  legalName: "Brandson Media",
  url: SITE_URL,
  // NAP — used in footer, contact page, and JSON-LD. Keep identical everywhere.
  email: "brandsonmedia@gmail.com",
  phone: "+254 701 869821",
  whatsapp: "254701869821",
  address: {
    street: "20 Jainsala Road",
    city: "Nairobi",
    region: "Nairobi County",
    postalCode: "",
    country: "KE",
    countryName: "Kenya",
  },
  // Geo coordinates are intentionally omitted from schema until verified.
  // PENDING_VERIFICATION: confirm exact lat/long with Brandson Media.
  geo: undefined as { lat: number; lng: number } | undefined,
  // Opening hours (in Africa/Nairobi time). PENDING_VERIFICATION.
  hours: [
    { days: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
    { days: "Saturday", hours: "9:00 AM – 4:00 PM" },
    { days: "Sunday", hours: "Closed" },
  ],
  tagline: "Make your business impossible to overlook.",
  description:
    "Brandson Media is a Nairobi-based printing, branding, signage, and promotional production studio serving SMEs, corporates, hospitality, institutions, and events across Kenya.",
  // PENDING_VERIFICATION: founded year (about page states EST. 2016).
  establishedYear: 2016,
} as const

/**
 * Business statistics.
 * These values are shown consistently across the site and are flagged for
 * verification. Replace with confirmed figures before public launch.
 * PENDING_VERIFICATION: 500+ clients, 1000+ projects, 10+ years, 98% satisfaction.
 */
export const stats = [
  { key: "clients", label: "Happy Clients", value: 500, suffix: "+" },
  { key: "projects", label: "Projects Delivered", value: 1000, suffix: "+" },
  { key: "years", label: "Years in Operation", value: 10, suffix: "+" },
  { key: "satisfaction", label: "Client Satisfaction", value: 98, suffix: "%" },
] as const

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Industries", href: "/industries" },
  { name: "Insights", href: "/blog" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
] as const

export const socials = [
  { name: "Facebook", href: "https://www.facebook.com/brand350/", verified: true },
  { name: "Instagram", href: "https://www.instagram.com/brandsonmedia/", verified: true },
  { name: "X", href: "https://x.com/media_brandson", verified: true },
  { name: "TikTok", href: "https://www.tiktok.com/@brandsonmedia", verified: true },
  { name: "YouTube", href: "https://www.youtube.com/@brandsonmedia", verified: true },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/brandsonmedia", verified: true },
] as const

export const serviceLinks = [
  { name: "Printing & Stickers", href: "/services#printing" },
  { name: "Branding Services", href: "/services#branding" },
  { name: "UV Printing", href: "/services#uv-printing" },
  { name: "Signage & 3D Signs", href: "/services#signage" },
  { name: "Laser Cutting", href: "/services#laser-cutting" },
  { name: "Corporate Branding", href: "/services/corporate-branding" },
  { name: "Vehicle Branding", href: "/services/vehicle-branding" },
  { name: "3D Signage", href: "/services/3d-signage" },
] as const

export const industries = [
  {
    name: "SMEs",
    description:
      "Affordable, high-impact branding that helps small and growing businesses look established and win trust from day one.",
    services: ["Stickers & Labels", "Business Cards", "Vehicle Branding", "Roll-up Banners"],
  },
  {
    name: "Corporates",
    description:
      "Consistent, professional branding across branches, uniforms, signage, and stationery for larger organisations.",
    services: ["Corporate Branding", "Office Signage", "Branded Merchandise", "Company Profiles"],
  },
  {
    name: "Hospitality",
    description:
      "Menus, signs, and branded environments that shape the guest experience in hotels, restaurants, and cafés.",
    services: ["3D Signage", "Acrylic Displays", "Menu Holders", "Event Branding"],
  },
  {
    name: "Retail & Shops",
    description:
      "Storefront signage and promotional displays that drive walk-in traffic and in-store conversions.",
    services: ["Shop Signage", "Window Graphics", "Promotional Stands", "UV Printing"],
  },
  {
    name: "Events & Exhibitions",
    description:
      "Backdrops, banners, and branded giveaways that make events memorable and photograph well.",
    services: ["Event Backdrops", "Roll-up Banners", "Branded Gifts", "Directional Signage"],
  },
  {
    name: "Institutions & NGOs",
    description:
      "Durable, legible signage and printed materials for schools, training centres, and organisations.",
    services: ["Building Signage", "Awards & Certificates", "Training Manuals", "Wall Branding"],
  },
  {
    name: "Real Estate",
    description:
      "Site boards, hoarding, and branded collateral that keep developments visible throughout sales cycles.",
    services: ["Outdoor Signage", "Hoarding Graphics", "Banner Printing", "Window Graphics"],
  },
  {
    name: "Logistics & Fleet",
    description:
      "Vehicle and fleet branding that turns every trip into continuous, low-cost advertising.",
    services: ["Vehicle Wraps", "Fleet Branding", "Magnetic Signs", "Vinyl Lettering"],
  },
] as const

/** Build a WhatsApp click-to-chat URL with a pre-filled, contextual message. */
export function buildWhatsAppUrl(opts: {
  service?: string
  context?: string
  page?: string
} = {}): string {
  const phone = business.whatsapp
  const lines = ["Hello Brandson Media 👋"]
  if (opts.service) lines.push("", `*Service:* ${opts.service}`)
  if (opts.context) lines.push(`*Details:* ${opts.context}`)
  lines.push(
    "",
    "I'd like a quote — please share pricing, turnaround time, and the specs you need (size / quantity / material).",
    "Thank you!",
  )
  const text = encodeURIComponent(lines.join("\n"))
  return `https://wa.me/${phone}?text=${text}`
}

export const PENDING_VERIFICATION = [
  "Client / project statistics (500+ clients, 1000+ projects, 10+ years, 98% satisfaction)",
  "Physical street address (currently 20 Jainsala Road, Nairobi)",
  "Exact geo coordinates for LocalBusiness schema",
  "Opening hours",
  "Year established (about page shows EST. 2016)",
  "Social media handles (verify each profile is active and owned)",
] as const
