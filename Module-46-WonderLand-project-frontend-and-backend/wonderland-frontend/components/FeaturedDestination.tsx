"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  RotateCcw,
  Star,
} from "lucide-react"

import { RemoteImage } from "@/components/remote-image"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  useCarousel,
} from "@/components/ui/carousel"

type FeaturedPackage = {
  _id: string
  destination: string
  country: string
  price: string
  duration: string
  imageUrl: string
}

const API_URL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/featured-packages`
// trailor / removed

// The design mock shows a rating badge on every card; the API has no rating field
const rating = 4.5

function FeaturedCard({ item }: { item: FeaturedPackage }) {
  const destination = item.destination.trim()
  const country = item.country.trim()

  return (
    <article className="group h-full">
      <div className="relative aspect-3/2 overflow-hidden rounded-xl">
        <RemoteImage
          src={item.imageUrl}
          alt={`${destination}, ${country}`}
          sizes="(min-width: 1600px) 576px, (min-width: 768px) 45vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-900 shadow-sm">
          {rating}
          <Star className="size-3 fill-current" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <p className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{country}</span>
        </p>

        <div className="flex items-baseline justify-between gap-3">
          <h3 className="min-w-0 truncate text-base font-semibold text-gray-900">
            {destination}
          </h3>
          <p className="shrink-0">
            <span className="font-semibold text-gray-900">
              ${item.price.trim()}
            </span>
            <span className="text-xs text-gray-500">/Person</span>
          </p>
        </div>

        <p className="flex items-center gap-1 text-xs text-gray-500">
          <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{item.duration.trim()}</span>
        </p>

        <Link
          href={`/all-destinations/${item._id}`}
          className="mt-0.5 inline-flex items-center gap-1 self-start text-xs font-semibold tracking-wide text-blue-600 uppercase transition-colors hover:text-blue-700"
        >
          Book Now
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

function CarouselFooter({ api, total }: { api: CarouselApi; total: number }) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const onSelect = (api: CarouselApi) => {
      if (!api) return
      setIndex(api.selectedScrollSnap())
    }
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api.off("reInit", onSelect)
      api.off("select", onSelect)
    }
  }, [api])

  const current = Math.min(Math.max(index, 0), total - 1) + 1
  const progress = (current / total) * 100

  return (
    <div className="mx-auto mt-10 flex max-w-6xl items-center gap-4 px-6 md:gap-6">
      <span className="shrink-0 text-base font-medium text-gray-900 tabular-nums">
        {current}/{total}
      </span>

      <div
        className="h-0.5 flex-1 overflow-hidden rounded-full bg-gray-200"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-[#0e9aa7] transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous slide"
          className="inline-flex size-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-colors hover:border-teal-500 hover:text-teal-600 disabled:pointer-events-none disabled:opacity-40 md:size-10"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next slide"
          className="inline-flex size-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-colors hover:border-teal-500 hover:text-teal-600 disabled:pointer-events-none disabled:opacity-40 md:size-10"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function FeaturedCarousel({ packages }: { packages: FeaturedPackage[] }) {
  const [api, setApi] = React.useState<CarouselApi>()

  return (
    <Carousel opts={{ align: "start" }} setApi={setApi} className="mt-8">
      {/*
        The track starts on the container's left edge (same alignment as the
        header/footer) but keeps going to the right edge of the viewport, so
        the next card peeks out exactly like the design mock. The formula is
        just `max-w-6xl mx-auto px-6` expressed as a single padding value.
      */}
      <div
        style={{
          paddingLeft: "max(1.5rem, calc((100% - 72rem) / 2 + 1.5rem))",
        }}
      >
        <CarouselContent>
          {packages.map((item) => (
            <CarouselItem
              key={item._id}
              className="md:basis-[min(calc(45%-0.5rem),36rem)]"
            >
              <FeaturedCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      <CarouselFooter api={api} total={packages.length} />
    </Carousel>
  )
}

function FeaturedSkeletons() {
  return (
    <div className="mx-auto mt-8 max-w-6xl px-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-xl border">
            <Skeleton className="aspect-3/2 rounded-none" />
            <div className="flex flex-col gap-2 p-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const FeaturedDestination = () => {
  const [packages, setPackages] = React.useState<FeaturedPackage[]>([])
  const [loading, setLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState(false)
  const [reloadKey, setReloadKey] = React.useState(0)

  React.useEffect(() => {
    const controller = new AbortController()

    async function loadFeaturedPackages() {
      setLoading(true)
      setLoadError(false)
      try {
        const res = await fetch(API_URL, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }
        const data: unknown = await res.json()
        setPackages(Array.isArray(data) ? (data as FeaturedPackage[]) : [])
      } catch (error) {
        if (controller.signal.aborted) return
        console.error("Failed to load featured packages:", error)
        setLoadError(true)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadFeaturedPackages()
    return () => controller.abort()
  }, [reloadKey])

  const showCarousel = !loading && !loadError && packages.length > 0

  return (
    <section className="overflow-hidden bg-white py-16 md:py-20">
      <header className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Featured Destinations
          </h2>
          <p className="mt-3 text-sm text-gray-500 md:text-base">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link
          href="/all-destinations"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-xs font-semibold tracking-wide text-gray-900 uppercase transition-colors hover:border-[#0e9aa7] hover:text-[#0e9aa7]"
        >
          All Destinations
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </header>

      {loading && <FeaturedSkeletons />}

      {loadError && (
        <div className="mx-auto mt-8 max-w-6xl px-6">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
            <p className="font-medium text-gray-900">
              Couldn&apos;t load featured destinations
            </p>
            <p className="max-w-md text-sm text-gray-500">
              The travel API is not responding. Start the backend with{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5">
                node index.js
              </code>{" "}
              in{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5">
                ../wonderland-backend
              </code>{" "}
              (port 5000), then try again.
            </p>
            <Button onClick={() => setReloadKey((key) => key + 1)}>
              <RotateCcw aria-hidden="true" />
              Retry
            </Button>
          </div>
        </div>
      )}

      {!loading && !loadError && packages.length === 0 && (
        <div className="mx-auto mt-8 max-w-6xl px-6">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
            <p className="font-medium text-gray-900">
              No featured destinations yet
            </p>
            <p className="text-sm text-gray-500">
              Add a travel package to see it featured here.
            </p>
          </div>
        </div>
      )}

      {showCarousel && <FeaturedCarousel packages={packages} />}
    </section>
  )
}

export default FeaturedDestination
