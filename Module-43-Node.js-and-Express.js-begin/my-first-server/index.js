import express from "express";

const app = express();
const port = process.env.port || 5000;

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
