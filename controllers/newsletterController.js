import {newsletterModel} from "../models/newsletterModel.js";

export const addNewsletter = async (req, res) => {
  const { email } = req.body;
  const subscriber = new newsletterModel({
    email: email,
    date: Date.now(),
  });
  try {
    
    const exists = await newsletterModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    else {
      await subscriber.save();
      res.json({success: true, message: "subscriber Added"});
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
