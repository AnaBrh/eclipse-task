import React from "react";

const ProductCard = ({ product, addToBasket }) => {
    // upon adding an item to the basket - print to console
    const handleAddToBasket = () => {
        addToBasket(product.id, product.price);
    };

    // check if product.images array is empty, if not empty, it it will pull the first image provided by the API for each product, if no img url is provided in the images array, it will check if there is a thumbnail, if yes, the img url is pulled from the thumbnail obj and will be displayed instead (ps. if no img or thumbnail available, alt text is available)
    const mainImage =
        product.images && product.images.length > 0
            ? product.images[0]
            : product.thumbnail || "";

    // extra bit: i noticed some titles were in all lower case, thought it would look better and if they all matched :) this function capitalises the first letter of each word (also applied to the alt text)
    const capitalizeFirstLetter = (string) => {
        return string.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <div className="product-card">
            <img src={mainImage} alt={capitalizeFirstLetter(product.title)} />
            <section className="title-block">
            <h3>{capitalizeFirstLetter(product.title)}</h3>
            <p>Rating {product.rating}</p>
            <p>{product.description}</p>
            </section>
            <section className="price-block">
            <p>Price £{product.price}</p>
            <button onClick={handleAddToBasket}>Add to basket</button>
            </section>
        </div>
    );
};

export default ProductCard;
