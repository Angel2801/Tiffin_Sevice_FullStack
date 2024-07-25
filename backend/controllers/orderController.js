import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, resp) => {
  const frontend_url = "http://localhost:5173"; // Adjust URL as needed
  try {
    // Create a new order in your database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });
    await newOrder.save();

    // Clear cart data for the user
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Construct line items for Stripe
    const line_items = req.body.items.map((item, index) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name || `Item ${index + 1}`, // Fallback name if item.name is missing
          description: item.description || 'No description provided',
        },
        unit_amount: Math.round(item.price * 100), // Amount in cents, rounded to ensure integer
      },
      quantity: item.quantity || 1, // Fallback to 1 if quantity is missing
    }));

    // Adding delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
          description: "Flat rate delivery fee",
        },
        unit_amount: 200, // 2 INR in cents
      },
      quantity: 1,
    });

    console.log('Line Items:', JSON.stringify(line_items, null, 2)); // Log line items to debug

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log('Stripe Session:', session); // Log Stripe session to debug

    resp.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    resp.status(500).json({ success: false, message: error.message });
  }
};
const verifyOrder=async(req,resp)=>{
  const {orderId,success}=req.body;
  try {
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      resp.json({success:true,message:"Paid"});
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      resp.json({success:false,message:"Not Paid"})
    }
  }catch(error){
    console.log(error);
    resp.json({success:false,message:"Error"})
  }
}
export { placeOrder,verifyOrder };
