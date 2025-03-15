import express from "express"
import { listBlog } from "../controllers/blogController.js";

export const blogRouter = express.Router();
blogRouter.get("/list", listBlog);