import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ArrowRight, Home, LayoutGrid, MessageCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:py-32">
        <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-primary">
          404
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          This page didn&apos;t make it through production
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          The link may be broken or the page may have moved. Let&apos;s get you back to
          something that prints.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-border">
            <Link href="/services">
              <LayoutGrid className="mr-2 h-5 w-5" />
              Explore Services
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="https://wa.me/254701869821" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Get a Quote
            </a>
          </Button>
        </div>

        <Link
          href="/portfolio"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
        >
          Or view our work <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
