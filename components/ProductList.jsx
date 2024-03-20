import React from "react";
import { ProductCard } from "../utils";

const ProductList = ({ products }) => {
	// get the products list
	return (
		<div className="product-list">
			{products.map((product, index) => (
				<ProductCard
					key={product.id}
					product={product}
					isHighestRated={index === 0}
				/>
			))}
		</div>
	);
};

export default ProductList;
