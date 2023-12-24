const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection.STATES.connected) {
      console.log("MongoDB connected");
    } else {
      console.log("MongoDB connection failed");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connectDB };
