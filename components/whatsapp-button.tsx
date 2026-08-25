"use client"
import { buildWhatsAppUrl } from "@/lib/site"

export function WhatsAppButton() {
  const href = buildWhatsAppUrl({ context: "I'd like to discuss a project or request a quote." })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-secondary text-secondary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring (stops on hover) */}
      <span className="absolute inset-0 rounded-full bg-secondary opacity-40 animate-[ping_2.5s_ease-in-out_infinite] group-hover:animate-none" />

      {/* Button content */}
      <span className="relative flex items-center justify-center">
        {/* Real WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-current"
          aria-hidden="true"
        >
          <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.5 2.1 7.9L0 32l8.3-2.5c2.3 1.3 4.9 2 7.7 2h.1c8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.3h-.1c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.9 1.5 1.6-4.8-.3-.5c-1.3-2.1-2-4.5-2-6.9C3.1 9.2 8.9 3.4 16 3.4c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.4-12.9 12.4zm7.1-9.6c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.6-.2-.9.2-.2.4-1 1.2-1.2 1.5-.2.2-.5.3-.9.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.6.1-.2 0-.5-.1-.7-.1-.2-.9-2.1-1.2-2.9-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.1.8.4 1.5.6 2 .8.8.2 1.6.2 2.2.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5z" />
        </svg>
      </span>

      {/* Hover label */}
      <span className="absolute right-16 whitespace-nowrap rounded-md bg-secondary text-secondary-foreground text-sm px-3 py-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-200 pointer-events-none shadow-md">
        Make an Order
      </span>
    </a>
  )
}