"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  Sparkles,
  Building2,
  ShieldCheck,
  User,
} from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "brandsonmedia@gmail.com",
    href: "mailto:brandsonmedia@gmail.com",
    description: "Response within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+254 701 869821",
    href: "tel:+254701869821",
    description: "Mon-Fri, 8am - 6pm",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+254 701 869821",
    href: "https://wa.me/254701869821",
    description: "Instant support available",
  },
  {
    icon: MapPin,
    title: "Visit Our Studio",
    value: "Nairobi, Kenya",
    href: "#map",
    description: "Central Business District",
  },
]

const services = [
  "Printing & Stickers",
  "Branding Services",
  "UV Printing",
  "Signage & 3D Signs",
  "Laser Cutting",
  "Paper Printing",
  "Other",
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hello Brandson Media!%0A%0A*New Inquiry*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A%0A*Message:* ${formData.message}`
    window.open(`https://wa.me/254701869821?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 pb-28 overflow-hidden bg-dark-section-bg text-dark-section-fg">
        {/* bg image */}
        <div className="absolute inset-0">
          <Image
            src="/3d-company-signage-letters.jpg"
            alt="Background"
            fill
            className="object-cover opacity-15"
            priority
          />
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-dark-section-fg/80 backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              Fast quotes • Clean execution • Quality finishes
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
              Let’s Start Your <span className="text-primary">Next Project</span>
            </h1>

            <p className="mt-5 text-base md:text-xl text-dark-section-fg/70">
              From one-off custom pieces to full corporate branding — we’ll shape the work,
              sharpen the details, and deliver with confidence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <a href="https://wa.me/254701869821" target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-12 rounded-2xl bg-white/10 text-dark-section-fg hover:bg-white/15 border border-white/15"
              >
                <a href="tel:+254701869821">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              {[
                { icon: ShieldCheck, title: "Reliable turnaround", desc: "Clear timelines, no guessing." },
                { icon: Building2, title: "Business-ready", desc: "Invoices, quotes, brand accuracy." },
                { icon: Sparkles, title: "Clean finishing", desc: "Print quality that speaks." },
              ].map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <b.icon className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-sm font-bold">{b.title}</p>
                  <p className="text-xs text-dark-section-fg/70 mt-1">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="relative z-20 -mt-14 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left column */}
            <div className="lg:col-span-4 space-y-4">
              {contactInfo.map((item) => (
                <Card
                  key={item.title}
                  className="group border border-border/60 bg-card/80 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden"
                >
                  <a href={item.href || "#"} className="block">
                    <CardContent className="p-6 flex items-center gap-5 hover:bg-primary/5 transition-colors">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1">
                          {item.title}
                        </p>
                        <p className="text-sm font-semibold text-foreground truncate">
                          {item.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </a>
                </Card>
              ))}

              {/* Hours */}
              <Card className="border border-border/60 shadow-lg bg-muted/40 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-extrabold text-foreground">Office Hours</h3>
                  </div>

                  <div className="space-y-3 text-sm">
                    {[
                      { day: "Mon - Fri", time: "8:00 AM - 6:00 PM" },
                      { day: "Saturday", time: "9:00 AM - 4:00 PM" },
                      { day: "Sunday", time: "Closed", closed: true },
                    ].map((row) => (
                      <div
                        key={row.day}
                        className="flex justify-between items-center border-b border-border/50 pb-2"
                      >
                        <span className="text-muted-foreground">{row.day}</span>
                        <span
                          className={`font-semibold ${
                            row.closed ? "text-red-500" : "text-foreground"
                          }`}
                        >
                          {row.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl bg-background/60 border border-border/50 p-4">
                    <p className="text-xs text-muted-foreground">
                      Tip: For urgent requests, WhatsApp gets the fastest response.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <Card className="lg:col-span-8 border border-border/60 shadow-2xl rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-bold">
                    <Send className="h-4 w-4" />
                    Quote Request Form
                  </div>

                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight">
                    Request a Quote
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Fill this in. Clean, direct, fast.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Jane Doe"
                        className="bg-muted/30 border border-border/50 h-12 pl-10 rounded-2xl focus-visible:ring-primary"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@company.com"
                        className="bg-muted/30 border border-border/50 h-12 pl-10 rounded-2xl focus-visible:ring-primary"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground"
                    >
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="+254 700 000 000"
                        className="bg-muted/30 border border-border/50 h-12 pl-10 rounded-2xl focus-visible:ring-primary"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="service"
                      className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground"
                    >
                      Service Required
                    </Label>
                    <select
                      id="service"
                      className="flex h-12 w-full rounded-2xl border border-border/50 bg-muted/30 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      required
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground">
                      Pick the closest match — we’ll refine details in chat.
                    </p>
                  </div>

                  {/* Message */}
                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="message"
                      className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground"
                    >
                      Project Details
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Size, quantity, deadline — and any branding notes..."
                      className="bg-muted/30 border border-border/50 min-h-[160px] rounded-2xl focus-visible:ring-primary"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      The clearer the brief, the sharper the quote.
                    </p>
                  </div>

                  {/* Submit */}
                  <div className="md:col-span-2 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-base md:text-lg font-extrabold shadow-xl shadow-primary/20 group"
                    >
                      <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Send My Inquiry
                    </Button>

                    <div className="mt-4 rounded-2xl border border-border/60 bg-muted/30 p-4">
                      <p className="text-center text-xs text-muted-foreground">
                        By clicking send, your message opens in WhatsApp so you can chat with our team directly.
                      </p>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold tracking-tight">Find Us</h3>
            <p className="text-muted-foreground">
              20 Jainsala Road, Nairobi — easy access for pickups, approvals, and quick visits.
            </p>
          </div>

          <div className="rounded-[2.5rem] overflow-hidden border border-border/60 shadow-2xl h-[420px] relative bg-muted/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.16104278479!2d36.8143212!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d0322c3667%3A0x69680c4c44983a54!2sNairobi%20CBD!5e0!3m2!1sen!2ske!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Brandson Media Studio Location"
            />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}