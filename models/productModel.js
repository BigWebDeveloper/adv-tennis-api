import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        shortName:{type:String, required:false},
        fullName: {type:String, required:false},
        price:{type:Number, required:false}, 
        productImages:[{type:String}],
        category:{type:String, required:false},
        description: {type:String, required:false},
        quantity: {type:Number, required:false},
        availableQuantity: {type:Number, required:false},
        date:{type:Date}
    }
)
export const productModel = mongoose.models.product || mongoose.model("product", productSchema);