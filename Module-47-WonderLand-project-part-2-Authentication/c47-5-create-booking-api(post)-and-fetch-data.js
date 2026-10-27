/* 
=>create a booking post api at backend
    const bookingCollections =database.collection("bookings");
    
    // http://localhost:5000/bookings
    app.post("/bookings",async(req,res)=>{
    const data = req.body;
    const result = await bookingCollections.insertOne(data);
    res.send(result);
    })



=>get data from booking Card & send to backend (BookingCard.tsx)

    const handleBookNow = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,): Promise<void> => {
        e.preventDefault()
        const departureDate = date ? ` on ${formatDate(date)}` : ""
        const bookingDate = new Date();

        //get data from booking card
        const data = {
        ...user,
        ...destination,
        departureDate,
        bookingDate,

        }
        // console.log(data)

        //send to backend
        const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
        })

        const bookingRes = await res.json();
        console.log("Response from backend:", bookingRes);


        toast.success(`Booking for ${destination.destination.trim()}${departureDate} is succesfull.`)
    }

*/