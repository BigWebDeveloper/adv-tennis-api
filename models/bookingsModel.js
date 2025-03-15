import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema ({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    phone:{type:Number, required:true},
    email:{type:String, required:true, unique:true},
    message:{type:String,required:true}
}, {minimize:false})

export const bookingsModel = mongoose.models.booking || mongoose.model("booking", bookingSchema);