import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "About Brandson Media | Printing, Branding & Signage Studio in Nairobi",
  description:
    "Brandson Media is a Nairobi-based printing, branding, signage, and promotional production studio helping Kenyan businesses become more visible and memorable.",
  alternates: { canonical: "https://brandsonmedia.co.ke/about" },
  openGraph: {
    title: "About Brandson Media | Nairobi",
    description: "A Nairobi printing, branding, and signage studio built for Kenyan businesses.",
    type: "website",
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
