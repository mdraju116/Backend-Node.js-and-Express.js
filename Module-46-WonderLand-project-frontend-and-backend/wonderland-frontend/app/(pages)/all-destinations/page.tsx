"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ImageOff, MapPin, RotateCcw, Star } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import toast from "react-hot-toast"

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

const priceRanges = [
  { value: "all", label: "All Prices", min: 0, max: Infinity },
  { value: "u1500", label: "Up to $1,500", min: 0, max: 1500 },
  { value: "1501-2500", label: "$1,501 - $2,500", min: 1501, max: 2500 },
  { value: "2501-3500", label: "$2,501 - $3,500", min: 2501, max: 3500 },
  { value: "3501-plus", label: "$3,501 & above", min: 3501, max: Infinity },
]

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "departure-asc", label: "Departure: Soonest First" },
  { value: "name-asc", label: "Name: A to Z" },
]

const toPrice = (value: string) => Number(value) || 0

function DestinationCard({ item }: { item: Destination }) {
  const [imageFailed, setImageFailed] = React.useState(false)

  const destination = item.destination.trim()
  const country = item.country.trim()
  // The design mock shows a rating badge on every card; the API has no rating field
  const rating = 4.5

  return (
    <Card className="gap-0 py-0">
      <div className="relative aspect-3/2 w-full overflow-hidden">
        {imageFailed || !item.imageUrl ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-cyan-50 to-teal-50 text-muted-foreground">
            <ImageOff className="size-8" />
            <span className="text-xs">Image unavailable</span>
          </div>
        ) : (
          <Image
            src={item.imageUrl}
            alt={`${destination}, ${country}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-900 shadow-sm">
          {rating}
          <Star className="size-3 fill-current" />
        </span>
      </div>

      <CardContent className="flex flex-col gap-2 px-4 pt-3 pb-4">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">{country}</span>
        </p>

        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate text-base font-semibold">{destination}</h3>
          <p className="shrink-0 text-sm">
            <span className="font-semibold">${item.price}</span>
            <span className="text-xs text-muted-foreground">/Person</span>
          </p>
        </div>

        <p className="text-xs text-muted-foreground">{item.duration}</p>

        <button
          type="button"
          onClick={() => toast(`Booking for ${destination} is coming soon!`)}
          className="mt-1 flex items-center gap-1 self-start text-xs font-semibold tracking-wide text-blue-600 uppercase transition-colors hover:text-blue-700"
        >
          Book Now
          <ArrowUpRight className="size-3.5" />
        </button>
      </CardContent>
    </Card>
  )
}

function DestinationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border">
      <Skeleton className="aspect-3/2 rounded-none" />
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

export default function AllDestinationsPage() {
  const [destinations, setDestinations] = React.useState<Destination[]>([])
  const [loading, setLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState(false)
  const [reloadKey, setReloadKey] = React.useState(0)

  const [category, setCategory] = React.useState<string | null>(null)
  const [priceRange, setPriceRange] = React.useState<string | null>(null)
  const [sortBy, setSortBy] = React.useState<string | null>(null)

  React.useEffect(() => {
    const controller = new AbortController()

    async function loadDestinations() {
      setLoading(true)
      setLoadError(false)
      try {
        const res = await fetch(API_URL, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }
        const data: unknown = await res.json()
        setDestinations(Array.isArray(data) ? (data as Destination[]) : [])
      } catch (error) {
        if (controller.signal.aborted) return
        console.error("Failed to load destinations:", error)
        setLoadError(true)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadDestinations()
    return () => controller.abort()
  }, [reloadKey])

  const categories = React.useMemo(
    () =>
      [...new Set(destinations.map((item) => item.category.trim()))]
        .filter(Boolean)
        .sort(),
    [destinations]
  )

  const visibleDestinations = React.useMemo(() => {
    let list = [...destinations]

    if (category && category !== "all") {
      list = list.filter((item) => item.category.trim() === category)
    }

    const range = priceRanges.find((option) => option.value === priceRange)
    if (range && range.value !== "all") {
      list = list.filter((item) => {
        const price = toPrice(item.price)
        return price >= range.min && price <= range.max
      })
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => toPrice(a.price) - toPrice(b.price))
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => toPrice(b.price) - toPrice(a.price))
    } else if (sortBy === "departure-asc") {
      list.sort((a, b) => a.departureDate.localeCompare(b.departureDate))
    } else if (sortBy === "name-asc") {
      list.sort((a, b) =>
        a.destination.trim().localeCompare(b.destination.trim())
      )
    }

    return list
  }, [destinations, category, priceRange, sortBy])

  const clearFilters = () => {
    setCategory(null)
    setPriceRange(null)
    setSortBy(null)
  }

  const filterSelectClass =
    "h-auto w-full justify-between gap-2 rounded-none border-0 py-0 pr-0 pl-0 text-left text-xs tracking-wider uppercase hover:bg-transparent focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent"

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Explore All Destinations
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>
      </header>

      <div className="grid grid-cols-1 rounded-lg border sm:grid-cols-3">
        <div className="border-b border-border p-4 sm:border-r sm:border-b-0">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className={filterSelectClass}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border-b border-border p-4 sm:border-r sm:border-b-0">
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className={filterSelectClass}>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className={filterSelectClass}>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!loading && !loadError && (
        <p className="mt-4 text-sm text-muted-foreground">
          Showing {visibleDestinations.length}{" "}
          {visibleDestinations.length === 1 ? "destination" : "destinations"}
        </p>
      )}

      {loading && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <DestinationCardSkeleton key={index} />
          ))}
        </div>
      )}

      {loadError && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="font-medium">Couldn&apos;t load destinations</p>
          <p className="max-w-md text-sm text-muted-foreground">
            The travel API is not responding. Start the backend with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              node index.js
            </code>{" "}
            in <code className="rounded bg-muted px-1.5 py-0.5">
              ../wonderland-backend
            </code>{" "}
            (port 5000), then try again.
          </p>
          <Button onClick={() => setReloadKey((key) => key + 1)}>
            <RotateCcw />
            Retry
          </Button>
        </div>
      )}

      {!loading && !loadError && destinations.length === 0 && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="font-medium">No destinations yet</p>
          <p className="text-sm text-muted-foreground">
            Add your first travel package to see it here.
          </p>
          <Link
            href="/add-destination"
            className={buttonVariants({ variant: "outline" })}
          >
            Add a destination
          </Link>
        </div>
      )}

      {!loading && !loadError && destinations.length > 0 && (
        <>
          {visibleDestinations.length === 0 ? (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
              <p className="font-medium">No destinations match your filters</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleDestinations.map((item) => (
                <DestinationCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}
