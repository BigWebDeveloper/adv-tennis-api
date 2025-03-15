import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import { productRouter } from "./routes/productRoute.js";
import { commentRouter } from "./routes/commentRoute.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userRouter } from "./routes/userRoute.js";
import { cartRouter } from "./routes/cartRoute.js";
import { orderRouter } from "./routes/orderRoute.js";
import { adminRouter } from "./routes/adminRoute.js";
import { newsletterRouter } from "./routes/newsletterRoute.js";
import { blogRouter } from "./routes/blogRoute.js";
import { bookingRouter } from "./routes/bookingRoute.js";

//app config
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const URL = process.env.MongoDBURL;

//DB connection
connectDB();

// middleware
app.use(bodyParser.json());
app.use(cors());

// api endpoints
app.use("/api/product", productRouter);
app.use("/api/comment", commentRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/newsletter", newsletterRouter)
app.use("/api/blog", blogRouter)
app.use("/api/bookings", bookingRouter)

app.use("/", (req, res) => {
  res.json({"message":"API working"});
});

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});

export default app;







