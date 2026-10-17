/* 
-go to  Mongodb docs : https://www.mongodb.com/docs/
    -click on : Client Libraries / Node.js /Drivers: Node.js
    -then :(left side bar) CRUD Operation/Update documents/Modify/Update one
     https://www.mongodb.com/docs/drivers/node/current/crud/update/modify/

✅✅Step-1:Create Patch api at Backend
-create a patch api at index.js 
-use /:id for dynamic user
-create id and filter,then updateOne like this : (you can follow the documentation )

        // update single-user
        app.patch("/users/:id",async(req,res)=>{
            const id=req.params.id;
            const updatedUser = req.body;
            console.log("Updating User:",id , updatedUser );

            const filter={_id:new ObjectId(id)}
            // const options = {upsert:true}
            const updateDoc= {
                $set:{
                name:updatedUser.name,
                email:updatedUser.email,
                }
            }
            const result= await users.updateOne(filter,updateDoc);
            res.send(result);

        })






✅✅Step-2: Create Update form and handleUpdate at Frontend
-Create a component UpdateUser.tsx 
-go to shadcn : choose dialog :https://ui.shadcn.com/docs/components/base/dialog
-install first : npx shadcn@latest add dialog
-copy the top/first Open dialog code
-paste to UpdateUser.tsx 
-Need to Modify a lot like below

-Create a handleUpdateUser
-create patchMethod inside the handleUpdateUser
-Call the <UpdateUser/> at UserCard.tsx and get {user} as props 


#######################  ✅✅Full UpdateUser.tsx      ############################

import { UserType } from "@/app/users/page"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UserProps {
  user: UserType
}
const Updateuser = ({ user }: UserProps) => {

const handleUpdateUser = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const updatedUser = Object.fromEntries(formData.entries());
  console.log("Updated User:",updatedUser);

  const response = await fetch(`http://localhost:5000/users/${user._id}`,{
    method:"PATCH",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(updatedUser),
  });
  const result = await response.json();
  console.log("Response from server:",result);

  if(result.modifiedCount>0){
    alert("User Updated Successfully");
  }

}

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" className={"mx-4"}>  Edit</Button> }/>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleUpdateUser}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                type="name"
                defaultValue={user.name}
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Email</Label>
              <Input
                id="username-1"
                name="email"
                type="email"
                defaultValue={user.email}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Updateuser





*/