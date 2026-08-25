import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Services | Printing, Branding, Signage & UV Printing in Nairobi",
  description:
    "Explore Brandson Media's services: large-format printing, stickers, vehicle & corporate branding, 3D signage, UV printing, laser cutting, and promotional products in Nairobi, Kenya.",
  alternates: { canonical: "https://brandsonmedia.co.ke/services" },
  openGraph: {
    title: "Services | Brandson Media Nairobi",
    description: "Printing, branding, signage, UV printing, and promotional production in Nairobi.",
    type: "website",
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
