import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../utils/api";
import "./App.css";

// main application component
const App = () => {
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

	// function to handle adding a product to the basket
	const addToBasket = (productId, price) => {
		console.log("Product ID:", productId);
		console.log("Price:", price);
	};

	return (
		<div className="app">
			{error && <p className="error-message">{error}</p>}
			<div className="product-list">
				{products.map((product, index) => (
					<ProductCard
						key={product.id}
						product={product}
						addToBasket={addToBasket}
						isHighestRated={index === 0}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
