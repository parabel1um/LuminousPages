import mongoose from "mongoose";

export default async function connect(): Promise<void> {
  if (mongoose.connections[0].readyState) return;

  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error("MongoDB URI is not defined");
  }
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to MongoDB");
  } catch {
    console.log("failed to connect to MongoDB");

    throw new Error("Error connecting to MongoDB");
  }
}
