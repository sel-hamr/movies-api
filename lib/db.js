import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export default function connectDB() {
  mongoose
    .connect(MONGO_URI, {})
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
    });
}
