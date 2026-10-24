import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
]

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms Of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
]

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const socialLinks = [
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
]

export function Footer() {
  return (
    <footer className="bg-[#0d0d0d]">
      <div className="mx-auto max-w-6xl px-6 pt-4 pb-10">
        <div className="text-white">
          <p className="text-4xl font-bold md:text-5xl">Wanderlast</p>
          <p className="mt-3 text-sm text-gray-400">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="relative mt-4">
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="w-full rounded-lg bg-[#1c1c1c] py-3 pr-12 pl-4 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-300 transition-colors hover:text-teal-400"
              >
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              Support
            </h3>
            <ul className="mt-3 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              Contact Us
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>786 901 1622</li>
              <li>
                <a
                  href="mailto:info@wanderland.com"
                  className="transition-colors hover:text-white"
                >
                  info@wanderland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            © 2026 Wanderlast. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-md border border-white/10 p-2 text-gray-400 transition-colors hover:border-teal-500 hover:text-teal-400"
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
