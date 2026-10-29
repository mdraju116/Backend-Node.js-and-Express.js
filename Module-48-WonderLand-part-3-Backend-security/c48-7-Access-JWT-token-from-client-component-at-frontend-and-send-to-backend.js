/* 
✅✅Step-1b : Access the JWT token -client component (add-destination/page.tsx)

-go to : https://better-auth.com/docs/plugins/jwt
-Retrieve the token

-copy this :  Using the client plugin (recommended)

      import { authClient } from "@/lib/auth-client"

      const { data, error } = await authClient.token()
      if (error) {
        // handle error
      }
      if (data) {
        const jwtToken = data.token
        // Use this token for authenticated requests to external services
      }


      await fetch("/api/auth/token", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })

➡️use like this :
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()

          try {

            //accessing jwt token from client component
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
              toast.error("Error accessing JWT token")
              return
            }
            const jwtToken = data.token ;

            
            const res = await fetch("http://localhost:5000/add-package", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",

                //send token
                "Authorization": `Bearer ${jwtToken}`
              },
              body: JSON.stringify(form),
            })
        ...
        ...
        ...
      } 


-call the middleware (verifyToken) at the corresponding api at backend

  app.post("/add-package", verifyToken,async (req, res) => {
    const newPackage = req.body;
    console.log("data from client:", newPackage);
    // const result = res.send({ message: "Data Added to Server" });

    const result = await packages.insertOne(newPackage);
    // console.log(result)
    res.send(result);
  });




*/