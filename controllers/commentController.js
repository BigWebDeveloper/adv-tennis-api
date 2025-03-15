import { commentModel } from "../models/commentModel.js";

export const addComment = async (req, res) => {
  const comment = new commentModel({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
    cookie: req.body.cookie,
    date: Date.now(),
  });

  try {
    await comment.save();
    res.json({ success: true, message: "message added" });
    res.status(201).send("User registered successfully");
  } catch (error) {
    //handle validation error
    console.log(error);
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).map((key) => {
        errors[key] = error.errors[key].message;
      });

      if (errors.phone) {
        errors.phone = errors.phone.includes("Cast to Number failed")
          ? "provide a number character"
          : undefined;
      }

      console.log(errors);
      return res.status(400).json({ errors });
    }

    res.json({ success: false, message: "Error" });
    res.status(500).send("Internal serever error");
  }
};
