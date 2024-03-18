import axios from "axios";

const fetchProducts = async () => {
	try {
		// using axios to fetch the API data
		const response = await axios.get("https://dummyjson.com/products");
		console.log(response.data.products, "response.data.products")
		return response.data.products;
	} catch (error) {
		throw new Error("Error fetching products:", error);
	}
};

export { fetchProducts };
