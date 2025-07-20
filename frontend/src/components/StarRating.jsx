//this shows star rating of doctor (star rating can be changed)


import React from 'react'
import { FaStar } from 'react-icons/fa';

export const StarRating = ({ rating, onRatingChange }) => {

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? 'star active' : 'star'}
          onClick={() => onRatingChange(star)} 
        //   onMouseEnter={() => onRatingChange(star)}
          size={30}
        /> 
      ))}
      <span className="rating-text">
        {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Not rated'}
      </span>
    </div>
  )
}
