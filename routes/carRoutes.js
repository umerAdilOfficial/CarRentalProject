const express = require("express");
const router = express.Router();
const Car = require("../models/Cars");
const Booking = require("../models/Booking");

// ADDING A CAR IN DATABASE
router.post("/addCar", async (req, res) => {
  try {
    // CREATING A CAR IN DATABASE
    const car = await Car.create({
      name: req.body.name,
      brand: req.body.brand,
      pricePerDay: req.body.pricePerDay,
      image: req.body.image,
      description: req.body.description,
      availability: req.body.availability,
      category: req.body.category,
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).send("some internal error");
    console.log("the actual error is", error.message);
  }
});

// GETTING ALL CARS
router.get("/getAllCars", async (req, res) => {
  try {
    // FIND ALL CARS FROM DATABASE
    const cars = await Car.find({});

    res.status(200).json(cars);
  } catch (error) {
    console.log("the actual error is ", error.msg);
    res.status(400).send("no cars available");
  }
});

// THERE ADMIN CAN DELETE A CAR 
router.delete("/deleteCar/:carId" , async(req,res) => {
  try {
    const {carId} = req.params;
    const deleteCar = await Car.findByIdAndDelete(carId);
    res.status(200).send("car is delete successfully") 
  } catch (error) {
    console.log("actual error is", error.message)
    res.status(400).send("Internal error")
  }
})

router.get("/getSingleCar/:carId" , async(req,res) => {
  try {
    const {carId} = req.params;
    const getSingleCarById = await Car.findById(carId);
    res.status(200).json(getSingleCarById);
  } catch (error) {
    console.log("actual error is", error.message)
    res.status(400).send("Internal error")
  }
})

// UPDATE ANY CAR IN DATABASE AND ANY INFORMATION OF CAR
router.put("/updateCar/:carId" , async(req,res) => {
try {
  const {carId} = req.params;
  const {name , brand , availability , category , pricePerDay , description} = req.body;
  const updatedCar = await Car.findByIdAndUpdate(carId , {name , brand , availability , category , pricePerDay , description} , {new : true , runValidators : true});
  res.status(200).json(updatedCar);
}catch (error) {
    console.log("actual error is", error.message)
    res.status(400).send("Internal error")
  }
})

module.exports = router;
