import React from "react";
import { FontAwesomeIcon, faShoppingBasket } from "../utils/index";

const AddToBasket = ({ productId, price }) => {
    
	// function to add product to basket
	const handleAddToBasket = () => {
		console.log("Product ID:", productId);
		console.log("Price:", price);
	};

	return (
		<button className="add-to-basket-button" onClick={handleAddToBasket}>
		<FontAwesomeIcon icon={faShoppingBasket} size="1x" /> ADD TO BASKET
	</button>
	);
};

export default AddToBasket;
