import React from 'react'
import ReactStars from 'react-rating-stars-component';
export const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth > 600 ? 20 : 25,
        value: review.rating,
        isHalf: true

    }
  return (
    <div className='reviewCard'>
        <img src="https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?pid=ImgDet&rs=1" alt="name" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  )
}
