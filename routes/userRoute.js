const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GETTING ALL USERS FROM DATABASE 
router.get("/getAllUser" , async(req,res) => {
try {

    // FINDING ALL USERS 
    const allUsers = await User.find({})
    res.status(200).json(allUsers)
} catch (error) {
    console.log("the actual error is ", error.message)
    res.status(400).send("user not found")
}
});

// ADD A USER IN DATABASE 
router.post("/addUser" , async(req,res) => {
    try {
        // FINDING IF USER ALREADY EXIST WITH THE EMAIL
        const existingUser = await User.findOne({email:req.body.email})

        // IF USER EXISTS WITH THE SAME EMAIL RETURN WITH BAD REQUEST
        if(existingUser){
            return res.status(400).send("a user with this email already exist")
        }

        // CREATING A USER 
        const createUser = await User.create({
           name : req.body.name,
           email : req.body.email,
           phone_number : req.body.phone_number,
        });
res.status(200).json(createUser);
    } catch (error) {
        res.status(400).send("Internal Error Occured")
    }
})

// EXPORTING ROUTE
module.exports = router;