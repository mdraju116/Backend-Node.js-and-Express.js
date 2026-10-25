"use client"

import * as React from "react"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"

// Marketing bullets from the design mock — same for every package
const includedFeatures = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
]

// departureDate comes from an <input type="date"> (YYYY-MM-DD)
const formatDate = (iso: string) => {
  const parts = iso.split("-")
  return parts.length === 3 ? parts.join("/") : iso
}

export function BookingCard({
  destinationName,
  price,
  departureDate,
}: {
  destinationName: string
  price: string
  departureDate: string
}) {
  const [date, setDate] = React.useState(departureDate)

  const handleBookNow = () => {
    // No bookings API yet — placeholder until My Bookings is built
    const when = date ? ` on ${formatDate(date)}` : ""
    toast(`Booking for ${destinationName.trim()}${when} is coming soon!`)
  }

  return (
    <aside className="w-full shrink-0 self-start lg:sticky lg:top-6 lg:w-80">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Starting from</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#0d6efd]">${price}</span>
          <span className="text-sm text-muted-foreground">per person</span>
        </p>

        <Input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          aria-label="Departure date"
          className="mt-4"
        />

        <Button
          onClick={handleBookNow}
          size="lg"
          className="mt-4 w-full bg-[#0e9aa7] text-white hover:bg-[#0c8794]"
        >
          Book Now
          <ArrowRight />
        </Button>

        <ul className="mt-4 flex flex-col gap-2">
          {includedFeatures.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
