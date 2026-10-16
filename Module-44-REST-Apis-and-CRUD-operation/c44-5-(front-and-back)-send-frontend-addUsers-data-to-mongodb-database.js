/* 
-create a users/add-user/page.tsx
-create a form inside the page.tsx to send NewUser to server (c43-7)
    -You can use form-group from shadcn input/ heroUi form 
-create a POST api("/users") in backend index.js to receive thd NewUser data (c43-8)

-go to  Mongodb docs : https://www.mongodb.com/docs/
    -click on : Client Libraries / Node.js /Drivers: Node.js
    -then :(left side bar) CRUD Operation//insert doucments
    https://www.mongodb.com/docs/drivers/node/current/crud/insert/#std-label-node-insert

-Go to Insert one and copy this :const result = await myColl.insertOne(doc);
-paste inside the Post like this :

        // post users to database
            app.post("/users", async (req, res) => {
                const newUser = req.body;
                console.log("data from client", newUser); //message to server console
            
                const result = await users.insertOne(newUser);
                res.send(result);
            });
-Okay

-now submit a new user and
-go to mongodb database and check

*/
