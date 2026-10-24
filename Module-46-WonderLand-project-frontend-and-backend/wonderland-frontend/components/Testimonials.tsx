"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import person1 from "@/assets/person1.png"
import person2 from "@/assets/person2.png"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Beaches Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Bangladesh",
    image: person2,
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: person1,
  },
  {
    quote:
      '"A Once-In-A-Lifetime Experience! The Sahara Desert Tour Was Perfectly Organized And Our Guide Made Every Moment Special."',
    name: "Emma Williams",
    location: "London, UK",
    image: person1,
  },
  {
    quote:
      '"Perfectly Planned Getaway! From The City Tours To The Sunset Cruises, Everything Ran Smoothly And Right On Time."',
    name: "David Miller",
    location: "Sydney, Australia",
    image: person2,
  },
  {
    quote:
      '"The Maldives Package Was Worth Every Penny. Crystal Clear Waters, Private Villas And Friendly Staff Made It Truly Unforgettable."',
    name: "Ayesha Rahman",
    location: "Dhaka, Bangladesh",
    image: person1,
  },
  {
    quote:
      '"Hiking In Patagonia Was A Dream Come True. Great Accommodations, Amazing Food And A Knowledgeable Team Throughout The Trip."',
    name: "Carlos Mendes",
    location: "Lisbon, Portugal",
    image: person2,
  },
]

export function Testimonials() {
  return (
    <section className="rounded-2xl border border-teal-200 bg-white">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mx-auto max-w-6xl py-16 md:py-20"
      >
        <div className="flex items-start justify-between gap-6 px-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-sm text-gray-500 md:text-base">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <CarouselPrevious className="static rounded-full border border-gray-300 bg-white text-gray-500 hover:border-teal-500 hover:text-teal-600">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </CarouselPrevious>
            <CarouselNext className="static rounded-full border border-gray-300 bg-white text-gray-500 hover:border-teal-500 hover:text-teal-600">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CarouselNext>
          </div>
        </div>

        <CarouselContent className="mt-10 -ml-4 px-6">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.name}
              className="basis-full pl-4 md:basis-1/2"
            >
              <figure className="flex h-full items-stretch gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between">
                  <blockquote className="text-sm leading-relaxed font-semibold text-gray-900">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-semibold text-[#0e9aa7]">
                      — {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.location}
                    </p>
                  </figcaption>
                </div>
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={180}
                  height={220}
                  className="h-auto w-40 shrink-0 rounded-lg object-cover lg:w-44"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
