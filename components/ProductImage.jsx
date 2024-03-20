import React from "react";
import { capitalizeFirstLetter } from "../utils";

const ProductImage = ({ images, thumbnail, title }) => {
	// get main image or thumbnail if image not available
	const mainImage = images && images.length > 0 ? images[0] : thumbnail || "";

	return <img src={mainImage} alt={capitalizeFirstLetter(title)} />;
};

export default ProductImage;
