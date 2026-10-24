import Image from "next/image"
import { ArrowRight } from "lucide-react"
import ctaImage from "@/assets/CTA.png"

export function CTA() {
  return (
    <section className="bg-[#0d0d0d]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src={ctaImage}
            alt="Airplane flying over a tropical island"
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover"
            priority={false}
          />

          <div className="relative z-10 flex min-h-96 flex-col items-center justify-center px-6 py-20 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready To Start Your Journey?
            </h2>
            <p className="mt-3 text-sm text-white/90 md:text-base">
              Join thousands of travelers who have discovered the world with us
            </p>
            <button
              type="button"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-semibold tracking-wide text-gray-900 uppercase transition-colors hover:bg-gray-100"
            >
              Book Your Trip Today
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
