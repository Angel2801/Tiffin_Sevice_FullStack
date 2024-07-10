import React,{ createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems,setCartItems]=useState({});
    const addToCart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev=>({...prev,[itemId]:1})))
        }
        else{
            setCartItems((prev=>({...prev,[itemId]:prev[itemId]+1})));
        }
    }
    const removeFromCart=(itemId)=>{
        setCartItems((prev=>({...prev,[itemId]:prev[itemId]-1})));
    }
    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Convert item (key) to number for comparison
                let itemId = Number(item);
                let itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) { // Check if itemInfo is defined
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.log(`Item with id ${itemId} not found`);
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
