import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../utils/api";
import "./App.css";

const App = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

      // function to fetch products from the API
    const fetchData = async () => {
        try {
            const data = await fetchProducts();

            // filter out Apple products, sort by rating, and select 10 random products
            const filteredProducts = data.products.filter((product) => product.brand !== "Apple");
            const sortedProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
            const randomProducts = sortedProducts.slice(0, 10);

            // update state with the new products
            setProducts(randomProducts);

            // if fetch is successful, reset error state
            setError(null);
        } catch (error) {
            // if fetch fails, set error message state and print to console
            setError("Error fetching products. Please try again later.");
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        // fetch fresh data on initial load
        fetchData();
    }, []);

    // handle add to basket
    const addToBasket = (productId, price) => {
        console.log("Product ID:", productId);
        console.log("Price:", price);
    };

    return (
        <div className="app">
            <h1>Product Catalog</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="product-list">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        addToBasket={addToBasket}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
