import React, { useContext } from 'react'
import './placeOrder.css'
import { StoreContext } from '../../context/StoreContext'
const placeOrder = () => {
  const {getTotalCartAmount}=useContext(StoreContext);
  return (
    <from className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input type='text' placeholder='First Name'></input>
          <input type='text' placeholder='Last Name'></input>
        </div>
        <input type="email" placeholder='Email address'/>
        <input type="text" placeholder='Street'/>
        <div className='multi-fields'>
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input type='text' placeholder="Zip code" />
          <input type='text' placeholder="Country" />
        </div>
        <input type='text' placeholder='Phone'></input>
      </div>
      <div className='place-order-right'>
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
                  <p>Rs.{getTotalCartAmount()===0?0:2}</p>
                </div>
                <hr></hr>
                <div className='cart-total-details'>
                  <b>Total</b>
                  <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                </div>
                <button onClick={()=>navigate('/order')}>PROCEED TO PAYMENT</button>
              </div>
              </div>
      </div>
    </from>
  )
}

export default placeOrder
