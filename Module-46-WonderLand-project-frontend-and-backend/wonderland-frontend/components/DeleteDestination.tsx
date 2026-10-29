"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { type DestinationType } from "@/app/(pages)/all-destinations/[destid]/page"
import { getClientToken } from "@/lib/access-jwt-at-client-component"

type DeleteDestinationProps = {
  destination: DestinationType
}

export default function DeleteDestination({
  destination,
}: DeleteDestinationProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)

  const handleDeleteDestination = async () => {
    setDeleting(true)
    try {
      const jwtToken = await getClientToken()
      const res = await fetch(
        `http://localhost:5000/packages/${destination._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      const result = await res.json()
      console.log("Response from backend", result)

      toast.success("Destination deleted successfully!")
      setOpen(false)
      // The detail page no longer exists — go back to the list, fresh data
      router.push("/all-destinations")
      router.refresh()
    } catch (error) {
      toast.error("Failed to delete destination!")
      console.error(error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        <Trash2 />
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <Trash2 />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-medium text-foreground">
              {destination.destination}
            </span>{" "}
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDeleteDestination}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
