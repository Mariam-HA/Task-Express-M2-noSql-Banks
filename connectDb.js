const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`mongo connected`);
  } catch (error) {
    console.log("could not connect", error);
  }
};

module.exports = connectDB;
