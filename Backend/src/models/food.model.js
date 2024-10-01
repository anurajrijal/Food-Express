import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    fimage:{
        type:String,
        required:true
    },
    cookTime:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

},{timestamps:true})
export const Food = mongoose.model("Food",foodSchema)