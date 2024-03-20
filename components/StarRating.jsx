import React from "react";
import Rating from "@mui/material/Rating";

// component to display star rating (including half stars) using material UI library without in a read only format
const StarRating = ({ rating }) => {
	return <Rating name="read-only" value={rating} precision={0.5} readOnly />;
};

export default StarRating;
