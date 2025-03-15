import { bookingsModel } from "../models/bookingsModel.js";

export const addBookings = async (req, res) => {
  try {
    const newData = new bookingsModel(req.body);
    await newData.save();
    res.json({ success: true, message: "Your message is sent" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Email already exist" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
};
