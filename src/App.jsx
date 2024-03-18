import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../utils/api";
import "./App.css";

const App = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);

	const getRandomItem = (array) => {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	};

	const fetchData = useCallback(async () => {
		try {
			const data = await fetchProducts(); 
			const filteredProducts = data.filter((product) => product.brand !== "Apple");
			const randomProducts = [];

			for (let i = 0; i < 10; i++) {
				const randomItem = getRandomItem(filteredProducts);
				randomProducts.push(randomItem);
				filteredProducts.splice(filteredProducts.indexOf(randomItem), 1);
			}
			const sortedProducts = randomProducts.sort((a, b) => b.rating - a.rating);

			localStorage.setItem("products", JSON.stringify(sortedProducts));
			localStorage.setItem("timestamp", new Date().getTime());

			setProducts(sortedProducts);
			setError(null);
		} catch (error) {
			setError("Error fetching products. Please try again later.");
			console.error("Error fetching products:", error);
		}
	}, []);

	useEffect(() => {
		const isPageRefreshed = () => {
			const navigationEntries = performance.getEntriesByType("navigation");
			if (navigationEntries.length > 0) {
				return navigationEntries[0].type === "reload";
			}
			return false;
		};

        const isDataOlderThan3Minutes = () => {
            const storedTimestamp = localStorage.getItem("timestamp");
            const now = new Date().getTime();
            const threeMinutes = 180000;
            return storedTimestamp && now - storedTimestamp >= threeMinutes;
        };
    
        if (isPageRefreshed() && isDataOlderThan3Minutes()) {
            fetchData();
        } else {
            const storedProducts = localStorage.getItem("products");
            if (storedProducts) {
                setProducts(JSON.parse(storedProducts));
            }
        }
    }, [fetchData]);

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
