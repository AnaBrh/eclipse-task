import React, { useState, useEffect } from "react";

const Timer = ({ initialSeconds = 180 }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const secs = time % 60;

        const pad = (num) => {
            return num < 10 ? "0" + num : num;
        };

        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    };

    const calculateDeliveryDate = () => {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 2); 

        const day = deliveryDate.getDate();
        const suffix = getDaySuffix(day);
        const month = deliveryDate.toLocaleDateString("en-US", { month: "long" });

        return `${day}${suffix} ${month}`;
    };

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
