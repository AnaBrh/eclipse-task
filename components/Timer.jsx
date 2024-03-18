import React, { useState, useEffect } from "react";

// timer component that counts down from a given initial time (default 180 seconds)
const Timer = ({ initialSeconds = 180 }) => {
	// state to hold the current seconds value
	const [seconds, setSeconds] = useState(initialSeconds);

	// useEffect hook to set up a countdown timer
	useEffect(() => {
		// set an interval to decrement the seconds every second
		const interval = setInterval(() => {
			setSeconds((prevSeconds) => prevSeconds - 1);
		}, 1000);

		// cleanup function to clear the interval when the component unmounts
		return () => clearInterval(interval);
	}, []); // empty dependency array means this effect runs once on mount

	// function to format the time into hours, minutes, and seconds
	const formatTime = (time) => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const secs = time % 60;

		// helper function to pad numbers with leading zeros
		const pad = (num) => {
			return num < 10 ? "0" + num : num;
		};
		// return formatted time string
		return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
	};

	// function to calculate the delivery date (2 days from current date)
	const calculateDeliveryDate = () => {
		const deliveryDate = new Date();
		deliveryDate.setDate(deliveryDate.getDate() + 2);

		const day = deliveryDate.getDate();
		// get the correct suffix for the day
		const suffix = getDaySuffix(day);
		const month = deliveryDate.toLocaleDateString("en-US", { month: "long" });
		// return formatted delivery date string
		return `${day}${suffix} ${month}`;
	};
	// function to get the correct suffix for the day
	const getDaySuffix = (day) => {
		if (day >= 11 && day <= 13) {
			return "th";
		}
		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	};
	// render the timer and delivery date information
	return (
		<div className="details">
			{seconds > 0 ? (
				<span>
					Order in the next <strong>{formatTime(seconds)}</strong> for delivery on{" "}
					<strong>{calculateDeliveryDate()}</strong>
				</span>
			) : (
				<span>Offer expired, refresh page for more offers</span>
			)}
		</div>
	);
};

export default Timer;
