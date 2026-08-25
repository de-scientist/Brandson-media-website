/**
 * Service landing-page content.
 *
 * This data drives /services/[slug] pages. Copy is descriptive and educational —
 * it describes Brandson Media's capabilities without fabricating client results,
 * awards, or specific project outcomes.
 */

export interface ServiceFaq {
  q: string
  a: string
}

export interface Service {
  slug: string
  title: string
  category: string
  heroImage: string
  tagline: string
  intro: string
  sections: {
    what: string
    whoFor: string[]
    options: { name: string; description: string }[]
    materials: string[]
    whyChoose: string[]
    process: string[]
  }
  relatedServices: string[]
  faqs: ServiceFaq[]
}

export const services: Service[] = [
  {
    slug: "vehicle-branding",
    title: "Vehicle Branding & Car Wraps",
    category: "Branding",
    heroImage: "/vehicle-branding-car-wrap-kenya.jpg",
    tagline: "Turn every trip into advertising.",
    intro:
      "Vehicle branding transforms cars, vans, and fleets into moving brand assets. From partial vinyl wraps to full colour-change wraps and magnetic signs, we help Nairobi businesses stay visible on the road.",
    sections: {
      what: "Vehicle branding covers any method of applying your brand to a vehicle — vinyl lettering, partial wraps, full wraps, and removable magnetic signage. It is one of the most cost-effective forms of long-term outdoor advertising available to a business.",
      whoFor: [
        "Logistics and courier fleets",
        "Retail and distribution businesses",
        "Real estate agents and brokers",
        "Service businesses (plumbers, electricians, cleaners)",
        "Food trucks and mobile vendors",
      ],
      options: [
        { name: "Full Wrap", description: "Complete coverage for maximum impact and paint protection." },
        { name: "Partial Wrap", description: "Strategic branding on high-visibility panels at lower cost." },
        { name: "Vinyl Lettering", description: "Clean logos, names, and contact details." },
        { name: "Magnetic Signs", description: "Removable branding for personal or pooled vehicles." },
      ],
      materials: ["Premium cast vinyl", "Air-release wrapping film", "Laminate for UV protection", "Reflective vinyl (optional)"],
      whyChoose: [
        "In-house print and installation for quality control",
        "Durable, weather-resistant materials suited to Kenyan conditions",
        "Designs built for readability at speed and distance",
        "Consistent branding across multi-vehicle fleets",
      ],
      process: ["Brief & brand assets", "Design & mockup", "Vinyl print", "Surface prep", "Installation", "Quality check"],
    },
    relatedServices: ["corporate-branding", "stickers-labels", "banner-printing"],
    faqs: [
      { q: "How long does a vehicle wrap last?", a: "With proper care, a quality wrap typically lasts 3–5 years. Regular hand washing and shade parking extend its life." },
      { q: "Will wrapping damage my paint?", a: "No. Professionally applied and removed wraps actually protect the original paint underneath." },
      { q: "Can you brand a whole fleet?", a: "Yes. We standardise artwork and materials so every vehicle in your fleet looks consistent." },
      { q: "Do you design the artwork?", a: "Yes. Share your logo and brand colours and we produce print-ready artwork." },
    ],
  },
  {
    slug: "3d-signage",
    title: "3D Signage & Dimensional Signs",
    category: "Signage",
    heroImage: "/3d-company-signage-letters.jpg",
    tagline: "Signs that add depth, authority, and visibility.",
    intro:
      "3D signage gives storefronts, offices, and buildings a premium, dimensional presence. We fabricate acrylic, metal, and illuminated letters and logos built to last in Kenyan outdoor conditions.",
    sections: {
      what: "3D signage uses raised letters or logos that interact with light and shadow, making a business more visible and more authoritative than flat printed boards. Options include acrylic, metal, foam, and LED-illuminated signs.",
      whoFor: [
        "Shops and retail stores",
        "Restaurants, cafés, and bars",
        "Hotels and hospitality venues",
        "Corporate offices and banks",
        "Clinics, schools, and institutions",
      ],
      options: [
        { name: "Acrylic 3D Letters", description: "Clean, modern finish for indoor and sheltered outdoor use." },
        { name: "Metal 3D Signs", description: "Aluminium or stainless steel for a high-end, durable look." },
        { name: "LED-lit 3D Signs", description: "Illuminated letters for 24/7 visibility." },
        { name: "Foam 3D Letters", description: "Lightweight option for indoor and temporary branding." },
      ],
      materials: ["Acrylic / Perspex", "Brushed and powder-coated metal", "LED modules", "Foam board (indoor)"],
      whyChoose: [
        "Local fabrication for faster turnaround",
        "Materials chosen for sun, rain, and dust resistance",
        "Professional installation and safe mounting",
        "Brand-matched colours and finishes",
      ],
      process: ["Site assessment", "Design & mockup", "Fabrication", "Finishing & painting", "Installation"],
    },
    relatedServices: ["signage", "laser-cutting", "corporate-branding"],
    faqs: [
      { q: "How long does 3D signage last?", a: "Quality outdoor signage can last 5–10 years or more depending on material and exposure." },
      { q: "Can signs be illuminated?", a: "Yes. LED lighting can be integrated for day-and-night visibility." },
      { q: "Do you install the signage?", a: "Yes. We handle professional installation and mounting on most surfaces." },
      { q: "Can you match my brand colours?", a: "Yes. We colour-match to your brand guidelines where possible." },
    ],
  },
  {
    slug: "uv-printing",
    title: "UV Printing & Promotional Products",
    category: "UV Printing",
    heroImage: "/uv-printed-promotional-items.jpg",
    tagline: "Vibrant, durable prints on almost anything.",
    intro:
      "UV printing cures ink instantly onto surfaces like bottles, notebooks, pens, and acrylic. The result is sharp, scratch-resistant branding ideal for corporate gifts and promotional merchandise.",
    sections: {
      what: "UV printing uses ultraviolet light to cure ink directly onto a substrate, producing vibrant, durable, and waterproof prints. It works on plastic, glass, metal, wood, acrylic, and more.",
      whoFor: [
        "Corporate gifting programmes",
        "Marketing and PR teams",
        "Events and product launches",
        "Hotels and loyalty programmes",
        "Schools and institutions",
      ],
      options: [
        { name: "Drinkware", description: "Bottles, mugs, and tumblers with crisp, long-lasting branding." },
        { name: "Corporate Gifts", description: "Notebooks, pens, and gift sets." },
        { name: "Tech Accessories", description: "Power banks, USB drives, and phone stands." },
        { name: "Awards & Plaques", description: "Custom branded recognition pieces." },
      ],
      materials: ["Plastic", "Glass", "Metal", "Wood", "Acrylic", "Leather"],
      whyChoose: [
        "High colour accuracy and fine detail",
        "Scratch- and water-resistant finishes",
        "No minimum that prevents small custom runs",
        "In-house production for faster delivery",
      ],
      process: ["Artwork setup", "Surface prep", "UV print", "Curing & quality check", "Packaging"],
    },
    relatedServices: ["corporate-branding", "laser-cutting", "event-branding"],
    faqs: [
      { q: "Does UV printing fade?", a: "UV prints are highly durable and resist fading under normal use." },
      { q: "Is it waterproof?", a: "Yes. UV-cured prints resist moisture." },
      { q: "Can you print small quantities?", a: "Yes. UV printing is well suited to custom and short runs." },
      { q: "What products can be printed?", a: "Bottles, pens, notebooks, awards, acrylic, and many more surfaces." },
    ],
  },
  {
    slug: "laser-cutting",
    title: "Laser Cutting & Engraving",
    category: "Laser Cutting",
    heroImage: "/laser-cutting-kenya.jpg",
    tagline: "Precision that printing alone can't achieve.",
    intro:
      "Laser cutting and engraving deliver precise shapes and permanent marks on acrylic, wood, metal, and leather. Ideal for signage, awards, and branded gifts.",
    sections: {
      what: "Laser cutting uses a focused beam to cut or etch materials with high precision. Engraving permanently marks a surface, adding a premium, tactile finish that printing cannot.",
      whoFor: [
        "Corporate gifting and awards",
        "Retail and electronics displays",
        "Restaurants and hotels",
        "Industrial and technical marking",
        "Event and wedding branding",
      ],
      options: [
        { name: "Acrylic Cutting", description: "Logos, letters, and display pieces." },
        { name: "Wood Engraving", description: "Personalised and branded wooden items." },
        { name: "Metal Marking", description: "Permanent industrial and promotional marking." },
        { name: "Leather & Gift Items", description: "Customised premium giveaways." },
      ],
      materials: ["Acrylic / Perspex", "Wood", "Metal", "Leather", "Glass"],
      whyChoose: [
        "Fine detail and consistent repeatability",
        "Permanent, premium finish",
        "Works on a wide range of materials",
        "Ideal for both one-offs and batches",
      ],
      process: ["Vector artwork", "Material selection", "Cutting / engraving", "Finishing", "Quality check"],
    },
    relatedServices: ["3d-signage", "uv-printing", "signage"],
    faqs: [
      { q: "Does engraving fade?", a: "No. Engraving is permanent and becomes part of the material." },
      { q: "What materials can be cut?", a: "Acrylic, wood, leather, and many synthetics; metals can be marked or cut depending on type." },
      { q: "Can you engrave our logo?", a: "Yes. Provide a vector (SVG/AI) logo for the sharpest result." },
      { q: "Is it suitable for awards?", a: "Yes. Laser-engraved awards are a popular, premium choice." },
    ],
  },
  {
    slug: "corporate-branding",
    title: "Corporate Branding",
    category: "Branding",
    heroImage: "/corporate-branding-kenya-business.jpg",
    tagline: "One brand, consistent everywhere.",
    intro:
      "Corporate branding brings your identity together across uniforms, stationery, signage, and merchandise — so your business looks credible and consistent at every touchpoint.",
    sections: {
      what: "Corporate branding is the coordinated application of your visual identity across all physical touchpoints — from business cards and letterheads to uniforms, office signage, and branded merchandise.",
      whoFor: [
        "Growing SMEs building a professional identity",
        "Corporates standardising across branches",
        "Institutions and training centres",
        "NGOs and member organisations",
        "Professional service firms",
      ],
      options: [
        { name: "Branded Stationery", description: "Business cards, letterheads, and company profiles." },
        { name: "Uniforms & Apparel", description: "Screen print, embroidery, and DTF branding." },
        { name: "Office Signage", description: "Reception, wall, and wayfinding branding." },
        { name: "Branded Merchandise", description: "Gifts and giveaways for clients and staff." },
      ],
      materials: ["Paper stocks", "Apparel fabrics", "Acrylic & metal", "Promotional substrates"],
      whyChoose: [
        "Consistent identity across every surface",
        "Production under one roof reduces coordination",
        "Business-ready outputs (invoices, quotes, brand kits)",
        "Advice on materials that suit your budget",
      ],
      process: ["Brand discovery", "Asset preparation", "Production plan", "Manufacturing", "Delivery & rollout"],
    },
    relatedServices: ["vehicle-branding", "uv-printing", "signage"],
    faqs: [
      { q: "Do you design the brand identity?", a: "We work from your existing logo and brand assets, and can advise on production-ready artwork." },
      { q: "Can you brand multiple branches?", a: "Yes. We standardise materials and artwork across locations." },
      { q: "What apparel decoration methods do you use?", a: "Screen printing, embroidery, and DTF depending on the garment and order." },
      { q: "How do I get a consistent look?", a: "Share your brand guidelines (colours, logo files) and we match them across products." },
    ],
  },
  {
    slug: "stickers-labels",
    title: "Stickers & Labels",
    category: "Printing",
    heroImage: "/printing-stickers-vinyl.jpg",
    tagline: "Small format. Big brand impact.",
    intro:
      "From product labels to wall and vehicle decals, we produce vinyl stickers and contour-cut labels that stick, last, and look sharp.",
    sections: {
      what: "Stickers and labels are versatile branding tools — product packaging labels, promotional stickers, wall branding decals, and contour-cut vehicle graphics.",
      whoFor: [
        "Product and FMCG brands",
        "Retail and packaging businesses",
        "Events and promotions",
        "Offices and interior branding",
        "Vehicle and fleet operators",
      ],
      options: [
        { name: "Product Labels", description: "Roll or sheet labels for packaging." },
        { name: "Vinyl Decals", description: "Wall, window, and surface graphics." },
        { name: "Contour Cutting", description: "Die-cut shapes that follow your artwork." },
        { name: "Vehicle Decals", description: "Vinyl graphics and lettering." },
      ],
      materials: ["White / clear vinyl", "Paper labels", "Laminate for durability"],
      whyChoose: [
        "Crisp, colour-accurate printing",
        "Durable adhesives for indoor and outdoor use",
        "Custom shapes via contour cutting",
        "Short and long runs supported",
      ],
      process: ["Artwork setup", "Material selection", "Print & cut", "Finishing", "Quality check"],
    },
    relatedServices: ["vehicle-branding", "uv-printing", "banner-printing"],
    faqs: [
      { q: "Are the stickers waterproof?", a: "Vinyl stickers with laminate are water-resistant and suitable for outdoor use." },
      { q: "Can you cut custom shapes?", a: "Yes. Contour cutting follows the shape of your artwork." },
      { q: "What's the minimum order?", a: "We handle both small and large runs — tell us your quantity." },
      { q: "Do you supply roll labels?", a: "Yes. Roll and sheet formats are both available." },
    ],
  },
  {
    slug: "apparel-branding",
    title: "Apparel & Uniform Branding",
    category: "Branding",
    heroImage: "/branded-corporate-t-shirts-uniform.jpg",
    tagline: "Branded teams look the part.",
    intro:
      "T-shirts, caps, jackets, dust coats, and uniforms branded with screen printing, embroidery, or DTF — so your team looks unified and professional.",
    sections: {
      what: "Apparel branding applies your logo and artwork to garments using screen printing, embroidery, or direct-to-film (DTF) transfers, depending on the fabric, order size, and finish you need.",
      whoFor: [
        "Corporate and front-line teams",
        "Hospitality and retail staff",
        "Schools and training centres",
        "Sports and events",
        "Promotional campaigns",
      ],
      options: [
        { name: "T-Shirts & Polos", description: "Everyday branded teamwear." },
        { name: "Caps & Hats", description: "Embroidered headwear." },
        { name: "Jackets & Overalls", description: "Workwear and outerwear branding." },
        { name: "Dust Coats & Aprons", description: "Branded garments for clinics, salons, and kitchens." },
      ],
      materials: ["Cotton & blends", "Polyester", "Workwear fabrics", "Caps & headwear"],
      whyChoose: [
        "Method matched to garment and durability needs",
        "Consistent colour across bulk orders",
        "Comfortable, presentable finishes",
        "Bulk production with quality checks",
      ],
      process: ["Garment selection", "Artwork & mockup", "Print / embroidery", "Finishing", "Quality check"],
    },
    relatedServices: ["corporate-branding", "event-branding", "uv-printing"],
    faqs: [
      { q: "Which method is best?", a: "Embroidery suits uniforms and caps; screen print and DTF suit T-shirts and large runs." },
      { q: "Can you supply the garments?", a: "Yes. We can source garments or brand ones you provide." },
      { q: "Do you handle bulk orders?", a: "Yes. We produce bulk team and event apparel with colour consistency." },
      { q: "How should I care for branded apparel?", a: "Wash inside-out on a gentle cycle and avoid direct ironing on the print." },
    ],
  },
  {
    slug: "event-branding",
    title: "Event & Exhibition Branding",
    category: "Events",
    heroImage: "/corporate-event-branding-kenya.jpg",
    tagline: "Make the room look like you.",
    intro:
      "Backdrops, roll-up banners, directional signage, and branded giveaways that make corporate events, launches, and exhibitions look professional and on-brand.",
    sections: {
      what: "Event branding covers everything attendees see — stage backdrops, roll-up banners, directional signage, table branding, badges, and giveaways — produced to be set up quickly and photographed well.",
      whoFor: [
        "Corporate conferences and AGMs",
        "Product launches",
        "Exhibitions and trade shows",
        "Weddings and social events",
        "Training and workshops",
      ],
      options: [
        { name: "Backdrops", description: "Stage and photo backdrops." },
        { name: "Roll-up Banners", description: "Portable, reusable displays." },
        { name: "Directional Signage", description: "Wayfinding and sponsor visibility." },
        { name: "Branded Giveaways", description: "Items attendees keep after the event." },
      ],
      materials: ["Large-format vinyl", "Fabric backdrops", "Foamex / board", "Promotional substrates"],
      whyChoose: [
        "Fast turnaround for tight event timelines",
        "Modular, reusable display options",
        "Photography-friendly, high-contrast design",
        "Coordinated look across all touchpoints",
      ],
      process: ["Brief & venue plan", "Design approval", "Production", "On-site or delivered setup", "Event support"],
    },
    relatedServices: ["banner-printing", "uv-printing", "corporate-branding"],
    faqs: [
      { q: "How early should I start?", a: "Ideally 2–3 weeks before the event for design, production, and delivery." },
      { q: "Can items be reused?", a: "Yes. Roll-up banners and modular stands are designed for repeat use." },
      { q: "Do you deliver to the venue?", a: "We can arrange delivery and, where needed, on-site setup coordination." },
      { q: "What sizes are available?", a: "From tabletop to full stage backdrops — share your venue dimensions." },
    ],
  },
  {
    slug: "banner-printing",
    title: "Banner & Large Format Printing",
    category: "Printing",
    heroImage: "/printing-banners-rollup.jpg",
    tagline: "Big, bold, and built to be seen.",
    intro:
      "Roll-up banners, teardrop flags, backdrops, and outdoor banner printing for promotions, events, and storefront visibility.",
    sections: {
      what: "Large-format printing produces banners and display graphics at sizes that grab attention — from desk-sized roll-ups to large outdoor hoardings.",
      whoFor: [
        "Retail promotions",
        "Events and exhibitions",
        "Real estate and construction",
        "Churches and institutions",
        "Restaurants and offers",
      ],
      options: [
        { name: "Roll-up Banners", description: "Portable pull-up displays." },
        { name: "Teardrop & Feather Flags", description: "Outdoor attention-grabbers." },
        { name: "Backdrops", description: "Stage and photo backdrops." },
        { name: "Outdoor Banners", description: "Weather-resistant hoardings and signs." },
      ],
      materials: ["Vinyl banner material", "Mesh (windy areas)", "Display substrates", "Laminate for durability"],
      whyChoose: [
        "High-contrast, readable from distance",
        "Durable materials for indoor and outdoor use",
        "Fast production for time-sensitive campaigns",
        "Stands and hardware available",
      ],
      process: ["Artwork & sizing", "Material selection", "Large-format print", "Finishing & hemming", "Quality check"],
    },
    relatedServices: ["event-branding", "stickers-labels", "signage"],
    faqs: [
      { q: "Are banners weather-resistant?", a: "Outdoor vinyl and mesh banners are built to withstand Kenyan weather." },
      { q: "What sizes can you print?", a: "From small roll-ups to very large format — share your space dimensions." },
      { q: "Do you supply stands?", a: "Yes. Roll-up stands and flag hardware are available." },
      { q: "How fast can I get them?", a: "Turnaround depends on size and finishing; we prioritise urgent event work where possible." },
    ],
  },
]

export const serviceSlugs = services.map((s) => s.slug)

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
