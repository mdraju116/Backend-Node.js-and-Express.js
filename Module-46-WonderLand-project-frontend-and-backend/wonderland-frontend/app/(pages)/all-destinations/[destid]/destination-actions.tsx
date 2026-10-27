"use client"

import UpdateDestination from "@/components/UpdateDestination"
import DeleteDestination from "@/components/DeleteDestination"
import { type DestinationType } from "@/app/(pages)/all-destinations/[destid]/page"



export function DestinationActions({
  destination,
}: {
  destination: DestinationType
}) {
  return (
    <div className="flex items-center gap-2">
      <UpdateDestination destination={destination} />
      <DeleteDestination destination={destination} />
    </div>
  )
}
