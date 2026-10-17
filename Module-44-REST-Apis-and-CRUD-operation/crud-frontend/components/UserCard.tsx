"use client"

import { UserType } from "@/app/users/page"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Updateuser from "./UpdateUser"

interface UserProps {
  user: UserType
}

const UserCard = ({ user }: UserProps) => {
  const {_id} =user;
  const router=useRouter();

  const handleDeleteUser = async (id: string) => {
      console.log("Deleting this User:", id);

      const response= await fetch(`http://localhost:5000/users/${id}`,{
        method:"DELETE",

      });
      const deletedUser= await response.json();
      console.log("Deleted user:",deletedUser);

      if(deletedUser.deletedCount>0){
        alert("Deleted Successfully");
        router.refresh()
      }
  }
  return (
    <div>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <CardHeader>
          <CardAction>
            <h2>No Action</h2>
          </CardAction>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={`/users/${user._id}`}>
            <Button className="w-full">View Details</Button>
          </Link>
          <Updateuser user={user}></Updateuser>

          <Button className="" variant={"destructive"} onClick={() => handleDeleteUser(_id)}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default UserCard
