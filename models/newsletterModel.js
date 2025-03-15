import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
    {
        email:{type:String, required:true, unique: true }, 
        date:{type:Date}
    }
)
export const newsletterModel = mongoose.models.newsletter || mongoose.model("newsletter", subscriberSchema);