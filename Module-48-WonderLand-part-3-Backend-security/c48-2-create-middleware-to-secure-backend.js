/* 

⚠️⚠️Before adding middleware : 
http://localhost:5000/my-bookings/mdraj.9700@gmail.com

➡️result :
    [
        {
        "_id": "6ae1f9282276831a2d6f9074",
        "packageId": "6ade388c976422c29b9317de",
        "destination": "Punta Cana",
        "country": " Dominican Republic",
        "category": "Beach",
        "price": "3000",
        "duration": "7 Days/6 Nights",
        "imageUrl": "https://i.ibb.co.com/zVpBcWCH/image2.png",
        "description": "This stunning aerial drone shot captures a slice of Caribbean paradise, showcasing pristine white sands lined with lush coconut palm trees and organized rows of blue lounge chairs. The calm, crystal-clear turquoise waters gently lap against the shore, creating a perfect environment for sunbathing, relaxation, and luxury seaside vacations.\n",
        "userId": "6adf95e80ffb6a6511b01f20",
        "name": "Raju Ahammed",
        "email": "mdraj.9700@gmail.com",
        "departureDate": "2026-10-30",
        "bookingDate": "2026-10-28T13:31:20.080Z",
        "status": "confirmed"
        }
    ]



 Middleware creating steps :

✅✅Step-1 : add headers inside the fecth at frontend pages where you used the backend api (my-bookings/page.tsx)

  const res = await fetch(
      `http://localhost:5000/my-bookings/${user.email}`,{
            headers:{
              authorization : "user logged in"
            }
          }
    )


✅✅Step-2 :create middleware using the header at backend - index.js
    
    const verifyApi =(req,res,next)=>{
        const authHeader = req.headers.authorization;
        console.log(authHeader);

        if(authHeader !== "user logged in"){
            return res.status(401).send({msg:"Unauthorized"});
        }

        console.log("I am middleware");

        next();

    }

✅✅Step-3 : use the middleware in api

    //see my-bookings: http://localhost:5000/bookings/{email}
        app.get("/my-bookings/:email",verifyApi,async(req,res)=>{
            const userEmail= req.params.email;
            const result = await bookingCollections.find({email:userEmail}).toArray();
            res.send(result);
        })





⚠️⚠️After Adding middleware :
http://localhost:5000/my-bookings/mdraj.9700@gmail.com

➡️result :

    {
    "msg": "Unauthorized"
    }


*/