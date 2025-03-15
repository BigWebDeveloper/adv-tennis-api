import { productModel } from "../models/productModel.js";
import fs from 'fs'

//add product item
export const addProduct = async (req, res) => {
  const product = new productModel({
    shortName: req.body.shortName,
    fullName: req.body.fullName,
    price: req.body.price,
    productImages: req.files.map((file) => file.filename),
    category: req.body.category,
    description: req.body.description,
    quantity: req.body.quantity,
    availableQuantity: req.body.availableQuantity,
    date: Date.now(),
  });

  try {
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// all product list
export const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: "Error" });
  }
};


// remove product

export const removeProduct = async (req, res) => {
try {
    const product = await productModel.findById(req.body.id);

    product.productImages.map(item => {fs.unlink(`uploads/${item}`, () => {});
    })

    await productModel.findByIdAndDelete(req.body.id);
    res.json({success:"true", message:"Product Removed"})
} catch (error) {
    console.log(error);
    res.json({success:"false", message:"Error"})
}
}