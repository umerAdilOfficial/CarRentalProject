const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Cars");

// USER CAN BOOK A CAR HERE 
router.post("/bookCar", async (req, res) => {
  try {
    const { carId, userId, startDate, endDate } = req.body;
    const existingBooking = await Booking.find({carId : req.body.carId});

    const isConflict = existingBooking.some(booking => {
      const currentStartDate = new Date(startDate);
      const currentEndDate = new Date(endDate);
      const oldStartDate = new Date(booking.startDate);
      const oldEndDate = new Date(booking.endDate)

      return(currentStartDate < oldEndDate && currentEndDate > oldStartDate)
    })

    if(isConflict){
      return res.status(400).send("sorry this car is not available for these dates");
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(400).send("car not found");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInTime = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    if (diffInDays <= 0) {
      return res.status(400).send("end date cannot be before start date");
    }

    const totalPrice = diffInDays * car.pricePerDay;
    console.log("Car Price is:", totalPrice); 

    const newBooking = new Booking({
      userId,
      carId,
      startDate,
      endDate,
      totalPrice,
      status: "Pending",
    });

    await newBooking.save();

    res.status(200).json(newBooking);
  } catch (error) {
    console.log("the actual error is ", error.message);
    res.status(400).send("internal error occurs");
  }
});


// GETTING ALL BOOKING OF SPECIFIC USER 
router.get("/getUserBookings/:userId", async (req, res) => {
  try {
    const {userId} = req.params;

    // GETTING NAME AND PRICE OF CAR SPECIFICALLY 
    const allBookings = await Booking.find({userId}).populate("carId" , "name pricePerDay");

    // FILTER THAT BOOKINGS ONLY THAT ARE VALID AND DOESNT HAVE?
    const validBookings = allBookings.filter(Booking => Booking.carId !== null);
    res.status(200).json(validBookings);

    // IF ANY ERROR OCCURS IT GOES HERE 
  } catch (error) {
    console.log("the actual error is ", error.message);
    res.status(400).send("internal error occurs");
  }
});

// DELETE A SINGLE BOOKING
router.delete("/cancelBooking/:bookingId" , async(req,res) => {
  try {
    const {bookingId} = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking){
      res.status(400).send("could not found booking")
      return;
    }
    res.status(200).json(deletedBooking)
  } catch (error) {
    console.log("the actual error is " , error.message)
    res.status(400).send("internal error")
  }
});

// ALL BOOKINGS NOT SPECIFIED BY USER
router.get("/getAllBookings" , async(req,res) => {
  try {

    // GETTING ALL BOOKINGS FROM DATABASE
    const allBookings = await Booking.find({}).populate("carId" , "name");

    // ONLY BOOKINGS THAT ARE VALID AND HAVE CAR
    const validBookings = allBookings.filter(Booking => Booking.carId !== null)

    // RESPONSE THOSE BOOKINGS THAT ARE VALID
    res.status(200).json(validBookings);
  } catch (error) {
    console.log("the actual error is " , error.message)
    res.status(500).send("Internal Error")
  }
})

// GETTING A BOOKING SPECIFIED BY BOOKING ID FOR ADMIN DASHBOARD
router.get("/getOneBooking/:bookingId" , async(req,res) => {
   try {

    // GETTING BOOKING ID FROM REQUEST
    const {bookingId} = req.params;

    // GETTING BOOKING BY ID AND ALSO GIVE USERNAME AND CARNAME OF BOOKING 
    const getOneBooking = await Booking.findById(bookingId).populate("carId" , "name").populate("userId" , "name");
    console.log(bookingId)
    res.status(200).json(getOneBooking);
   } catch (error) {
    console.log("the actual error is" , error.message)
    res.status(400).send("Booking not find")
   };
});

router.put("/updateStatus/:bookingId" , async(req,res) => {
  try {
    const {bookingId} = req.params;
    const  {status} = req.body
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId , {status:status} , {new : true})

    if(!updatedBooking){
      return res.status(400).send("Booking not found")
    }
    res.status(200).json(updatedBooking)
  } catch (error) {
    console.log("the actual error is " , error.message)
   res.status(400).send("Some Interval Error") 
  }
})


router.get("/confirmedBookings" , async(req,res) => {
try {
  const confirmedBooking = await Booking.find({status:"Confirmed"}).populate("userId" , "name");
  res.status(200).json(confirmedBooking)
} catch (error) {
  console.log("the actual error is " , error.message)
  res.status(400).send("Internal Error")
}
})
module.exports = router;
