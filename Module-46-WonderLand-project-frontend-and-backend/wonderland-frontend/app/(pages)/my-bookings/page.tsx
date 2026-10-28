import Link from "next/link"
import { headers } from "next/headers"
import { CalendarX, Plus } from "lucide-react"

import { auth } from "@/lib/auth"
import MyBookingCard from "@/components/MyBookingCard"
import { buttonVariants } from "@/components/ui/button"

export type BookingType = {
  _id: string
  /** Package the booking belongs to (older bookings may not have it) */
  packageId?: string
  destination: string
  country?: string
  category?: string
  price: string
  duration?: string
  imageUrl?: string
  description?: string
  /** `YYYY-MM-DD` for new bookings, ` on YYYY/MM/DD` for older ones */
  departureDate?: string
  bookingDate?: string
  status?: "confirmed" | "pending"
  name?: string
  email?: string
  image?: string
}

const API_URL = "http://localhost:5000"

const MyBookingsPage = async () => {
  //server-side session
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const user = session?.user

  if (!user?.email) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6">
        <h1 className="text-4xl font-bold tracking-tight">My Bookings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage and view your upcoming travel plans
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="font-medium">Please log in to see your bookings</p>
          <Link href="/sign-in" className={buttonVariants()}>
            Log in
          </Link>
        </div>
      </main>
    )
  }

  let bookings: BookingType[] = []
  let fetchFailed = false

  //accessing jwt token
  const jwtToken= await auth.api.getToken({
    headers : await headers(),
  })
  console.log(jwtToken?.token);

  try {
    const res = await fetch(
      `${API_URL}/my-bookings/${encodeURIComponent(user.email)}`,{
        // send the jwt token to server
        headers:{
              authorization : jwtToken?.token
            }
          }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch bookings (${res.status})`)
    }

    const data: unknown = await res.json()
    bookings = Array.isArray(data) ? (data as BookingType[]) : []
  } catch (error) {
    console.error("Failed to load bookings:", error)
    fetchFailed = true
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight">My Bookings</h1>
      <p className="mt-2 text-muted-foreground">
        Manage and view your upcoming travel plans
      </p>

      {fetchFailed ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="font-medium">Couldn&apos;t load your bookings</p>
          <p className="max-w-md text-sm text-muted-foreground">
            Make sure the backend on port 5000 is running, then refresh the
            page.
          </p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-dashed px-6 py-16 text-center">
          <CalendarX className="size-8 text-muted-foreground" />
          <p className="font-medium">You don&apos;t have any bookings yet</p>
          <p className="max-w-md text-sm text-muted-foreground">
            Once you book a trip, it will show up here.
          </p>
          <Link href="/all-destinations" className={buttonVariants()}>
            <Plus />
            Browse Destinations
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-5">
          {bookings.map((booking) => (
            <MyBookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </main>
  )
}

export default MyBookingsPage
