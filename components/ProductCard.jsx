import React from "react";
import Timer from "./Timer";
import StockStatus from "./Stock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faHeart,
	faChartSimple,
} from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product, addToBasket, isHighestRated }) => {
	const handleAddToBasket = () => {
		addToBasket(product.id, product.price);
	};

	const mainImage =
		product.images && product.images.length > 0
			? product.images[0]
			: product.thumbnail || "";

	const capitalizeFirstLetter = (string) => {
		return string.replace(/\b\w/g, (char) => char.toUpperCase());
	};

	const calculateDiscountedPrice = () => {
		const discount = product.discountPercentage / 100;
		return product.price - product.price * discount;
	};

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
				<p>Rating {product.rating}</p>
				<p id="description">
					<FontAwesomeIcon icon={faCheck} /> {product.description}
				</p>
				<div className="icons-container">
					<button id="heart">
						<FontAwesomeIcon icon={faHeart} />
					</button>
					<button id="chart">
						<FontAwesomeIcon icon={faChartSimple} />
					</button>
				</div>
			</section>
			<section className="price-block">
				<p id="original-price">
					{"RRP "}
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
				<button onClick={handleAddToBasket}>ADD TO BASKET</button>
			</section>
		</div>
	);
};

export default ProductCard;
