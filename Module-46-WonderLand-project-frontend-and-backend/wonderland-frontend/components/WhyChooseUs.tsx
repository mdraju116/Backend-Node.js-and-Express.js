import Image from "next/image"
import shieldCheck from "@/assets/ShieldCheck.png"
import mapTrifold from "@/assets/MapTrifold.png"
import headset from "@/assets/Headset.png"

const features = [
  {
    icon: shieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: mapTrifold,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="rounded-2xl border border-teal-200 bg-gradient-to-b from-cyan-50 to-white">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-sm text-gray-500 md:text-base">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-100 bg-white p-8 text-left shadow-sm"
            >
              <Image
                src={feature.icon}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11"
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
