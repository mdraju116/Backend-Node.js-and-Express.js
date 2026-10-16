
/* ✅ ➡️

✅✅Step-1:create a new server
-create index.js and write basic app & get methods

✅✅Step-2:install dot env
-go to : dot env npm => https://www.npmjs.com/package/dotenv
-copy this:npm install dotenv --save
-paste to server terminal 
-create an .env file (where package.json has)
-the database username and pass will be stored here
-must add it at .gitignore (type onle : .env)

-now again go to the site 
-copy this :import 'dotenv/config'
-paste to index.js


✅✅Step-3:Connect mongodb
-Now go to Mongodb
-create a new project at Mongodb named:crud-server
-create new cluster 
-copy the user and pass 
-paste into the .env file and named like : DB_USER=  & DB_PASS=

-now go to : Choose a connection method
-click on : Installation instructions
-copy this : npm install mongodb
-paste to server terminal 

-now copy this :
    import { MongoClient } from 'mongodb';
    
    const client = new MongoClient("mongodb+srv://<db_username>:<db_password>@crudcluster1.jzuxmlk.mongodb.net/");
    export async function connectToMongoDB() {
        try {
            await client.connect();
            console.log("You successfully connected to MongoDB!");
            return client;
        } catch (err) {
            console.dir(err);
        }
    }

    await connectToMongoDB();  //need to type manually

-paste to index.js 
-call the function using : await connectToMongoDB();  and 
-replace the user and pass with the env variable like this :(use template string)
    const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@crudcluster1.jzuxmlk.mongodb.net/`);
-NB:(must import this :import 'dotenv/config' to use process.env)

-okay
/Now you can see this message at the server terminal if the all is okay :
/You successfully connected to MongoDB! 

-you can also copy this and keep in index.js (optional-but safe)

    // Call this only when your application terminates
    export async function disconnectFromMongoDB() {
        await client.close();
    }


➡️➡️NB:
-You can use an existing project
-then you only need to create a new user and connect it

-go to : Database and Network Access => Add New Database User
-give a username : crud-server-user2 and generate password, 
-then copy them and save in the .env
-set Built in role : Atlas Admin =>click Add User

-now go back to project page, click on Connect
-same process as above :Choose a connection method


✅✅Step-4: Create Database
-go to project's cluster page at mongodb
-click on Browse collections
-create a database clicking the + icon under your cluster
-give database name as :crud-db-1
-give collection name as : users
-click on create database


-Now add some user manually 
-go to : Crudclusters1/crud-db-1/users 
-click on Add data => Insert Document =>EJSON
-go to chatgpt : give me 5 user with only name and email in JSON format without id
-copy and paste here
-click insert


############################## ✅✅Full index.js✅✅ #######################################

import express from "express";
import cors from "cors";
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();
const port = process.env.port || 5000;

app.use(cors({
    // origin: "http://localhost:3000",
  }),
);
app.use(express.json())


const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@crudcluster1.jzuxmlk.mongodb.net/`);

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