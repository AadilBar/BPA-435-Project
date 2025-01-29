import React from 'react';
import '../CSS/Product.css';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


interface ReviewCardProps {
  reviews: {
    imageUrl: string;
    name: string;
    rating: number;
    description: string;
  }[];
}

const ReviewCarousel: React.FC<ReviewCardProps> = ({ reviews }) => {
  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={50}
    slidesPerView={3}
  
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className="review-carousel"
    >
      {reviews.map((review, index) => (
        <SwiperSlide key={index} className="review-card">
          <div className="review-card-content">
            <img src={review.imageUrl} alt="item picture" className="review-card-picture" />
            <div className="review-info">
              <h2 className="review-name">{review.name}</h2>
              <h3 className="review-rating">{'★'.repeat(review.rating)}</h3>
              <p className="review-description">{review.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewCarousel;