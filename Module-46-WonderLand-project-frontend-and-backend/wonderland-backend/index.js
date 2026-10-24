import express from "express";
import cors from "cors";
import 'dotenv/config'
const app = express();
const port = process.env.port || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);


import { MongoClient } from 'mongodb';

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

await connectToMongoDB();



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
