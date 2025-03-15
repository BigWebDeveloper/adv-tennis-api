import express from "express"
import { addToCart, removeFromCart, getCart, updateFromCart } from "../controllers/cartController.js"
import { authMiddleware } from "../middleware/auth.js";

export const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/remove",authMiddleware, removeFromCart);
cartRouter.post("/update",authMiddleware, updateFromCart);
cartRouter.post("/get",authMiddleware, getCart);