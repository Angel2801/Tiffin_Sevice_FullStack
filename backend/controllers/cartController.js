import userModel from "../models/userModel.js";

// Add to cart
const addToCart = async (req, resp) => {
  try {
    const { userId, itemId } = req.body;

    // Find the user by ID
    const userData = await userModel.findById(userId);
    console.log('Fetched User Data:', userData);

    // Check if user exists
    if (!userData) {
      return resp.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData if not present
    let cartData = userData.cartData || new Map();
    console.log('Initial Cart Data:', cartData);

    // Add or update item in the cart using Map methods
    if (!cartData.has(itemId)) {
      cartData.set(itemId, 1);
    } else {
      cartData.set(itemId, cartData.get(itemId) + 1);
    }
    console.log('Updated Cart Data:', cartData);

    // Convert Map to Object before saving
    const cartDataObject = Object.fromEntries(cartData);

    // Update the user’s cartData using $set operator
    await userModel.findByIdAndUpdate(userId, { $set: { cartData: cartDataObject } });
    console.log('Saved User Data:', await userModel.findById(userId));

    // Send success response
    resp.json({ success: true, message: "Added to Cart" });

  } catch (error) {
    console.error("Error adding to cart:", error);
    resp.status(500).json({ success: false, message: "Error" });
  }
}
const removeFromCart = async (req, resp) => {
  try {
    const { userId, itemId } = req.body;

    // Find the user by ID
    const userData = await userModel.findById(userId);
    console.log('Fetched User Data:', userData);

    // Check if user exists
    if (!userData) {
      return resp.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData if not present
    let cartData = userData.cartData || new Map();
    console.log('Initial Cart Data:', cartData);

    // Remove or decrement item in the cart using Map methods
    if (cartData.has(itemId) && cartData.get(itemId) > 0) {
      cartData.set(itemId, cartData.get(itemId) - 1);
      // If the count drops to 0, remove the item from the map
      if (cartData.get(itemId) === 0) {
        cartData.delete(itemId);
      }
    }
    console.log('Updated Cart Data:', cartData);

    // Convert Map to Object before saving
    const cartDataObject = Object.fromEntries(cartData);

    // Update the user’s cartData using $set operator
    await userModel.findByIdAndUpdate(userId, { $set: { cartData: cartDataObject } });
    console.log('Saved User Data:', await userModel.findById(userId));

    // Send success response
    resp.json({ success: true, message: "Removed from Cart" });

  } catch (error) {
    console.error("Error removing from cart:", error);
    resp.status(500).json({ success: false, message: "Error" });
  }
}

//fetch user Cart
const getCart=async(req,resp)=>{
  try{
    let userData=await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
    resp.json({success:true,cartData});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});   
  }
}


export { addToCart, removeFromCart, getCart };
