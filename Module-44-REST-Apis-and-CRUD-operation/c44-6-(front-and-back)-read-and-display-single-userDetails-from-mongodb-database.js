/* 



-go to  Mongodb docs : https://www.mongodb.com/docs/
    -click on : Client Libraries / Node.js /Drivers: Node.js
    -then :(left side bar) CRUD Operation//Query doucments/Find documents/find one
     https://www.mongodb.com/docs/drivers/node/current/crud/query/retrieve/

✅✅Step-1 :Create api at Backend
-create a get api at index.js 
-use /:id for dynamic user
-create id and query,then findOne like this : (you can follow the documentation )

    // find single-user by id
    app.get("/users/:id",async(req,res)=>{
    console.log("userId:",req.params);
    const id = req.params.id;

    const query = {_id:new ObjectId(id)}
    const result = await users.findOne(query);
    res.send(result);

    })

✅✅Step-2 : Fetch userDetails at frontend
-create a users/[userid]/page.tsx at frontend 
-use params to get userid
-use the api to fetch user : http://localhost:5000/users
-show the user details like this:

        const UserDetailsPage = async ({params}:{params:Promise<{userid:string}>}) => {

            const {userid}=await params;
            const response = await fetch(`http://localhost:5000/users/${userid}`);
            const user = await response.json();

            return (
                <div>
                    <h2>Id:{userid}</h2>
                    <p>Name:{user.name}</p>
                    <p>Email:{user.email}</p>
                </div>
            );
        };
        export default UserDetailsPage;





*/