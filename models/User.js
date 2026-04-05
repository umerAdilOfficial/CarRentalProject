const mongoose = require("mongoose");
const {Schema} = mongoose ;

const userSchema = new Schema({
    name : {type : String , require : true , Default : "Guest"},
    email : {type : String , required : true},
    phone_number : {type : Number , required : true}
})

const User = mongoose.model("users" , userSchema);
module.exports = User;