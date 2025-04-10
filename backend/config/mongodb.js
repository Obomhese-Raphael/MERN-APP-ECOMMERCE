import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB`);
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/forever-ecommerce`);
};

export default connectDB;
