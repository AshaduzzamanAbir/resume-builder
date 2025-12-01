import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://abirashaduzzaman_db_user:resume123@cluster0.9tnwhpq.mongodb.net/"
    )
    .then(() => console.log("DB CONNECTED"));
};
