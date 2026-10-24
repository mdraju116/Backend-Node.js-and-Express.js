import Image from "next/image"
import { ArrowRight } from "lucide-react"
import bannerImage from "@/assets/Banner.png"

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
]

export function Banner() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <Image
        src={bannerImage}
        alt="Aerial view of a tropical bay"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      <div className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-6 pt-16 pb-40 text-center">
        <h1 className="text-5xl leading-[1.1] font-bold text-white md:text-6xl">
          Discover Your
          <br />
          Next
          <br />
          Adventure
        </h1>
        <p className="mt-6 max-w-xl text-sm font-medium text-white/90 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#0e9aa7] px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-[#0c8794]"
          >
            Explore Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="rounded-full bg-white/20 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            View Destination
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-3 pb-3 md:px-6 md:pb-6">
        <div className="mx-auto flex max-w-6xl flex-col rounded-2xl bg-white/20 p-3 backdrop-blur-md md:flex-row md:items-center md:gap-0">
          {searchFields.map((field) => (
            <div
              key={field.label}
              className="flex-1 border-white/30 px-4 py-1 text-left not-last:border-b md:not-last:border-r md:not-last:border-b-0"
            >
              <p className="text-sm font-bold text-gray-900">{field.label}</p>
              <p className="text-xs text-gray-700">{field.placeholder}</p>
            </div>
          ))}
          <button
            type="button"
            className="mt-3 rounded-xl bg-[#0e9aa7] px-10 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0c8794] md:mt-0 md:rounded-l-xl md:rounded-r-xl"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  )
}
