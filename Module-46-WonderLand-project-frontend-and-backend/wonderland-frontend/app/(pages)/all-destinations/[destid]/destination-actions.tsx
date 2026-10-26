"use client"

import UpdateDestination, {
  type Destination,
} from "@/components/UpdateDestination"
import DeleteDestination from "@/components/DeleteDestination"

export function DestinationActions({
  destination,
}: {
  destination: Destination
}) {
  return (
    <div className="flex items-center gap-2">
      <UpdateDestination destination={destination} />
      <DeleteDestination destination={destination} />
    </div>
  )
}
