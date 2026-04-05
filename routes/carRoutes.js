const express = require("express");
const router = express.Router();
const Car = require("../models/Cars");

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
module.exports = router;
