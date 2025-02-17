// connectdb.js
import mongoose from "mongoose";

const connectDB = async (URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "dataB"
    };
    await mongoose.connect(URL, DB_OPTIONS);
    console.log('Connected to user DB');
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
