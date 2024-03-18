import React from "react";

const StockStatus = ({ stock }) => {
	const percentage = (stock / 100) * 100;

	const isStockLow = stock <= 20;

	const stockTextStyle = isStockLow ? { color: '#d21a45' } : { color: '#252525' };

	const progressBarColor = stock > 20 ? "#1bb35f" : "#d21a45"; 

	return (
		<div>
			<div className="progress" style={{ height: "5px" , width: "100%", marginBottom: "10px", marginTop: "10px"}}>
				<div
					className="progress-bar"
					role="progressbar"
					style={{ width: `${percentage}%`, backgroundColor: isStockLow ? "#d21a45" : "#1bb35f" }}
					aria-valuenow={stock}
					aria-valuemin="0"
					aria-valuemax="100"
				/>
			</div>
            <p className="stock-text" style={stockTextStyle}>{stock > 20 ? "In Stock" : "Last Few Left"}</p>
		</div>
	);
};

export default StockStatus;
