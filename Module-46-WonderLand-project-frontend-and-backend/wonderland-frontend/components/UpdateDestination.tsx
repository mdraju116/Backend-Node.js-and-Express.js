"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Pencil, Save, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import { type DestinationType } from "@/app/(pages)/all-destinations/[destid]/page"
import { getClientToken } from "@/lib/access-jwt-at-client-component"

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "City",
  "Nature",
  "Luxury",
  "Wildlife",
]

type PackageForm = Omit<DestinationType, "_id">

const toFormValues = (destination: DestinationType): PackageForm => ({
  destination: destination.destination,
  country: destination.country,
  category: destination.category,
  price: destination.price,
  duration: destination.duration,
  departureDate: destination.departureDate,
  imageUrl: destination.imageUrl,
  description: destination.description,
})

type UpdateDestinationProps = {
  destination: DestinationType
}

export default function UpdateDestination({
  destination,
}: UpdateDestinationProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState<PackageForm>(() =>
    toFormValues(destination)
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Keep a saved category that isn't in the default list selectable
  const categoryOptions =
    form.category && !categories.includes(form.category)
      ? [...categories, form.category]
      : categories

  const handleOpenChange = (nextOpen: boolean) => {
    // Always start from the saved values when the dialog is opened
    if (nextOpen) setForm(toFormValues(destination))
    setOpen(nextOpen)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSaving(true)
    try {
      const jwtToken = await getClientToken()

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/packages/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(form),
        }
      )

      if (!res.ok) {
        throw new Error("Failed to edit destination")
      }

      const result = await res.json()
      console.log("Response from backend", result)

      toast.success("Destination edited successfully!")
      setOpen(false)
      // Re-fetch the server component so the page shows the saved values
      router.refresh()
    } catch (error) {
      toast.error("Failed to edit destination!")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setForm(toFormValues(destination))
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" />}>
        <Pencil />
        Edit
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto pr-1">
          <DialogHeader>
            <DialogTitle>Edit Travel Package</DialogTitle>
            <DialogDescription>
              Update the travel package details below, then save your changes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4">
            <Card>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="destination">Destination Name</Label>
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="Bali Paradise"
                    value={form.destination}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      placeholder="Indonesia"
                      value={form.country}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={form.category || null}
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          category: value ?? "",
                        }))
                      }
                    >
                      <SelectTrigger id="category" className="w-full">
                        <SelectValue placeholder="Beach" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="e.g., 1299"
                      value={form.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g., 7 Days/6 Nights"
                      value={form.duration}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="departureDate">Departure Date</Label>
                  <Input
                    id="departureDate"
                    name="departureDate"
                    type="date"
                    value={form.departureDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={form.imageUrl}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the travel experience..."
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>

              <CardFooter className="justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <Trash2 />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-[#0e9aa7] text-white hover:bg-[#0c8794]"
                  disabled={saving}
                >
                  <Save />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
