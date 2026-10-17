import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const app = express();
const port = process.env.port || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
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

// post users to database
app.post("/users", async (req, res) => {
  const newUser = req.body;
  console.log("data from client", newUser); //message to server console
  // res.send({ success: true, message: "user added successfully" }); //message to frontend console
  // don't use multiple send because it's a single insert

  const result = await users.insertOne(newUser);
  res.send(result);
});

// find single-user by id
app.get("/users/:id",async(req,res)=>{
  console.log("Found userId:",req.params);
  const id = req.params.id;

  const query = {_id:new ObjectId(id)}
  const result = await users.findOne(query);
  res.send(result);

})

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

// Delete a single-user
app.delete("/users/:id",async(req,res)=>{
  const id =req.params.id;
  const query = {_id:new ObjectId(id)}
  const result= await users.deleteOne(query);
  res.send(result);
})



app.listen(port, () => {
  console.log(`CRUD server is running on port ${port}`);
});
