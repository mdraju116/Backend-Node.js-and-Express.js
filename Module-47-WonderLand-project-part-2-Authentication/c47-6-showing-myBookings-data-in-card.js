/* 
create a get api
    // http://localhost:5000/bookings/{email}
    app.get("/bookings/:email",async(req,res)=>{
    const userEmail= req.params.email;
    const result = await bookingCollections.find({email:userEmail}).toArray();
    res.send(result);
    })

create a mybooking-card and show the bookings

*/