"use client"

import * as React from "react"
import Image from "next/image"
import { ImageOff } from "lucide-react"
import { cn } from "cn"

// Renders next/image inside a `relative` parent; falls back to a placeholder
// when the remote URL is missing or not a real image (API imageUrl values are
// user-entered and may point to an image-host page rather than the file).
export function RemoteImage({
  src,
  alt,
  sizes,
  className,
}: {
  src?: string
  alt: string
  sizes?: string
  className?: string
}) {
  const [failed, setFailed] = React.useState(false)

  if (!src || failed) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-cyan-50 to-teal-50 text-muted-foreground",
          className
        )}
      >
        <ImageOff className="size-8" />
        <span className="text-xs">Image unavailable</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  )
}
