// CarouselSlide.tsx

import React, { useState, useRef } from "react";

interface CarouselSlideProps {
  slides: React.ReactNode[];
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef<number>(0);
  const dragXRef = useRef<number>(0);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragXRef.current = event.clientX;
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!isDragging) return;
    const offsetX = event.clientX - dragXRef.current;
    dragXRef.current = event.clientX;
    if (offsetX > 5) {
      handlePrevSlide();
    } else if (offsetX < -5) {
      handleNextSlide();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="carousel-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="carousel-slide">{slides[currentSlideIndex]}</div>
      <div className="carousel-controls">
        <button className="carousel-control-btn" onClick={handlePrevSlide}>
          left
        </button>
        <button className="carousel-control-btn" onClick={handleNextSlide}>
          right
        </button>
      </div>
    </div>
  );
};

export default CarouselSlide;
