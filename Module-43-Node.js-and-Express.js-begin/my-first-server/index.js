import express from "express";
import cors from "cors"

const app = express();
const port = process.env.port || 5000;

app.use(cors({
  origin: "http://localhost:3000",
}));

// parse requests with a Content-Type of application/json
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/about', (req,res)=>{
    res.send("About Page");
})

app.get("/dashboard",(req,res)=>{
    res.send("Dashboard");
})

const users=[
    {id:1,name:"A", email:"aaa@gmail.com"},
    {id:2,name:"B", email:"bbb@gmail.com"},
    {id:3,name:"C", email:"ccc@gmail.com"},
    {id:4,name:"D", email:"ddd@gmai.com"}
]

app.get("/users",(req,res)=>{
    res.send(users);
})


app.post('/users', (req, res) => {
  console.log("data from client",req.body);

 //temporary data storage (c43-9)
  const newUser = req.body;
  newUser.id = users.length+1;
  users.push(newUser);

  res.send({success:true,message:"user added successfully"} );
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
