const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");



const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=> console.log("Connected to MongoDB"))
.catch((err) => console.err("MongoDB connection error:",err));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req,res)=>
{
    res.send("Farmeze Backend is running");
});

//starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>  console.log(`Server is running on port ${PORT}`));
