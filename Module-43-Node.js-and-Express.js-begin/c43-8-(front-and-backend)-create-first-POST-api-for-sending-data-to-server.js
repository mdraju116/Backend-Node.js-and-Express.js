/* 
✅✅Step-1: Create the Post API (backend) : full code at the bottom

-go to :  https://expressjs.com/en/5x/starter/basic-routing/
          or,
          https://expressjs.com/en/5x/api/express/

-copy this and paste to index.js

    // parse requests with a Content-Type of application/json
    app.use(express.json());

    app.post('/profile', (req, res) => {
      console.dir(req.body);
      res.json(req.body);
    });


-then customize like this :

    app.post('/users', (req, res) => {
      console.log("data from client",req.body);
      res.send({success:true,message:"user added successfully"} );
    });


-Now install CORS to define the origin 
  -go to : https://expressjs.com/en/resources/middleware/cors/
          or, go to chatgpt (I use it)

  -copy this : npm install cors
  -paste to backend terminal

  -again copy this  and paste to index.js 

    import cors from "cors";

    app.use(cors({
      origin: "http://localhost:3000",
    }));



✅✅Step-2: Use/Send data usign the Post Api (frontend) : full code at the bottom

-search in the web : js send post request
-go to cdn site : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
-scroll to bottom and copy this:

      const response = await fetch("https://example.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "example" }),
        // …
      });

- paste to  users/add-user/page.tsx
- then customize like this :

  // send data to banckend server
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // …
    });

    const result = await response.json();
    console.log("Response from backend",result)

-now submit the form

-The result will be like this :

  Browser Console:
  Form submitted successfully! {name: 'Raju Ahm', email: 'dhaka@jan.com'}
  Response from backend {success: true, message: 'user added successfully'}

  Server Console:
  data from client { name: 'Raju Ahm', email: 'dhaka@jan.com' }


-After redirected to users page the data will show like this :
    Users are coming soon: 6
    A :aaa@gmail.com
    B :bbb@gmail.com
    C :ccc@gmail.com
    D :ddd@gmai.com
    dfdd :dhaka@jan.com
    ffffffff :dhaka@jan.com


###################################### index.js (backend) ##############################################
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





###################################### users/add-user/page.tsx (frontend) ################################

"use client";
import {
  Button,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";

const AddUserPage = () => {

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted successfully!", data);


    // send data to banckend server
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // …
    });

    const result = await response.json();
    console.log("Response from backend",result)

    // show data (c43-9)
    if(result.success){
        redirect("/users")
    }

  };

  return (
    <div className="mx-auto mt-10">
      <Form className="w-full max-w-96" onSubmit={onSubmit}>
        <Fieldset>
          <FieldGroup>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label>Name</Label>
              <Input placeholder="John Doe" />
              <FieldError />
            </TextField>
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>
          </FieldGroup>

          <Fieldset.Actions>
            <Button type="submit">Submit</Button>
            <Button type="reset" variant="secondary">
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
};

export default AddUserPage;







*/
