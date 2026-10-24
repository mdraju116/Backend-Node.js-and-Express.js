import { Banner } from "@/components/Banner"
import { CTA } from "@/components/CTA"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { Testimonials } from "@/components/Testimonials"
import { WhyChooseUs } from "@/components/WhyChooseUs"

export default function Page() {
  return (
    <>
      <Navbar />
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}
