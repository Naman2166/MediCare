//this shows star rating of doctor (star rating can not be changed)

import React from 'react';
import { FaStar } from 'react-icons/fa';

export const DisplayStarRating = ({
    rating = 0,
    size = 20,
    reviewCount = 0,
    showText = true,
    showNumber = true,  // New prop to control number display
    showReviews = true, // New prop to control review count
}) => {
    // Safely handle undefined/null rating
    const numericRating = Number(rating) || 0;
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 >= 0.5;

    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="relative inline-block">
                        {/* Full star */}
                        <FaStar
                            className={`${star <= fullStars ? 'text-yellow-400' : 'text-gray-300'}`}
                            size={size}
                        />
                        {/* Half star */}
                        {hasHalfStar && star === fullStars + 1 && (
                            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                                <FaStar className="text-yellow-400" size={size} />
                            </div>
                        )}
                    </span>
                ))}
            </div>


            {/* Conditional rendering of number and reviews count */}
            {(showNumber || showReviews) && (
                <div className="flex items-baseline gap-1 ml-1">
                    {showNumber && (
                        <span className="text-sm text-gray-800">
                            {numericRating.toFixed(1)}
                        </span>
                    )}
                    {showReviews && (
                        <span className="text-xs text-gray-500">
                            ({reviewCount})
                        </span>
                    )}
                </div>
            )}


        </div>
    );
};

// Add default props for additional safety
DisplayStarRating.defaultProps = {
    rating: 0,
    reviewCount: 0,
    size: 20,
    showText: true
};