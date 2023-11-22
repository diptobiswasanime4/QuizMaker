import mongoose from "mongoose"

export function connect () {
    try {
        mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log(`Error connecting to DB. ${error}`);
        
    }
}