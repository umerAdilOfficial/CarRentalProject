const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
const port = process.env.PORT;

// TURNING INTO JSON
app.use(express.json());

// AVAILABLE ROUTES
app.use("/api/car", require("./routes/carRoutes"));
app.use("/api/bookings", require("./routes/bookingRoute"));
app.use("/api/user" , require("./routes/userRoute"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
