import Link from "next/link"
import { ArrowLeft, Check, Clock, MapPin, Star } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { RemoteImage } from "@/components/remote-image"

import { BookingCard } from "./booking-card"
import { DestinationActions } from "./destination-actions"

type Destination = {
  _id: string
  destination: string
  country: string
  category: string
  price: string
  duration: string
  departureDate: string
  imageUrl: string
  description: string
}

const API_URL = "http://localhost:5000/packages"

async function fetchDestination(destid: string): Promise<Destination | null> {
  try {
    const response = await fetch(`${API_URL}/${destid}`)
    if (!response.ok) return null
    const data: unknown = await response.json()
    return data && typeof data === "object" ? (data as Destination) : null
  } catch (error) {
    console.error("Failed to load destination:", error)
    return null
  }
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ destid: string }>
}) => {
  const { destid } = await params
  const destination = await fetchDestination(destid)

  if (!destination) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="font-medium">Couldn&apos;t load this destination</p>
          <p className="max-w-md text-sm text-muted-foreground">
            It may not exist, or the backend on port 5000 isn&apos;t running.
          </p>
          <Link href="/all-destinations" className={buttonVariants()}>
            <ArrowLeft />
            Back to Destinations
          </Link>
        </div>
      </main>
    )
  }

  const name = destination.destination.trim()
  const country = destination.country.trim()
  const duration = destination.duration.trim()
  const description = destination.description.trim()

  // The API has no highlights field — break the description into sentences
  const highlights = description
    .split(/(?<=\.)\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, 6)

  // Fixed values from the design mock — the API has no rating field
  const rating = 4.9
  const reviewCount = 2341

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/all-destinations"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>
        <DestinationActions />
      </div>

      <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl md:aspect-12/5">
        <RemoteImage
          src={destination.imageUrl}
          alt={`${name}, ${country}`}
          sizes="(min-width: 1024px) 1200px, 100vw"
        />
      </div>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {country}
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">{name}</h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-emerald-500 text-emerald-500" />
              <span className="font-medium text-emerald-600">{rating}</span>
              <span className="text-muted-foreground">
                ({reviewCount} reviews)
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="size-4" />
              {duration}
            </span>
          </div>

          {description && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </section>
          )}

          {highlights.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold">Highlights</h2>
              <ul className="mt-3 grid gap-2.5 md:grid-cols-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <BookingCard
          destinationName={name}
          price={destination.price}
          departureDate={destination.departureDate}
        />
      </div>
    </main>
  )
}

export default DestinationDetailsPage
