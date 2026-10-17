/*
-go to  Mongodb docs : https://www.mongodb.com/docs/
    -click on : Client Libraries / Node.js /Drivers: Node.js
    -then :(left side bar) CRUD Operation/Delete documents/Delete one
     https://www.mongodb.com/docs/drivers/node/current/crud/delete/

✅✅Step-1 :Create Delete api at Backend
-create a delete api at index.js 
-use /:id for dynamic user
-create id and query,then deleteOne like this : (you can follow the documentation )

   // Delete a single-user
   app.delete("/users/:id",async(req,res)=>{
     const id =req.params.id;
     const query = {_id:new ObjectId(id)}
     const result= await users.deleteOne(query);
     res.send(result);
   })
   

✅✅Step-2 : handle delete function at frontend
-create a delete button at the UserCard.tsx

    <Button className="" variant={"destructive"} 
            onClick={() => handleDeleteUser(_id)}
    > Delete </Button>

-create a handleDeleteUser() 
-use the api to fetch user : http://localhost:5000/users
-refresh the user details using  router like this:

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

*/