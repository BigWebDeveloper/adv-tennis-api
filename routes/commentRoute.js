import express from "express"
import { addComment } from "../controllers/commentController.js";

export const commentRouter = express.Router();

commentRouter.post("/add", addComment);

