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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
