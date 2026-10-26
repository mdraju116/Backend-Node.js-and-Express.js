"use client"

import Link from "next/link"
import { X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import UpdateDestination, {
  type Destination,
} from "@/components/UpdateDestination"

export function DestinationActions({
  destination,
}: {
  destination: Destination
}) {
  return (
    <div className="flex items-center gap-2">
      <UpdateDestination destination={destination} />
      <Link
        href="/all-destinations"
        className={buttonVariants({ variant: "destructive" })}
      >
        <X />
        Cancel
      </Link>
    </div>
  )
}
