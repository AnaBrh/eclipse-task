import axios from "axios";

const fetchProducts = async () => {
	try {
		// using axios to fetch the API data
		const response = await axios.get("https://dummyjson.com/products");
		return response.data;
	} catch (error) {
		throw new Error("Error fetching products:", error);
	}
};

export { fetchProducts };
