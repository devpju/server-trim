import mongoose from "mongoose";

// Hàm kết nối cơ sở dữ liệu MongoDB
const connectDB = async () => {
  try {
    // Kết nối tới MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🎯 Successfully connected to the database.");
  } catch (error) {
    console.error("🥲 Failed to connect to the database:", error);
    process.exit(1);
  }
};

export default connectDB;
