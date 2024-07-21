import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
    const { food_list, selectedProvider } = useContext(StoreContext);

    // Filter the food list based on selectedProvider
    const filteredFoodList = selectedProvider === "All" 
        ? food_list
        : food_list.filter(item => item.provider === selectedProvider);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Services Near You</h2>
            <div className='food-display-list'>
                {filteredFoodList.length > 0 ? (
                    filteredFoodList.map((item, index) => (
                        <FoodItem
                            key={index}
                            id={item._id}
                            name={item.itemName} // Ensure this matches your schema
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    ))
                ) : (
                    <p>No items available for this provider.</p>
                )}
            </div>
        </div>
    );
}

export default FoodDisplay;
