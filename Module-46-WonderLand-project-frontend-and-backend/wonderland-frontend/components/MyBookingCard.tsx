"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  Hash,
  Trash2,
} from "lucide-react"
import toast from "react-hot-toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { RemoteImage } from "@/components/remote-image"
import type { BookingType } from "@/app/(pages)/my-bookings/page"

// Bookings created earlier stored departureDate as ` on 2026/05/15`,
// newer ones as `2026-05-15`. Normalize both to `May 15, 2026`.
const formatDepartureDate = (value?: string): string => {
  if (!value) return "Not set"

  const cleaned = value.replace(/^\s*on\s+/, "").trim()
  const parts = cleaned.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/)
  if (!parts) return cleaned

  const [, year, month, day] = parts
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  if (Number.isNaN(date.getTime())) return cleaned

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    icon: Clock,
  },
} as const

const MyBookingCard = ({ booking }: { booking: BookingType }) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [cancelling, setCancelling] = React.useState(false)

  const status = statusConfig[booking.status ?? "confirmed"]
  const StatusIcon = status.icon

  const price = booking.price?.startsWith("$")
    ? booking.price
    : `$${booking.price}`

  // New bookings store the package id in `packageId`; older bookings used the
  // package id as their own `_id`, so fall back to it for those.
  const destinationHref = `/all-destinations/${booking.packageId ?? booking._id}`

  const handleCancel = async () => {
    setCancelling(true)
    try {
      const res = await fetch(
        `http://localhost:5000/my-bookings/${booking._id}`,
        {
          method: "DELETE",
        }
      )

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      const result: unknown = await res.json()
      console.log("Response from backend", result)

      toast.success("Booking cancelled successfully!")
      setOpen(false)
      // Re-fetch the server component so the list drops the deleted booking
      router.refresh()
    } catch (error) {
      toast.error("Failed to cancel booking!")
      console.error(error)
    } finally {
      setCancelling(false)
    }
  }

  return (
    <article className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:gap-5">
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-52 lg:h-36 lg:w-60">
        <RemoteImage
          src={booking.imageUrl}
          alt={booking.destination}
          sizes="(min-width: 640px) 240px, 100vw"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Badge className={`h-6 w-fit ${status.className}`}>
          <StatusIcon />
          {status.label}
        </Badge>

        <h3 className="mt-2 text-xl font-bold tracking-tight">
          {booking.destination}
        </h3>

        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" />
          Departure: {formatDepartureDate(booking.departureDate)}
        </p>

        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Hash className="size-4 shrink-0" />
          Booking ID: {booking._id}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <p className="text-2xl font-bold text-[#0e9aa7]">{price}</p>

          <div className="flex items-center gap-2">
            <AlertDialog
              open={open}
              onOpenChange={(nextOpen) => setOpen(nextOpen)}
            >
              <AlertDialogTrigger
                render={
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:hover:bg-red-500/10"
                  />
                }
              >
                <Trash2 />
                Cancel
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                    <Trash2 />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove your booking for{" "}
                    <span className="font-medium text-foreground">
                      {booking.destination}
                    </span>
                    . This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={cancelling}>
                    Keep Booking
                  </AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={handleCancel}
                    disabled={cancelling}
                  >
                    {cancelling ? "Cancelling..." : "Yes, Cancel Booking"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Link
              href={destinationHref}
              className={buttonVariants({
                size: "lg",
                className: "bg-[#0e9aa7] text-white hover:bg-[#0c8794]",
              })}
            >
              <Eye />
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default MyBookingCard
