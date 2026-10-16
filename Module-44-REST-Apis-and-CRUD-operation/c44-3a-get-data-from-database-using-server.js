/* 
✅✅Step-1:
    -go to  Mongodb docs : https://www.mongodb.com/docs/
    -click on : Client Libraries / Node.js /Drivers: Node.js
    -then :(left side bar) CRUD Operation/Query Documents/Find Documents/findOne() Example: Full File 
    -copy this :
        // Get the database and collection on which to run the operation
        const database = client.db("sample_mflix");
        const movies = database.collection("movies");
    -paste to index.js under the connectToMongoDB function()
    -customize like this:
        const connectedClient = await connectToMongoDB();
        const database = connectedClient.db("crud-db-1"); //actual database name from mongodb
        const users = database.collection("users") //actual collection name from mongodb


    -again click on :(left side bar)  Access Data From a Cursor/Return an Array of All Documents
    -copy this :
        const cursor = myColl.find({});
        const allValues = await cursor.toArray();
    -paste to index.js
    -customize like this: 

            // get users from database
            const connectedClient = await connectToMongoDB();
            const database = connectedClient.db("crud-db-1"); //actual database name from mongodb
            const users = database.collection("users") //actual collection name from mongodb
            
            app.get ("/users",async(req,res)=>{
                const cursor = users.find({});
                const allUsers = await cursor.toArray();
                res.send(allUsers);
            })
    
✅✅Step-2:see the data at the browser:
        http://localhost:5000/users





############################ ✅✅Full Index.js✅✅  ######################################

import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import "dotenv/config";

const app = express();
const port = process.env.port || 5000;

app.use(
  cors({
    // origin: "http://localhost:3000",
  }),
);
app.use(express.json());

// connect to database
const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@crudcluster1.jzuxmlk.mongodb.net/`,
);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// get users from database
const connectedClient = await connectToMongoDB();
const database = connectedClient.db("crud-db-1"); //actual database name from mongodb
const users = database.collection("users"); //actual collection name from mongodb

app.get("/users", async (req, res) => {
  const cursor = users.find({});
  const allUsers = await cursor.toArray();
  res.send(allUsers);
});

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`CRUD server is running on port ${port}`);
});




*/