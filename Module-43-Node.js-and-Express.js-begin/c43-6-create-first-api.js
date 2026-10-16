/* 

Step-1:Create Api
-create a array of object in the index.js

    const users=[
        {id:1,name:"A", email:"aaa@gmail.com"},
        {id:2,name:"B", email:"bbb@gmail.com"},
        {id:3,name:"C", email:"ccc@gmail.com"},
        {id:4,name:"D", email:"ddd@gmai.com"}
    ]

-now create a route

    app.get("/users",(req,res)=>{
        res.send(users);
    })


Step-2 : Use the api in Frontend Project
-create a new client project using Next.js
-npx create-next-app@latest user-management-client --yes

-create a route: users/page.tsx 
-fetch the data using this api: http://localhost:5000/users

=>users/page.tsx
const UsersPage = async () => {
  const response = await fetch("http://localhost:5000/users");
  const userData = await response.json();
  
  return (
    <div>
      <h2>Users are coming soon: {userData.length}</h2>

      {userData.map((user: { id: number; name: string }) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
};

export default UsersPage;







*/