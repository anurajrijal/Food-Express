import mongoose from "mongoose";


const menuSchema = new Schema({
    timeslot:{
        type:String,
        enum:['breakfast', 'lunch', 'dinner', 'snack'],
        required: true
    },
    foodItems:[{
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
    }]

},{timestamps:true})

export const Menu = mongoose.model("Menu",menuSchema)