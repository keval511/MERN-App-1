import mongoose from "mongoose";
const db = async () => {
  const url =
    "mongodb+srv://kevalprajapati11111:1234@user.jhd5vzn.mongodb.net/?retryWrites=true&w=majority&appName=User";

  try {
    await mongoose.connect(url); 
    console.log("connect to database");
  } catch (error) {
    console.log(error, "not connect");
  }
};

export default db;
