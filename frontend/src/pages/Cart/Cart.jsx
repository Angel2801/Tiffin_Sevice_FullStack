import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount}=useContext(StoreContext);
    return (
        <div className='cart'>
            <div className='cart-items'>
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                {food_list.map((item,index)=>{
                  if(cartItems[item._id]>0)
                  {
                    return(
                      <div>
                      <div className='cart-items-title cart-items-item'>
                        <img src={item.image} alt=""></img>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p>{cartItems[item._id]}</p>
                        <p>{item.price*cartItems[item._id]}</p>
                        <p className='cross' onClick={()=>removeFromCart(item._id)}>x</p>
                      </div>
                      <hr></hr>
                      </div>
                    )
                  }
                })}
            </div>  
            <div className='cart-bottom'>
              <div className='cart-total'>
              <h2>Cart Totals</h2>
              <div>
                <div className='cart-total-details'>
                  <p>SubTotal</p>
                  <p>Rs.{getTotalCartAmount()}</p>
                </div>
                <hr></hr>
                <div className='cart-total-details'>
                  <p>Delivery Fee</p>
                  <p>Rs.{2}</p>
                </div>
                <hr></hr>
                <div className='cart-total-details'>
                  <b>Total</b>
                  <b>{getTotalCartAmount()+2}</b>
                </div>
                <button>PROCEED TO CHECKOUT</button>
              </div>
              </div>
              <div>
                <div className='cart-promocode'>
                  <div>
                    <p>If you have a promocode, Enter it here</p>
                    <div className='cart-promocode-input'>
                      <input type='text' placeholder='promo code'></input>
                      <button>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default Cart;
