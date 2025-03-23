import React from 'react';
import '../CSS/Product.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import { motion } from 'framer-motion'; // Keep motion for hover animations

interface ReviewCardProps {
  reviews: {
    imageUrl: string;
    name: string;
    rating: number;
    description: string;
  }[];
}

const ReviewCarousel: React.FC<ReviewCardProps> = ({ reviews }) => {
  const slideInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Swiper
      modules={[Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={3}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="review-carousel"
    >
      {reviews.map((review, index) => (
        <SwiperSlide key={index} className="review-card">
          <motion.div
            className="review-card-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            variants={slideInVariants}
          >
            <motion.img
              src={review.imageUrl}
              alt="item picture"
              className="review-card-picture"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="review-info">
              <h2 className="review-name">{review.name}</h2>
              <h3 className="review-rating">{'★'.repeat(review.rating)}</h3>
              <p className="review-description">{review.description}</p>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewCarousel;