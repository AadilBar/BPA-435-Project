import React, { useEffect, useState } from 'react';
import '../CSS/Product.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import { motion, useAnimation } from 'framer-motion'; // Import motion and useAnimation

interface ReviewCardProps {
  reviews: {
    imageUrl: string;
    name: string;
    rating: number;
    description: string;
  }[];
}

const ReviewCarousel: React.FC<ReviewCardProps> = ({ reviews }) => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Swiper
      modules={[Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={3}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="review-carousel"
    >
      {reviews.map((review, index) => {
        const isVisible = scrollY > index * 200; // Adjust visibility threshold based on scroll position

        if (isVisible) {
          controls.start({ opacity: 1, y: 0 });
        }

        return (
          <SwiperSlide key={index} className="review-card">
            <motion.div
              className="review-card-content"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: index * 0.2, duration: 0.2 }}
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
        );
      })}
    </Swiper>
  );
};

export default ReviewCarousel;