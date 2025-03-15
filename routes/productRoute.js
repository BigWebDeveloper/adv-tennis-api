import express from "express";
import { addProduct, listProduct, removeProduct } from "../controllers/productController.js";
import multer from "multer";

export const productRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
productRouter.post("/add", upload.array("productImages", 5), addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", removeProduct)
