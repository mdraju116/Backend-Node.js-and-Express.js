/* 

create a delete api:

    //http://localhost:5000/my-bookings/{id}
    app.delete("/my-bookings/:id", async(req,res)=>{
    const id = req.params.id;
    const query = {_id:new ObjectId(id)};
    const result = await bookingCollections.deleteOne(query);
    res.send(result);
    })

update the cancel button on MybookingCard 





*/