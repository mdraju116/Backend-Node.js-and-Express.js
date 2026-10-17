"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"

const AddNewUserPage = () => {
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log("Form submitted successfully!", data)

    // send data to banckend server
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    console.log("Response from server", result)

    // show data (c43-9)
    if (result.insertedId) {
      console.log("User Added Successfully.")
      redirect("/users")
    }
  }

  return (
    <div>
      {/* type form manually , then paste FildGroup inside it. (which is got at Inside Input of shadcn) */}
      {/* Instead I wil use heroui form */}
      <form action="" onSubmit={handleOnSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
            <Input id="fieldgroup-name" name="name" placeholder="Jordan Lee" />
          </Field>

          <Field>
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              name="email"
              placeholder="name@example.com"
            />
            <FieldDescription>
              We&apos;ll send updates to this address.
            </FieldDescription>
          </Field>

          <Field orientation="horizontal">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Add User</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddNewUserPage
