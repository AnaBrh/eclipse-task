import React from "react";
import Timer from "./Timer";
import StockStatus from "./Stock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faHeart,
	faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import StarRating from "./StarRating";

// component to display product details
const ProductCard = ({ product, addToBasket, isHighestRated }) => {
	// function to add product to basket
	const handleAddToBasket = () => {
		addToBasket(product.id, product.price);
	};

	// get main image or thumbnail if image not available
	const mainImage =
		product.images && product.images.length > 0
			? product.images[0]
			: product.thumbnail || "";

	// function to capitalize first letter of a string (some titles were in lower case)
	const capitalizeFirstLetter = (string) => {
		return string.replace(/\b\w/g, (char) => char.toUpperCase());
	};

	// calculate discounted price
	const calculateDiscountedPrice = () => {
		const discount = product.discountPercentage / 100;
		return product.price - product.price * discount;
	};

	// calculate amount saved
	const calculateAmountSaved = () => {
		return product.price - calculateDiscountedPrice();
	};

	return (
		<div className={`product-card ${isHighestRated ? "highest-rated" : ""}`}>
			{isHighestRated && (
				<div className="eclipse-recommended">Eclipse recommended</div>
			)}{" "}
			<img src={mainImage} alt={capitalizeFirstLetter(product.title)} />
			<section className="title-block">
				<h3>{capitalizeFirstLetter(product.title)}</h3>
				<div className="rating-block">
					<StarRating rating={product.rating} />
					<p id="reviews-dummy">20 Reviews </p>
				</div>
				<p id="description">
					<FontAwesomeIcon icon={faCheck} /> {product.description}
				</p>
				<div className="icons-container">
					<button id="heart" aria-label="Add to favorites">
						<FontAwesomeIcon icon={faHeart} />
					</button>
					<button id="chart" aria-label="Compare product">
						<FontAwesomeIcon icon={faChartSimple} />
					</button>
				</div>
			</section>
			<section className="price-block">
				<p id="original-price">
					RRP{" "}
					{product.price.toLocaleString("en-GB", {
						style: "currency",
						currency: "GBP",
					})}
				</p>
				<div className="price-save-duo">
					<p id="discounted-price">
						{" "}
						{calculateDiscountedPrice().toLocaleString("en-GB", {
							style: "currency",
							currency: "GBP",
						})}
					</p>
					<p id="save-amount">
						Save{" "}
						{calculateAmountSaved().toLocaleString("en-GB", {
							style: "currency",
							currency: "GBP",
						})}
					</p>
				</div>
				<StockStatus stock={product.stock} />
				<section>
					<Timer />
					<p id="options">
						<FontAwesomeIcon icon={faCheck} /> FREE UK delivery
					</p>
					<p id="options">
						<FontAwesomeIcon icon={faCheck} /> PayPal credit available
					</p>
				</section>
				<button onClick={handleAddToBasket} aria-label="Add to basket">
					ADD TO BASKET
				</button>
			</section>
		</div>
	);
};

export default ProductCard;
