import React, { useState, useEffect, useCallback } from "react";
import { fetchProducts, ProductList } from "../utils/index";

const ProductFetcher = () => {
	// state to hold fetched products
	const [products, setProducts] = useState([]);
	// state to hold any error messages
	const [error, setError] = useState(null);

	// function to get a random item from an array
	const getRandomItem = (array) => {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	};

	// fetch data from API and set products state
	const fetchData = useCallback(async () => {
		try {
			const data = await fetchProducts();
			const filteredProducts = data.filter((product) => product.brand !== "Apple");
			const randomProducts = [];

			//loop to get the 10 random items
			for (let i = 0; i < 10; i++) {
				const randomItem = getRandomItem(filteredProducts);
				randomProducts.push(randomItem);
				filteredProducts.splice(filteredProducts.indexOf(randomItem), 1);
			}
			// sort the 10 products by rating descending
			const sortedProducts = randomProducts.sort((a, b) => b.rating - a.rating);

			// save the data to local storage
			localStorage.setItem("products", JSON.stringify(sortedProducts));
			localStorage.setItem("timestamp", new Date().getTime());

			//set the state & error
			setProducts(sortedProducts);
			setError(null);
		} catch (error) {
			setError("Error fetching products. Please try again later.");
			console.error("Error fetching products:", error);
		}
	}, []);

	// effect to fetch data on component mount or when page is refreshed
	useEffect(() => {
		const isPageRefreshed = () => {
			const navigationEntries = performance.getEntriesByType("navigation");
			if (navigationEntries.length > 0) {
				return navigationEntries[0].type === "reload";
			}
			return false;
		};
		// check if data is stale
		const isDataOlderThan3Minutes = () => {
			const storedTimestamp = localStorage.getItem("timestamp");
			const now = new Date().getTime();
			const threeMinutes = 180000;
			return storedTimestamp && now - storedTimestamp >= threeMinutes;
		};
		// if data not stale it fetches new data, otherwise shows same data
		if (isPageRefreshed() && isDataOlderThan3Minutes()) {
			fetchData();
		} else {
			const storedProducts = localStorage.getItem("products");
			if (storedProducts) {
				setProducts(JSON.parse(storedProducts));
			}
		}
	}, [fetchData]);

	return (
		<div className="product-fetcher">
			{error && <p className="error-message">{error}</p>}
			<ProductList products={products} />
		</div>
	);
};

export default ProductFetcher;
