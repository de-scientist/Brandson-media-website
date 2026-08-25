import { business, SITE_URL, socials } from "@/lib/site"

/**
 * Organization + LocalBusiness + WebSite structured data.
 * Rendered once in the root layout so every page benefits from entity markup.
 * Geo coordinates are intentionally omitted until verified (see lib/site.ts).
 */
export function SiteJsonLd() {
  const sameAs = socials.map((s) => s.href)

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "PrintingService"],
        "@id": `${SITE_URL}/#organization`,
        name: business.name,
        legalName: business.legalName,
        url: SITE_URL,
        email: business.email,
        telephone: business.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address.street,
          addressLocality: business.address.city,
          addressRegion: business.address.region,
          addressCountry: business.address.country,
        },
        areaServed: "Kenya",
        sameAs,
        description: business.description,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: business.name,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-KE",
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
