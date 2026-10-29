import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // images: {
  //   // imageUrl is user-entered (add-destination form), so allow any remote host
  //   remotePatterns: [
  //     { protocol: "https", hostname: "**" },
  //     { protocol: "http", hostname: "**" },
  //   ],
  // },

  // NB : Right-click on image, copy image address (not image link/link address)
  //https://i.ibb.co.com/KB0xnbs/image1.png  (only this works for Next.js <Image/> tag)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "ibb.co.com",
      },
    ],
  },
}

export default nextConfig
