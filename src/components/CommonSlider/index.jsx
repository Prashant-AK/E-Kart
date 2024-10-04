import React from "react";
import Slider from "react-slick";

const CommonSlider = ({ settings, slides }) => {
  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    ...settings, // Merge passed settings with default settings
  };

  return (
    <Slider {...defaultSettings}>
      {slides.map((slide, index) => (
        <div key={index} className="slide-item">
          <img src={slide.img} alt={slide.alt || `Slide ${index}`} />
        </div>
      ))}
    </Slider>
  );
};

export default CommonSlider;
