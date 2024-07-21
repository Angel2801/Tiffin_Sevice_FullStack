import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from 'axios'
import {toast} from 'react-toastify';
const Add = ({url}) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
    available: true
  });  
  const providerId = "66950be0a688b6b6a4d4b803";

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("provider", providerId);
    formData.append("itemName", data.itemName);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("available", data.available);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`${url}/api/menu/add`, formData);
      console.log(response.data);
      // Reset form or show success message
      setData({
        itemName: "",
        description: "",
        price: "",
        category: "",
        available: true
      });
      setImage(null);
      toast.success(response.data.message);
      alert("Menu item added successfully!");
    } catch (error) {
      toast.error(response.data.message);
      console.error("Error adding menu item:", error);
      alert("Error adding menu item. Please try again.");
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt='' style={{ height: '100px', width: '100px' }}></img>
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required></input>
        </div>
        <div className='add-product-name flex-col'>
          <p>Item Name</p>
          <input onChange={onChangeHandler} value={data.itemName} type='text' name='itemName' placeholder='Type Here' required></input>
        </div>
        <div className='add-product-description flex-col'>
          <p>Item Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-price flex-col'>
            <p>Item Price</p>
            <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='Rs.0' required></input>
          </div>
          <div className='add-category flex-col'>
            <p>Category</p>
            <input onChange={onChangeHandler} value={data.category} type='text' name='category' placeholder='e.g. Appetizer, Main Course' required></input>
          </div>
        </div>
        <div className='add-available flex-col'>
          <label>
            <input
              type="checkbox"
              name="available"
              checked={data.available}
              onChange={onChangeHandler}
            />
            Available
          </label>
        </div>
        <button type='submit' className='add-button'>ADD MENU ITEM</button>
      </form>
    </div>
  )
}

export default Add