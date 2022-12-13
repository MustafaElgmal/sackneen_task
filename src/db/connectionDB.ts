import mongoose from "mongoose";

export const connection = async (port: number | string) => {
  try {
    await mongoose.connect(process.env.DBURL!);
    console.log(`Server running on port ${port} `);
  } catch (e) {
    console.log("Connection is not vaild!");
  }
};

