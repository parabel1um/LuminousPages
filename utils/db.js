import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to MongoDB");
  } catch {
    console.log("failed to connect to MongoDB");

    throw new Error("Error connecting to MongoDB");
  }
};

export default connect;
