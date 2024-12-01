import mongoose, { mongo } from "mongoose";

export const ConnectDb=async()=>{
    await mongoose
      .connect(
        "mongodb+srv://aryan11:shriabhi79@cluster0.15bl2.mongodb.net/Cluster0"
      )
      .then(console.log("Db connected"));
}
