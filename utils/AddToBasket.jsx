import React from "react";

const AddToBasket = ({ productId, price }) => {
    
	// function to add product to basket
	const handleAddToBasket = () => {
		console.log("Product ID:", productId);
		console.log("Price:", price);
	};

	return (
		<button className="add-to-basket-button" onClick={handleAddToBasket}>
			ADD TO BASKET
		</button>
	);
};

export default AddToBasket;
