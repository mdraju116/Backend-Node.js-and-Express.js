import { Banner } from "@/components/Banner"
import { CTA } from "@/components/CTA"
import FeaturedDestination from "@/components/FeaturedDestination"
import { Testimonials } from "@/components/Testimonials"
import { WhyChooseUs } from "@/components/WhyChooseUs"

export default function Page() {
  return (
    <>
      <Banner />
      <FeaturedDestination />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  )
}
