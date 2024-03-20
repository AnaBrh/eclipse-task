import React from "react";
import { ProductFetcher } from "../utils";
import "./App.css";

// main application component
const App = () => {
	return (
		<div className="app">
			<ProductFetcher />
		</div>
	);
};

export default App;
