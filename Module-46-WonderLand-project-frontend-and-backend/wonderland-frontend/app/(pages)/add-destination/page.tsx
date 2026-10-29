"use client"

import * as React from "react"
import { Save, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
import { authClient } from "@/lib/auth-client"

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "City",
  "Nature",
  "Luxury",
  "Wildlife",
]

type PackageForm = {
  destination: string
  country: string
  category: string
  price: string
  duration: string
  departureDate: string
  imageUrl: string
  description: string
}

const initialForm: PackageForm = {
  destination: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
}

export default function AddDestination() {
  const [form, setForm] = React.useState<PackageForm>(initialForm)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      //accessing jwt token from client component
      const { data, error } = await authClient.token();
      if (error || !data?.token) {
        toast.error("Error accessing JWT token")
        return
      }
      const jwtToken = data.token ;

      const res = await fetch("http://localhost:5000/add-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //send token
          "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error("Failed to add destination")
      }

      const result = await res.json()
      console.log("Response from backend", result)

      toast.success("Destination added successfully!")
    } catch (error) {
      toast.error("Failed to add destination!")
      console.error(error)
    }
  }

  const handleCancel = () => setForm(initialForm)

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Add New Travel Package</h1>

      <div className="mx-auto w-full max-w-lg">
        <Card>
          <form onSubmit={handleSubmit}>
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
                      setForm((prev) => ({ ...prev, category: value ?? "" }))
                    }
                  >
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="Beach" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
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
              >
                <Trash2 />
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="bg-[#0e9aa7] text-white hover:bg-[#0c8794]"
              >
                <Save />
                Add Travel Package
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  )
}
