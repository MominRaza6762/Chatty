require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected : ", conn.connection.host);
  } catch (error) {
    console.log("MongoDB Connection failed : ", error);
  }
};
module.exports = connectDB;