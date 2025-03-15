import { blogModel } from "../models/blogModel.js";

// all product list
export const listBlog = async (req, res) => {
    try {
      const products = await blogModel.find({});
      res.json({ success: true, data: products });
    } catch (error) {
      console.log(error);
      res.json({ success: false, data: "Error" });
    }
  };