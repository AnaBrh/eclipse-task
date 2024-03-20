import { useState, useEffect } from 'react';

const useProductPrice = (product) => {
    // using state to hold the discounted price and the amount saved values
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [amountSaved, setAmountSaved] = useState(0);

    useEffect(() => {
        	// calculate discounted price
        const discount = product.discountPercentage / 100;
        const discounted = product.price - product.price * discount;
        	// calculate amount saved
        const saved = product.price - discounted;
        // set the states
        setDiscountedPrice(discounted);
        setAmountSaved(saved);
    }, [product]);

    return { discountedPrice, amountSaved };
};

export default useProductPrice;
