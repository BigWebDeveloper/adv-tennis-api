import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connected"));
};
