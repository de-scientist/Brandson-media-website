import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Contact & Get a Quote | Brandson Media Nairobi",
  description:
    "Request a quote from Brandson Media for printing, branding, signage, UV printing, and promotional production in Nairobi, Kenya. Fast response via WhatsApp or the form.",
  alternates: { canonical: "https://brandsonmedia.co.ke/contact" },
  openGraph: {
    title: "Contact & Get a Quote | Brandson Media Nairobi",
    description: "Start your printing, branding, or signage project with a fast, clear quote.",
    type: "website",
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
