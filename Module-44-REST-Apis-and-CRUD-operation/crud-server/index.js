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
