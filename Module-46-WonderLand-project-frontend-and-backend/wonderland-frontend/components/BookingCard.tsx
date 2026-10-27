"use client"

import * as React from "react"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { type DestinationType } from "@/app/(pages)/all-destinations/[destid]/page"
import { useSession } from "@/lib/auth-client"

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


export function BookingCard({ destination, }: { destination: DestinationType }) {
  const [date, setDate] = React.useState(destination.departureDate)

  const { data: session, } = useSession();
  const user = session?.user;


  const handleBookNow = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,): Promise<void> => {
    e.preventDefault()
    const departureDate = date ? ` on ${formatDate(date)}` : ""
    const bookingDate = new Date();

    //get data from booking card
    const data = {
      ...user,
      ...destination,
      departureDate,
      bookingDate,

    }
    // console.log(data)

    //send to backend
    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })

    const bookingRes = await res.json();
    console.log("Response from backend:", bookingRes);


    toast.success(`Booking for ${destination.destination.trim()}${departureDate} is succesfull.`)
  }

  return (
    <aside className="w-full shrink-0 self-start lg:sticky lg:top-6 lg:w-80">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Starting from</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#0d6efd]">${destination.price}</span>
          <span className="text-sm text-muted-foreground">per person</span>
        </p>

        <form onSubmit={handleBookNow}>
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
        </form>
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
