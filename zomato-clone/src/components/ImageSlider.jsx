import React, { useState, useEffect } from "react";

import breakfastImg from "../../public/assets/breakfast.jpg";
import lunchImg from "../../public/assets/lunch.jpg";
import dinnerImg from "../../public/assets/dinner.jpg";

function ImageSlider() {
  const [images, setImages] = useState([breakfastImg, lunchImg, dinnerImg]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [images]);

  const handlePrevClick = () => {
    clearInterval(intervalId);
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    startInterval();
  };

  const handleNextClick = () => {
    clearInterval(intervalId);
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    startInterval();
  };

  const startInterval = () => {
    const id = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    setIntervalId(id);
  };

  return (
    <div className="image-section">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Image ${index + 1}`}
          className={index === activeIndex ? "active" : "hide"}
        />
      ))}
      <div className="slider-buttons">
        <button className="prev" onClick={handlePrevClick}>
          &#10094;
        </button>
        <button className="next" onClick={handleNextClick}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default ImageSlider;