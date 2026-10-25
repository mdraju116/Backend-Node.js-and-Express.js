"use client"

import Link from "next/link"
import { Pencil, X } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import toast from "react-hot-toast"

export function DestinationActions() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => toast("Editing is not available yet")}
      >
        <Pencil />
        Edit
      </Button>
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
