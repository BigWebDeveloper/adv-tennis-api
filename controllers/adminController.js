import { adminModel } from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import "dotenv/config";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_AMIN);
};

// login admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "Admin Doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(admin._id);
    res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, message: "Error" });
  }
};

// register admin
export const registerAdmin = async (req, res) => {
  const { name, password, email, key } = req.body;
  const access_key = process.env.ACCESS_KEY;

  try {
    const exists = await adminModel.findOne({ email });
    // const admin = await adminModel.findById(process.env.VSAI);

    if (!key) {
      return res.json({ success: false, message: "Key is empty" });
    }

    if (key !== access_key) {
      return res.json({ success: false, message: "key is invalid" });
    }

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email format
    else if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    //validating strong password
    else if (password.length < 8) {
      res.json({ success: false, message: "Please enter a strong password" });
    } else {
      // hasing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newAdmin = new adminModel({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const admin = await newAdmin.save();
      const token = createToken(admin._id);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
