import mongoose from 'mongoose'

export const connectDatabase= async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Database is connected");
    } catch(error){
        throw new Error(error);
        // console.error(error.message);
    }
};