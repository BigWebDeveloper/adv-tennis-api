import express from "express"
import { addBookings } from "../controllers/bookingController.js";

export const bookingRouter = express.Router();

bookingRouter.post("/add",addBookings);