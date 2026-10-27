import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = process.env.port || 5000;
app.use(express.json());

//to connect frontend with server
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

//server home-page => http://localhost:5000/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// connect to database
const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const connectedClient = await connectToMongoDB();

// create database & collection (will auto create at mongodb => Browse collections)
const database = connectedClient.db("wonderland-db"); 
const packages = database.collection("packages"); 

const bookingCollections =database.collection("bookings");


//CRUD-operations

//1.send packages to database => http://localhost:5000/add-package
app.post("/add-package", async (req, res) => {
  const newPackage = req.body;
  console.log("data from client:", newPackage);
  // const result = res.send({ message: "Data Added to Server" });

  const result = await packages.insertOne(newPackage);
  // console.log(result)
  res.send(result);
});

//2a.get all packages from database => http://localhost:5000/packages
app.get("/packages", async (req, res) => {
  const cursor = packages.find({});
  const allPackages = await cursor.toArray();
  res.send(allPackages);
});

//2b.get single package details by id => http://localhost:5000/packages/id
app.get("/packages/:id", async (req, res) => {
  console.log("userId:", req.params);
  const id = req.params.id;

  const query = { _id: new ObjectId(id) };
  const result = await packages.findOne(query);
  res.send(result);
});

//3.Update single package by id =>http://localhost:5000/packages/{id}
app.patch("/packages/:id", async (req, res) => {
  const id = req.params.id;
  const updatedPackage = req.body;
  console.log("Updating package:", id, updatedPackage);

  const filter = { _id: new ObjectId(id) };
  const updateDoc = { $set: updatedPackage};

  const result = await packages.updateOne(filter, updateDoc);
  res.send(result);
});

//4.Delete  single-package by id => http://localhost:5000/packages/{id}
app.delete("/packages/:id",async(req,res)=>{
  const id =req.params.id;
  const query = {_id:new ObjectId(id)}
  const result= await packages.deleteOne(query);
  res.send(result);
})


// http://localhost:5000/bookings
app.post("/bookings",async(req,res)=>{
  const data = req.body;
  const result = await bookingCollections.insertOne(data);
  res.send(result);
})

// http://localhost:5000/bookings/{email}
app.get("/bookings/:email",async(req,res)=>{
  const userEmail= req.params.email;
  const result = await bookingCollections.find({email:userEmail}).toArray();
  res.send(result);
})

//http://localhost:5000/my-bookings/{id}
app.delete("/my-bookings/:id", async(req,res)=>{
  const id = req.params.id;
  const query = {_id:new ObjectId(id)};
  const result = await bookingCollections.deleteOne(query);
  res.send(result);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
