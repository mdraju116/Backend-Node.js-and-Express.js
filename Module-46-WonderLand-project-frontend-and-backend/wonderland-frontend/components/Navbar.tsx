import Link from "next/link"
// import { UserRound } from "lucide-react"
import UserInfo from "@/app/(auth)/UserInfo"

const leftLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/all-destinations" },
  { label: "Add-Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
]

// const rightLinks = [
//   { label: "Profile", href: "/profile", icon: UserRound },
//   { label: "Login", href: "/sign-in" },
//   { label: "Sign Up", href: "/sign-up" },
// ]

export function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <ul className="flex items-center gap-6 text-sm">
          {leftLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={
                  link.active
                    ? "border-b-2 border-[#0d6efd] pb-0.5 font-medium text-[#0d6efd]"
                    : "pb-0.5 font-medium text-gray-700 transition-colors hover:text-[#0e9aa7]"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-[#0e9aa7]"
        >
          Wanderlast
        </Link>

        <UserInfo />
        {/* <ul className="flex items-center gap-4 text-sm">
          {rightLinks.map((link) => {
            const Icon = "icon" in link ? link.icon : null
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-1 font-medium text-gray-700 transition-colors hover:text-[#0e9aa7]"
                >
                  {Icon ? (
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  ) : null}
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul> */}
      </nav>
    </header>
  )
}
