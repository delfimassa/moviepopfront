import React from 'react';
import Review from "./Review";
import PostReview from "./PostReview"
import Rating from "./Rating";

const Reviews = () => {
    return (
        <div>
            <Rating />
            <Review/>
            <PostReview />
        </div>
    );
};

export default Reviews;