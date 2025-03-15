import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        name:{type:String, required:[true, "name is required"], minlength: [3, "name must be at least 3 characters long"]},
        email:{type:String, required:[true, "email is required"]},
        phone:{type:Number, required:[true, "phone is required"],},
        message: {type:String, required:[true, "message is required"]},
        cookie: {type:String},
        date: {type:Date, required:[true, "date is required"]}
    }
)


export const commentModel = mongoose.models.comment || mongoose.model("comment", commentSchema);