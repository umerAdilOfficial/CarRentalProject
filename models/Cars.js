const mongoose = require("mongoose");
const { Schema } = mongoose;

const CarSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  availability: { type: Boolean, required: true },
});

const Car = mongoose.model("car", CarSchema);
module.exports = Car;
