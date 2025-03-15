import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        h2:{type:String, required:false},
        title: {type:String, required:false}, 
        image:{type:String},
        category:{type:String, required:false},
        description: {type:String, required:false},
        link: {type:String, required:false},
        date:{type:Date}
    }
)
export const blogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);