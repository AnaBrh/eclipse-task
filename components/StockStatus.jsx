import React from "react";

// component to show stock status with a progress bar
const StockStatus = ({ stock }) => {
	// calculate percentage of stock left
	const percentage = (stock / 100) * 100;

	// check if stock is low (20 is threshold)
	const isStockLow = stock <= 20;

	// style for stock text based on stock level (visual aid for user)
	const stockTextStyle = isStockLow
		? { color: "#d21a45" }
		: { color: "#252525" };

	return (
		<div>
			<div
				className="progress"
				style={{
					height: "5px",
					width: "100%",
					marginBottom: "10px",
					marginTop: "10px",
				}}
			>
				<div
					className="progress-bar"
					role="progressbar"
					style={{
						width: `${percentage}%`,
						backgroundColor: isStockLow ? "#d21a45" : "#1bb35f",
					}}
					aria-valuenow={stock}
					aria-valuemin="0"
					aria-valuemax="100"
				/>
			</div>
			<p className="stock-text" style={stockTextStyle}>
				{stock > 20 ? "In Stock" : "Last few left"}
			</p>
		</div>
	);
};

export default StockStatus;
