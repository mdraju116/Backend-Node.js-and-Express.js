import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
const port = process.env.port || 5000;
import { MongoClient, ObjectId } from "mongodb";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);


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
//connect databse-user(cluster) with database-table(db & collection)
const connectedClient = await connectToMongoDB();

const database = connectedClient.db("wonderland-db"); //actual database name from mongodb
const packages = database.collection("packages"); //actual collection name from mongodb

// http://localhost:5000/
app.get("/", (req, res) => {
  res.send("Hello World!");
});


//send packages to database
app.post("/add-package", async (req, res) => {
  const newPackage = req.body;
  console.log("data from client:", newPackage);
  // const result = res.send({ message: "Data Added to Server" });

  const result = await packages.insertOne(newPackage);
  // console.log(result)
  res.send(result);
});



//get packages from database => http://localhost:5000/packages
app.get("/packages", async (req, res) => {
  const cursor = packages.find({});
  const allPackages = await cursor.toArray();
  res.send(allPackages);
});

//get single user details by id => http://localhost:5000/packages/id
 app.get("/packages/:id",async(req,res)=>{
    console.log("userId:",req.params);
    const id = req.params.id;

    const query = {_id: new ObjectId(id)}
    const result = await packages.findOne(query);
    res.send(result);

    })


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
