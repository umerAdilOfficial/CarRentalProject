const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "car", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    required: true,
    default: "pending",
  },
});

const Booking = mongoose.model("booking", BookingSchema);
module.exports = Booking;
