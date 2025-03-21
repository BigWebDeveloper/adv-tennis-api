import express from "express"
import {authMiddleware} from "../middleware/auth.js"
import { placeOrder, verifyOrder, userOrder, listOrders,updateStatus } from "../controllers/orderController.js"

export const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", authMiddleware, verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);