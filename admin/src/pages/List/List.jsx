import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/list`);
      console.log("Fetch List Response:", response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the list");
      }
    } catch (error) {
      console.error("Fetch List Error:", error);
      toast.error("Error fetching the list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/menu/delete`, { id: foodId });
      console.log("Delete Food Response:", response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error('Error deleting the food item');
      }
    } catch (error) {
      console.error("Delete Food Error:", error);
      toast.error('Error deleting the food item');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt='' />
            <p>{item.itemName}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p>{item.category}</p>
            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
