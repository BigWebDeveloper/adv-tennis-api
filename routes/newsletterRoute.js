import express from "express"
import { addNewsletter } from "../controllers/newsletterController.js";

export const newsletterRouter = express.Router();
newsletterRouter.post("/add", addNewsletter);