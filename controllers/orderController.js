import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";
import axios from "axios";

// placing user order for frontend
export const placeOrder = async (req, res) => {
  const key = process.env.PAYSTACK_SECRET_KEY;
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    const {
      amount,
      items,
      userId,
      address: { email, firstName, lastName, phone },
    } = req.body;
    const orderId = newOrder._id;
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    console.log(firstName, lastName);
    const user_data = {
      email: email,
      amount: amount * 100,
      firstname: firstName,
      lastname: lastName,
      phone: phone,
      metadata: {
        orderId: orderId,
        userId: userId,
        orderItems: items,
      },
    };
    res.json({ success: true, user_data });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// verifing user order for frontend
export const verifyOrder = async (req, res) => {
  console.log(req.body);
  const {
    orderId,
    amount,
    response: { status, reference },
  } = req.body;
  const secret_key = process.env.PAYSTACK_SECRET_KEY;
  try {
    if (status === "success") {
      const response1 = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${secret_key}`, // Replace with your Paystack secret key
          },
        }
      );

      console.log(response1.data.data.amount);
      console.log(amount, response1.data.data.amount);
      console.log(response1.data.data.amount);
      if (amount_paid === amount) {
        let response = await orderModel.findByIdAndUpdate(orderId, {
          payment: true,
        });
        res.json({ success: true, message: "Transaction succeeded!" });
      }
    }

    // if(req.body.status === 'cancel') {
    //   // let response = await orderModel.findByIdAndUpdate(orderId, {payment: true});
    //   console.log(response);
    // }
    // if(req.body.status === 'cancel') {
    //   // let response = await orderModel.findByIdAndUpdate(orderId, {payment: true});
    //   console.log("response");
    // }
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

// user orders
export const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "Error" });
  }
};

// Listing all order for admin
export const listOrders = async (req, res) => {
  try{
    const orders = await orderModel.find({});
    res.json({success:true, data:orders});
  }
  catch (error) {
    console.log(error)
    res.json({success:false, message:"Error"})
  }
}
// Updating order status
export const updateStatus =   async (req, res)=> {
  try{
    const orders = await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    console.log(orders);
    res.json({success:true, message:"Status Updated"});
  }
  catch (error) {
    console.log(error)
    res.json({success:false, message:"Error"})
  }
}