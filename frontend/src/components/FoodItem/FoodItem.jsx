import React, { useContext} from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({id,name,price,description,image}) => {
  const {cartItems,addToCart,removeFromCart}=useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className='food-item-image-container'>
            <img className='food-item-image' src={image} alt=''></img>
            {
              !cartItems[id]?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon} alt=''  style={{ width: '20px', height: '20px' }}></img>
              :<div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.minus_icon_red} alt='' style={{ width: '20px', height: '20px' }}></img>
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt='' style={{ width: '20px', height: '20px' }}></img>
              </div>
            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p>{name}</p>
            </div>
            <p className='food-item-desc'>{description}</p> 
            <p className='food-item-price'>Rs.{price}</p>
        </div>
    </div>
  )
}

export default FoodItem
