import React from "react";
import {
	Timer,
	StockStatus,
	StarRating,
	FontAwesomeIcon,
	faCheck,
	faHeart,
	faChartSimple,
	useProductPrice,
	capitalizeFirstLetter,
	AddToBasket,
	ProductImage,
} from "../utils/index";

// component to display product details
const ProductCard = ({ product, isHighestRated }) => {
	const { discountedPrice, amountSaved } = useProductPrice(product);

	// check if stock is low (less than or equal to 20)
	const isStockLow = product.stock <= 20;

	// style for price based on stock level
	const priceStyle = {
		color: isHighestRated ? "#d21a45" : isStockLow ? "#252525" : "#252525",
	};

	return (
		<div className={`product-card ${isHighestRated ? "highest-rated" : ""}`}>
			{isHighestRated && (
				<div className="eclipse-recommended">Eclipse recommended</div>
			)}
			<ProductImage
				images={product.images}
				thumbnail={product.thumbnail}
				title={product.title}
			/>
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
          <p id="discounted-price" style={priceStyle}>
            {discountedPrice.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })}
          </p>
          {isHighestRated && (
            <p id="save-amount" style={{ color: "#d21a45" }}>
              Save{" "}
              {amountSaved.toLocaleString("en-GB", {
                style: "currency",
                currency: "GBP",
              })}
            </p>
          )}
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
				<AddToBasket productId={product.id} price={product.price} />
			</section>
		</div>
	);
};

export default ProductCard;
