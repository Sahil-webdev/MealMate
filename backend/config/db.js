import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://meal_mate:mealmate0408@cluster0.qnn9x.mongodb.net/mealmate").then(()=>console.log("DB Connected"));
}